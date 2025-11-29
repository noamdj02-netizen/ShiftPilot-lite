export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      restaurants: {
        Row: {
          id: string
          name: string
          slug: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          role: 'employer' | 'employee' | 'admin'
          restaurant_id: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          role: 'employer' | 'employee' | 'admin'
          restaurant_id?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          role?: 'employer' | 'employee' | 'admin'
          restaurant_id?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      employees: {
        Row: {
          id: string
          restaurant_id: string
          profile_id: string | null
          first_name: string
          last_name: string
          email: string | null
          role: string
          color: string | null
          initials: string | null
          status: string | null
          contract_type: string | null
          hours_per_week: number | null
          joined_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          profile_id?: string | null
          first_name: string
          last_name: string
          email?: string | null
          role: string
          color?: string | null
          initials?: string | null
          status?: string | null
          contract_type?: string | null
          hours_per_week?: number | null
          joined_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          profile_id?: string | null
          first_name?: string
          last_name?: string
          email?: string | null
          role?: string
          color?: string | null
          initials?: string | null
          status?: string | null
          contract_type?: string | null
          hours_per_week?: number | null
          joined_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      shifts: {
        Row: {
          id: string
          restaurant_id: string
          employee_id: string
          start_time: string
          end_time: string
          notes: string | null
          type: string | null
          cost: number | null
          covers: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          employee_id: string
          start_time: string
          end_time: string
          notes?: string | null
          type?: string | null
          cost?: number | null
          covers?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          employee_id?: string
          start_time?: string
          end_time?: string
          notes?: string | null
          type?: string | null
          cost?: number | null
          covers?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          restaurant_id: string
          sender_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          sender_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          sender_id?: string
          content?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

