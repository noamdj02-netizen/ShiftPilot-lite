-- =============================================
-- SHIFTPILOT - SCHEMA COMPLET PRODUCTION-READY
-- =============================================
-- Migration consolidée selon spécifications
-- Date: 2024
-- =============================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- ENUMS
-- =============================================

-- Supprimer les anciens enums si existent (pour migration propre)
DROP TYPE IF EXISTS subscription_status CASCADE;
DROP TYPE IF EXISTS subscription_plan CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS shift_status CASCADE;
DROP TYPE IF EXISTS swap_request_status CASCADE;
DROP TYPE IF EXISTS notification_type CASCADE;
DROP TYPE IF EXISTS schedule_status CASCADE;
DROP TYPE IF EXISTS time_off_status CASCADE;
DROP TYPE IF EXISTS employment_type CASCADE;
DROP TYPE IF EXISTS channel_type CASCADE;

-- Créer les enums selon specs
CREATE TYPE subscription_status AS ENUM ('trialing', 'active', 'past_due', 'canceled', 'unpaid');
CREATE TYPE subscription_plan AS ENUM ('lite', 'pro', 'business');
CREATE TYPE user_role AS ENUM ('OWNER', 'MANAGER', 'HR', 'EMPLOYEE');
CREATE TYPE shift_status AS ENUM ('draft', 'published', 'confirmed', 'completed', 'canceled');
CREATE TYPE swap_request_status AS ENUM ('pending', 'approved', 'rejected', 'canceled');
CREATE TYPE schedule_status AS ENUM ('DRAFT', 'REVIEW', 'VALIDATED', 'PUBLISHED');
CREATE TYPE time_off_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE employment_type AS ENUM ('CDI', 'CDD', 'EXTRA', 'APPRENTI');
CREATE TYPE channel_type AS ENUM ('TEAM', 'DIRECT');
CREATE TYPE notification_type AS ENUM (
    'PLANNING_PUBLISHED',
    'SHIFT_ASSIGNED',
    'SHIFT_UPDATED',
    'TIME_OFF_APPROVED',
    'TIME_OFF_REJECTED',
    'SWAP_REQUEST',
    'SWAP_APPROVED',
    'REMINDER'
);

-- =============================================
-- TABLES PRINCIPALES
-- =============================================

-- Organizations (multi-tenant)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    brand_name VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'FR',
    timezone VARCHAR(50) DEFAULT 'Europe/Paris',
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Locations (établissements / sites)
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    capacity INTEGER,
    phone VARCHAR(20),
    opening_hours JSONB, -- {"monday": {"open": "09:00", "close": "23:00"}, ...}
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles (extension de auth.users)
-- Supprimer la table si elle existe pour recréer avec la bonne structure
DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role user_role DEFAULT 'EMPLOYEE',
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    default_location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    phone VARCHAR(20),
    email VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    hourly_rate DECIMAL(10,2),
    max_hours_week INTEGER DEFAULT 35,
    min_hours_week INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Employees (table séparée pour données RH)
CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    position VARCHAR(100), -- "serveur", "chef de rang", "barman"
    hourly_rate DECIMAL(10,2),
    employment_type employment_type DEFAULT 'CDI',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Schedules (plannings hebdomadaires)
CREATE TABLE IF NOT EXISTS schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE NOT NULL,
    week_start_date DATE NOT NULL,
    status schedule_status DEFAULT 'DRAFT',
    total_hours DECIMAL(10,2) DEFAULT 0,
    total_cost DECIMAL(10,2) DEFAULT 0,
    compliance_score DECIMAL(5,2), -- 0-100
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    validated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, location_id, week_start_date)
);

