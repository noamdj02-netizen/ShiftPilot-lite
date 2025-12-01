-- Enhance AI Planning with Compliance

-- 1. Add compliance fields to shifts
ALTER TABLE shifts 
ADD COLUMN IF NOT EXISTS compliance_score INTEGER,
ADD COLUMN IF NOT EXISTS compliance_violations JSONB DEFAULT '[]';

-- 2. Create schedule_compliance table
CREATE TABLE IF NOT EXISTS schedule_compliance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    schedule_id UUID, -- Reference to schedule/week
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    compliance_score INTEGER NOT NULL, -- 0-100
    violations JSONB DEFAULT '[]',
    warnings JSONB DEFAULT '[]',
    checked_at TIMESTAMPTZ DEFAULT NOW(),
    checked_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    UNIQUE(schedule_id, organization_id)
);

-- 3. RLS Policy
ALTER TABLE schedule_compliance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view compliance in their org" ON schedule_compliance
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

-- 4. Index
CREATE INDEX idx_schedule_compliance_schedule ON schedule_compliance(schedule_id);
CREATE INDEX idx_schedule_compliance_org ON schedule_compliance(organization_id);

