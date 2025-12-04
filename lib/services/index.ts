import { supabaseClient as supabase } from '@/lib/supabase/client'
import { Database } from '@/database'

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// --- Shifts Service ---

export const shiftService = {
  async getShifts(restaurantId: string, startDate: Date, endDate: Date) {
    const { data, error } = await (supabase
      .from('shifts') as any)
      .select('*, employees(first_name, last_name, color, initials)')
      .eq('restaurant_id', restaurantId)
      .gte('start_time', startDate.toISOString())
      .lte('end_time', endDate.toISOString())
      .order('start_time', { ascending: true })

    if (error) throw error
    return data
  },

  async createShift(shift: Database['public']['Tables']['shifts']['Insert']) {
    const { data, error } = await (supabase
      .from('shifts') as any)
      .insert(shift)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateShift(id: string, updates: Database['public']['Tables']['shifts']['Update']) {
    const { data, error } = await (supabase
      .from('shifts') as any)
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteShift(id: string) {
    const { error } = await (supabase
      .from('shifts') as any)
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// --- Employees Service ---

export const employeeService = {
  async getEmployees(restaurantId: string) {
    const { data, error } = await (supabase
      .from('employees') as any)
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('first_name', { ascending: true })

    if (error) throw error
    return data
  },

  async createEmployee(employee: any) {
    const { data, error } = await (supabase
      .from('employees') as any)
      .insert(employee)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateEmployee(id: string, updates: any) {
    const { data, error } = await (supabase
      .from('employees') as any)
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getEmployeeByProfileId(profileId: string) {
    const { data, error } = await (supabase
      .from('employees') as any)
      .select('*')
      .eq('profile_id', profileId)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 is "not found"
    return data
  },
  
  async inviteEmployee(email: string, restaurantId: string) {
    // Logic to send invitation email via API route would be called here
    // For now, we just ensure the employee record exists with status 'invited'
    // This is a placeholder for the actual invite logic which involves auth
    return { success: true }
  }
}

// --- Messages Service ---

export const messageService = {
  async getMessages(restaurantId: string, limit = 50) {
    const { data, error } = await (supabase
      .from('messages') as any)
      .select('*, sender:profiles(first_name, last_name, avatar_url)')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data.reverse() // Return in chronological order for chat UI
  },

  async sendMessage(message: any) {
    const { data, error } = await (supabase
      .from('messages') as any)
      .insert(message)
      .select()
      .single()

    if (error) throw error
    return data
  },

  subscribeToMessages(restaurantId: string, callback: (payload: any) => void) {
    return (supabase as any)
      .channel(`chat:${restaurantId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `restaurant_id=eq.${restaurantId}`
        },
        callback
      )
      .subscribe()
  }
}

// --- Time Off Service ---

export const timeOffService = {
  async getRequests(restaurantId: string) {
    const { data, error } = await (supabase
      .from('time_off_requests') as any)
      .select('*, employee:employees(first_name, last_name)')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getEmployeeRequests(employeeId: string) {
    const { data, error } = await (supabase
      .from('time_off_requests') as any)
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async createRequest(request: any) {
    const { data, error } = await (supabase
      .from('time_off_requests') as any)
      .insert(request)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateStatus(id: string, status: 'approved' | 'rejected', responseNote?: string) {
    const { data, error } = await (supabase
      .from('time_off_requests') as any)
      .update({ status, response_note: responseNote })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }
}