-- Shifts (shifts individuels dans un planning)
CREATE TABLE IF NOT EXISTS shifts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE,
    employee_id UUID REFERENCES employees(id) ON DELETE SET NULL,
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- Redondant mais utile pour queries directes
    role VARCHAR(100), -- Poste sur ce shift
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    break_minutes INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Time Off Requests
CREATE TABLE IF NOT EXISTS time_off_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE NOT NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status time_off_status DEFAULT 'PENDING',
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Message Channels
CREATE TABLE IF NOT EXISTS message_channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL, -- "Salle midi", "Cuisine soir"
    type channel_type DEFAULT 'TEAM',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    channel_id UUID REFERENCES message_channels(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Labor Rules (règles RH / légales)
CREATE TABLE IF NOT EXISTS labor_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    country_code VARCHAR(2) DEFAULT 'FR',
    max_hours_per_week DECIMAL(5,2) DEFAULT 48.0,
    min_rest_hours_between_shifts DECIMAL(4,2) DEFAULT 11.0,
    max_consecutive_days INTEGER DEFAULT 6,
    sunday_premium_rate DECIMAL(4,2) DEFAULT 1.2, -- 20% de majoration
    night_premium_rate DECIMAL(4,2) DEFAULT 1.1, -- 10% de majoration
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, country_code)
);

-- Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE NOT NULL,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL, -- 'SCHEDULE_PUBLISHED', 'SHIFT_UPDATED', etc.
    payload JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    type notification_type NOT NULL,
    meta JSONB DEFAULT '{}',
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================

-- Organizations
CREATE INDEX IF NOT EXISTS idx_organizations_name ON organizations(name);

-- Locations
CREATE INDEX IF NOT EXISTS idx_locations_org ON locations(organization_id);
CREATE INDEX IF NOT EXISTS idx_locations_org_active ON locations(organization_id, is_active);

-- Profiles
CREATE INDEX IF NOT EXISTS idx_profiles_org ON profiles(organization_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Employees
CREATE INDEX IF NOT EXISTS idx_employees_org ON employees(organization_id);
CREATE INDEX IF NOT EXISTS idx_employees_location ON employees(location_id);
CREATE INDEX IF NOT EXISTS idx_employees_profile ON employees(profile_id);
CREATE INDEX IF NOT EXISTS idx_employees_active ON employees(organization_id, is_active);

-- Schedules
-- S'assurer que la colonne status existe avant de créer l'index
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'schedules' 
        AND column_name = 'status'
    ) THEN
        ALTER TABLE schedules ADD COLUMN status schedule_status DEFAULT 'DRAFT';
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_schedules_org ON schedules(organization_id);
CREATE INDEX IF NOT EXISTS idx_schedules_location ON schedules(location_id);
CREATE INDEX IF NOT EXISTS idx_schedules_week ON schedules(week_start_date);
CREATE INDEX IF NOT EXISTS idx_schedules_status ON schedules(status);

-- Shifts
CREATE INDEX IF NOT EXISTS idx_shifts_schedule ON shifts(schedule_id);
CREATE INDEX IF NOT EXISTS idx_shifts_employee ON shifts(employee_id);
CREATE INDEX IF NOT EXISTS idx_shifts_profile ON shifts(profile_id);
CREATE INDEX IF NOT EXISTS idx_shifts_start_time ON shifts(start_time);
CREATE INDEX IF NOT EXISTS idx_shifts_published ON shifts(is_published);

-- Time Off Requests
-- S'assurer que la colonne status existe avant de créer l'index
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'time_off_requests' 
        AND column_name = 'status'
    ) THEN
        ALTER TABLE time_off_requests ADD COLUMN status time_off_status DEFAULT 'PENDING';
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_timeoff_employee ON time_off_requests(employee_id);
CREATE INDEX IF NOT EXISTS idx_timeoff_org ON time_off_requests(organization_id);
CREATE INDEX IF NOT EXISTS idx_timeoff_status ON time_off_requests(status);
CREATE INDEX IF NOT EXISTS idx_timeoff_dates ON time_off_requests(start_date, end_date);

-- Messages
CREATE INDEX IF NOT EXISTS idx_messages_channel ON messages(channel_id);
CREATE INDEX IF NOT EXISTS idx_messages_org ON messages(organization_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);

-- Message Channels
CREATE INDEX IF NOT EXISTS idx_channels_org ON message_channels(organization_id);

