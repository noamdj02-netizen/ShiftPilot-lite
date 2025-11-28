// Route de test pour vérifier le trigger
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Vérifier que le trigger existe
    const { data: triggers, error: triggerError } = await (supabase.rpc as any)(
      "exec_sql",
      {
        query: `
          SELECT tgname, tgrelid::regclass 
          FROM pg_trigger 
          WHERE tgname = 'on_auth_user_created';
        `,
      }
    );

    // Vérifier que la fonction existe
    const { data: functions, error: functionError } = await (supabase.rpc as any)(
      "exec_sql",
      {
        query: `
          SELECT proname, prosrc 
          FROM pg_proc 
          WHERE proname = 'handle_new_user';
        `,
      }
    );

    // Vérifier les politiques RLS
    const { data: policies, error: policyError } = await (supabase.rpc as any)(
      "exec_sql",
      {
        query: `
          SELECT policyname, cmd, qual 
          FROM pg_policies 
          WHERE tablename = 'profiles' AND cmd = 'INSERT';
        `,
      }
    );

    return NextResponse.json({
      success: true,
      trigger: { exists: !triggerError, data: triggers },
      function: { exists: !functionError, data: functions },
      policies: { exists: !policyError, data: policies },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

