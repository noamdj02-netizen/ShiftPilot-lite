// Types générés depuis Supabase
// Pour générer les types complets, utilisez:
// 1. Dashboard Supabase > Settings > API > Generate TypeScript types
// 2. Ou installez Supabase CLI: npm install -g supabase
//    Puis: supabase login && supabase gen types typescript --project-id otuybbxfzjeuxppfihvv > types/database.ts

export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          timezone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          logo_url?: string | null;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          logo_url?: string | null;
          timezone?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          organization_id: string | null;
          email: string;
          first_name: string | null;
          last_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          role: "owner" | "manager" | "employee";
          hourly_rate: number | null;
          max_hours_week: number;
          min_hours_week: number;
          is_active: boolean;
          preferences: Record<string, unknown>;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          organization_id?: string | null;
          email: string;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: "owner" | "manager" | "employee";
          hourly_rate?: number | null;
          max_hours_week?: number;
          min_hours_week?: number;
          is_active?: boolean;
          preferences?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string | null;
          email?: string;
          first_name?: string | null;
          last_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          role?: "owner" | "manager" | "employee";
          hourly_rate?: number | null;
          max_hours_week?: number;
          min_hours_week?: number;
          is_active?: boolean;
          preferences?: Record<string, unknown>;
          created_at?: string;
          updated_at?: string;
        };
      };
      // Ajoutez les autres tables après avoir exécuté le schéma SQL
      // Utilisez le dashboard Supabase pour générer les types complets
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      subscription_status: "trialing" | "active" | "past_due" | "canceled" | "unpaid";
      subscription_plan: "lite" | "pro" | "business";
      user_role: "owner" | "manager" | "employee";
      shift_status: "draft" | "published" | "confirmed" | "completed" | "canceled";
      swap_request_status: "pending" | "approved" | "rejected" | "canceled";
      notification_type:
        | "shift_assigned"
        | "shift_updated"
        | "swap_request"
        | "swap_approved"
        | "reminder";
    };
  };
};
