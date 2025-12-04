-- =============================================
-- CORRECTION IMMÉDIATE - Ajouter schedule_id
-- =============================================
-- Copier ce fichier et l'exécuter dans Supabase SQL Editor
-- =============================================

-- Vérifier que la table shifts existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'shifts'
    ) THEN
        RAISE EXCEPTION 'La table shifts n''existe pas. Veuillez d''abord appliquer la migration 001_complete_schema.sql';
    END IF;
END $$;

-- Vérifier que la table schedules existe (nécessaire pour la référence)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'schedules'
    ) THEN
        RAISE EXCEPTION 'La table schedules n''existe pas. Veuillez d''abord appliquer la migration 001_complete_schema.sql';
    END IF;
END $$;

-- Ajouter la colonne schedule_id si elle n'existe pas
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'schedule_id'
    ) THEN
        ALTER TABLE shifts ADD COLUMN schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE;
        CREATE INDEX IF NOT EXISTS idx_shifts_schedule ON shifts(schedule_id);
        RAISE NOTICE '✅ Colonne schedule_id ajoutée avec succès';
    ELSE
        RAISE NOTICE 'ℹ️ Colonne schedule_id existe déjà';
    END IF;
END $$;

-- Vérification finale
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'shifts' AND column_name = 'schedule_id'
        ) THEN '✅ Colonne schedule_id existe'
        ELSE '❌ Colonne schedule_id manquante'
    END as status;

