import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get("organizationId");
    const startDate = searchParams.get("startDate"); // Monday
    
    if (!organizationId || !startDate) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    // Calculate end date (Sunday)
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    const endDate = end.toISOString().split('T')[0];

    // Fetch shifts
    const { data: shifts, error } = await supabase
      .from("shifts")
      .select(`
        *,
        profile:profiles(first_name, last_name, avatar_url, role)
      `)
      .eq("organization_id", organizationId)
      .gte("date", startDate)
      .lte("date", endDate)
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) throw error;

    return NextResponse.json({
      weekStart: startDate,
      weekEnd: endDate,
      shifts: shifts || []
    });
  } catch (error) {
    console.error("Get schedule error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

