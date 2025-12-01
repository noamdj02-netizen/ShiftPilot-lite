-- Payroll Calculator and Financial System

-- 1. Create payroll_calculations table
CREATE TABLE IF NOT EXISTS payroll_calculations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    total_hours DECIMAL(10, 2) NOT NULL,
    base_cost DECIMAL(10, 2) NOT NULL,
    overtime_hours DECIMAL(10, 2) DEFAULT 0,
    overtime_cost DECIMAL(10, 2) DEFAULT 0,
    evening_premium DECIMAL(10, 2) DEFAULT 0,
    sunday_premium DECIMAL(10, 2) DEFAULT 0,
    holiday_premium DECIMAL(10, 2) DEFAULT 0,
    total_cost DECIMAL(10, 2) NOT NULL,
    estimated_charges DECIMAL(10, 2), -- Charges patronales approximatives
    calculated_at TIMESTAMPTZ DEFAULT NOW(),
    calculated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    UNIQUE(organization_id, establishment_id, period_start, period_end)
);

-- 2. Create employee_payroll_details table
CREATE TABLE IF NOT EXISTS employee_payroll_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payroll_calculation_id UUID REFERENCES payroll_calculations(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    hours_worked DECIMAL(10, 2) NOT NULL,
    base_rate DECIMAL(10, 2) NOT NULL,
    base_cost DECIMAL(10, 2) NOT NULL,
    overtime_hours DECIMAL(10, 2) DEFAULT 0,
    overtime_cost DECIMAL(10, 2) DEFAULT 0,
    premiums DECIMAL(10, 2) DEFAULT 0,
    total_cost DECIMAL(10, 2) NOT NULL
);

-- 3. Create financial_forecasts table
CREATE TABLE IF NOT EXISTS financial_forecasts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    expected_revenue DECIMAL(10, 2),
    expected_covers INTEGER,
    expected_sales DECIMAL(10, 2),
    staffing_adjustment_factor DECIMAL(4, 2) DEFAULT 1.0, -- Multiplier for staffing needs
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(establishment_id, date)
);

-- 4. RLS Policies
ALTER TABLE payroll_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE employee_payroll_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_forecasts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view payroll in their org" ON payroll_calculations
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can view payroll details" ON employee_payroll_details
    FOR SELECT USING (
        payroll_calculation_id IN (
            SELECT id FROM payroll_calculations WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        ) OR profile_id = auth.uid()
    );

CREATE POLICY "Users can view forecasts in their org" ON financial_forecasts
    FOR SELECT USING (
        establishment_id IN (
            SELECT id FROM establishments WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

CREATE POLICY "Managers can manage forecasts" ON financial_forecasts
    FOR ALL USING (
        establishment_id IN (
            SELECT id FROM establishments WHERE organization_id IN (
                SELECT organization_id FROM profiles 
                WHERE id = auth.uid() AND role IN ('owner', 'manager')
            )
        )
    );

-- 5. Indexes
CREATE INDEX idx_payroll_calc_org_period ON payroll_calculations(organization_id, period_start, period_end);
CREATE INDEX idx_payroll_details_calc ON employee_payroll_details(payroll_calculation_id);
CREATE INDEX idx_financial_forecasts_est_date ON financial_forecasts(establishment_id, date);

