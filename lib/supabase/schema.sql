-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------
-- 1. TABLES
-- --------------------------------------------------------

-- Restaurants (Tenants)
CREATE TABLE public.restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles (Users linked to auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    role TEXT CHECK (role IN ('employer', 'employee', 'admin')) NOT NULL,
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE SET NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Employees (Details specific to employment, separate from profile to allow invites)
CREATE TABLE public.employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Linked when user registers
    email TEXT NOT NULL, -- For invites
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'Staff', -- Job title (Server, Cook, etc.)
    color TEXT DEFAULT 'bg-blue-500',
    contract_hours INTEGER DEFAULT 35,
    hourly_rate DECIMAL(10, 2),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'invited')),
    joined_at DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shifts
CREATE TABLE public.shifts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    break_minutes INTEGER DEFAULT 0,
    role TEXT, -- Specific role for this shift (e.g., "Head Server")
    notes TEXT,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Time Off Requests
CREATE TABLE public.time_off_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages (Chat)
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
    channel TEXT DEFAULT 'general',
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'shift_assigned', 'time_off_approved', etc.
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------
-- 2. ROW LEVEL SECURITY (RLS)
-- --------------------------------------------------------

ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_off_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's restaurant_id
CREATE OR REPLACE FUNCTION public.get_my_restaurant_id()
RETURNS UUID AS $$
DECLARE
  v_restaurant_id UUID;
BEGIN
  SELECT restaurant_id INTO v_restaurant_id
  FROM public.profiles
  WHERE id = auth.uid();
  
  RETURN v_restaurant_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies

-- RESTAURANTS
-- Employers can read/update their own restaurant
CREATE POLICY "Employers can view own restaurant" ON public.restaurants
    FOR SELECT USING (id = public.get_my_restaurant_id());

CREATE POLICY "Employers can update own restaurant" ON public.restaurants
    FOR UPDATE USING (id = public.get_my_restaurant_id());

-- PROFILES
-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Employers can view profiles of their employees (via restaurant_id match)
CREATE POLICY "Employers can view restaurant profiles" ON public.profiles
    FOR SELECT USING (
        restaurant_id = public.get_my_restaurant_id()
        AND public.get_my_restaurant_id() IS NOT NULL
    );

-- EMPLOYEES
-- Employers can manage employees in their restaurant
CREATE POLICY "Employers manage restaurant employees" ON public.employees
    FOR ALL USING (restaurant_id = public.get_my_restaurant_id());

-- Employees can view their own employee record and coworkers
CREATE POLICY "Employees view coworkers" ON public.employees
    FOR SELECT USING (restaurant_id = public.get_my_restaurant_id());

-- SHIFTS
-- Employers manage shifts
CREATE POLICY "Employers manage shifts" ON public.shifts
    FOR ALL USING (restaurant_id = public.get_my_restaurant_id());

-- Employees view shifts in their restaurant
CREATE POLICY "Employees view shifts" ON public.shifts
    FOR SELECT USING (restaurant_id = public.get_my_restaurant_id());

-- TIME OFF
-- Employers manage requests
CREATE POLICY "Employers manage time off" ON public.time_off_requests
    FOR ALL USING (restaurant_id = public.get_my_restaurant_id());

-- Employees can view/create their own requests
CREATE POLICY "Employees manage own requests" ON public.time_off_requests
    FOR ALL USING (employee_id IN (
        SELECT id FROM public.employees WHERE profile_id = auth.uid()
    ));

-- MESSAGES
-- Everyone in the restaurant can read/write messages
CREATE POLICY "Restaurant chat access" ON public.messages
    FOR ALL USING (restaurant_id = public.get_my_restaurant_id());

-- NOTIFICATIONS
-- Users can only see their own notifications
CREATE POLICY "Users manage own notifications" ON public.notifications
    FOR ALL USING (user_id = auth.uid());


-- --------------------------------------------------------
-- 3. TRIGGERS & FUNCTIONS
-- --------------------------------------------------------

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_restaurants BEFORE UPDATE ON public.restaurants FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER set_updated_at_employees BEFORE UPDATE ON public.employees FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER set_updated_at_shifts BEFORE UPDATE ON public.shifts FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- New User Handler (Supabase Auth Hook)
-- Automatically creates a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'employer'), -- Default to employer if not specified
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger after auth.users insert
-- Note: In Supabase dashboard this needs to be created on auth.users
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

