import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.com";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

if (typeof window !== "undefined") {
  console.log("Supabase URL:", supabaseUrl); // Debug: Check URL in browser console
  if (supabaseUrl === "https://example.com") {
     console.error("CRITICAL: Using placeholder URL for Supabase!");
  }
}

if ((process.env.NEXT_PUBLIC_SUPABASE_URL === undefined || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === undefined) && typeof window !== "undefined") {
  console.warn(
    "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

export const createClient = () =>
  createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

export const supabaseClient = createClient();
