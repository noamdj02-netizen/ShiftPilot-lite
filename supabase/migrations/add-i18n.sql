-- Multi-language System

-- 1. Add language preference to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS language VARCHAR(10) DEFAULT 'fr'; -- 'fr', 'en', 'es'

-- 2. Create translations table
CREATE TABLE IF NOT EXISTS translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(255) NOT NULL,
    language VARCHAR(10) NOT NULL,
    value TEXT NOT NULL,
    category VARCHAR(50), -- 'ui', 'email', 'notification', etc.
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(key, language)
);

-- 3. Insert default translations (French)
INSERT INTO translations (key, language, value, category) VALUES
    -- UI
    ('dashboard.title', 'fr', 'Tableau de bord', 'ui'),
    ('dashboard.overview', 'fr', 'Vue d''ensemble', 'ui'),
    ('planning.title', 'fr', 'Planning', 'ui'),
    ('employees.title', 'fr', 'Employés', 'ui'),
    ('settings.title', 'fr', 'Paramètres', 'ui'),
    
    -- Actions
    ('action.create', 'fr', 'Créer', 'ui'),
    ('action.edit', 'fr', 'Modifier', 'ui'),
    ('action.delete', 'fr', 'Supprimer', 'ui'),
    ('action.save', 'fr', 'Enregistrer', 'ui'),
    ('action.cancel', 'fr', 'Annuler', 'ui'),
    
    -- Notifications
    ('notification.schedule_published', 'fr', 'Votre planning de la semaine est maintenant disponible.', 'notification'),
    ('notification.timeoff_approved', 'fr', 'Votre demande de congé a été approuvée.', 'notification'),
    ('notification.timeoff_rejected', 'fr', 'Votre demande de congé a été refusée.', 'notification'),
    
    -- English translations
    ('dashboard.title', 'en', 'Dashboard', 'ui'),
    ('dashboard.overview', 'en', 'Overview', 'ui'),
    ('planning.title', 'en', 'Schedule', 'ui'),
    ('employees.title', 'en', 'Employees', 'ui'),
    ('settings.title', 'en', 'Settings', 'ui'),
    
    ('action.create', 'en', 'Create', 'ui'),
    ('action.edit', 'en', 'Edit', 'ui'),
    ('action.delete', 'en', 'Delete', 'ui'),
    ('action.save', 'en', 'Save', 'ui'),
    ('action.cancel', 'en', 'Cancel', 'ui'),
    
    ('notification.schedule_published', 'en', 'Your weekly schedule is now available.', 'notification'),
    ('notification.timeoff_approved', 'en', 'Your time off request has been approved.', 'notification'),
    ('notification.timeoff_rejected', 'en', 'Your time off request has been rejected.', 'notification')
ON CONFLICT (key, language) DO NOTHING;

-- 4. RLS Policy
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Translations are public" ON translations
    FOR SELECT USING (true);

-- 5. Index
CREATE INDEX idx_translations_key_lang ON translations(key, language);

-- 6. Function to get user's language
CREATE OR REPLACE FUNCTION get_user_language(p_user_id UUID)
RETURNS VARCHAR AS $$
DECLARE
    v_language VARCHAR;
BEGIN
    SELECT language INTO v_language
    FROM profiles
    WHERE id = p_user_id;
    
    RETURN COALESCE(v_language, 'fr');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

