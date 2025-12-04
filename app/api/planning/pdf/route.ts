import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { generatePlanningPDF } from "@/lib/pdf/planning";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

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
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (!start || !end) {
      return NextResponse.json(
        { error: "Start and end dates are required" },
        { status: 400 }
      );
    }

    // Get restaurant info
    const { data: profile } = await supabase
      .from("profiles")
      .select("restaurant_id")
      .eq("id", user.id)
      .single();

    if (!profile?.restaurant_id) {
      return NextResponse.json({ error: "No restaurant found" }, { status: 404 });
    }

    const { data: restaurant } = await supabase
      .from("restaurants")
      .select("name")
      .eq("id", profile.restaurant_id)
      .single();

    // Fetch employees
    const { data: employees } = await supabase
      .from("employees")
      .select("*")
      .eq("restaurant_id", profile.restaurant_id)
      .order("first_name");

    // Fetch shifts
    const { data: shifts } = await supabase
      .from("shifts")
      .select("*")
      .eq("restaurant_id", profile.restaurant_id)
      .gte("start_time", start)
      .lte("end_time", end);

    const pdfBuffer = await generatePlanningPDF({
      restaurantName: restaurant?.name || "Planning",
      weekStart: new Date(start),
      weekEnd: new Date(end),
      employees: employees || [],
      shifts: shifts || [],
    });

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="planning-${start}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

