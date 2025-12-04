-- =============================================
-- Migration de consolidation et corrections
-- =============================================
-- Cette migration vérifie et corrige les problèmes potentiels
-- du schéma pour garantir la cohérence complète
-- =============================================

-- =============================================
-- Migration de consolidation et corrections
-- =============================================
-- Cette migration vérifie et corrige les problèmes potentiels
-- du schéma pour garantir la cohérence complète
-- =============================================

-- Vérifier que les tables principales existent
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'shifts'
    ) THEN
        RAISE EXCEPTION 'La table shifts n''existe pas. Veuillez d''abord appliquer la migration 001_complete_schema.sql';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'schedules'
    ) THEN
        RAISE EXCEPTION 'La table schedules n''existe pas. Veuillez d''abord appliquer la migration 001_complete_schema.sql';
    END IF;
END $$;

-- Vérifier et ajouter des colonnes manquantes si nécessaire

-- S'assurer que schedule_id existe dans shifts (devrait être créée dans 001)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'schedule_id'
    ) THEN
        ALTER TABLE shifts ADD COLUMN schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE;
        CREATE INDEX IF NOT EXISTS idx_shifts_schedule ON shifts(schedule_id);
        RAISE NOTICE 'Colonne schedule_id ajoutée à shifts';
    END IF;
END $$;

-- Ajouter organization_id aux shifts si elle n'existe pas
-- (pour permettre les requêtes directes sans passer par schedules)
DO $$ 
BEGIN
    -- Vérifier que la table shifts existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'shifts'
    ) THEN
        RAISE EXCEPTION 'La table shifts n''existe pas. Veuillez d''abord appliquer la migration 001_complete_schema.sql';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'organization_id'
    ) THEN
        ALTER TABLE shifts ADD COLUMN organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE;
        
        -- Remplir organization_id depuis schedules (si schedule_id existe)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'shifts' AND column_name = 'schedule_id'
        ) THEN
            UPDATE shifts s
            SET organization_id = sch.organization_id
            FROM schedules sch
            WHERE s.schedule_id = sch.id AND s.organization_id IS NULL;
        END IF;
        
        CREATE INDEX IF NOT EXISTS idx_shifts_org ON shifts(organization_id);
    END IF;
END $$;

-- Ajouter location_id aux shifts si elle n'existe pas
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'location_id'
    ) THEN
        ALTER TABLE shifts ADD COLUMN location_id UUID REFERENCES locations(id) ON DELETE SET NULL;
        
        -- Remplir location_id depuis schedules (si schedule_id existe)
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'shifts' AND column_name = 'schedule_id'
        ) THEN
            UPDATE shifts s
            SET location_id = sch.location_id
            FROM schedules sch
            WHERE s.schedule_id = sch.id AND s.location_id IS NULL;
        END IF;
        
        CREATE INDEX IF NOT EXISTS idx_shifts_location ON shifts(location_id);
    END IF;
END $$;

-- S'assurer que la colonne slug existe dans organizations
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'organizations' AND column_name = 'slug'
    ) THEN
        ALTER TABLE organizations ADD COLUMN slug VARCHAR(255);
        
        -- Générer des slugs pour les organisations existantes
        UPDATE organizations
        SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))
        WHERE slug IS NULL;
        
        CREATE UNIQUE INDEX IF NOT EXISTS idx_organizations_slug ON organizations(slug);
    END IF;
END $$;

-- Ajouter des colonnes utiles aux schedules si manquantes
DO $$ 
BEGIN
    -- Ajouter notes aux schedules
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'schedules' AND column_name = 'notes'
    ) THEN
        ALTER TABLE schedules ADD COLUMN notes TEXT;
    END IF;
    
    -- Ajouter published_at
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'schedules' AND column_name = 'published_at'
    ) THEN
        ALTER TABLE schedules ADD COLUMN published_at TIMESTAMPTZ;
    END IF;
END $$;

-- Améliorer les index pour les performances
CREATE INDEX IF NOT EXISTS idx_shifts_org_time ON shifts(organization_id, start_time);
CREATE INDEX IF NOT EXISTS idx_shifts_profile_time ON shifts(profile_id, start_time) WHERE profile_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_schedules_org_week_status ON schedules(organization_id, week_start_date, status);

-- S'assurer que les RLS policies pour shifts incluent organization_id
-- (vérification et correction si nécessaire)

-- Policy améliorée pour shifts avec organization_id direct
DROP POLICY IF EXISTS "users_view_org_shifts_direct" ON shifts;
CREATE POLICY "users_view_org_shifts_direct" ON shifts
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        ) OR
        schedule_id IN (
            SELECT id FROM schedules 
            WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

-- Policy pour création de shifts
DROP POLICY IF EXISTS "managers_create_shifts" ON shifts;
CREATE POLICY "managers_create_shifts" ON shifts
    FOR INSERT WITH CHECK (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('OWNER', 'MANAGER', 'HR')
        )
    );

-- Policy pour mise à jour de shifts
DROP POLICY IF EXISTS "managers_update_shifts" ON shifts;
CREATE POLICY "managers_update_shifts" ON shifts
    FOR UPDATE USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('OWNER', 'MANAGER', 'HR')
        )
    );

-- Policy pour suppression de shifts
DROP POLICY IF EXISTS "managers_delete_shifts" ON shifts;
CREATE POLICY "managers_delete_shifts" ON shifts
    FOR DELETE USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role IN ('OWNER', 'MANAGER', 'HR')
        )
    );

-- Fonction pour auto-remplir organization_id et location_id dans shifts
CREATE OR REPLACE FUNCTION sync_shift_org_location()
RETURNS TRIGGER AS $$
BEGIN
    -- Si schedule_id est fourni, récupérer organization_id et location_id
    IF NEW.schedule_id IS NOT NULL THEN
        SELECT organization_id, location_id
        INTO NEW.organization_id, NEW.location_id
        FROM schedules
        WHERE id = NEW.schedule_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour auto-sync organization_id et location_id
DROP TRIGGER IF EXISTS sync_shift_org_location_trigger ON shifts;
CREATE TRIGGER sync_shift_org_location_trigger
    BEFORE INSERT OR UPDATE ON shifts
    FOR EACH ROW 
    WHEN (NEW.schedule_id IS NOT NULL)
    EXECUTE FUNCTION sync_shift_org_location();

-- Commentaires pour documentation
COMMENT ON COLUMN shifts.organization_id IS 'Référence directe à l''organisation pour optimiser les requêtes';
COMMENT ON COLUMN shifts.location_id IS 'Référence à l''établissement pour filtrage par site';
COMMENT ON COLUMN schedules.published_at IS 'Date de publication du planning';

