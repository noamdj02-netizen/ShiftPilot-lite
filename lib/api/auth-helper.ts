import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'OWNER' | 'MANAGER' | 'HR' | 'EMPLOYEE';
  organization_id: string | null;
  profile: {
    id: string;
    full_name: string | null;
    first_name: string | null;
    last_name: string | null;
    role: string;
    organization_id: string | null;
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

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (profileError || !profile) {
      return {
        user: null,
        error: NextResponse.json({ error: "Profile not found" }, { status: 404 })
      };
    }

    return {
      user: {
        id: authUser.id,
        email: authUser.email || '',
        role: profile.role as AuthenticatedUser['role'],
        organization_id: profile.organization_id,
        profile: {
          id: profile.id,
          full_name: profile.first_name && profile.last_name 
            ? `${profile.first_name} ${profile.last_name}` 
            : profile.first_name || profile.last_name || null,
          first_name: profile.first_name,
          last_name: profile.last_name,
          role: profile.role,
          organization_id: profile.organization_id
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
 * Vérifie que l'utilisateur a une organisation
 */
export async function requireOrganization(user: AuthenticatedUser): Promise<{
  organization_id: string;
  error: NextResponse | null;
}> {
  if (!user.organization_id) {
    return {
      organization_id: '',
      error: NextResponse.json(
        { error: "Organization required. Please complete onboarding." },
        { status: 403 }
      )
    };
  }

  return {
    organization_id: user.organization_id,
    error: null
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
 * Vérifie que l'utilisateur peut accéder à une organisation spécifique
 */
export function requireOrganizationAccess(
  user: AuthenticatedUser,
  organization_id: string
): { allowed: boolean; error: NextResponse | null } {
  if (user.organization_id !== organization_id) {
    return {
      allowed: false,
      error: NextResponse.json(
        { error: "Access denied to this organization" },
        { status: 403 }
      )
    };
  }

  return { allowed: true, error: null };
}

/**
 * Helper pour créer une réponse d'erreur standardisée
 */
export function errorResponse(
  message: string,
  status: number = 400
): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Helper pour créer une réponse de succès standardisée
 */
export function successResponse<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json(data, { status });
}

