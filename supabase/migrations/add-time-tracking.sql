-- Time Tracking System (Pointeuse Mobile)

-- 1. Enhance time_entries table (if exists) or create it
CREATE TABLE IF NOT EXISTS time_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    shift_id UUID REFERENCES shifts(id) ON DELETE SET NULL,
    check_in TIMESTAMPTZ NOT NULL,
    check_out TIMESTAMPTZ,
    check_in_latitude DECIMAL(10, 8),
    check_in_longitude DECIMAL(11, 8),
    check_out_latitude DECIMAL(10, 8),
    check_out_longitude DECIMAL(11, 8),
    hours_worked DECIMAL(5, 2), -- Calculated
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    approved_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create time_entry_anomalies table
CREATE TABLE IF NOT EXISTS time_entry_anomalies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    time_entry_id UUID REFERENCES time_entries(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'late_checkin', 'early_checkout', 'location_mismatch', 'hours_mismatch'
    severity VARCHAR(20) DEFAULT 'warning', -- 'info', 'warning', 'error'
    message TEXT,
    details JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RLS Policies
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entry_anomalies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own time entries" ON time_entries
    FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY "Users can create own time entries" ON time_entries
    FOR INSERT WITH CHECK (profile_id = auth.uid());

CREATE POLICY "Users can update own time entries" ON time_entries
    FOR UPDATE USING (profile_id = auth.uid() AND check_out IS NULL);

CREATE POLICY "Managers can view employee time entries" ON time_entries
    FOR SELECT USING (
        profile_id IN (
            SELECT id FROM profiles WHERE organization_id IN (
                SELECT organization_id FROM profiles 
                WHERE id = auth.uid() AND role IN ('owner', 'manager', 'rh')
            )
        )
    );

CREATE POLICY "Managers can approve time entries" ON time_entries
    FOR UPDATE USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('owner', 'manager', 'rh')
        )
    );

CREATE POLICY "Users can view own anomalies" ON time_entry_anomalies
    FOR SELECT USING (
        time_entry_id IN (
            SELECT id FROM time_entries WHERE profile_id = auth.uid()
        )
    );

-- 4. Indexes
CREATE INDEX idx_time_entries_profile_date ON time_entries(profile_id, check_in DESC);
CREATE INDEX idx_time_entries_shift ON time_entries(shift_id);
CREATE INDEX idx_time_entry_anomalies_entry ON time_entry_anomalies(time_entry_id);

-- 5. Function to calculate hours and detect anomalies
CREATE OR REPLACE FUNCTION process_time_entry(p_entry_id UUID)
RETURNS VOID AS $$
DECLARE
    v_entry RECORD;
    v_hours DECIMAL(5, 2);
    v_shift RECORD;
    v_expected_hours DECIMAL(5, 2);
BEGIN
    -- Get entry
    SELECT * INTO v_entry FROM time_entries WHERE id = p_entry_id;
    
    IF v_entry.check_out IS NULL THEN
        RETURN; -- Not completed yet
    END IF;
    
    -- Calculate hours
    v_hours := EXTRACT(EPOCH FROM (v_entry.check_out - v_entry.check_in)) / 3600;
    
    -- Update hours
    UPDATE time_entries SET hours_worked = v_hours WHERE id = p_entry_id;
    
    -- Check for shift if linked
    IF v_entry.shift_id IS NOT NULL THEN
        SELECT * INTO v_shift FROM shifts WHERE id = v_entry.shift_id;
        
        IF v_shift IS NOT NULL THEN
            -- Calculate expected hours
            v_expected_hours := EXTRACT(EPOCH FROM (
                v_shift.end_time::timestamp - v_shift.start_time::timestamp
            )) / 3600;
            
            -- Detect hours mismatch
            IF ABS(v_hours - v_expected_hours) > 0.5 THEN
                INSERT INTO time_entry_anomalies (
                    time_entry_id,
                    type,
                    severity,
                    message,
                    details
                ) VALUES (
                    p_entry_id,
                    'hours_mismatch',
                    CASE WHEN ABS(v_hours - v_expected_hours) > 2 THEN 'error' ELSE 'warning' END,
                    format('Heures réelles: %s, attendues: %s', v_hours, v_expected_hours),
                    jsonb_build_object('actual', v_hours, 'expected', v_expected_hours, 'difference', v_hours - v_expected_hours)
                );
            END IF;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger to process on check_out
CREATE OR REPLACE FUNCTION trigger_process_time_entry()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.check_out IS NOT NULL AND (OLD.check_out IS NULL OR OLD.check_out IS DISTINCT FROM NEW.check_out) THEN
        PERFORM process_time_entry(NEW.id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER time_entry_process
    AFTER UPDATE ON time_entries
    FOR EACH ROW
    WHEN (NEW.check_out IS NOT NULL)
    EXECUTE FUNCTION trigger_process_time_entry();

