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

    const { data: profile } = await supabase
      .from("profiles")
      .select("restaurant_id")
      .eq("id", user.id)
      .single();

    if (!profile?.restaurant_id) {
      return NextResponse.json([]);
    }

    const { data, error } = await supabase
      .from("time_off_requests")
      .select("*, employees(first_name, last_name)")
      .eq("restaurant_id", profile.restaurant_id)
      .order("created_at", { ascending: false });

    if (error) {
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
      return NextResponse.json({ error: "No restaurant found" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("time_off_requests")
      .insert({
        ...body,
        restaurant_id: profile.restaurant_id
      })
      .select()
      .single();

    if (error) {
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

