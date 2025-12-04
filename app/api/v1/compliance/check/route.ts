import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ComplianceService } from "@/lib/services/compliance-service";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

// GET /api/v1/compliance/check
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const scheduleId = searchParams.get('schedule_id');
    const organizationId = searchParams.get('organization_id');

    if (!scheduleId || !organizationId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const result = await ComplianceService.checkScheduleCompliance(
      scheduleId,
      organizationId
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}

