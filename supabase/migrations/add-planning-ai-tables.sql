-- Add Planning AI tables and modifications

-- 1. Modify establishments table
ALTER TABLE establishments 
ADD COLUMN IF NOT EXISTS default_min_staff_midi INTEGER DEFAULT 2,
ADD COLUMN IF NOT EXISTS default_max_staff_midi INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS default_min_staff_soir INTEGER DEFAULT 3,
ADD COLUMN IF NOT EXISTS default_max_staff_soir INTEGER DEFAULT 7,
ADD COLUMN IF NOT EXISTS city VARCHAR(100),
ADD COLUMN IF NOT EXISTS country VARCHAR(100) DEFAULT 'FR',
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);

-- 2. Create shift_templates table (replaces/extends schedule_templates if needed, but we'll keep separate for now or use this one)
-- If schedule_templates exists and is used, we might want to migrate data, but for now let's ensure we have what we need.
-- The plan mentions "remplace/étend schedule_templates existant". Let's check if we can just alter schedule_templates or create a new one.
-- Existing schedule_templates has template_data JSONB. Let's create a more structured table for AI planning if needed, or just use a new one.
-- Plan says: "ShiftTemplate" table. Let's create 'shift_templates' table.

CREATE TABLE IF NOT EXISTS shift_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL, -- "Service Midi", "Service Soir"
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    min_staff INTEGER DEFAULT 1,
    max_staff INTEGER DEFAULT 10,
    required_roles JSONB DEFAULT '{}', -- {"serveur": 2, "cuisinier": 1}
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create employee_constraints table
CREATE TYPE constraint_type AS ENUM ('NO_NIGHT', 'NO_MORNING', 'NO_DOUBLE_SHIFT', 'MAX_DAYS_ROW', 'SPECIFIC_OFF');

CREATE TABLE IF NOT EXISTS employee_constraints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type constraint_type NOT NULL,
    value JSONB, -- extra data if needed
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create weather_forecasts table
CREATE TABLE IF NOT EXISTS weather_forecasts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    weather_code INTEGER, -- OpenWeatherMap condition code
    temperature_min DECIMAL(4, 1),
    temperature_max DECIMAL(4, 1),
    rain_probability INTEGER, -- 0-100
    wind_speed DECIMAL(5, 2), -- km/h
    is_terrasse_friendly BOOLEAN DEFAULT false,
    traffic_level_estimate VARCHAR(20) CHECK (traffic_level_estimate IN ('LOW', 'MEDIUM', 'HIGH')),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(establishment_id, date)
);

-- 5. Create time_off_requests table (extends/replaces unavailabilities or dedicated for specific time off logic)
-- The plan says "time_off_requests".
CREATE TYPE time_off_reason AS ENUM ('CONGES', 'MALADIE', 'SANS_SOLDE', 'RECUPERATION', 'AUTRE');
CREATE TYPE time_off_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

CREATE TABLE IF NOT EXISTS time_off_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason time_off_reason DEFAULT 'AUTRE',
    description TEXT,
    status time_off_status DEFAULT 'PENDING',
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Modify profiles table
-- Plan says: contract_type, contract_hours_per_week, skills
-- We need to check if types already exist or create them.
DO $$ BEGIN
    CREATE TYPE contract_type AS ENUM ('CDI', 'CDD', 'EXTRA', 'TEMPS_PARTIEL', 'STAGIAIRE', 'APPRENTI');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS contract_type contract_type DEFAULT 'CDI',
ADD COLUMN IF NOT EXISTS contract_hours_per_week DECIMAL(4, 1),
ADD COLUMN IF NOT EXISTS skills JSONB DEFAULT '[]'; -- ["terrasse", "bar", "caisse"]

-- 7. RLS Policies

-- Enable RLS on new tables
ALTER TABLE shift_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_constraints ENABLE ROW LEVEL SECURITY;
ALTER TABLE weather_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_off_requests ENABLE ROW LEVEL SECURITY;

-- Policies for shift_templates
CREATE POLICY "Users can view shift_templates in their organization" ON shift_templates
    FOR SELECT USING (
        organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY "Managers can manage shift_templates" ON shift_templates
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('owner', 'manager')
        )
    );

-- Policies for employee_constraints
CREATE POLICY "Users can view constraints in their organization" ON employee_constraints
    FOR SELECT USING (
        profile_id IN (
            SELECT id FROM profiles WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

CREATE POLICY "Managers can manage constraints" ON employee_constraints
    FOR ALL USING (
        profile_id IN (
            SELECT id FROM profiles WHERE organization_id IN (
                SELECT organization_id FROM profiles 
                WHERE id = auth.uid() AND role IN ('owner', 'manager')
            )
        )
    );

-- Policies for weather_forecasts
CREATE POLICY "Users can view weather_forecasts" ON weather_forecasts
    FOR SELECT USING (
        establishment_id IN (
            SELECT id FROM establishments WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

CREATE POLICY "System/Managers can update weather" ON weather_forecasts
    FOR ALL USING (
        establishment_id IN (
            SELECT id FROM establishments WHERE organization_id IN (
                SELECT organization_id FROM profiles 
                WHERE id = auth.uid() AND role IN ('owner', 'manager')
            )
        )
    );

-- Policies for time_off_requests
CREATE POLICY "Users can view their own time off or managers view all" ON time_off_requests
    FOR SELECT USING (
        profile_id = auth.uid() OR 
        profile_id IN (
            SELECT id FROM profiles WHERE organization_id IN (
                SELECT organization_id FROM profiles 
                WHERE id = auth.uid() AND role IN ('owner', 'manager')
            )
        )
    );

CREATE POLICY "Users can create time off requests" ON time_off_requests
    FOR INSERT WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Managers can update time off requests" ON time_off_requests
    FOR UPDATE USING (
        profile_id IN (
            SELECT id FROM profiles WHERE organization_id IN (
                SELECT organization_id FROM profiles 
                WHERE id = auth.uid() AND role IN ('owner', 'manager')
            )
        )
    );

