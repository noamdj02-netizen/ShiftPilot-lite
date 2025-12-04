import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
  profile_photo_url?: string;
}

export interface PlaceDetails {
  place_id: string;
  name: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: GoogleReview[];
}

/**
 * Récupère les détails d'un lieu Google (incluant les avis)
 */
export async function fetchGoogleReviews(placeId: string): Promise<GoogleReview[]> {
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    throw new Error('GOOGLE_PLACES_API_KEY not configured');
  }

  try {
    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        fields: ['reviews', 'rating', 'user_ratings_total', 'name'],
        key: process.env.GOOGLE_PLACES_API_KEY,
        language: 'fr', // Français
      },
    });

    return response.data.result.reviews || [];
  } catch (error) {
    console.error('Google Places API error:', error);
    throw new Error('Erreur lors de la récupération des avis Google');
  }
}

/**
 * Recherche un lieu Google par nom et adresse
 */
export async function findPlaceId(
  organizationName: string, 
  address?: string
): Promise<string | null> {
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    throw new Error('GOOGLE_PLACES_API_KEY not configured');
  }

  try {
    const query = address 
      ? `${organizationName}, ${address}` 
      : organizationName;
    
    const response = await client.textSearch({
      params: {
        query,
        key: process.env.GOOGLE_PLACES_API_KEY,
        language: 'fr',
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0].place_id;
    }

    return null;
  } catch (error) {
    console.error('Google Places search error:', error);
    return null;
  }
}

/**
 * Récupère les détails complets d'un lieu
 */
export async function getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  if (!process.env.GOOGLE_PLACES_API_KEY) {
    throw new Error('GOOGLE_PLACES_API_KEY not configured');
  }

  try {
    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        fields: ['name', 'rating', 'user_ratings_total', 'reviews', 'formatted_address'],
        key: process.env.GOOGLE_PLACES_API_KEY,
        language: 'fr',
      },
    });

    const result = response.data.result;
    return {
      place_id: placeId,
      name: result.name || '',
      rating: result.rating,
      user_ratings_total: result.user_ratings_total,
      reviews: result.reviews || []
    };
  } catch (error) {
    console.error('Google Places details error:', error);
    return null;
  }
}

