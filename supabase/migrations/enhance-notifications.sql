-- Enhance Notification System

-- 1. Enhance notifications table (if exists, add fields)
-- Assuming notifications table exists, enhance it
ALTER TABLE notifications
ADD COLUMN IF NOT EXISTS type VARCHAR(50) DEFAULT 'info', -- 'info', 'warning', 'error', 'success'
ADD COLUMN IF NOT EXISTS category VARCHAR(50), -- 'schedule', 'timeoff', 'message', 'system'
ADD COLUMN IF NOT EXISTS action_url TEXT, -- URL to navigate when clicked
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS read_at TIMESTAMPTZ;

-- 2. Create notification_preferences table
CREATE TABLE IF NOT EXISTS notification_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    email_enabled BOOLEAN DEFAULT true,
    push_enabled BOOLEAN DEFAULT true,
    in_app_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, category)
);

-- 3. Create notification_templates table
CREATE TABLE IF NOT EXISTS notification_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL, -- 'schedule_published', 'timeoff_approved', etc.
    subject TEXT,
    body_text TEXT,
    body_html TEXT,
    category VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Insert default notification templates
INSERT INTO notification_templates (name, subject, body_text, category) VALUES
    ('schedule_published', 'Nouveau planning disponible', 'Votre planning de la semaine est maintenant disponible.', 'schedule'),
    ('timeoff_approved', 'Demande de congé approuvée', 'Votre demande de congé a été approuvée.', 'timeoff'),
    ('timeoff_rejected', 'Demande de congé refusée', 'Votre demande de congé a été refusée.', 'timeoff'),
    ('shift_assigned', 'Nouveau shift assigné', 'Un nouveau shift vous a été assigné.', 'schedule'),
    ('shift_updated', 'Shift modifié', 'Un de vos shifts a été modifié.', 'schedule'),
    ('message_received', 'Nouveau message', 'Vous avez reçu un nouveau message.', 'message'),
    ('timeoff_request_pending', 'Nouvelle demande de congé', 'Une nouvelle demande de congé nécessite votre attention.', 'timeoff')
ON CONFLICT (name) DO NOTHING;

-- 5. RLS Policies
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own preferences" ON notification_preferences
    FOR ALL USING (profile_id = auth.uid());

CREATE POLICY "Templates are viewable by all" ON notification_templates
    FOR SELECT USING (true);

-- 6. Indexes
CREATE INDEX idx_notifications_profile_read ON notifications(profile_id, read_at);
CREATE INDEX idx_notifications_category ON notifications(category);
CREATE INDEX idx_notification_preferences_profile ON notification_preferences(profile_id);

