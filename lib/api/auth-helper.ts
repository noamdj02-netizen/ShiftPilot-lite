import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'OWNER' | 'MANAGER' | 'HR' | 'EMPLOYEE';
  restaurant_id: string | null; // Utilise restaurant_id au lieu de organization_id
  profile: {
    id: string;
    full_name: string | null;
    first_name: string | null;
    last_name: string | null;
    role: string;
    restaurant_id: string | null;
  };
}

/**
 * Vérifie l'authentification et retourne l'utilisateur avec son profil
 */
export async function getAuthenticatedUser(): Promise<{
  user: AuthenticatedUser | null;
  error: NextResponse | null;
}> {
  try {
    const supabase = await createClient();
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return {
        user: null,
        error: NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      };
    }

    // Récupérer le restaurant de l'utilisateur (owner_id)
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('id, nom, owner_id')
      .eq('owner_id', authUser.id)
      .maybeSingle();

    // Extraire les metadata de l'utilisateur pour le profil
    const firstName = authUser.user_metadata?.first_name || 
                     authUser.user_metadata?.name?.split(' ')[0] || 
                     null;
    const lastName = authUser.user_metadata?.last_name || 
                    (authUser.user_metadata?.name?.split(' ').slice(1).join(' ') || null);

    return {
      user: {
        id: authUser.id,
        email: authUser.email || '',
        role: 'OWNER' as AuthenticatedUser['role'], // Avec le nouveau schéma, tous les utilisateurs sont OWNER
        restaurant_id: restaurant?.id || null,
        profile: {
          id: authUser.id,
          full_name: firstName && lastName 
            ? `${firstName} ${lastName}` 
            : firstName || lastName || null,
          first_name: firstName,
          last_name: lastName,
          role: 'owner',
          restaurant_id: restaurant?.id || null
        }
      },
      error: null
    };
  } catch (error) {
    console.error('Error in getAuthenticatedUser:', error);
    return {
      user: null,
      error: NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      )
    };
  }
}

/**
 * Vérifie que l'utilisateur a un restaurant
 */
export async function requireRestaurant(user: AuthenticatedUser): Promise<{
  restaurant_id: string;
  error: NextResponse | null;
}> {
  if (!user.restaurant_id) {
    return {
      restaurant_id: '',
      error: NextResponse.json(
        { error: "Restaurant required. Please create your restaurant first." },
        { status: 403 }
      )
    };
  }

  return {
    restaurant_id: user.restaurant_id,
    error: null
  };
}

/**
 * @deprecated Utilisez requireRestaurant à la place
 * Vérifie que l'utilisateur a une organisation (alias pour requireRestaurant)
 */
export async function requireOrganization(user: AuthenticatedUser): Promise<{
  organization_id: string;
  error: NextResponse | null;
}> {
  const result = await requireRestaurant(user);
  return {
    organization_id: result.restaurant_id,
    error: result.error
  };
}

/**
 * Vérifie que l'utilisateur a les permissions requises
 */
export function requireRole(
  user: AuthenticatedUser,
  allowedRoles: AuthenticatedUser['role'][]
): { allowed: boolean; error: NextResponse | null } {
  if (!allowedRoles.includes(user.role)) {
    return {
      allowed: false,
      error: NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      )
    };
  }

  return { allowed: true, error: null };
}

/**
 * Vérifie que l'utilisateur peut accéder à un restaurant spécifique
 */
export function requireRestaurantAccess(
  user: AuthenticatedUser,
  restaurant_id: string
): { allowed: boolean; error: NextResponse | null } {
  if (user.restaurant_id !== restaurant_id) {
    return {
      allowed: false,
      error: NextResponse.json(
        { error: "Access denied to this restaurant" },
        { status: 403 }
      )
    };
  }

  return { allowed: true, error: null };
}

/**
 * @deprecated Utilisez requireRestaurantAccess à la place
 * Vérifie que l'utilisateur peut accéder à une organisation spécifique (alias pour requireRestaurantAccess)
 */
export function requireOrganizationAccess(
  user: AuthenticatedUser,
  organization_id: string
): { allowed: boolean; error: NextResponse | null } {
  return requireRestaurantAccess(user, organization_id);
}

/**
 * Helper pour créer une réponse d'erreur standardisée
 */
export function errorResponse(
  message: string,
  status: number = 400,
  details?: Record<string, any>
): NextResponse {
  return NextResponse.json({ 
    error: message,
    ...(details && { details })
  }, { status });
}

/**
 * Helper pour créer une réponse de succès standardisée
 */
export function successResponse<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json(data, { status });
}

