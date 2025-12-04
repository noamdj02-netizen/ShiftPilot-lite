-- =============================================
-- CORRECTION IMMÉDIATE - Ajouter schedule_id à shifts
-- =============================================
-- Exécuter ce script dans Supabase SQL Editor
-- =============================================

-- Vérifier et ajouter schedule_id si manquante
DO $$ 
BEGIN
    -- Vérifier que la table shifts existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'shifts'
    ) THEN
        RAISE EXCEPTION 'La table shifts n''existe pas. Appliquez d''abord la migration 001_complete_schema.sql';
    END IF;
    
    -- Vérifier que la table schedules existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'schedules'
    ) THEN
        RAISE EXCEPTION 'La table schedules n''existe pas. Appliquez d''abord la migration 001_complete_schema.sql';
    END IF;
    
    -- Ajouter schedule_id si elle n'existe pas
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

-- Vérification
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'shifts' AND column_name = 'schedule_id'
        ) THEN '✅ SUCCÈS : schedule_id existe maintenant'
        ELSE '❌ ERREUR : schedule_id n''existe toujours pas'
    END as resultat;