-- Labor Rules
CREATE INDEX IF NOT EXISTS idx_labor_rules_org ON labor_rules(organization_id);

-- Audit Logs
CREATE INDEX IF NOT EXISTS idx_audit_org ON audit_logs(organization_id);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);

-- Notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(user_id, read_at);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Activer RLS sur toutes les tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_off_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE labor_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS POLICIES
-- =============================================

-- Organizations: Users can view their organization
CREATE POLICY "users_view_own_org" ON organizations
    FOR SELECT USING (
        id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

-- Organizations: Owners can update
CREATE POLICY "owners_update_org" ON organizations
    FOR UPDATE USING (
        id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role = 'OWNER'
        )
    );

-- Locations: Users can view locations in their org
CREATE POLICY "users_view_org_locations" ON locations
    FOR SELECT USING (
        organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

-- Locations: Managers can manage
CREATE POLICY "managers_manage_locations" ON locations
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('OWNER', 'MANAGER', 'HR')
        )
    );

-- Profiles: Users can view profiles in their org
CREATE POLICY "users_view_org_profiles" ON profiles
    FOR SELECT USING (
        organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
        OR id = auth.uid()
    );

-- Profiles: Users can update their own profile
CREATE POLICY "users_update_own_profile" ON profiles
    FOR UPDATE USING (id = auth.uid());

-- Profiles: Managers can update employee profiles
CREATE POLICY "managers_update_employees" ON profiles
    FOR UPDATE USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('OWNER', 'MANAGER', 'HR')
        )
    );

-- Employees: Users can view employees in their org
CREATE POLICY "users_view_org_employees" ON employees
    FOR SELECT USING (
        organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

-- Employees: Employees can view their own record
CREATE POLICY "employees_view_own" ON employees
    FOR SELECT USING (
        profile_id = auth.uid() OR
        id IN (SELECT id FROM employees WHERE profile_id = auth.uid())
    );

-- Employees: Managers can manage
CREATE POLICY "managers_manage_employees" ON employees
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('OWNER', 'MANAGER', 'HR')
        )
    );

-- Schedules: Users can view schedules in their org
CREATE POLICY "users_view_org_schedules" ON schedules
    FOR SELECT USING (
        organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

-- Schedules: Managers can manage
CREATE POLICY "managers_manage_schedules" ON schedules
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('OWNER', 'MANAGER', 'HR')
        )
    );

-- Shifts: Users can view shifts in their org
CREATE POLICY "users_view_org_shifts" ON shifts
    FOR SELECT USING (
        schedule_id IN (
            SELECT id FROM schedules 
            WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

-- Shifts: Employees can view their own shifts
CREATE POLICY "employees_view_own_shifts" ON shifts
    FOR SELECT USING (
        profile_id = auth.uid() OR
        employee_id IN (SELECT id FROM employees WHERE profile_id = auth.uid())
    );

-- Shifts: Managers can manage
CREATE POLICY "managers_manage_shifts" ON shifts
    FOR ALL USING (
        schedule_id IN (
            SELECT id FROM schedules 
            WHERE organization_id IN (
                SELECT organization_id FROM profiles 
                WHERE id = auth.uid() AND role IN ('OWNER', 'MANAGER', 'HR')
            )
        )
    );

-- Time Off Requests: Employees can view their own
CREATE POLICY "employees_view_own_timeoff" ON time_off_requests
    FOR SELECT USING (
        employee_id IN (SELECT id FROM employees WHERE profile_id = auth.uid())
    );

-- Time Off Requests: Employees can create their own
CREATE POLICY "employees_create_own_timeoff" ON time_off_requests
    FOR INSERT WITH CHECK (
        employee_id IN (SELECT id FROM employees WHERE profile_id = auth.uid())
    );

-- Time Off Requests: Managers can view all in org
CREATE POLICY "managers_view_org_timeoff" ON time_off_requests
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('OWNER', 'MANAGER', 'HR')
        )
    );

