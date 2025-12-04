import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError || !organization_id) {
      return NextResponse.json({ error: "Organization required" }, { status: 403 });
    }

    const body = await request.json();
    const { customer_email, customer_name, customer_phone } = body;

    if (!customer_email) {
      return NextResponse.json(
        { error: "customer_email is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Récupérer l'organisation pour le lien Google
    const { data: org } = await supabase
      .from('organizations')
      .select('name, google_place_id')
      .eq('id', organization_id)
      .single();

    // TODO: Générer lien Google Review
    const reviewLink = org?.google_place_id 
      ? `https://search.google.com/local/writereview?placeid=${org.google_place_id}`
      : 'https://www.google.com/maps';

    // TODO: Envoyer email/SMS avec le lien
    // Pour l'instant, juste log

    const { data, error } = await supabase
      .from('review_requests')
      .insert({
        organization_id,
        customer_email,
        customer_name: customer_name || null,
        customer_phone: customer_phone || null,
        review_link: reviewLink,
        status: 'sent',
        sent_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      review_link: reviewLink,
      request: data
    });
  } catch (error) {
    console.error("Review request error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

