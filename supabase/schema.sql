-- =============================================
-- EXTENSIONS
-- =============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- ENUMS
-- =============================================
CREATE TYPE subscription_status AS ENUM ('trialing', 'active', 'past_due', 'canceled', 'unpaid');
CREATE TYPE subscription_plan AS ENUM ('lite', 'pro', 'business');
CREATE TYPE user_role AS ENUM ('owner', 'manager', 'employee');
CREATE TYPE shift_status AS ENUM ('draft', 'published', 'confirmed', 'completed', 'canceled');
CREATE TYPE swap_request_status AS ENUM ('pending', 'approved', 'rejected', 'canceled');
CREATE TYPE notification_type AS ENUM ('shift_assigned', 'shift_updated', 'swap_request', 'swap_approved', 'reminder');

-- =============================================
-- TABLES PRINCIPALES
-- =============================================

-- Organisations (multi-tenant)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    logo_url TEXT,
    timezone VARCHAR(50) DEFAULT 'Europe/Paris',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Établissements (pour plan Business multi-sites)
CREATE TABLE establishments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    opening_hours JSONB, -- {"monday": {"open": "09:00", "close": "23:00"}, ...}
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profils utilisateurs (extension de auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    avatar_url TEXT,
    role user_role DEFAULT 'employee',
    hourly_rate DECIMAL(10,2),
    max_hours_week INTEGER DEFAULT 35,
    min_hours_week INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    preferences JSONB DEFAULT '{}', -- {"preferred_shifts": ["morning"], "unavailable_days": [0, 6]}
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Abonnements Stripe
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255) UNIQUE,
    stripe_price_id VARCHAR(255),
    plan subscription_plan NOT NULL DEFAULT 'lite',
    status subscription_status NOT NULL DEFAULT 'trialing',
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN DEFAULT false,
    employee_limit INTEGER DEFAULT 10,
    trial_ends_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Postes de travail
CREATE TABLE positions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- "Serveur", "Cuisinier", "Barman"
    color VARCHAR(7) DEFAULT '#4ADE80', -- Hex color pour le planning
    hourly_rate_default DECIMAL(10,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Compétences des employés (quels postes ils peuvent tenir)
CREATE TABLE employee_positions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    position_id UUID REFERENCES positions(id) ON DELETE CASCADE,
    proficiency_level INTEGER DEFAULT 1, -- 1-5
    UNIQUE(profile_id, position_id)
);

-- Shifts
CREATE TABLE shifts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    position_id UUID REFERENCES positions(id) ON DELETE SET NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    break_duration INTEGER DEFAULT 0, -- en minutes
    status shift_status DEFAULT 'draft',
    notes TEXT,
    is_recurring BOOLEAN DEFAULT false,
    recurring_pattern JSONB, -- {"frequency": "weekly", "days": [1,2,3,4,5]}
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Templates de planning (semaines types)
CREATE TABLE schedule_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    template_data JSONB NOT NULL, -- Structure du template
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Demandes d'échange de shifts
CREATE TABLE swap_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shift_id UUID REFERENCES shifts(id) ON DELETE CASCADE,
    requester_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    target_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- null = ouvert à tous
    target_shift_id UUID REFERENCES shifts(id) ON DELETE SET NULL, -- pour échange
    status swap_request_status DEFAULT 'pending',
    message TEXT,
    responded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indisponibilités
CREATE TABLE unavailabilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_time TIME, -- null = journée entière
    end_time TIME,
    reason VARCHAR(255),
    is_recurring BOOLEAN DEFAULT false,
    recurring_pattern JSONB,
    is_approved BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Time tracking (pointage)
