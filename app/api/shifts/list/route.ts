import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

// GET /api/shifts/list?start=...&end=...
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    // Security: Always filter by user's organization
    const { data: profile } = await supabase.from('profiles').select('organization_id').eq('id', user.id).single();
    if (!profile?.organization_id) return NextResponse.json({ error: "No organization" }, { status: 403 });

    let query = supabase
        .from('shifts')
        .select('*, profiles(first_name, last_name, color)')
        .eq('organization_id', profile.organization_id);

    if (start) query = query.gte('date', start);
    if (end) query = query.lte('date', end);

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ shifts: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

// POST /api/shifts/create
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: profile } = await supabase.from('profiles').select('organization_id').eq('id', user.id).single();
    if (!profile?.organization_id) return NextResponse.json({ error: "No organization" }, { status: 403 });

    const body = await request.json();

    const { data, error } = await supabase
        .from('shifts')
        .insert({
            ...body,
            organization_id: profile.organization_id,
            created_by: user.id
        })
        .select()
        .single();

    if (error) throw error;

    return NextResponse.json({ success: true, shift: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

