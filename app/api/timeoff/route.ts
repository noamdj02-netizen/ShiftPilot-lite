import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/api/error-handler";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Vérifier l'authentification
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // PENDING, APPROVED, REJECTED
    const employee_id = searchParams.get('employee_id'); // Pour filtrer par employé

    const supabase = await createClient();

    // Si c'est un employé, il ne voit que ses propres demandes
    if (user.role === 'EMPLOYEE') {
      // Récupérer l'employee_id de l'utilisateur
      const { data: employee } = await supabase
        .from('employees')
        .select('id')
        .eq('profile_id', user.id)
        .single();

      if (!employee) {
        return NextResponse.json([]);
      }

      let query = supabase
        .from("time_off_requests")
        .select(`
          *,
          employee:employees(first_name, last_name, position)
        `)
        .eq("employee_id", employee.id);

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        console.error("[GET /api/timeoff] Error:", error);
        return createErrorResponse(
          "Failed to fetch time off requests",
          500,
          "FETCH_ERROR"
        );
      }

      return NextResponse.json(data || []);
    }

    // Si c'est un manager/owner/hr, voir toutes les demandes de l'organisation
    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError || !organization_id) {
      return NextResponse.json([]);
    }

    let query = supabase
      .from("time_off_requests")
      .select(`
        *,
        employee:employees(first_name, last_name, position, profile_id)
      `)
      .eq("organization_id", organization_id);

    if (status) {
      query = query.eq('status', status);
    }

    if (employee_id) {
      query = query.eq('employee_id', employee_id);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("[GET /api/timeoff] Error:", error);
      return createErrorResponse(
        "Failed to fetch time off requests",
        500,
        "FETCH_ERROR"
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("[GET /api/timeoff] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { start_date, end_date, reason, location_id } = body;

    // Validation
    if (!start_date || !end_date) {
      return createErrorResponse(
        "Missing required fields: start_date, end_date",
        400,
        "MISSING_FIELDS"
      );
    }

    const supabase = await createClient();

    // Récupérer l'employee_id de l'utilisateur
    const { data: employee, error: employeeError } = await supabase
      .from('employees')
      .select('id, organization_id, location_id')
      .eq('profile_id', user.id)
      .single();

    if (employeeError || !employee) {
      return createErrorResponse(
        "Employee record not found. Please contact your manager.",
        404,
        "EMPLOYEE_NOT_FOUND"
      );
    }

    // Vérifier que l'employé a une organisation
    if (!employee.organization_id) {
      return createErrorResponse(
        "Organization not found for employee",
        400,
        "NO_ORGANIZATION"
      );
    }

    // Vérifier qu'il n'y a pas de conflit avec des shifts existants
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    
    const { data: conflictingShifts } = await supabase
      .from('shifts')
      .select('id, start_time')
      .eq('employee_id', employee.id)
      .gte('start_time', startDate.toISOString())
      .lte('start_time', endDate.toISOString());

    if (conflictingShifts && conflictingShifts.length > 0) {
      return createErrorResponse(
        `Cannot request time off: ${conflictingShifts.length} shift(s) already scheduled during this period`,
        400,
        "SHIFT_CONFLICT",
        { conflicting_shifts: conflictingShifts }
      );
    }

    // Créer la demande de congé
    const { data: timeOffRequest, error: insertError } = await supabase
      .from("time_off_requests")
      .insert({
        employee_id: employee.id,
        organization_id: employee.organization_id,
        location_id: location_id || employee.location_id || null,
        start_date: start_date,
        end_date: end_date,
        reason: reason || null,
        status: 'PENDING',
      } as any)
      .select(`
        *,
        employee:employees(first_name, last_name, position)
      `)
      .single();

    if (insertError || !timeOffRequest) {
      console.error("[POST /api/timeoff] Error:", insertError);
      return createErrorResponse(
        `Failed to create time off request: ${insertError?.message || 'Unknown error'}`,
        500,
        "CREATE_ERROR"
      );
    }

    // Créer une notification pour les managers
    // TODO: Implémenter le système de notifications

    // Log audit
    await supabase
      .from('audit_logs')
      .insert({
        organization_id: employee.organization_id,
        actor_id: user.id,
        action: 'TIME_OFF_REQUESTED',
        payload: { request_id: timeOffRequest.id, start_date, end_date }
      } as any);

    return NextResponse.json(timeOffRequest, { status: 201 });
  } catch (error) {
    console.error("[POST /api/timeoff] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

