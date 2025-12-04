import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { planningService } from "@/lib/services/planning-service";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError || !organization_id) {
      return NextResponse.json(
        { error: "Organization required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { startDate, variant = 'balanced', establishmentId } = body;

    if (!startDate) {
      return NextResponse.json(
        { error: "startDate is required" },
        { status: 400 }
      );
    }

    const result = await planningService.generateScheduleForWeek({
      organizationId: organization_id,
      establishmentId: establishmentId || null,
      startDate,
      useWeather: true,
      variant // 'balanced' | 'economical' | 'staff-friendly'
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Planning generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

