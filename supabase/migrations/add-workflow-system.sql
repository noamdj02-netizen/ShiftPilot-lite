-- Workflow System for Planning Validation

-- 1. Add status field to schedules (if not exists)
-- Assuming we have a schedules table or we track by week
-- For now, we'll add status to shifts and create a schedule_weeks table

CREATE TABLE IF NOT EXISTS schedule_weeks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
    week_start DATE NOT NULL,
    week_end DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'draft', -- draft, reviewing, validated, published, archived
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    validated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    validated_at TIMESTAMPTZ,
    published_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ,
    UNIQUE(organization_id, establishment_id, week_start)
);

-- 2. Create schedule_approvals table
CREATE TABLE IF NOT EXISTS schedule_approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    schedule_week_id UUID REFERENCES schedule_weeks(id) ON DELETE CASCADE,
    approver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL, -- approved, rejected, pending
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(schedule_week_id, approver_id)
);

-- 3. Add status to shifts (if not exists)
ALTER TABLE shifts 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'draft';

-- 4. RLS Policies
ALTER TABLE schedule_weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_approvals ENABLE ROW LEVEL SECURITY;

-- Schedule weeks: View in your organization
CREATE POLICY "Users can view schedule weeks in their org" ON schedule_weeks
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can create schedule weeks" ON schedule_weeks
    FOR INSERT WITH CHECK (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Managers can update schedule weeks" ON schedule_weeks
    FOR UPDATE USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('owner', 'manager')
        )
    );

-- Schedule approvals: View in your organization
CREATE POLICY "Users can view approvals in their org" ON schedule_approvals
    FOR SELECT USING (
        schedule_week_id IN (
            SELECT id FROM schedule_weeks WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

CREATE POLICY "Approvers can create approvals" ON schedule_approvals
    FOR INSERT WITH CHECK (
        approver_id = auth.uid() AND
        schedule_week_id IN (
            SELECT id FROM schedule_weeks WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

-- 5. Indexes
CREATE INDEX idx_schedule_weeks_org_week ON schedule_weeks(organization_id, week_start);
CREATE INDEX idx_schedule_weeks_status ON schedule_weeks(status);
CREATE INDEX idx_schedule_approvals_schedule ON schedule_approvals(schedule_week_id);

-- 6. Function to transition schedule status
CREATE OR REPLACE FUNCTION transition_schedule_status(
    p_schedule_week_id UUID,
    p_new_status VARCHAR,
    p_user_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    v_current_status VARCHAR;
    v_org_id UUID;
BEGIN
    -- Get current status and org
    SELECT status, organization_id INTO v_current_status, v_org_id
    FROM schedule_weeks
    WHERE id = p_schedule_week_id;
    
    IF NOT FOUND THEN
        RETURN false;
    END IF;
    
    -- Validate transition
    IF v_current_status = 'draft' AND p_new_status = 'reviewing' THEN
        UPDATE schedule_weeks 
        SET status = 'reviewing', updated_at = NOW()
        WHERE id = p_schedule_week_id;
        RETURN true;
    ELSIF v_current_status = 'reviewing' AND p_new_status = 'validated' THEN
        UPDATE schedule_weeks 
        SET status = 'validated', validated_by = p_user_id, validated_at = NOW(), updated_at = NOW()
        WHERE id = p_schedule_week_id;
        RETURN true;
    ELSIF v_current_status = 'validated' AND p_new_status = 'published' THEN
        UPDATE schedule_weeks 
        SET status = 'published', published_by = p_user_id, published_at = NOW(), updated_at = NOW()
        WHERE id = p_schedule_week_id;
        RETURN true;
    ELSIF p_new_status = 'archived' THEN
        UPDATE schedule_weeks 
        SET status = 'archived', updated_at = NOW()
        WHERE id = p_schedule_week_id;
        RETURN true;
    END IF;
    
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

