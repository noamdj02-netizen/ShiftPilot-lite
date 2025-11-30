import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== "undefined") {
    console.warn("Supabase environment variables are missing.");
  }
}

export const createClient = () =>
  createBrowserClient<Database>(supabaseUrl, supabaseAnonKey || "placeholder");

export const supabaseClient = createClient();
