-- RBAC System: Roles, Permissions, and User Roles

-- 1. Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'CREATE_SHIFT', 'EDIT_SHIFT'
    description TEXT,
    category VARCHAR(50), -- 'SCHEDULE', 'EMPLOYEE', 'FINANCIAL', 'SETTINGS'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create roles table
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL, -- 'Admin', 'Manager', 'RH', 'Employee', 'Prestataire'
    description TEXT,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    is_system_role BOOLEAN DEFAULT false, -- System roles are predefined
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(name, organization_id)
);

-- 3. Create role_permissions (many-to-many)
CREATE TABLE IF NOT EXISTS role_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(role_id, permission_id)
);

-- 4. Create user_roles (user can have multiple roles per establishment)
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
    granted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ, -- Optional expiration
    is_active BOOLEAN DEFAULT true,
    UNIQUE(user_id, role_id, establishment_id)
);

-- 5. Insert default permissions
INSERT INTO permissions (name, description, category) VALUES
    -- Schedule permissions
    ('CREATE_SHIFT', 'Créer un shift', 'SCHEDULE'),
    ('EDIT_SHIFT', 'Modifier un shift', 'SCHEDULE'),
    ('DELETE_SHIFT', 'Supprimer un shift', 'SCHEDULE'),
    ('VIEW_SCHEDULE', 'Voir le planning', 'SCHEDULE'),
    ('GENERATE_SCHEDULE', 'Générer un planning avec IA', 'SCHEDULE'),
    ('VALIDATE_SCHEDULE', 'Valider un planning', 'SCHEDULE'),
    ('PUBLISH_SCHEDULE', 'Publier un planning', 'SCHEDULE'),
    ('EXPORT_SCHEDULE', 'Exporter le planning', 'SCHEDULE'),
    
    -- Employee permissions
    ('CREATE_EMPLOYEE', 'Créer un employé', 'EMPLOYEE'),
    ('EDIT_EMPLOYEE', 'Modifier un employé', 'EMPLOYEE'),
    ('DELETE_EMPLOYEE', 'Supprimer un employé', 'EMPLOYEE'),
    ('VIEW_EMPLOYEE', 'Voir les employés', 'EMPLOYEE'),
    ('MANAGE_EMPLOYEE_DOCUMENTS', 'Gérer les documents RH', 'EMPLOYEE'),
    
    -- Time off permissions
    ('VIEW_TIMEOFF', 'Voir les demandes de congés', 'TIMEOFF'),
    ('APPROVE_TIMEOFF', 'Approuver les congés', 'TIMEOFF'),
    ('REJECT_TIMEOFF', 'Refuser les congés', 'TIMEOFF'),
    ('CREATE_TIMEOFF', 'Créer une demande de congé', 'TIMEOFF'),
    
    -- Financial permissions
    ('VIEW_COSTS', 'Voir les coûts salariaux', 'FINANCIAL'),
    ('VIEW_REPORTS', 'Voir les rapports financiers', 'FINANCIAL'),
    ('EXPORT_FINANCIAL', 'Exporter les données financières', 'FINANCIAL'),
    
    -- Settings permissions
    ('MANAGE_SETTINGS', 'Gérer les paramètres', 'SETTINGS'),
    ('MANAGE_ROLES', 'Gérer les rôles et permissions', 'SETTINGS'),
    ('MANAGE_ESTABLISHMENTS', 'Gérer les établissements', 'SETTINGS'),
    
    -- Messaging permissions
    ('SEND_MESSAGE', 'Envoyer des messages', 'MESSAGING'),
    ('VIEW_MESSAGES', 'Voir les messages', 'MESSAGING'),
    ('MANAGE_CHANNELS', 'Gérer les canaux', 'MESSAGING'),
    
    -- Audit permissions
    ('VIEW_AUDIT_LOGS', 'Voir les logs d''audit', 'AUDIT')
ON CONFLICT (name) DO NOTHING;

-- 6. Create default system roles (will be created per organization)
-- Note: These will be created via a function or service, not here directly

-- 7. RLS Policies
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Permissions: Everyone in organization can view
CREATE POLICY "Users can view permissions in their org" ON permissions
    FOR SELECT USING (true); -- Permissions are global, but filtered by role

-- Roles: Users can view roles in their organization
CREATE POLICY "Users can view roles in their organization" ON roles
    FOR SELECT USING (
        organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY "Admins can manage roles" ON roles
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM profiles 
            WHERE id = auth.uid() AND role = 'owner'
        )
    );

-- Role permissions: View if you can view the role
CREATE POLICY "Users can view role_permissions" ON role_permissions
    FOR SELECT USING (
        role_id IN (
            SELECT id FROM roles WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        )
    );

-- User roles: View your own or in your organization
CREATE POLICY "Users can view user_roles in their organization" ON user_roles
    FOR SELECT USING (
        user_id IN (
            SELECT id FROM profiles WHERE organization_id IN (
                SELECT organization_id FROM profiles WHERE id = auth.uid()
            )
        ) OR user_id = auth.uid()
    );

CREATE POLICY "Admins can manage user_roles" ON user_roles
    FOR ALL USING (
        establishment_id IN (
            SELECT id FROM establishments WHERE organization_id IN (
                SELECT organization_id FROM profiles 
                WHERE id = auth.uid() AND role = 'owner'
            )
        )
    );

-- 8. Indexes
CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role_id);
CREATE INDEX idx_user_roles_establishment ON user_roles(establishment_id);
CREATE INDEX idx_role_permissions_role ON role_permissions(role_id);
CREATE INDEX idx_roles_organization ON roles(organization_id);

-- 9. Function to check if user has permission
CREATE OR REPLACE FUNCTION user_has_permission(
    p_user_id UUID,
    p_permission_name VARCHAR,
    p_establishment_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    has_perm BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM user_roles ur
        JOIN role_permissions rp ON ur.role_id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE ur.user_id = p_user_id
          AND ur.is_active = true
          AND (ur.expires_at IS NULL OR ur.expires_at > NOW())
          AND p.name = p_permission_name
          AND (p_establishment_id IS NULL OR ur.establishment_id = p_establishment_id)
    ) INTO has_perm;
    
    RETURN COALESCE(has_perm, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

