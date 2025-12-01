import { createClient } from "@/lib/supabase/server";

export class EstablishmentService {
  /**
   * Get all establishments for a user
   */
  static async getUserEstablishments(userId: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase.rpc('get_user_establishments', {
      p_user_id: userId
    });

    if (error) {
      console.error('Error fetching establishments:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Get establishment details with metrics
   */
  static async getEstablishmentDetails(establishmentId: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('establishments')
      .select(`
        *,
        manager:profiles!establishments_manager_id_fkey(id, first_name, last_name, email),
        metrics:establishment_metrics(order=date.desc, limit=30)
      `)
      .eq('id', establishmentId)
      .single();

    if (error) {
      console.error('Error fetching establishment:', error);
      return null;
    }

    return data;
  }

  /**
   * Assign user to establishment
   */
  static async assignUserToEstablishment(
    userId: string,
    establishmentId: string,
    assignedBy: string,
    isPrimary: boolean = false
  ) {
    const supabase = await createClient();
    
    // If setting as primary, unset other primary assignments
    if (isPrimary) {
      await supabase
        .from('user_establishments')
        .update({ is_primary: false })
        .eq('user_id', userId);
    }

    const { error } = await supabase
      .from('user_establishments')
      .upsert({
        user_id: userId,
        establishment_id: establishmentId,
        assigned_by: assignedBy,
        is_primary: isPrimary
      }, {
        onConflict: 'user_id,establishment_id'
      });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  /**
   * Update establishment metrics
   */
  static async updateMetrics(
    establishmentId: string,
    date: string,
    metrics: {
      totalHours?: number;
      totalCost?: number;
      employeeCount?: number;
      shiftCount?: number;
      revenue?: number;
    }
  ) {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('establishment_metrics')
      .upsert({
        establishment_id: establishmentId,
        date,
        ...metrics
      }, {
        onConflict: 'establishment_id,date'
      });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  /**
   * Get metrics for a date range
   */
  static async getMetrics(
    establishmentId: string,
    startDate: string,
    endDate: string
  ) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('establishment_metrics')
      .select('*')
      .eq('establishment_id', establishmentId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching metrics:', error);
      return [];
    }

    return data || [];
  }
}

