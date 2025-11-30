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
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    // Get user's profile to find their restaurant_id
    const { data: profile } = await supabase
      .from("profiles")
      .select("restaurant_id")
      .eq("id", user.id)
      .single();

    if (!profile?.restaurant_id) {
      return NextResponse.json([]);
    }

    let query = supabase
      .from("shifts")
      .select("*, employees(first_name, last_name, color, initials)")
      .eq("restaurant_id", profile.restaurant_id);

    if (start) {
      query = query.gte("start_time", start);
    }
    if (end) {
      query = query.lte("end_time", end);
    }

    const { data, error } = await query.order("start_time", { ascending: true });

    if (error) {
      console.error("Error fetching shifts:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

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

    const { data: profile } = await supabase
      .from("profiles")
      .select("restaurant_id")
      .eq("id", user.id)
      .single();

    if (!profile?.restaurant_id) {
      return NextResponse.json(
        { error: "No restaurant found" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("shifts")
      .insert({
        ...body,
        restaurant_id: profile.restaurant_id
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating shift:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

