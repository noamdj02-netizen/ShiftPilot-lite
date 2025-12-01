-- Enhance Multi-Establishments System

-- 1. Enhance establishments table
ALTER TABLE establishments 
ADD COLUMN IF NOT EXISTS settings JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS metrics JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS manager_id UUID REFERENCES profiles(id) ON DELETE SET NULL;

-- 2. Create user_establishments table (many-to-many)
CREATE TABLE IF NOT EXISTS user_establishments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    assigned_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    UNIQUE(user_id, establishment_id)
);

-- 3. Create establishment_metrics table
CREATE TABLE IF NOT EXISTS establishment_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    total_hours DECIMAL(10, 2),
    total_cost DECIMAL(10, 2),
    employee_count INTEGER,
    shift_count INTEGER,
    revenue DECIMAL(10, 2), -- Optional: if integrated with POS
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(establishment_id, date)
);

-- 4. RLS Policies
ALTER TABLE user_establishments ENABLE ROW LEVEL SECURITY;
ALTER TABLE establishment_metrics ENABLE ROW LEVEL SECURITY;

-- User establishments: View if in your organization
CREATE POLICY "Users can view user_establishments in their org" ON user_establishments
    FOR SELECT USING (
        establishment_id IN (
            SELECT id FROM establishments WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        ) OR user_id = auth.uid()
    );

CREATE POLICY "Admins can manage user_establishments" ON user_establishments
    FOR ALL USING (
        establishment_id IN (
            SELECT id FROM establishments WHERE organization_id IN (
                SELECT organization_id FROM profiles 
                WHERE id = auth.uid() AND role = 'owner'
            )
        )
    );

-- Establishment metrics: View if in your organization
CREATE POLICY "Users can view metrics in their org" ON establishment_metrics
    FOR SELECT USING (
        establishment_id IN (
            SELECT id FROM establishments WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

CREATE POLICY "System can insert metrics" ON establishment_metrics
    FOR INSERT WITH CHECK (true); -- System-generated, RLS on establishment handles access

-- 5. Indexes
CREATE INDEX idx_user_establishments_user ON user_establishments(user_id);
CREATE INDEX idx_user_establishments_establishment ON user_establishments(establishment_id);
CREATE INDEX idx_establishment_metrics_est_date ON establishment_metrics(establishment_id, date);

-- 6. Function to get user's establishments
CREATE OR REPLACE FUNCTION get_user_establishments(p_user_id UUID)
RETURNS TABLE (
    establishment_id UUID,
    establishment_name VARCHAR,
    is_primary BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        e.id,
        e.name,
        COALESCE(ue.is_primary, false)
    FROM establishments e
    LEFT JOIN user_establishments ue ON e.id = ue.establishment_id AND ue.user_id = p_user_id
    WHERE e.organization_id IN (
        SELECT organization_id FROM profiles WHERE id = p_user_id
    )
    ORDER BY ue.is_primary DESC NULLS LAST, e.name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

