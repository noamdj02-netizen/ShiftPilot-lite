-- Table FAQ Chatbot
CREATE TABLE IF NOT EXISTS chatbot_faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    keywords TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table Messages Chatbot
CREATE TABLE IF NOT EXISTS chatbot_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    platform VARCHAR(50) DEFAULT 'website',
    customer_message TEXT,
    bot_response TEXT,
    is_auto BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_chatbot_faqs_org ON chatbot_faqs(organization_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_messages_org ON chatbot_messages(organization_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_messages_created ON chatbot_messages(created_at);

-- RLS Policies
ALTER TABLE chatbot_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_messages ENABLE ROW LEVEL SECURITY;

-- Policies pour chatbot_faqs
DROP POLICY IF EXISTS "Users can manage their organization FAQ" ON chatbot_faqs;
CREATE POLICY "Users can manage their organization FAQ"
    ON chatbot_faqs FOR ALL
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

-- Policies pour chatbot_messages
DROP POLICY IF EXISTS "Users can view their organization messages" ON chatbot_messages;
CREATE POLICY "Users can view their organization messages"
    ON chatbot_messages FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

-- Trigger pour updated_at
CREATE OR REPLACE FUNCTION update_chatbot_faqs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_chatbot_faqs_updated_at ON chatbot_faqs;
CREATE TRIGGER trigger_chatbot_faqs_updated_at
    BEFORE UPDATE ON chatbot_faqs
    FOR EACH ROW
    EXECUTE FUNCTION update_chatbot_faqs_updated_at();

