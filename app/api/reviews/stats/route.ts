import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError || !organization_id) {
      return NextResponse.json({ error: "Organization required" }, { status: 403 });
    }

    const supabase = await createClient();

    // Récupérer tous les avis
    const { data: reviews, error } = await supabase
      .from('google_reviews')
      .select('rating, created_at')
      .eq('organization_id', organization_id);

    if (error) throw error;

    // Calculer stats
    const total = reviews?.length || 0;
    const average = total > 0
      ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / total
      : 0;
    
    const byRating = {
      5: reviews?.filter(r => r.rating === 5).length || 0,
      4: reviews?.filter(r => r.rating === 4).length || 0,
      3: reviews?.filter(r => r.rating === 3).length || 0,
      2: reviews?.filter(r => r.rating === 2).length || 0,
      1: reviews?.filter(r => r.rating === 1).length || 0,
    };

    // Avis ce mois
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    const thisMonthReviews = reviews?.filter(
      r => new Date(r.created_at) >= thisMonth
    ).length || 0;

    // Demandes envoyées ce mois
    const { data: requests } = await supabase
      .from('review_requests')
      .select('id')
      .eq('organization_id', organization_id)
      .gte('sent_at', thisMonth.toISOString());

    // Taux de réponse (demandes qui ont généré un avis)
    const { data: respondedRequests } = await supabase
      .from('review_requests')
      .select('id, responded_at')
      .eq('organization_id', organization_id)
      .not('responded_at', 'is', null);

    const responseRate = requests && requests.length > 0
      ? Math.round((respondedRequests?.length || 0) / requests.length * 100)
      : 0;

    return NextResponse.json({
      total,
      average: Math.round(average * 10) / 10,
      byRating,
      thisMonth: thisMonthReviews,
      requestsThisMonth: requests?.length || 0,
      responseRate
    });
  } catch (error) {
    console.error("Reviews stats error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

