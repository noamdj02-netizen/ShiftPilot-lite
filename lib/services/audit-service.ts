import { createClient } from "@/lib/supabase/server";

export type AuditAction = 
  | 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW' | 'EXPORT'
  | 'VALIDATE' | 'PUBLISH' | 'APPROVE' | 'REJECT'
  | 'LOGIN' | 'LOGOUT' | 'PERMISSION_GRANTED' | 'PERMISSION_REVOKED';

export type AuditEntityType = 
  | 'shift' | 'profile' | 'schedule' | 'time_off_request'
  | 'establishment' | 'document' | 'message' | 'role';

export interface AuditLog {
  id: string;
  organization_id: string;
  profile_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  old_data?: any;
  new_data?: any;
  metadata?: any;
  ip_address?: string;
  created_at: string;
}

export class AuditService {
  /**
   * Log an audit event manually
   */
  static async log(
    action: AuditAction,
    entityType: AuditEntityType,
    entityId: string,
    options?: {
      oldData?: any;
      newData?: any;
      metadata?: any;
      ipAddress?: string;
    }
  ): Promise<{ success: boolean; logId?: string; error?: string }> {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('organization_id')
      .eq('id', user.id)
      .single();

    if (!profile) {
      return { success: false, error: 'Profile not found' };
    }

    const { data, error } = await supabase
      .from('activity_logs')
      .insert({
        organization_id: profile.organization_id,
        profile_id: user.id,
        action: action,
        entity_type: entityType,
        entity_id: entityId,
        old_data: options?.oldData || null,
        new_data: options?.newData || null,
        metadata: options?.metadata || {},
        ip_address: options?.ipAddress || null
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error logging audit:', error);
      return { success: false, error: error.message };
    }

    return { success: true, logId: data.id };
  }

  /**
   * Get audit logs with filters
   */
  static async getLogs(filters?: {
    organizationId?: string;
    userId?: string;
    entityType?: AuditEntityType;
    entityId?: string;
    action?: AuditAction;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }) {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    // Get user's organization if not provided
    let organizationId = filters?.organizationId;
    if (!organizationId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single();
      organizationId = profile?.organization_id;
    }

    if (!organizationId) return [];

    let query = supabase
      .from('activity_logs')
      .select('*, profile:profiles(first_name, last_name, email)')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });

    if (filters?.userId) {
      query = query.eq('profile_id', filters.userId);
    }

    if (filters?.entityType) {
      query = query.eq('entity_type', filters.entityType);
    }

    if (filters?.entityId) {
      query = query.eq('entity_id', filters.entityId);
    }

    if (filters?.action) {
      query = query.eq('action', filters.action);
    }

    if (filters?.startDate) {
      query = query.gte('created_at', filters.startDate);
    }

    if (filters?.endDate) {
      query = query.lte('created_at', filters.endDate);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    } else {
      query = query.limit(100);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching audit logs:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Export audit logs to CSV format
   */
  static async exportToCSV(filters?: {
    organizationId?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<string> {
    const logs = await this.getLogs(filters);

    const headers = ['Date', 'User', 'Action', 'Entity Type', 'Entity ID', 'Details'];
    const rows = logs.map(log => [
      new Date(log.created_at).toLocaleString('fr-FR'),
      `${(log.profile as any)?.first_name} ${(log.profile as any)?.last_name}` || 'Unknown',
      log.action,
      log.entity_type,
      log.entity_id,
      JSON.stringify(log.new_data || log.old_data || {})
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return csv;
  }
}

