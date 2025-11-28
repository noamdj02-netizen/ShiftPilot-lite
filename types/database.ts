export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  },
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: unknown
          new_data: Json | null
          old_data: Json | null
          organization_id: string | null
          profile_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown
          new_data?: Json | null
          old_data?: Json | null
          organization_id?: string | null
          profile_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown
          new_data?: Json | null
          old_data?: Json | null
          organization_id?: string | null
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_logs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_positions: {
        Row: {
          id: string
          position_id: string | null
          proficiency_level: number | null
          profile_id: string | null
        }
        Insert: {
          id?: string
          position_id?: string | null
          proficiency_level?: number | null
          profile_id?: string | null
        }
        Update: {
          id?: string
          position_id?: string | null
          proficiency_level?: number | null
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_positions_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_positions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      establishments: {
        Row: {
          address: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          opening_hours: Json | null
          organization_id: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          opening_hours?: Json | null
          organization_id?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          opening_hours?: Json | null
          organization_id?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "establishments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          message: string | null
          profile_id: string | null
          sent_via: Json | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          profile_id?: string | null
          sent_via?: Json | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          profile_id?: string | null
          sent_via?: Json | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          slug: string
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          slug: string
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      positions: {
        Row: {
          color: string | null
          created_at: string | null
          hourly_rate_default: number | null
          id: string
          name: string
          organization_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          hourly_rate_default?: number | null
          id?: string
          name: string
          organization_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          hourly_rate_default?: number | null
          id?: string
          name?: string
          organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "positions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string | null
          hourly_rate: number | null
          id: string
          is_active: boolean | null
          last_name: string | null
          max_hours_week: number | null
          min_hours_week: number | null
          organization_id: string | null
          phone: string | null
          preferences: Json | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          hourly_rate?: number | null
          id: string
          is_active?: boolean | null
          last_name?: string | null
          max_hours_week?: number | null
          min_hours_week?: number | null
          organization_id?: string | null
          phone?: string | null
          preferences?: Json | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          max_hours_week?: number | null
          min_hours_week?: number | null
          organization_id?: string | null
          phone?: string | null
          preferences?: Json | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule_templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_default: boolean | null
          name: string
          organization_id: string | null
          template_data: Json
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          organization_id?: string | null
          template_data: Json
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          organization_id?: string | null
          template_data?: Json
        }
        Relationships: [
          {
            foreignKeyName: "schedule_templates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      shifts: {
        Row: {
          break_duration: number | null
          created_at: string | null
          created_by: string | null
          date: string
          end_time: string
          establishment_id: string | null
          id: string
          is_recurring: boolean | null
          notes: string | null
          organization_id: string | null
          position_id: string | null
          profile_id: string | null
          recurring_pattern: Json | null
          start_time: string
          status: Database["public"]["Enums"]["shift_status"] | null
          updated_at: string | null
        }
        Insert: {
          break_duration?: number | null
          created_at?: string | null
          created_by?: string | null
          date: string
          end_time: string
          establishment_id?: string | null
          id?: string
          is_recurring?: boolean | null
          notes?: string | null
          organization_id?: string | null
          position_id?: string | null
          profile_id?: string | null
          recurring_pattern?: Json | null
          start_time: string
          status?: Database["public"]["Enums"]["shift_status"] | null
          updated_at?: string | null
        }
        Update: {
          break_duration?: number | null
          created_at?: string | null
          created_by?: string | null
          date?: string
          end_time?: string
          establishment_id?: string | null
          id?: string
          is_recurring?: boolean | null
          notes?: string | null
          organization_id?: string | null
          position_id?: string | null
          profile_id?: string | null
          recurring_pattern?: Json | null
          start_time?: string
          status?: Database["public"]["Enums"]["shift_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shifts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shifts_establishment_id_fkey"
            columns: ["establishment_id"]
            isOneToOne: false
            referencedRelation: "establishments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shifts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shifts_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shifts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          employee_limit: number | null
          id: string
          organization_id: string | null
          plan: Database["public"]["Enums"]["subscription_plan"]
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          trial_ends_at: string | null
          updated_at: string | null
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          employee_limit?: number | null
          id?: string
          organization_id?: string | null
          plan?: Database["public"]["Enums"]["subscription_plan"]
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          employee_limit?: number | null
          id?: string
          organization_id?: string | null
          plan?: Database["public"]["Enums"]["subscription_plan"]
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      swap_requests: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          requester_id: string | null
          responded_at: string | null
          shift_id: string | null
          status: Database["public"]["Enums"]["swap_request_status"] | null
          target_id: string | null
          target_shift_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          requester_id?: string | null
          responded_at?: string | null
          shift_id?: string | null
          status?: Database["public"]["Enums"]["swap_request_status"] | null
          target_id?: string | null
          target_shift_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          requester_id?: string | null
          responded_at?: string | null
          shift_id?: string | null
          status?: Database["public"]["Enums"]["swap_request_status"] | null
          target_id?: string | null
          target_shift_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "swap_requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "swap_requests_target_shift_id_fkey"
            columns: ["target_shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
        ]
      }
      time_entries: {
        Row: {
          break_end: string | null
          break_start: string | null
          clock_in: string | null
          clock_in_location: Json | null
          clock_out: string | null
          clock_out_location: Json | null
          created_at: string | null
          id: string
          is_validated: boolean | null
          notes: string | null
          profile_id: string | null
          shift_id: string | null
          total_hours: number | null
          validated_by: string | null
        }
        Insert: {
          break_end?: string | null
          break_start?: string | null
          clock_in?: string | null
          clock_in_location?: Json | null
          clock_out?: string | null
          clock_out_location?: Json | null
          created_at?: string | null
          id?: string
          is_validated?: boolean | null
          notes?: string | null
          profile_id?: string | null
          shift_id?: string | null
          total_hours?: number | null
          validated_by?: string | null
        }
        Update: {
          break_end?: string | null
          break_start?: string | null
          clock_in?: string | null
          clock_in_location?: Json | null
          clock_out?: string | null
          clock_out_location?: Json | null
          created_at?: string | null
          id?: string
          is_validated?: boolean | null
          notes?: string | null
          profile_id?: string | null
          shift_id?: string | null
          total_hours?: number | null
          validated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "time_entries_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_entries_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_entries_validated_by_fkey"
            columns: ["validated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      unavailabilities: {
        Row: {
          created_at: string | null
          end_date: string
          end_time: string | null
          id: string
          is_approved: boolean | null
          is_recurring: boolean | null
          profile_id: string | null
          reason: string | null
          recurring_pattern: Json | null
          start_date: string
          start_time: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          end_time?: string | null
          id?: string
          is_approved?: boolean | null
          is_recurring?: boolean | null
          profile_id?: string | null
          reason?: string | null
          recurring_pattern?: Json | null
          start_date: string
          start_time?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          end_time?: string | null
          id?: string
          is_approved?: boolean | null
          is_recurring?: boolean | null
          profile_id?: string | null
          reason?: string | null
          recurring_pattern?: Json | null
          start_date?: string
          start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "unavailabilities_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      notification_type:
        | "shift_assigned"
        | "shift_updated"
        | "swap_request"
        | "swap_approved"
        | "reminder"
      shift_status:
        | "draft"
        | "published"
        | "confirmed"
        | "completed"
        | "canceled"
      subscription_plan: "lite" | "pro" | "business"
      subscription_status:
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "unpaid"
      swap_request_status: "pending" | "approved" | "rejected" | "canceled"
      user_role: "owner" | "manager" | "employee"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      notification_type: [
        "shift_assigned",
        "shift_updated",
        "swap_request",
        "swap_approved",
        "reminder",
      ],
      shift_status: [
        "draft",
        "published",
        "confirmed",
        "completed",
        "canceled",
      ],
      subscription_plan: ["lite", "pro", "business"],
      subscription_status: [
        "trialing",
        "active",
        "past_due",
        "canceled",
        "unpaid",
      ],
      swap_request_status: ["pending", "approved", "rejected", "canceled"],
      user_role: ["owner", "manager", "employee"],
    },
  },
} as const
