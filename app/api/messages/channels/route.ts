import { NextRequest, NextResponse } from "next/server";
import { createErrorResponse } from "@/lib/api/error-handler";
import { getAuthenticatedUser, requireOrganization, requireRole } from "@/lib/api/auth-helper";
import { createClient } from "@/lib/supabase/server";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

/**
 * GET /api/messages/channels
 * Liste tous les canaux de l'organisation
 */
export async function GET(request: NextRequest) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id } = await requireOrganization(user);
    if (!organization_id) {
      return NextResponse.json({ channels: [] });
    }

    const supabase = await createClient();

    // Récupérer tous les canaux de l'organisation
    const { data: channels, error: channelsError } = await supabase
      .from('message_channels')
      .select('*')
      .eq('organization_id', organization_id)
      .order('created_at', { ascending: true });

    if (channelsError) {
      console.error("[GET /api/messages/channels] Error:", channelsError);
      return createErrorResponse(
        "Failed to fetch channels",
        500,
        "FETCH_ERROR"
      );
    }

    // Pour chaque canal, récupérer le dernier message et le nombre de messages non lus
    const channelsWithMeta = await Promise.all(
      (channels || []).map(async (channel) => {
        const { data: lastMessage } = await supabase
          .from('messages')
          .select('*')
          .eq('channel_id', channel.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        return {
          ...channel,
          last_message: lastMessage || null,
        };
      })
    );

    return NextResponse.json({ channels: channelsWithMeta });

  } catch (error) {
    console.error("[GET /api/messages/channels] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

/**
 * POST /api/messages/channels
 * Crée un nouveau canal (managers uniquement)
 */
export async function POST(request: NextRequest) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Vérifier les permissions
    const { allowed, error: roleError } = requireRole(user, ['OWNER', 'MANAGER', 'HR']);
    if (!allowed) {
      return roleError || createErrorResponse(
        "Insufficient permissions. Only managers can create channels.",
        403,
        "INSUFFICIENT_PERMISSIONS"
      );
    }

    const { organization_id } = await requireOrganization(user);
    if (!organization_id) {
      return createErrorResponse(
        "Organization required",
        400,
        "NO_ORGANIZATION"
      );
    }

    const body = await request.json();
    const { name, type = 'TEAM' } = body;

    if (!name || !name.trim()) {
      return createErrorResponse(
        "Missing required field: name",
        400,
        "MISSING_FIELDS"
      );
    }

    const supabase = await createClient();

    // Vérifier que le canal n'existe pas déjà
    const { data: existing } = await supabase
      .from('message_channels')
      .select('id')
      .eq('organization_id', organization_id)
      .eq('name', name.trim())
      .single();

    if (existing) {
      return createErrorResponse(
        "Channel with this name already exists",
        409,
        "CHANNEL_EXISTS"
      );
    }

    // Créer le canal
    const { data: channel, error: channelError } = await supabase
      .from('message_channels')
      .insert({
        organization_id,
        name: name.trim(),
        type: type.toUpperCase(),
      } as any)
      .select()
      .single();

    if (channelError || !channel) {
      console.error("[POST /api/messages/channels] Error:", channelError);
      return createErrorResponse(
        `Failed to create channel: ${channelError?.message || 'Unknown error'}`,
        500,
        "CREATE_ERROR"
      );
    }

    return NextResponse.json(channel, { status: 201 });

  } catch (error) {
    console.error("[POST /api/messages/channels] Unexpected error:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "Unknown error occurred",
      500,
      "INTERNAL_ERROR"
    );
  }
}

