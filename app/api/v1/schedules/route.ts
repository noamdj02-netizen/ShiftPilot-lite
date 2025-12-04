import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { RBACService } from "@/lib/services/rbac-service";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

// GET /api/v1/schedules
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
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    // Check permission
    const hasPermission = await RBACService.hasPermission(user.id, 'VIEW_SCHEDULE', establishmentId || undefined);
    if (!hasPermission) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    let query = supabase
      .from('shifts')
      .select('*, profile:profiles(first_name, last_name, email)')
      .eq('organization_id', organizationId || '');

    if (establishmentId) {
      query = query.eq('establishment_id', establishmentId);
    }

    if (startDate) {
      query = query.gte('date', startDate);
    }

    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data, error } = await query.order('date', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ schedules: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}

// POST /api/v1/schedules
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Check permission
    const hasPermission = await RBACService.hasPermission(user.id, 'CREATE_SHIFT', body.establishment_id);
    if (!hasPermission) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('shifts')
      // @ts-ignore
      .insert({
        ...body,
        created_by: user.id
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ schedule: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}

