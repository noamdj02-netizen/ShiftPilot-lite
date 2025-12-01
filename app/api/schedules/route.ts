import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization, requireRole, successResponse, errorResponse } from "@/lib/api/auth-helper";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/schedules
 * Crée un nouveau planning (schedule)
 */
export async function POST(request: NextRequest) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) return authError || errorResponse("Unauthorized", 401);

    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError) return orgError;

    const { allowed, error: roleError } = requireRole(user, ['OWNER', 'MANAGER', 'HR']);
    if (!allowed) return roleError || errorResponse("Insufficient permissions", 403);

    const body = await request.json();
    const { location_id, week_start_date } = body;

    if (!location_id || !week_start_date) {
      return errorResponse("Missing required fields: location_id, week_start_date", 400);
    }

    const supabase = await createClient();

    // Vérifier que le planning n'existe pas déjà
    const { data: existing } = await supabase
      .from('schedules')
      .select('id')
      .eq('organization_id', organization_id)
      .eq('location_id', location_id)
      .eq('week_start_date', week_start_date)
      .single();

    if (existing) {
      return errorResponse("Schedule already exists for this week and location", 409);
    }

    // Créer le planning
    const { data: schedule, error: scheduleError } = await supabase
      .from('schedules')
      .insert({
        organization_id,
        location_id,
        week_start_date,
        status: 'DRAFT',
        created_by: user.id
      })
      .select()
      .single();

    if (scheduleError || !schedule) {
      console.error("Error creating schedule:", scheduleError);
      return errorResponse("Failed to create schedule", 500);
    }

    // Log audit
    await supabase
      .from('audit_logs')
      .insert({
        organization_id,
        actor_id: user.id,
        action: 'SCHEDULE_CREATED',
        payload: { schedule_id: schedule.id, week_start_date, location_id }
      });

    return successResponse({ schedule }, 201);

  } catch (error) {
    console.error("Create schedule error:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Internal server error",
      500
    );
  }
}

/**
 * GET /api/schedules?week_start=...&location_id=...
 * Récupère un planning pour une semaine précise
 */
export async function GET(request: NextRequest) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) return authError || errorResponse("Unauthorized", 401);

    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError) return orgError;

    const { searchParams } = new URL(request.url);
    const week_start = searchParams.get('week_start');
    const location_id = searchParams.get('location_id');

    const supabase = await createClient();

    let query = supabase
      .from('schedules')
      .select(`
        *,
        location:locations(id, name, address),
        shifts:shifts(
          id,
          employee_id,
          profile_id,
          role,
          start_time,
          end_time,
          break_minutes,
          is_published,
          employee:employees(id, first_name, last_name, position),
          profile:profiles(id, first_name, last_name)
        )
      `)
      .eq('organization_id', organization_id);

    if (week_start) {
      query = query.eq('week_start_date', week_start);
    }

    if (location_id) {
      query = query.eq('location_id', location_id);
    }

    const { data: schedules, error } = await query.order('week_start_date', { ascending: false });

    if (error) {
      console.error("Error fetching schedules:", error);
      return errorResponse("Failed to fetch schedules", 500);
    }

    return successResponse({ schedules: schedules || [] });

  } catch (error) {
    console.error("Get schedules error:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Internal server error",
      500
    );
  }
}

