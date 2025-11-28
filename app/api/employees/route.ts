import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Récupérer l'organization_id
    const { data: profile } = await supabase
      .from("profiles")
      .select("organization_id")
      .eq("id", user.id)
      .single();

    const profileData = profile as { organization_id: string | null } | null;
    
    if (!profileData || !profileData.organization_id) {
      return NextResponse.json({ employees: [] });
    }

    const organizationId = profileData.organization_id;

    // Récupérer tous les employés
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("organization_id", organizationId)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ employees: data || [] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Récupérer l'organization_id
    const { data: profile } = await supabase
      .from("profiles")
      .select("organization_id")
      .eq("id", user.id)
      .single();

    const profileData = profile as { organization_id: string | null } | null;
    
    if (!profileData || !profileData.organization_id) {
      return NextResponse.json(
        { error: "No organization found" },
        { status: 400 }
      );
    }

    const organizationId = profileData.organization_id;

    // Note: Pour créer un employé, il faut d'abord qu'un utilisateur s'inscrive
    // avec cet email. Le trigger handle_new_user() créera automatiquement le profil.
    // Ensuite, on peut mettre à jour le profil avec l'organization_id et les autres infos.
    
    // Pour l'instant, on vérifie si un utilisateur avec cet email existe
    // Si oui, on met à jour son profil. Sinon, on retourne une erreur.
    // TODO: Implémenter l'invitation par email avec Supabase Auth

    // Vérifier si un profil existe déjà avec cet email
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", body.email)
      .single();

    const existingProfileData = existingProfile as { id: string } | null;

    if (existingProfileData) {
      // Mettre à jour le profil existant
      const { data, error } = await (supabase
        .from("profiles") as any)
        .update({
          organization_id: organizationId,
          first_name: body.first_name,
          last_name: body.last_name,
          phone: body.phone,
          role: body.role || "employee",
          hourly_rate: body.hourly_rate,
        })
        .eq("id", existingProfileData.id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ employee: data });
    }

    // Si aucun profil n'existe, on ne peut pas créer d'employé sans utilisateur auth
    return NextResponse.json(
      {
        error:
          "Aucun utilisateur avec cet email. L'utilisateur doit d'abord s'inscrire.",
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

