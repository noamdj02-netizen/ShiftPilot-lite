import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Force dynamic rendering (required for cookies)
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Vérifier l'utilisateur connecté
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    // Validation basique
    if (!body.businessName || !body.userId) {
      return NextResponse.json({ error: "Données incomplètes" }, { status: 400 });
    }

    // 2. Créer l'organisation (Tenant principal)
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      // @ts-ignore - Supabase type inference issue
      .insert({
        name: body.businessName,
        slug: body.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.random().toString(36).substring(2, 7),
        timezone: body.timezone
      })
      .select()
      .single();

    if (orgError || !org) {
      console.error("Error creating org:", orgError);
      const errorMessage = orgError?.message || "Erreur inconnue";
      return NextResponse.json(
        { 
          error: `Erreur lors de la création de l'organisation: ${errorMessage}`,
          details: orgError?.code || 'UNKNOWN_ERROR',
          hint: orgError?.code === 'PGRST116' ? 'La table organizations n\'existe peut-être pas. Vérifiez les migrations.' : undefined
        },
        { status: 500 }
      );
    }

    const orgId = (org as { id: string }).id;

    // 3. Créer l'établissement principal (Site physique)
    // Note: Le schéma utilise 'locations' au lieu de 'establishments'
    const { data: location, error: locationError } = await supabase
      .from('locations')
      // @ts-ignore - Supabase type inference issue
      .insert({
        organization_id: orgId,
        name: body.businessName + ' (Principal)',
        address: `${body.address}, ${body.zipCode} ${body.city}, ${body.country}`,
        phone: body.managerPhone,
        opening_hours: {
          default: { open: body.openingTime, close: body.closingTime }
        },
        city: body.city,
        is_active: true
      })
      .select()
      .single();

    if (locationError) {
      console.error("Error creating location:", locationError);
      // On continue quand même, l'établissement peut être créé plus tard
    }

    // 4. Mettre à jour le profil de l'utilisateur (Admin/Owner)
    // Note: Le trigger handle_new_user a peut-être déjà créé le profil, on fait un update
    const { error: profileError } = await supabase
      .from('profiles')
      // @ts-ignore - Supabase type inference issue
      .update({
        organization_id: orgId,
        role: 'OWNER', // Utiliser 'OWNER' (majuscules) selon le schéma
        default_location_id: location?.id || null,
        phone: body.managerPhone,
        // On stocke les préférences RH dans preferences JSONB pour l'instant
        preferences: {
          max_shift_duration: body.maxShiftDuration,
          min_rest_duration: body.minRestDuration,
          break_duration: body.breakDuration,
          business_type: body.businessType,
          employee_count_range: body.employeeCount
        },
        is_active: true
      })
      .eq('id', user.id);

    if (profileError) {
      console.error("Error updating profile:", profileError);
      // Si l'organisation a été créée mais le profil n'a pas pu être mis à jour,
      // on retourne quand même un succès partiel mais on log l'erreur
      console.warn("Organization created but profile update failed. Organization ID:", orgId);
      // On continue quand même car l'organisation est créée
    }

    // 5. Créer un abonnement 'trialing' par défaut
    // @ts-ignore - Supabase type inference issue
    await supabase.from('subscriptions').insert({
      organization_id: orgId,
      plan: 'lite',
      status: 'trialing',
      trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 jours d'essai
    });

    return NextResponse.json({ 
      success: true, 
      organization: org,
      location: location || null
    });

  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur serveur" },
      { status: 500 }
    );
  }
}