-- Time Off Requests: Managers can update
CREATE POLICY "managers_update_timeoff" ON time_off_requests
    FOR UPDATE USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('OWNER', 'MANAGER', 'HR')
        )
    );

-- Message Channels: Users can view channels in their org
CREATE POLICY "users_view_org_channels" ON message_channels
    FOR SELECT USING (
        organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

-- Messages: Users can view messages in their org channels
CREATE POLICY "users_view_org_messages" ON messages
    FOR SELECT USING (
        channel_id IN (
            SELECT id FROM message_channels 
            WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

-- Messages: Users can send messages
CREATE POLICY "users_send_messages" ON messages
    FOR INSERT WITH CHECK (
        sender_id = auth.uid() AND
        channel_id IN (
            SELECT id FROM message_channels 
            WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

-- Labor Rules: Users can view rules in their org
CREATE POLICY "users_view_org_rules" ON labor_rules
    FOR SELECT USING (
        organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

-- Labor Rules: Managers can manage
CREATE POLICY "managers_manage_rules" ON labor_rules
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('OWNER', 'MANAGER', 'HR')
        )
    );

-- Audit Logs: Managers can view logs in their org
CREATE POLICY "managers_view_org_audit" ON audit_logs
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('OWNER', 'MANAGER', 'HR')
        )
    );

-- Notifications: Users can view their own
CREATE POLICY "users_view_own_notifications" ON notifications
    FOR SELECT USING (user_id = auth.uid());

-- Notifications: Users can update their own
CREATE POLICY "users_update_own_notifications" ON notifications
    FOR UPDATE USING (user_id = auth.uid());

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_organizations_updated_at
    BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_locations_updated_at
    BEFORE UPDATE ON locations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_employees_updated_at
    BEFORE UPDATE ON employees
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_schedules_updated_at
    BEFORE UPDATE ON schedules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_shifts_updated_at
    BEFORE UPDATE ON shifts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_timeoff_updated_at
    BEFORE UPDATE ON time_off_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_labor_rules_updated_at
    BEFORE UPDATE ON labor_rules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, first_name, last_name, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.email, ''),
        COALESCE(NEW.raw_user_meta_data->>'full_name', NULL),
        COALESCE(NEW.raw_user_meta_data->>'first_name', NULL),
        COALESCE(NEW.raw_user_meta_data->>'last_name', NULL),
        'EMPLOYEE'::user_role -- Default role, will be updated during onboarding
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
EXCEPTION
    WHEN others THEN
        RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to sync profile_id in shifts when employee_id is set
CREATE OR REPLACE FUNCTION sync_shift_profile_id()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.employee_id IS NOT NULL AND NEW.profile_id IS NULL THEN
        SELECT profile_id INTO NEW.profile_id
        FROM employees
        WHERE id = NEW.employee_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sync_shift_profile
    BEFORE INSERT OR UPDATE ON shifts
    FOR EACH ROW EXECUTE FUNCTION sync_shift_profile_id();

-- =============================================
-- COMMENTS (Documentation)
-- =============================================

COMMENT ON TABLE organizations IS 'Organisations multi-tenant (chaque employeur = 1 org)';
COMMENT ON TABLE locations IS 'Établissements / sites physiques d''une organisation';
COMMENT ON TABLE profiles IS 'Profils utilisateurs (extension de auth.users)';
COMMENT ON TABLE employees IS 'Données RH des employés (lié à profiles)';
COMMENT ON TABLE schedules IS 'Plannings hebdomadaires (1 par semaine/location)';
COMMENT ON TABLE shifts IS 'Shifts individuels dans un planning';
COMMENT ON TABLE time_off_requests IS 'Demandes de congés des employés';
COMMENT ON TABLE message_channels IS 'Canaux de messagerie interne';
COMMENT ON TABLE messages IS 'Messages dans les canaux';
COMMENT ON TABLE labor_rules IS 'Règles RH / légales par organisation';
COMMENT ON TABLE audit_logs IS 'Logs d''audit pour traçabilité';
COMMENT ON TABLE notifications IS 'Notifications utilisateurs';

