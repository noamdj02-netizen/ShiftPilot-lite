import { Client, Language } from '@googlemaps/google-maps-services-js';

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
        language: Language.fr, // Français  

      },
    });

    // Mapper les avis pour garantir le type correct
    const reviews = response.data.result.reviews || [];
    return reviews.map(review => ({
      ...review,
      time: typeof review.time === 'string' ? parseInt(review.time, 10) : review.time,
    })) as GoogleReview[];
  } catch (error: any) {
    console.error('Google Places API error:', error);
    
    // Gérer spécifiquement les erreurs de clé API invalide
    const errorMessage = error?.response?.data?.error_message || error?.message || String(error);
    
    if (errorMessage.includes('API key') || errorMessage.includes('INVALID_REQUEST') || errorMessage.includes('REQUEST_DENIED')) {
      throw new Error('La clé API Google Places n\'est pas configurée correctement. Veuillez vérifier vos variables d\'environnement.');
    }
    
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
        language: Language.fr,
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0].place_id || null;
    }

    return null;
  } catch (error: any) {
    console.error('Google Places search error:', error);
    
    // Log mais ne pas throw pour la recherche (on retourne null)
    const errorMessage = error?.response?.data?.error_message || error?.message || String(error);
    if (errorMessage.includes('API key') || errorMessage.includes('INVALID_REQUEST') || errorMessage.includes('REQUEST_DENIED')) {
      console.error('Google Places API key is invalid or not configured');
    }
    
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
        language: Language.fr,
      },
    });

    const result = response.data.result;
    const reviews = result.reviews || [];
    
    return {
      place_id: placeId,
      name: result.name || '',
      rating: result.rating,
      user_ratings_total: result.user_ratings_total,
      reviews: reviews.map(review => ({
        ...review,
        time: typeof review.time === 'string' ? parseInt(review.time, 10) : review.time,
      })) as GoogleReview[]
    };
  } catch (error: any) {
    console.error('Google Places details error:', error);
    
    // Log mais ne pas throw pour getPlaceDetails (on retourne null)
    const errorMessage = error?.response?.data?.error_message || error?.message || String(error);
    if (errorMessage.includes('API key') || errorMessage.includes('INVALID_REQUEST') || errorMessage.includes('REQUEST_DENIED')) {
      console.error('Google Places API key is invalid or not configured');
    }
    
    return null;
  }
}

