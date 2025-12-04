import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { planningService } from "@/lib/services/planning-service";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { organizationId, establishmentId, startDate } = body;

    if (!organizationId || !startDate) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const result = await planningService.generateScheduleForWeek({
      organizationId,
      establishmentId,
      startDate,
      useWeather: true
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Schedule generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

