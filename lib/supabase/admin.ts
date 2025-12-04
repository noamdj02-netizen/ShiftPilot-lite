import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// Validation stricte des variables d'environnement pour admin client
function getAdminEnvVars() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl === "https://your-project.supabase.co") {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing or not configured. " +
      "Required for admin operations. Please set it in your environment variables."
    );
  }

  if (!serviceRoleKey || serviceRoleKey === "your-service-role-key-here") {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing or not configured. " +
      "This is REQUIRED for admin operations. " +
      "⚠️ SECURITY: Never expose this key in client-side code. " +
      "Get it from: Supabase Dashboard > Settings > API > service_role key"
    );
  }

  return { supabaseUrl, serviceRoleKey };
}

export function createClient() {
  const { supabaseUrl, serviceRoleKey } = getAdminEnvVars();

  return createSupabaseClient<Database>(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

