-- =============================================
-- Migration 003 - Amélioration des RLS Policies
-- =============================================
-- Cette migration améliore et complète les RLS policies
-- pour garantir une sécurité optimale et des permissions correctes
-- =============================================

-- =============================================
-- POLICIES AMÉLIORÉES POUR SHIFTS
-- =============================================

-- Supprimer les anciennes policies pour shifts et recréer
DROP POLICY IF EXISTS "users_view_org_shifts" ON shifts;
DROP POLICY IF EXISTS "employees_view_own_shifts" ON shifts;
DROP POLICY IF EXISTS "managers_manage_shifts" ON shifts;
DROP POLICY IF EXISTS "users_view_org_shifts_direct" ON shifts;
DROP POLICY IF EXISTS "managers_create_shifts" ON shifts;
DROP POLICY IF EXISTS "managers_update_shifts" ON shifts;
DROP POLICY IF EXISTS "managers_delete_shifts" ON shifts;

-- Policy pour voir les shifts : via organization_id direct OU via schedule
CREATE POLICY "users_view_org_shifts" ON shifts
    FOR SELECT USING (
        -- Via organization_id direct (ajouté dans migration 002)
        (organization_id IS NOT NULL AND organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        ))
        OR
        -- Via schedule_id
        (schedule_id IN (
            SELECT id FROM schedules 
            WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        ))
    );

-- Policy pour que les employés voient SEULEMENT leurs shifts
CREATE POLICY "employees_view_own_shifts_only" ON shifts
    FOR SELECT USING (
        -- Employés voient uniquement leurs shifts assignés
        profile_id = auth.uid()
        OR
        employee_id IN (
            SELECT id FROM employees 
            WHERE profile_id = auth.uid()
        )
    );

-- Policy combinée : Employés voient leurs shifts, Managers voient tous
CREATE POLICY "users_view_shifts_combined" ON shifts
    FOR SELECT USING (
        -- Si c'est un employé, voir seulement ses shifts
        (
            EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() AND role = 'EMPLOYEE'
            )
            AND (
                profile_id = auth.uid()
                OR employee_id IN (
                    SELECT id FROM employees WHERE profile_id = auth.uid()
                )
            )
        )
        OR
        -- Si c'est un manager/owner/hr, voir tous les shifts de l'org
        (
            EXISTS (
                SELECT 1 FROM profiles 
                WHERE id = auth.uid() AND role IN ('OWNER', 'MANAGER', 'HR')
            )
            AND (
                organization_id IN (
                    SELECT organization_id FROM profiles WHERE id = auth.uid()
                )
                OR schedule_id IN (
                    SELECT id FROM schedules 
                    WHERE organization_id IN (
                        SELECT organization_id FROM profiles WHERE id = auth.uid()
                    )
                )
            )
        )
    );

-- Policy pour créer des shifts (managers uniquement)
CREATE POLICY "managers_create_shifts" ON shifts
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role IN ('OWNER', 'MANAGER', 'HR')
            AND organization_id IS NOT NULL
        )
        AND (
            organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
            OR schedule_id IN (
                SELECT id FROM schedules 
                WHERE organization_id IN (
                    SELECT organization_id FROM profiles WHERE id = auth.uid()
                )
            )
        )
    );

-- Policy pour modifier des shifts (managers uniquement)
CREATE POLICY "managers_update_shifts" ON shifts
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role IN ('OWNER', 'MANAGER', 'HR')
        )
        AND (
            organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
            OR schedule_id IN (
                SELECT id FROM schedules 
                WHERE organization_id IN (
                    SELECT organization_id FROM profiles WHERE id = auth.uid()
                )
            )
        )
    );

-- Policy pour supprimer des shifts (managers uniquement)
CREATE POLICY "managers_delete_shifts" ON shifts
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role IN ('OWNER', 'MANAGER', 'HR')
        )
        AND (
            organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
            OR schedule_id IN (
                SELECT id FROM schedules 
                WHERE organization_id IN (
                    SELECT organization_id FROM profiles WHERE id = auth.uid()
                )
            )
        )
    );

-- =============================================
-- POLICIES AMÉLIORÉES POUR PROFILES
-- =============================================

-- Policy pour que les profils voient les autres profils de leur org
DROP POLICY IF EXISTS "users_view_org_profiles" ON profiles;
CREATE POLICY "users_view_org_profiles" ON profiles
    FOR SELECT USING (
        -- Voir son propre profil
        id = auth.uid()
        OR
        -- Voir les profils de la même organisation
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

-- =============================================
-- POLICIES POUR MESSAGES (Realtime)
-- =============================================

-- S'assurer que les policies pour messages permettent le realtime
DROP POLICY IF EXISTS "users_view_org_messages" ON messages;
DROP POLICY IF EXISTS "users_send_messages" ON messages;

-- Voir les messages dans les canaux de l'organisation
CREATE POLICY "users_view_org_messages" ON messages
    FOR SELECT USING (
        channel_id IN (
            SELECT id FROM message_channels 
            WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

-- Envoyer des messages dans les canaux de l'organisation
CREATE POLICY "users_send_messages" ON messages
    FOR INSERT WITH CHECK (
        sender_id = auth.uid()
        AND channel_id IN (
            SELECT id FROM message_channels 
            WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

-- =============================================
-- POLICIES POUR SCHEDULES (Workflow)
-- =============================================

-- Permettre la création de schedules (managers)
DROP POLICY IF EXISTS "managers_manage_schedules" ON schedules;
CREATE POLICY "managers_create_schedules" ON schedules
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role IN ('OWNER', 'MANAGER', 'HR')
        )
        AND organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "managers_update_schedules" ON schedules
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role IN ('OWNER', 'MANAGER', 'HR')
        )
        AND organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "managers_delete_schedules" ON schedules
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() 
            AND role IN ('OWNER', 'MANAGER', 'HR')
        )
        AND organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

-- =============================================
-- INDEX SUPPLÉMENTAIRES POUR PERFORMANCE
-- =============================================

-- Index composite pour queries fréquentes
CREATE INDEX IF NOT EXISTS idx_shifts_org_profile_time 
ON shifts(organization_id, profile_id, start_time) 
WHERE organization_id IS NOT NULL AND profile_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_schedules_org_status_week 
ON schedules(organization_id, status, week_start_date);

CREATE INDEX IF NOT EXISTS idx_timeoff_org_status_dates 
ON time_off_requests(organization_id, status, start_date, end_date);

CREATE INDEX IF NOT EXISTS idx_messages_channel_created 
ON messages(channel_id, created_at DESC);

-- Index pour recherche de profils
CREATE INDEX IF NOT EXISTS idx_profiles_org_role_active 
ON profiles(organization_id, role, is_active) 
WHERE organization_id IS NOT NULL;

-- =============================================
-- COMMENTAIRES
-- =============================================

COMMENT ON POLICY "users_view_shifts_combined" ON shifts IS 
'Policy combinée : Employés voient uniquement leurs shifts, Managers voient tous les shifts de l''organisation';

COMMENT ON POLICY "managers_create_shifts" ON shifts IS 
'Seuls les managers/owners/HR peuvent créer des shifts dans leur organisation';

COMMENT ON POLICY "users_view_org_messages" ON messages IS 
'Les utilisateurs peuvent voir les messages dans les canaux de leur organisation';

