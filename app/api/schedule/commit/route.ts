import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { GeneratedShift } from "@/lib/types/planning";

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
    const { organizationId, establishmentId, shifts, status = 'DRAFT' } = body;

    if (!organizationId || !shifts || !Array.isArray(shifts)) {
      return NextResponse.json(
        { error: "Invalid parameters" },
        { status: 400 }
      );
    }

    // Check permissions
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, organization_id")
      .eq("id", user.id)
      .single();

    if (!profile || profile.organization_id !== organizationId || !['owner', 'manager'].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Prepare shifts for insertion
    // We need to map from GeneratedShift format to DB 'shifts' table format
    const shiftsToInsert = shifts.map((s: GeneratedShift) => ({
      organization_id: organizationId,
      establishment_id: establishmentId,
      profile_id: s.profile_id,
      date: s.date,
      start_time: s.start_time,
      end_time: s.end_time,
      status: status, // DRAFT, PUBLISHED, etc.
      created_by: user.id,
      notes: s.weather_adjusted ? "Weather adjusted" : null
    }));

    // Optional: Clear existing drafts for this week/range if replacing?
    // For now, let's just insert. A real app might want to delete conflicting shifts first.

    const { data, error } = await supabase
      .from("shifts")
      .insert(shiftsToInsert)
      .select();

    if (error) {
      console.error("Error committing schedule:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: data.length });
  } catch (error) {
    console.error("Commit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

