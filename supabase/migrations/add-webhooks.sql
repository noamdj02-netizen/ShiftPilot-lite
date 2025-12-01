-- Webhook System

-- 1. Create webhook_endpoints table
CREATE TABLE IF NOT EXISTS webhook_endpoints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    secret TEXT NOT NULL, -- For HMAC signature
    events TEXT[] NOT NULL, -- Array of event types
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create webhook_deliveries table (for logging)
CREATE TABLE IF NOT EXISTS webhook_deliveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    webhook_endpoint_id UUID REFERENCES webhook_endpoints(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    response_status INTEGER,
    response_body TEXT,
    attempted_at TIMESTAMPTZ DEFAULT NOW(),
    succeeded BOOLEAN DEFAULT false,
    retry_count INTEGER DEFAULT 0
);

-- 3. RLS Policies
ALTER TABLE webhook_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_deliveries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view webhooks in their org" ON webhook_endpoints
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage webhooks" ON webhook_endpoints
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role = 'owner'
        )
    );

CREATE POLICY "Users can view webhook deliveries" ON webhook_deliveries
    FOR SELECT USING (
        webhook_endpoint_id IN (
            SELECT id FROM webhook_endpoints WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

-- 4. Indexes
CREATE INDEX idx_webhook_endpoints_org ON webhook_endpoints(organization_id);
CREATE INDEX idx_webhook_deliveries_endpoint ON webhook_deliveries(webhook_endpoint_id);
CREATE INDEX idx_webhook_deliveries_event ON webhook_deliveries(event_type);

-- 5. Event types enum (for reference)
-- Events: 'planning.validated', 'planning.published', 'employee.created', 
--         'shift.updated', 'shift.completed', 'timeoff.approved', 'timeoff.rejected'

