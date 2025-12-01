import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { RBACService } from "@/lib/services/rbac-service";

// GET /api/v1/employees
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organization_id');
    const establishmentId = searchParams.get('establishment_id');

    // Check permission
    const hasPermission = await RBACService.hasPermission(user.id, 'VIEW_EMPLOYEE', establishmentId || undefined);
    if (!hasPermission) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    let query = supabase
      .from('profiles')
      .select('*')
      .eq('organization_id', organizationId || '')
      .eq('is_active', true);

    if (establishmentId) {
      // Filter by establishment if user_establishments table exists
      query = query.in('id', 
        supabase
          .from('user_establishments')
          .select('user_id')
          .eq('establishment_id', establishmentId)
      );
    }

    const { data, error } = await query.order('first_name', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ employees: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}

