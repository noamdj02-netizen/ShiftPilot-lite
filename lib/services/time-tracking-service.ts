import { createClient } from "@/lib/supabase/server";

export interface TimeEntry {
  id: string;
  profile_id: string;
  shift_id?: string;
  check_in: string;
  check_out?: string;
  check_in_latitude?: number;
  check_in_longitude?: number;
  check_out_latitude?: number;
  check_out_longitude?: number;
  hours_worked?: number;
  status: 'pending' | 'approved' | 'rejected';
}

export class TimeTrackingService {
  /**
   * Check in (start shift)
   */
  static async checkIn(
    profileId: string,
    shiftId: string | null,
    latitude?: number,
    longitude?: number
  ): Promise<{ success: boolean; entryId?: string; error?: string }> {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('time_entries')
      .insert({
        profile_id: profileId,
        shift_id: shiftId,
        check_in: new Date().toISOString(),
        check_in_latitude: latitude,
        check_in_longitude: longitude,
        status: 'pending'
      })
      .select('id')
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, entryId: data.id };
  }

  /**
   * Check out (end shift)
   */
  static async checkOut(
    entryId: string,
    latitude?: number,
    longitude?: number
  ): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('time_entries')
      .update({
        check_out: new Date().toISOString(),
        check_out_latitude: latitude,
        check_out_longitude: longitude
      })
      .eq('id', entryId);

    if (error) {
      return { success: false, error: error.message };
    }

    // Trigger will automatically calculate hours and detect anomalies

    return { success: true };
  }

  /**
   * Get time entries for a user
   */
  static async getTimeEntries(
    profileId: string,
    startDate?: string,
    endDate?: string
  ) {
    const supabase = await createClient();
    
    let query = supabase
      .from('time_entries')
      .select('*, shift:shifts(date, start_time, end_time)')
      .eq('profile_id', profileId)
      .order('check_in', { ascending: false });

    if (startDate) {
      query = query.gte('check_in', startDate);
    }

    if (endDate) {
      query = query.lte('check_in', endDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching time entries:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Approve/reject time entry
   */
  static async approveTimeEntry(
    entryId: string,
    approved: boolean,
    approverId: string
  ): Promise<{ success: boolean; error?: string }> {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('time_entries')
      .update({
        status: approved ? 'approved' : 'rejected',
        approved_by: approverId,
        approved_at: new Date().toISOString()
      })
      .eq('id', entryId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  /**
   * Get anomalies for time entries
   */
  static async getAnomalies(entryId: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('time_entry_anomalies')
      .select('*')
      .eq('time_entry_id', entryId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching anomalies:', error);
      return [];
    }

    return data || [];
  }
}

