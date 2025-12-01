-- Archive System

-- 1. Create schedule_archives table
CREATE TABLE IF NOT EXISTS schedule_archives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
    week_start DATE NOT NULL,
    week_end DATE NOT NULL,
    schedule_data JSONB NOT NULL, -- Complete snapshot of schedule
    shifts_data JSONB NOT NULL, -- All shifts for the week
    metadata JSONB DEFAULT '{}', -- Additional metadata
    archived_at TIMESTAMPTZ DEFAULT NOW(),
    archived_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    UNIQUE(organization_id, establishment_id, week_start)
);

-- 2. Create archive_comparisons table (for comparing weeks)
CREATE TABLE IF NOT EXISTS archive_comparisons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    week1_archive_id UUID REFERENCES schedule_archives(id) ON DELETE CASCADE,
    week2_archive_id UUID REFERENCES schedule_archives(id) ON DELETE CASCADE,
    comparison_data JSONB NOT NULL, -- Differences, stats, etc.
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL
);

-- 3. RLS Policies
ALTER TABLE schedule_archives ENABLE ROW LEVEL SECURITY;
ALTER TABLE archive_comparisons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view archives in their org" ON schedule_archives
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "System can create archives" ON schedule_archives
    FOR INSERT WITH CHECK (true); -- System-generated

CREATE POLICY "Users can view comparisons in their org" ON archive_comparisons
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

-- 4. Indexes
CREATE INDEX idx_schedule_archives_org_week ON schedule_archives(organization_id, week_start DESC);
CREATE INDEX idx_schedule_archives_est ON schedule_archives(establishment_id);

-- 5. Function to archive a schedule
CREATE OR REPLACE FUNCTION archive_schedule_week(
    p_organization_id UUID,
    p_establishment_id UUID,
    p_week_start DATE,
    p_week_end DATE,
    p_user_id UUID
)
RETURNS UUID AS $$
DECLARE
    v_archive_id UUID;
    v_shifts JSONB;
    v_schedule JSONB;
BEGIN
    -- Fetch all shifts for the week
    SELECT jsonb_agg(row_to_json(s)) INTO v_shifts
    FROM shifts s
    WHERE s.organization_id = p_organization_id
      AND s.establishment_id = p_establishment_id
      AND s.date BETWEEN p_week_start AND p_week_end;

    -- Create schedule metadata
    SELECT jsonb_build_object(
        'week_start', p_week_start,
        'week_end', p_week_end,
        'total_shifts', jsonb_array_length(COALESCE(v_shifts, '[]'::jsonb)),
        'total_hours', (
            SELECT COALESCE(SUM(EXTRACT(EPOCH FROM (end_time::timestamp - start_time::timestamp)) / 3600), 0)
            FROM shifts
            WHERE organization_id = p_organization_id
              AND establishment_id = p_establishment_id
              AND date BETWEEN p_week_start AND p_week_end
        )
    ) INTO v_schedule;

    -- Insert archive
    INSERT INTO schedule_archives (
        organization_id,
        establishment_id,
        week_start,
        week_end,
        schedule_data,
        shifts_data,
        archived_by
    ) VALUES (
        p_organization_id,
        p_establishment_id,
        p_week_start,
        p_week_end,
        v_schedule,
        COALESCE(v_shifts, '[]'::jsonb),
        p_user_id
    )
    RETURNING id INTO v_archive_id;

    RETURN v_archive_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

