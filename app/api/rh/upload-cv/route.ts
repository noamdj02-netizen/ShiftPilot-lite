import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

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

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const employeeId = formData.get("employeeId") as string;

    if (!file || !employeeId) {
      return NextResponse.json(
        { error: "File and employee ID are required" },
        { status: 400 }
      );
    }

    const filePath = `${employeeId}/${file.name}`;
    
    const { data, error } = await supabase.storage
      .from("employee_docs")
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ path: data.path });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

