     1|-- Enable necessary extensions
     2|CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
     3|
     4|-- --------------------------------------------------------
     5|-- 1. TABLES
     6|-- --------------------------------------------------------
     7|
     8|-- Restaurants (Tenants)
     9|CREATE TABLE public.restaurants (
    10|    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    11|    name TEXT NOT NULL,
    12|    slug TEXT UNIQUE,
    13|    created_at TIMESTAMPTZ DEFAULT NOW(),
    14|    updated_at TIMESTAMPTZ DEFAULT NOW()
    15|);
    16|
    17|-- Profiles (Users linked to auth.users)
    18|CREATE TABLE public.profiles (
    19|    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    20|    email TEXT NOT NULL,
    21|    first_name TEXT,
    22|    last_name TEXT,
    23|    role TEXT CHECK (role IN ('employer', 'employee', 'admin')) NOT NULL,
    24|    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE SET NULL,
    25|    avatar_url TEXT,
    26|    organization_id UUID, -- Keeping for backward compatibility if needed, but restaurant_id is preferred
    27|    created_at TIMESTAMPTZ DEFAULT NOW(),
    28|    updated_at TIMESTAMPTZ DEFAULT NOW()
    29|);
    30|
    31|-- Employees (Details specific to employment, separate from profile to allow invites)
    32|CREATE TABLE public.employees (
    33|    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    34|    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    35|    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Linked when user registers
    36|    email TEXT NOT NULL, -- For invites
    37|    first_name TEXT NOT NULL,
    38|    last_name TEXT NOT NULL,
    39|    role TEXT NOT NULL DEFAULT 'Staff', -- Job title (Server, Cook, etc.)
    40|    color TEXT DEFAULT 'bg-blue-500',
    41|    initials TEXT,
    42|    contract_hours INTEGER DEFAULT 35,
    43|    hourly_rate DECIMAL(10, 2),
    44|    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'invited')),
    45|    joined_at DATE DEFAULT CURRENT_DATE,
    46|    created_at TIMESTAMPTZ DEFAULT NOW(),
    47|    updated_at TIMESTAMPTZ DEFAULT NOW()
    48|);
    49|
    50|-- Shifts
    51|CREATE TABLE public.shifts (
    52|    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    53|    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    54|    employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
    55|    start_time TIMESTAMPTZ NOT NULL,
    56|    end_time TIMESTAMPTZ NOT NULL,
    57|    break_minutes INTEGER DEFAULT 0,
    58|    role TEXT, -- Specific role for this shift (e.g., "Head Server")
    59|    notes TEXT,
    60|    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    61|    created_at TIMESTAMPTZ DEFAULT NOW(),
    62|    updated_at TIMESTAMPTZ DEFAULT NOW()
    63|);
    64|
    65|-- Time Off Requests
    66|CREATE TABLE public.time_off_requests (
    67|    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    68|    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    69|    employee_id UUID NOT NULL REFERENCES public.employees(id) ON DELETE CASCADE,
    70|    start_date DATE NOT NULL,
    71|    end_date DATE NOT NULL,
    72|    reason TEXT,
    73|    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    74|    response_note TEXT,
    75|    created_at TIMESTAMPTZ DEFAULT NOW(),
    76|    updated_at TIMESTAMPTZ DEFAULT NOW()
    77|);
    78|
    79|-- Messages (Chat)
    80|CREATE TABLE public.messages (
    81|    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    82|    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    83|    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
    84|    channel TEXT DEFAULT 'general',
    85|    content TEXT NOT NULL,
    86|    created_at TIMESTAMPTZ DEFAULT NOW()
    87|);
    88|
    89|-- Notifications
    90|CREATE TABLE public.notifications (
    91|    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    92|    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    93|    type TEXT NOT NULL, -- 'shift_assigned', 'time_off_approved', etc.
    94|    title TEXT NOT NULL,
    95|    message TEXT NOT NULL,
    96|    data JSONB,
    97|    is_read BOOLEAN DEFAULT FALSE,
    98|    created_at TIMESTAMPTZ DEFAULT NOW()
    99|);
   100|
   101|-- --------------------------------------------------------
   102|-- 2. ROW LEVEL SECURITY (RLS)
   103|-- --------------------------------------------------------
   104|
   105|ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
   106|ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
   107|ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
   108|ALTER TABLE public.shifts ENABLE ROW LEVEL SECURITY;
   109|ALTER TABLE public.time_off_requests ENABLE ROW LEVEL SECURITY;
   110|ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
   111|ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
   112|
   113|-- Helper function to get current user's restaurant_id
   114|CREATE OR REPLACE FUNCTION public.get_my_restaurant_id()
   115|RETURNS UUID AS $$
   116|DECLARE
   117|  v_restaurant_id UUID;
   118|BEGIN
   119|  SELECT restaurant_id INTO v_restaurant_id
   120|  FROM public.profiles
   121|  WHERE id = auth.uid();
   122|  
   123|  RETURN v_restaurant_id;
   124|END;
   125|$$ LANGUAGE plpgsql SECURITY DEFINER;
   126|
   127|-- Policies
   128|
   129|-- RESTAURANTS
   130|-- Employers can read/update their own restaurant
   131|CREATE POLICY "Employers can view own restaurant" ON public.restaurants
   132|    FOR SELECT USING (id = public.get_my_restaurant_id());
   133|
   134|CREATE POLICY "Employers can update own restaurant" ON public.restaurants
   135|    FOR UPDATE USING (id = public.get_my_restaurant_id());
   136|
   137|-- PROFILES
   138|-- Users can read their own profile
   139|CREATE POLICY "Users can view own profile" ON public.profiles
   140|    FOR SELECT USING (auth.uid() = id);
   141|
   142|-- Employers can view profiles of their employees (via restaurant_id match)
   143|CREATE POLICY "Employers can view restaurant profiles" ON public.profiles
   144|    FOR SELECT USING (
   145|        restaurant_id = public.get_my_restaurant_id()
   146|        AND public.get_my_restaurant_id() IS NOT NULL
   147|    );
   148|
   149|-- EMPLOYEES
   150|-- Employers can manage employees in their restaurant
   151|CREATE POLICY "Employers manage restaurant employees" ON public.employees
   152|    FOR ALL USING (restaurant_id = public.get_my_restaurant_id());
   153|
   154|-- Employees can view their own employee record and coworkers
   155|CREATE POLICY "Employees view coworkers" ON public.employees
   156|    FOR SELECT USING (restaurant_id = public.get_my_restaurant_id());
   157|
   158|-- SHIFTS
   159|-- Employers manage shifts
   160|CREATE POLICY "Employers manage shifts" ON public.shifts
   161|    FOR ALL USING (restaurant_id = public.get_my_restaurant_id());
   162|
   163|-- Employees view shifts in their restaurant
   164|CREATE POLICY "Employees view shifts" ON public.shifts
   165|    FOR SELECT USING (restaurant_id = public.get_my_restaurant_id());
   166|
   167|-- TIME OFF
   168|-- Employers manage requests
   169|CREATE POLICY "Employers manage time off" ON public.time_off_requests
   170|    FOR ALL USING (restaurant_id = public.get_my_restaurant_id());
   171|
   172|-- Employees can view/create their own requests
   173|CREATE POLICY "Employees manage own requests" ON public.time_off_requests
   174|    FOR ALL USING (employee_id IN (
   175|        SELECT id FROM public.employees WHERE profile_id = auth.uid()
   176|    ));
   177|
   178|-- MESSAGES
   179|-- Everyone in the restaurant can read/write messages
   180|CREATE POLICY "Restaurant chat access" ON public.messages
   181|    FOR ALL USING (restaurant_id = public.get_my_restaurant_id());
   182|
   183|-- NOTIFICATIONS
   184|-- Users can only see their own notifications
   185|CREATE POLICY "Users manage own notifications" ON public.notifications
   186|    FOR ALL USING (user_id = auth.uid());
   187|
   188|
   189|-- --------------------------------------------------------
   190|-- 3. TRIGGERS & FUNCTIONS
   191|-- --------------------------------------------------------
   192|
   193|-- Auto-update updated_at
   194|CREATE OR REPLACE FUNCTION public.handle_updated_at()
   195|RETURNS TRIGGER AS $$
   196|BEGIN
   197|  NEW.updated_at = NOW();
   198|  RETURN NEW;
   199|END;
   200|$$ LANGUAGE plpgsql;
   201|
   202|CREATE TRIGGER set_updated_at_restaurants BEFORE UPDATE ON public.restaurants FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
   203|CREATE TRIGGER set_updated_at_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
   204|CREATE TRIGGER set_updated_at_employees BEFORE UPDATE ON public.employees FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
   205|CREATE TRIGGER set_updated_at_shifts BEFORE UPDATE ON public.shifts FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
   206|
   207|-- New User Handler (Supabase Auth Hook)
   208|-- Automatically creates a profile when a user signs up
   209|CREATE OR REPLACE FUNCTION public.handle_new_user()
   210|RETURNS TRIGGER AS $$
   211|BEGIN
   212|  INSERT INTO public.profiles (id, email, role, first_name, last_name)
   213|  VALUES (
   214|    NEW.id,
   215|    NEW.email,
   216|    COALESCE(NEW.raw_user_meta_data->>'role', 'employer'), -- Default to employer if not specified
   217|    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
   218|    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
   219|  );
   220|  RETURN NEW;
   221|END;
   222|$$ LANGUAGE plpgsql SECURITY DEFINER;
   223|
   224|-- --------------------------------------------------------
   225|-- 4. STORAGE
   226|-- --------------------------------------------------------
   227|
   228|-- Create bucket 'employee_docs' if it doesn't exist (Requires pg_net or usage of storage schema)
   229|-- Note: This SQL might need to be run in the Supabase dashboard SQL editor if extensions/permissions aren't set.
   230|
   231|INSERT INTO storage.buckets (id, name, public)
   232|VALUES ('employee_docs', 'employee_docs', false)
   233|ON CONFLICT (id) DO NOTHING;
   234|
   235|-- RLS for Storage
   236|CREATE POLICY "Employers can upload docs"
   237|ON storage.objects FOR INSERT
   238|WITH CHECK (
   239|  bucket_id = 'employee_docs' AND
   240|  auth.role() = 'authenticated' AND
   241|  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'employer'
   242|);
   243|
   244|CREATE POLICY "Employers can view docs"
   245|ON storage.objects FOR SELECT
   246|USING (
   247|  bucket_id = 'employee_docs' AND
   248|  auth.role() = 'authenticated' AND
   249|  (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'employer'
   250|);
   251|