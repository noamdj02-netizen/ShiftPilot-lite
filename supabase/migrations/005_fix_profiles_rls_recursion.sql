-- =============================================
-- Migration 005 - Correction récursion RLS profiles
-- =============================================
-- Cette migration corrige le problème de récursion infinie
-- dans les politiques RLS de la table profiles
-- =============================================

-- Vérifier que la table profiles existe avant de continuer
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'profiles'
    ) THEN
        RAISE EXCEPTION 'Table profiles does not exist. Please run migration 001_complete_schema.sql first.';
    END IF;
END $$;

-- Supprimer les anciennes politiques qui causent la récursion
DROP POLICY IF EXISTS "Users can view profiles in their organization" ON profiles;
DROP POLICY IF EXISTS "users_view_org_profiles" ON profiles;
DROP POLICY IF EXISTS "Managers can update employee profiles" ON profiles;
DROP POLICY IF EXISTS "users_view_own_profile" ON profiles;
DROP POLICY IF EXISTS "managers_update_employee_profiles" ON profiles;

-- Créer une fonction SECURITY DEFINER pour obtenir l'organization_id
-- sans passer par RLS (évite la récursion)
-- Supprimer la fonction si elle existe déjà
DROP FUNCTION IF EXISTS get_user_organization_id();

CREATE FUNCTION get_user_organization_id()
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
DECLARE
    v_org_id UUID;
BEGIN
    -- Utiliser SECURITY DEFINER pour bypasser RLS
    SELECT organization_id INTO v_org_id
    FROM public.profiles
    WHERE id = auth.uid()
    LIMIT 1;
    
    RETURN v_org_id;
END;
$$;

-- Créer une politique qui permet à l'utilisateur de voir son propre profil
CREATE POLICY "users_view_own_profile" ON profiles
    FOR SELECT 
    USING (id = auth.uid());

-- Créer une politique pour voir les profils de la même organisation
-- Utilise la fonction SECURITY DEFINER pour éviter la récursion
CREATE POLICY "users_view_org_profiles" ON profiles
    FOR SELECT 
    USING (
        organization_id IS NOT NULL 
        AND organization_id = get_user_organization_id()
    );

-- Créer une fonction pour vérifier si l'utilisateur est manager/owner
DROP FUNCTION IF EXISTS is_user_manager_or_owner();

CREATE FUNCTION is_user_manager_or_owner()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
DECLARE
    v_role TEXT;
BEGIN
    SELECT role::TEXT INTO v_role
    FROM public.profiles
    WHERE id = auth.uid()
    LIMIT 1;
    
    RETURN v_role IN ('OWNER', 'owner', 'MANAGER', 'manager');
END;
$$;

-- Politique pour que les managers puissent mettre à jour les profils des employés
CREATE POLICY "managers_update_employee_profiles" ON profiles
    FOR UPDATE 
    USING (
        -- L'utilisateur peut mettre à jour son propre profil
        id = auth.uid()
        OR
        -- Les managers peuvent mettre à jour les profils de leur organisation
        (
            organization_id IS NOT NULL 
            AND organization_id = get_user_organization_id()
            AND is_user_manager_or_owner()
        )
    );

-- S'assurer que la politique d'insertion existe toujours
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT
    WITH CHECK (id = auth.uid());

-- S'assurer que la politique de mise à jour de son propre profil existe
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE 
    USING (id = auth.uid());

-- Commentaires pour les fonctions
COMMENT ON FUNCTION get_user_organization_id() IS 
'Fonction SECURITY DEFINER pour obtenir l''organization_id de l''utilisateur actuel sans passer par RLS, évitant ainsi la récursion infinie';

COMMENT ON FUNCTION is_user_manager_or_owner() IS 
'Fonction SECURITY DEFINER pour vérifier si l''utilisateur actuel est manager ou owner, sans passer par RLS';

