import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";
import { fetchGoogleReviews } from "@/lib/services/google-reviews-service";

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

    const supabase = await createClient();

    // Récupérer le google_place_id de l'organisation
    const { data: org } = await supabase
      .from('organizations')
      .select('google_place_id')
      .eq('id', organization_id)
      .single();

    if (!org?.google_place_id) {
      return NextResponse.json(
        { error: "Google Place ID not configured. Please add it in settings." },
        { status: 400 }
      );
    }

    // Vérifier que l'API key est configurée
    if (!process.env.GOOGLE_PLACES_API_KEY) {
      return NextResponse.json(
        { error: "Google Places API not configured" },
        { status: 500 }
      );
    }

    // Récupérer les avis depuis Google
    const reviews = await fetchGoogleReviews(org.google_place_id);

    // Synchroniser dans la base de données
    const syncedReviews = [];
    for (const review of reviews) {
      const googleReviewId = `${org.google_place_id}_${review.time}`;
      
      const { data, error } = await supabase
        .from('google_reviews')
        .upsert({
          organization_id,
          reviewer_name: review.author_name,
          rating: review.rating,
          comment: review.text,
          review_date: new Date(review.time * 1000).toISOString(),
          google_review_id: googleReviewId,
        }, {
          onConflict: 'google_review_id',
          ignoreDuplicates: false
        })
        .select()
        .single();

      if (!error && data) {
        syncedReviews.push(data);
      } else if (error) {
        console.error(`Error syncing review ${googleReviewId}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      count: syncedReviews.length,
      total_fetched: reviews.length,
      reviews: syncedReviews
    });
  } catch (error) {
    console.error("Sync reviews error:", error);
    
    // Gérer spécifiquement les erreurs de clé API
    const errorMessage = error instanceof Error ? error.message : String(error);
    let userFriendlyMessage = errorMessage;
    
    if (errorMessage.includes('API key') || errorMessage.includes('GOOGLE_PLACES_API_KEY')) {
      userFriendlyMessage = 'La clé API Google Places n\'est pas configurée. Veuillez configurer GOOGLE_PLACES_API_KEY dans les variables d\'environnement.';
    }
    
    return NextResponse.json(
      { 
        error: userFriendlyMessage,
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}

