import { createClient } from "@/lib/supabase/server";

export interface ArchiveComparison {
  week1: {
    weekStart: string;
    totalShifts: number;
    totalHours: number;
  };
  week2: {
    weekStart: string;
    totalShifts: number;
    totalHours: number;
  };
  differences: {
    shiftsDiff: number;
    hoursDiff: number;
    costDiff: number;
  };
}

export class ArchiveService {
  /**
   * Archive a schedule week
   */
  static async archiveScheduleWeek(
    organizationId: string,
    establishmentId: string,
    weekStart: string,
    weekEnd: string
  ): Promise<{ success: boolean; archiveId?: string; error?: string }> {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Unauthorized' };
    }

    const { data, error } = await supabase.rpc('archive_schedule_week', {
      p_organization_id: organizationId,
      p_establishment_id: establishmentId,
      p_week_start: weekStart,
      p_week_end: weekEnd,
      p_user_id: user.id
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, archiveId: data };
  }

  /**
   * Get archived schedules
   */
  static async getArchives(
    organizationId: string,
    establishmentId?: string,
    limit: number = 20
  ) {
    const supabase = await createClient();
    
    let query = supabase
      .from('schedule_archives')
      .select('*')
      .eq('organization_id', organizationId)
      .order('week_start', { ascending: false })
      .limit(limit);

    if (establishmentId) {
      query = query.eq('establishment_id', establishmentId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching archives:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Get archive details
   */
  static async getArchive(archiveId: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('schedule_archives')
      .select('*')
      .eq('id', archiveId)
      .single();

    if (error) {
      console.error('Error fetching archive:', error);
      return null;
    }

    return data;
  }

  /**
   * Compare two archived weeks
   */
  static async compareWeeks(
    organizationId: string,
    week1ArchiveId: string,
    week2ArchiveId: string
  ): Promise<ArchiveComparison | null> {
    const supabase = await createClient();
    
    const [week1, week2] = await Promise.all([
      this.getArchive(week1ArchiveId),
      this.getArchive(week2ArchiveId)
    ]);

    if (!week1 || !week2) {
      return null;
    }

    const week1Data = week1.schedule_data as any;
    const week2Data = week2.schedule_data as any;

    const comparison: ArchiveComparison = {
      week1: {
        weekStart: week1.week_start,
        totalShifts: week1Data.total_shifts || 0,
        totalHours: week1Data.total_hours || 0
      },
      week2: {
        weekStart: week2.week_start,
        totalShifts: week2Data.total_shifts || 0,
        totalHours: week2Data.total_hours || 0
      },
      differences: {
        shiftsDiff: (week2Data.total_shifts || 0) - (week1Data.total_shifts || 0),
        hoursDiff: (week2Data.total_hours || 0) - (week1Data.total_hours || 0),
        costDiff: 0 // Would need to calculate from payroll
      }
    };

    // Save comparison
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('archive_comparisons')
        .insert({
          organization_id: organizationId,
          week1_archive_id: week1ArchiveId,
          week2_archive_id: week2ArchiveId,
          comparison_data: comparison,
          created_by: user.id
        });
    }

    return comparison;
  }
}

