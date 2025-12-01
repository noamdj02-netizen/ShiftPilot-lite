import { createClient } from "@/lib/supabase/server";

export class AvailabilityService {
  /**
   * Get availability for an employee
   */
  static async getEmployeeAvailability(profileId: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('employee_availabilities')
      .select('*')
      .eq('profile_id', profileId)
      .order('day_of_week', { ascending: true });

    if (error) {
      console.error('Error fetching availability:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Set availability for an employee
   */
  static async setAvailability(
    profileId: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    isAvailable: boolean = true,
    priority: number = 0
  ) {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('employee_availabilities')
      .upsert({
        profile_id: profileId,
        day_of_week: dayOfWeek,
        start_time: startTime,
        end_time: endTime,
        is_available: isAvailable,
        priority,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'profile_id,day_of_week,start_time,end_time'
      });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  /**
   * Add availability exception (one-off)
   */
  static async addException(
    profileId: string,
    date: string,
    startTime?: string,
    endTime?: string,
    reason?: string,
    isUnavailable: boolean = true
  ) {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('availability_exceptions')
      .insert({
        profile_id: profileId,
        date,
        start_time: startTime || null,
        end_time: endTime || null,
        reason,
        is_unavailable: isUnavailable
      });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  /**
   * Get exceptions for a date range
   */
  static async getExceptions(profileId: string, startDate: string, endDate: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('availability_exceptions')
      .select('*')
      .eq('profile_id', profileId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching exceptions:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Check if employee is available at a specific time
   */
  static async isAvailable(
    profileId: string,
    date: string,
    startTime: string,
    endTime: string
  ): Promise<boolean> {
    const supabase = await createClient();
    
    const d = new Date(date);
    const dayOfWeek = d.getDay();

    // Check exceptions first
    const { data: exception } = await supabase
      .from('availability_exceptions')
      .select('is_unavailable')
      .eq('profile_id', profileId)
      .eq('date', date)
      .or(`start_time.is.null,start_time.lte.${startTime}`)
      .or(`end_time.is.null,end_time.gte.${endTime}`)
      .single();

    if (exception && exception.is_unavailable) {
      return false;
    }

    // Check regular availability
    const { data: availability } = await supabase
      .from('employee_availabilities')
      .select('is_available, start_time, end_time')
      .eq('profile_id', profileId)
      .eq('day_of_week', dayOfWeek)
      .eq('is_available', true)
      .single();

    if (!availability) {
      return false; // No availability set = not available
    }

    // Check if time slot overlaps with availability
    const availStart = availability.start_time;
    const availEnd = availability.end_time;

    return startTime >= availStart && endTime <= availEnd;
  }
}