CREATE TABLE time_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shift_id UUID REFERENCES shifts(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    clock_in TIMESTAMPTZ,
    clock_out TIMESTAMPTZ,
    clock_in_location JSONB, -- {"lat": 48.8566, "lng": 2.3522}
    clock_out_location JSONB,
    break_start TIMESTAMPTZ,
    break_end TIMESTAMPTZ,
    total_hours DECIMAL(5,2),
    is_validated BOOLEAN DEFAULT false,
    validated_by UUID REFERENCES profiles(id),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    data JSONB, -- données contextuelles
    is_read BOOLEAN DEFAULT false,
    sent_via JSONB DEFAULT '[]', -- ["push", "sms", "email"]
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Logs d'activité (audit)
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_shifts_org_date ON shifts(organization_id, date);
CREATE INDEX idx_shifts_profile ON shifts(profile_id);
CREATE INDEX idx_shifts_status ON shifts(status);
CREATE INDEX idx_profiles_org ON profiles(organization_id);
CREATE INDEX idx_time_entries_shift ON time_entries(shift_id);
CREATE INDEX idx_notifications_profile ON notifications(profile_id, is_read);
CREATE INDEX idx_unavailabilities_profile_dates ON unavailabilities(profile_id, start_date, end_date);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE establishments ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE swap_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE unavailabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Policies pour organizations
CREATE POLICY "Users can view their organization" ON organizations
    FOR SELECT USING (
        id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY "Owners can update their organization" ON organizations
    FOR UPDATE USING (
        id IN (SELECT organization_id FROM profiles WHERE id = auth.uid() AND role = 'owner')
    );

-- Policies pour profiles
CREATE POLICY "Users can view profiles in their organization" ON profiles
    FOR SELECT USING (
        organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT
    WITH CHECK (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Managers can update employee profiles" ON profiles
    FOR UPDATE USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('owner', 'manager')
        )
    );

-- Policies pour shifts
CREATE POLICY "Users can view shifts in their organization" ON shifts
    FOR SELECT USING (
        organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY "Managers can manage shifts" ON shifts
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('owner', 'manager')
        )
    );

-- Policies pour notifications
CREATE POLICY "Users can view their notifications" ON notifications
    FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY "Users can update their notifications" ON notifications
    FOR UPDATE USING (profile_id = auth.uid());

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_shifts_updated_at BEFORE UPDATE ON shifts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Fonction pour créer un profil automatiquement après inscription
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', NULL),
        COALESCE(NEW.raw_user_meta_data->>'last_name', NULL),
        'owner' -- Premier utilisateur = owner
    );
    RETURN NEW;
EXCEPTION
    WHEN others THEN
        -- Log l'erreur mais ne bloque pas la création de l'utilisateur
        RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Fonction pour calculer les heures totales d'un time_entry
CREATE OR REPLACE FUNCTION calculate_total_hours()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.clock_out IS NOT NULL AND NEW.clock_in IS NOT NULL THEN
        NEW.total_hours = EXTRACT(EPOCH FROM (NEW.clock_out - NEW.clock_in)) / 3600;
        IF NEW.break_end IS NOT NULL AND NEW.break_start IS NOT NULL THEN
            NEW.total_hours = NEW.total_hours - (EXTRACT(EPOCH FROM (NEW.break_end - NEW.break_start)) / 3600);
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_time_entry_hours
    BEFORE INSERT OR UPDATE ON time_entries
    FOR EACH ROW EXECUTE FUNCTION calculate_total_hours();

-- Fonction pour vérifier les limites du plan
CREATE OR REPLACE FUNCTION check_employee_limit()
RETURNS TRIGGER AS $$
DECLARE
    current_count INTEGER;
    max_limit INTEGER;
BEGIN
    SELECT COUNT(*) INTO current_count
    FROM profiles
    WHERE organization_id = NEW.organization_id AND is_active = true;
    
    SELECT employee_limit INTO max_limit
    FROM subscriptions
    WHERE organization_id = NEW.organization_id AND status = 'active';
    
    IF current_count >= COALESCE(max_limit, 10) THEN
        RAISE EXCEPTION 'Employee limit reached for current subscription plan';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_employee_limit
    BEFORE INSERT ON profiles
    FOR EACH ROW
    WHEN (NEW.organization_id IS NOT NULL)
    EXECUTE FUNCTION check_employee_limit();

