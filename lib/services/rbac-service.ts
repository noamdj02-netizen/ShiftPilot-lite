import { createClient } from "@/lib/supabase/server";

export type Permission = 
  | 'CREATE_SHIFT' | 'EDIT_SHIFT' | 'DELETE_SHIFT' | 'VIEW_SCHEDULE'
  | 'GENERATE_SCHEDULE' | 'VALIDATE_SCHEDULE' | 'PUBLISH_SCHEDULE' | 'EXPORT_SCHEDULE'
  | 'CREATE_EMPLOYEE' | 'EDIT_EMPLOYEE' | 'DELETE_EMPLOYEE' | 'VIEW_EMPLOYEE' | 'MANAGE_EMPLOYEE_DOCUMENTS'
  | 'VIEW_TIMEOFF' | 'APPROVE_TIMEOFF' | 'REJECT_TIMEOFF' | 'CREATE_TIMEOFF'
  | 'VIEW_COSTS' | 'VIEW_REPORTS' | 'EXPORT_FINANCIAL'
  | 'MANAGE_SETTINGS' | 'MANAGE_ROLES' | 'MANAGE_ESTABLISHMENTS'
  | 'SEND_MESSAGE' | 'VIEW_MESSAGES' | 'MANAGE_CHANNELS'
  | 'VIEW_AUDIT_LOGS';

export type RoleName = 'Admin' | 'Manager' | 'RH' | 'Employee' | 'Prestataire';

export class RBACService {
  /**
   * Check if a user has a specific permission
   */
  static async hasPermission(
    userId: string,
    permission: Permission,
    establishmentId?: string
  ): Promise<boolean> {
    const supabase = await createClient();
    
    const { data, error } = await supabase.rpc('user_has_permission', {
      p_user_id: userId,
      p_permission_name: permission,
      p_establishment_id: establishmentId || null
    });

    if (error) {
      console.error('Error checking permission:', error);
      return false;
    }

    return data === true;
  }

  /**
   * Get all permissions for a user (across all their roles)
   */
  static async getUserPermissions(
    userId: string,
    establishmentId?: string
  ): Promise<Permission[]> {
    const supabase = await createClient();
    
    let query = supabase
      .from('user_roles')
      .select(`
        role:roles!inner(
          role_permissions(
            permission:permissions(name)
          )
        )
      `)
      .eq('user_id', userId)
      .eq('is_active', true);

    if (establishmentId) {
      query = query.eq('establishment_id', establishmentId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching permissions:', error);
      return [];
    }

    const permissions = new Set<Permission>();
    data?.forEach((ur: any) => {
      ur.role?.role_permissions?.forEach((rp: any) => {
        if (rp.permission?.name) {
          permissions.add(rp.permission.name as Permission);
        }
      });
    });

    return Array.from(permissions);
  }

  /**
   * Get all roles for a user in an establishment
   */
  static async getUserRoles(
    userId: string,
    establishmentId?: string
  ): Promise<Array<{ roleId: string; roleName: string; establishmentId: string }>> {
    const supabase = await createClient();
    
    let query = supabase
      .from('user_roles')
      .select('role_id, role:roles(name), establishment_id')
      .eq('user_id', userId)
      .eq('is_active', true);

    if (establishmentId) {
      query = query.eq('establishment_id', establishmentId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching roles:', error);
      return [];
    }

    return (data || []).map((ur: any) => ({
      roleId: ur.role_id,
      roleName: ur.role?.name || '',
      establishmentId: ur.establishment_id
    }));
  }

  /**
   * Assign a role to a user
   */
  static async assignRole(
    userId: string,
    roleId: string,
    establishmentId: string,
    grantedBy: string
  ): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role_id: roleId,
        establishment_id: establishmentId,
        granted_by: grantedBy
      });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  /**
   * Create default roles for an organization
   */
  static async createDefaultRoles(organizationId: string): Promise<void> {
    const supabase = await createClient();

    // Get all permissions
    const { data: allPermissions } = await supabase
      .from('permissions')
      .select('id, name');

    if (!allPermissions) return;

    const permissionMap = new Map(allPermissions.map(p => [p.name, p.id]));

    // Define default roles with their permissions
    const defaultRoles = [
      {
        name: 'Admin',
        description: 'Accès complet à toutes les fonctionnalités',
        permissions: allPermissions.map(p => p.name) // All permissions
      },
      {
        name: 'Manager',
        description: 'Gestion complète du planning et des équipes',
        permissions: [
          'VIEW_SCHEDULE', 'CREATE_SHIFT', 'EDIT_SHIFT', 'DELETE_SHIFT',
          'GENERATE_SCHEDULE', 'VALIDATE_SCHEDULE', 'PUBLISH_SCHEDULE', 'EXPORT_SCHEDULE',
          'VIEW_EMPLOYEE', 'CREATE_EMPLOYEE', 'EDIT_EMPLOYEE',
          'VIEW_TIMEOFF', 'APPROVE_TIMEOFF', 'REJECT_TIMEOFF',
          'VIEW_COSTS', 'VIEW_REPORTS', 'EXPORT_FINANCIAL',
          'SEND_MESSAGE', 'VIEW_MESSAGES', 'MANAGE_CHANNELS'
        ]
      },
      {
        name: 'RH',
        description: 'Gestion RH et documents',
        permissions: [
          'VIEW_SCHEDULE', 'VIEW_EMPLOYEE', 'CREATE_EMPLOYEE', 'EDIT_EMPLOYEE', 'DELETE_EMPLOYEE',
          'MANAGE_EMPLOYEE_DOCUMENTS', 'VIEW_TIMEOFF', 'APPROVE_TIMEOFF', 'REJECT_TIMEOFF',
          'VIEW_COSTS', 'VIEW_REPORTS', 'EXPORT_FINANCIAL',
          'VIEW_MESSAGES', 'SEND_MESSAGE'
        ]
      },
      {
        name: 'Employee',
        description: 'Accès employé standard',
        permissions: [
          'VIEW_SCHEDULE', 'CREATE_TIMEOFF', 'VIEW_TIMEOFF',
          'VIEW_MESSAGES', 'SEND_MESSAGE'
        ]
      },
      {
        name: 'Prestataire',
        description: 'Accès prestataire limité',
        permissions: [
          'VIEW_SCHEDULE', 'VIEW_MESSAGES'
        ]
      }
    ];

    // Create roles and assign permissions
    for (const roleDef of defaultRoles) {
      const { data: role, error: roleError } = await supabase
        .from('roles')
        .insert({
          name: roleDef.name,
          description: roleDef.description,
          organization_id: organizationId,
          is_system_role: true
        })
        .select()
        .single();

      if (roleError || !role) {
        console.error(`Error creating role ${roleDef.name}:`, roleError);
        continue;
      }

      // Assign permissions
      const rolePermissions = roleDef.permissions
        .map(permName => permissionMap.get(permName))
        .filter(Boolean) as string[];

      if (rolePermissions.length > 0) {
        await supabase
          .from('role_permissions')
          .insert(
            rolePermissions.map(permId => ({
              role_id: role.id,
              permission_id: permId
            }))
          );
      }
    }
  }
}

