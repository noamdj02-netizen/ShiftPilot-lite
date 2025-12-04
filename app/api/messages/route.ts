import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/api/error-handler";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";
import { createClient } from "@/lib/supabase/server";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

/**
 * GET /api/messages?channel_id=...
 * Récupère les messages d'un canal
 */
export async function GET(request: NextRequest) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const channel_id = searchParams.get('channel_id');
    const limit = parseInt(searchParams.get('limit') || '50');
    const before = searchParams.get('before'); // Pour pagination

    if (!channel_id) {
      return createErrorResponse(
        "Missing required parameter: channel_id",
        400,
        "MISSING_PARAMETER"
      );
    }

    const supabase = await createClient();

    // Vérifier que le canal appartient à l'organisation de l'utilisateur
    const { data: channel, error: channelError } = await supabase
      .from('message_channels')
      .select('organization_id')
      .eq('id', channel_id)
      .single();

    if (channelError || !channel) {
      return createErrorResponse(
        "Channel not found",
        404,
        "CHANNEL_NOT_FOUND"
      );
    }

    const { organization_id } = await requireOrganization(user);
    if (organization_id !== channel.organization_id) {
      return createErrorResponse(
        "Access denied to this channel",
        403,
        "ACCESS_DENIED"
      );
    }

    // Récupérer les messages
    let query = supabase
      .from('messages')
      .select(`
        *,
        sender:profiles(id, first_name, last_name, avatar_url, email)
      `)
      .eq('channel_id', channel_id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (before) {
      query = query.lt('created_at', before);
    }

    const { data: messages, error: messagesError } = await query;

    if (messagesError) {
      console.error("[GET /api/messages] Error:", messagesError);
      return createErrorResponse(
        "Failed to fetch messages",
        500,
        "FETCH_ERROR"
      );
    }

    // Inverser l'ordre pour avoir les plus anciens en premier
    return NextResponse.json({
      messages: (messages || []).reverse(),
      hasMore: (messages || []).length === limit
    });

  } catch (error) {
    console.error("[GET /api/messages] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

/**
 * POST /api/messages
 * Envoie un message dans un canal
 */
export async function POST(request: NextRequest) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { channel_id, content } = body;

    // Validation
    if (!channel_id || !content || !content.trim()) {
      return createErrorResponse(
        "Missing required fields: channel_id, content",
        400,
        "MISSING_FIELDS"
      );
    }

    const supabase = await createClient();

    // Vérifier que le canal appartient à l'organisation de l'utilisateur
    const { organization_id } = await requireOrganization(user);
    
    const { data: channel, error: channelError } = await supabase
      .from('message_channels')
      .select('organization_id')
      .eq('id', channel_id)
      .single();

    if (channelError || !channel || channel.organization_id !== organization_id) {
      return createErrorResponse(
        "Channel not found or access denied",
        404,
        "CHANNEL_NOT_FOUND"
      );
    }

    // Créer le message
    const { data: message, error: messageError } = await supabase
      .from('messages')
      .insert({
        organization_id,
        channel_id,
        sender_id: user.id,
        content: content.trim(),
      } as any)
      .select(`
        *,
        sender:profiles(id, first_name, last_name, avatar_url, email)
      `)
      .single();

    if (messageError || !message) {
      console.error("[POST /api/messages] Error:", messageError);
      return createErrorResponse(
        `Failed to send message: ${messageError?.message || 'Unknown error'}`,
        500,
        "CREATE_ERROR"
      );
    }

    return NextResponse.json(message, { status: 201 });

  } catch (error) {
    console.error("[POST /api/messages] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

