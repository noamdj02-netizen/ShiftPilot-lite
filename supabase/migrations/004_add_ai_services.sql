-- Migration: Add AI Services tables (PilotBot, PilotReview, PilotSMS)
-- This migration adds tables for chatbot, reviews, and SMS functionality

-- =============================================
-- PILOTBOT - Chatbot IA Tables
-- =============================================

-- FAQ entries for chatbot training
CREATE TABLE IF NOT EXISTS chatbot_faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100), -- "horaires", "menu", "reservation", "general"
    priority INTEGER DEFAULT 0, -- Higher priority = shown first
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chatbot conversations history
CREATE TABLE IF NOT EXISTS chatbot_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    channel VARCHAR(50) NOT NULL, -- "instagram", "facebook", "website", "whatsapp"
    customer_id VARCHAR(255), -- External customer identifier
    customer_name VARCHAR(255),
    customer_phone VARCHAR(20),
    customer_email VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active', -- "active", "resolved", "escalated"
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chatbot messages
CREATE TABLE IF NOT EXISTS chatbot_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES chatbot_conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL, -- "user", "assistant", "system"
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}', -- Additional context
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PILOTREVIEW - Google Reviews Tables
-- =============================================

-- Review requests sent to customers
CREATE TABLE IF NOT EXISTS review_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    establishment_id UUID REFERENCES establishments(id) ON DELETE SET NULL,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20),
    visit_date DATE,
    channel VARCHAR(50) NOT NULL, -- "sms", "email"
    message_template TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- "pending", "sent", "delivered", "failed"
    sent_at TIMESTAMPTZ,
    reviewed_at TIMESTAMPTZ, -- When customer actually left a review
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Google Reviews (synced from Google Business API)
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    establishment_id UUID REFERENCES establishments(id) ON DELETE SET NULL,
    google_review_id VARCHAR(255) UNIQUE, -- External ID from Google
    customer_name VARCHAR(255),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_date TIMESTAMPTZ,
    response_text TEXT, -- Owner's response
    response_date TIMESTAMPTZ,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PILOTSMS - SMS Management Tables
-- =============================================

-- SMS messages sent to employees
CREATE TABLE IF NOT EXISTS sms_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    phone_number VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- "planning_published", "shift_reminder", "absence_alert", "custom"
    status VARCHAR(50) DEFAULT 'pending', -- "pending", "sent", "delivered", "failed"
    twilio_sid VARCHAR(255), -- Twilio message SID
    error_message TEXT,
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SMS templates
CREATE TABLE IF NOT EXISTS sms_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- "planning_published", "shift_reminder", etc.
    template TEXT NOT NULL, -- Can include variables like {{employee_name}}, {{shift_date}}
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX IF NOT EXISTS idx_chatbot_faqs_org ON chatbot_faqs(organization_id, is_active);
CREATE INDEX IF NOT EXISTS idx_chatbot_conversations_org ON chatbot_conversations(organization_id, status);
CREATE INDEX IF NOT EXISTS idx_chatbot_messages_conversation ON chatbot_messages(conversation_id, created_at);
CREATE INDEX IF NOT EXISTS idx_review_requests_org ON review_requests(organization_id, status);
CREATE INDEX IF NOT EXISTS idx_reviews_org ON reviews(organization_id, review_date);
CREATE INDEX IF NOT EXISTS idx_sms_messages_org ON sms_messages(organization_id, created_at);
CREATE INDEX IF NOT EXISTS idx_sms_messages_profile ON sms_messages(profile_id);
CREATE INDEX IF NOT EXISTS idx_sms_templates_org ON sms_templates(organization_id, type);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE chatbot_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chatbot_faqs
CREATE POLICY "Users can view their organization's chatbot FAQs"
    ON chatbot_faqs FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can manage their organization's chatbot FAQs"
    ON chatbot_faqs FOR ALL
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager')
        )
    );

-- RLS Policies for chatbot_conversations
CREATE POLICY "Users can view their organization's conversations"
    ON chatbot_conversations FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can manage their organization's conversations"
    ON chatbot_conversations FOR ALL
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager')
        )
    );

-- RLS Policies for chatbot_messages
CREATE POLICY "Users can view messages from their organization's conversations"
    ON chatbot_messages FOR SELECT
    USING (
        conversation_id IN (
            SELECT id FROM chatbot_conversations
            WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

-- RLS Policies for review_requests
CREATE POLICY "Users can view their organization's review requests"
    ON review_requests FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can manage their organization's review requests"
    ON review_requests FOR ALL
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager')
        )
    );

-- RLS Policies for reviews
CREATE POLICY "Users can view their organization's reviews"
    ON reviews FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can manage their organization's reviews"
    ON reviews FOR ALL
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager')
        )
    );

-- RLS Policies for sms_messages
CREATE POLICY "Users can view their organization's SMS messages"
    ON sms_messages FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
        OR profile_id = auth.uid()
    );

CREATE POLICY "Users can create SMS messages for their organization"
    ON sms_messages FOR INSERT
    WITH CHECK (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager')
        )
    );

-- RLS Policies for sms_templates
CREATE POLICY "Users can view their organization's SMS templates"
    ON sms_templates FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can manage their organization's SMS templates"
    ON sms_templates FOR ALL
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid() AND role IN ('owner', 'manager')
        )
    );

-- =============================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_chatbot_faqs_updated_at BEFORE UPDATE ON chatbot_faqs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chatbot_conversations_updated_at BEFORE UPDATE ON chatbot_conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sms_templates_updated_at BEFORE UPDATE ON sms_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

