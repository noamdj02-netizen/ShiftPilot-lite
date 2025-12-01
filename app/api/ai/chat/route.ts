import { NextRequest, NextResponse } from "next/server";
import { AIAssistantService } from "@/lib/services/ai-assistant-service";

// POST /api/ai/chat
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, context } = body;

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const response = await AIAssistantService.chat(query, context);

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal error" },
      { status: 500 }
    );
  }
}

