-- Advanced Availability System

-- 1. Create employee_availabilities table
CREATE TABLE IF NOT EXISTS employee_availabilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL, -- 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    start_time TIME,
    end_time TIME,
    is_available BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 0, -- Higher = more preferred
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, day_of_week, start_time, end_time)
);

-- 2. Create availability_preferences table
CREATE TABLE IF NOT EXISTS availability_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    position_id UUID REFERENCES positions(id) ON DELETE SET NULL,
    preference_level INTEGER DEFAULT 50, -- 0-100, higher = more preferred
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, position_id)
);

-- 3. Create availability_exceptions table (one-off unavailability)
CREATE TABLE IF NOT EXISTS availability_exceptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    reason TEXT,
    is_unavailable BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, date, start_time, end_time)
);

-- 4. RLS Policies
ALTER TABLE employee_availabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_exceptions ENABLE ROW LEVEL SECURITY;

-- Users can view/manage their own availability
CREATE POLICY "Users can manage own availability" ON employee_availabilities
    FOR ALL USING (profile_id = auth.uid());

CREATE POLICY "Managers can view employee availability" ON employee_availabilities
    FOR SELECT USING (
        profile_id IN (
            SELECT id FROM profiles WHERE organization_id IN (
                SELECT organization_id FROM profiles 
                WHERE id = auth.uid() AND role IN ('owner', 'manager', 'rh')
            )
        )
    );

-- Same for preferences
CREATE POLICY "Users can manage own preferences" ON availability_preferences
    FOR ALL USING (profile_id = auth.uid());

CREATE POLICY "Managers can view employee preferences" ON availability_preferences
    FOR SELECT USING (
        profile_id IN (
            SELECT id FROM profiles WHERE organization_id IN (
                SELECT organization_id FROM profiles 
                WHERE id = auth.uid() AND role IN ('owner', 'manager', 'rh')
            )
        )
    );

-- Same for exceptions
CREATE POLICY "Users can manage own exceptions" ON availability_exceptions
    FOR ALL USING (profile_id = auth.uid());

CREATE POLICY "Managers can view employee exceptions" ON availability_exceptions
    FOR SELECT USING (
        profile_id IN (
            SELECT id FROM profiles WHERE organization_id IN (
                SELECT organization_id FROM profiles 
                WHERE id = auth.uid() AND role IN ('owner', 'manager', 'rh')
            )
        )
    );

-- 5. Indexes
CREATE INDEX idx_availabilities_profile_day ON employee_availabilities(profile_id, day_of_week);
CREATE INDEX idx_availability_exceptions_profile_date ON availability_exceptions(profile_id, date);

