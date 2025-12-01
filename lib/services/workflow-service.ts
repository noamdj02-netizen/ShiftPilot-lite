import { createClient } from "@/lib/supabase/server";

export type ScheduleStatus = 'draft' | 'reviewing' | 'validated' | 'published' | 'archived';

export interface ScheduleWeek {
  id: string;
  organization_id: string;
  establishment_id: string;
  week_start: string;
  week_end: string;
  status: ScheduleStatus;
  created_by?: string;
  created_at: string;
  validated_by?: string;
  validated_at?: string;
  published_by?: string;
  published_at?: string;
}

export class WorkflowService {
  /**
   * Create a new schedule week
   */
  static async createScheduleWeek(
    organizationId: string,
    establishmentId: string,
    weekStart: string,
    weekEnd: string,
    createdBy: string
  ): Promise<{ success: boolean; scheduleWeekId?: string; error?: string }> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('schedule_weeks')
      .insert({
        organization_id: organizationId,
        establishment_id: establishmentId,
        week_start: weekStart,
        week_end: weekEnd,
        status: 'draft',
        created_by: createdBy
      })
      .select('id')
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, scheduleWeekId: data.id };
  }

  /**
   * Submit schedule for review (draft -> reviewing)
   */
  static async submitForReview(scheduleWeekId: string): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    const { data, error } = await supabase.rpc('transition_schedule_status', {
      p_schedule_week_id: scheduleWeekId,
      p_new_status: 'reviewing',
      p_user_id: user.id
    });

    if (error || !data) {
      return { success: false, error: error?.message || 'Transition failed' };
    }

    return { success: true };
  }

  /**
   * Validate schedule (reviewing -> validated)
   */
  static async validateSchedule(scheduleWeekId: string): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    const { data, error } = await supabase.rpc('transition_schedule_status', {
      p_schedule_week_id: scheduleWeekId,
      p_new_status: 'validated',
      p_user_id: user.id
    });

    if (error || !data) {
      return { success: false, error: error?.message || 'Transition failed' };
    }

    return { success: true };
  }

  /**
   * Publish schedule (validated -> published)
   */
  static async publishSchedule(scheduleWeekId: string): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    const { data, error } = await supabase.rpc('transition_schedule_status', {
      p_schedule_week_id: scheduleWeekId,
      p_new_status: 'published',
      p_user_id: user.id
    });

    if (error || !data) {
      return { success: false, error: error?.message || 'Transition failed' };
    }

    // TODO: Trigger notifications, email, PDF generation, etc.

    return { success: true };
  }

  /**
   * Get schedule week details
   */
  static async getScheduleWeek(scheduleWeekId: string): Promise<ScheduleWeek | null> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('schedule_weeks')
      .select('*')
      .eq('id', scheduleWeekId)
      .single();

    if (error) {
      console.error('Error fetching schedule week:', error);
      return null;
    }

    return data;
  }

  /**
   * Get approvals for a schedule
   */
  static async getApprovals(scheduleWeekId: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('schedule_approvals')
      .select('*, approver:profiles!schedule_approvals_approver_id_fkey(first_name, last_name, email)')
      .eq('schedule_week_id', scheduleWeekId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching approvals:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Add approval/rejection
   */
  static async addApproval(
    scheduleWeekId: string,
    approverId: string,
    status: 'approved' | 'rejected',
    comment?: string
  ): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('schedule_approvals')
      .upsert({
        schedule_week_id: scheduleWeekId,
        approver_id: approverId,
        status,
        comment
      }, {
        onConflict: 'schedule_week_id,approver_id'
      });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }
}

