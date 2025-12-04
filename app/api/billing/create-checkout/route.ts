import { NextResponse } from 'next/server';
import { createErrorResponse, requireEnvVars } from '@/lib/api/error-handler';
import { getAuthenticatedUser, requireOrganization, errorResponse } from '@/lib/api/auth-helper';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    // Vérifier l'authentification
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return authError || errorResponse('Unauthorized', 401);
    }

    // Vérifier que l'utilisateur a une organisation
    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError || !organization_id) {
      return orgError || errorResponse('Organization required', 403);
    }

    // Valider les variables d'environnement Stripe
    const envError = requireEnvVars('STRIPE_SECRET_KEY', 'NEXT_PUBLIC_APP_URL');
    if (envError) {
      return envError;
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    if (!stripeSecretKey) {
      return createErrorResponse(
        'Stripe is not configured. Please set STRIPE_SECRET_KEY.',
        500,
        'STRIPE_NOT_CONFIGURED'
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20',
    });

    // Récupérer le plan depuis le body
    const body = await req.json();
    const { priceId, plan } = body;

    if (!priceId && !plan) {
      return errorResponse('Missing required field: priceId or plan', 400);
    }

    // Déterminer le priceId si plan est fourni
    let finalPriceId = priceId;
    if (!finalPriceId && plan) {
      const priceMap: Record<string, string> = {
        lite: process.env.STRIPE_PRICE_LITE || '',
        pro: process.env.STRIPE_PRICE_PRO || '',
        business: process.env.STRIPE_PRICE_BUSINESS || '',
      };
      finalPriceId = priceMap[plan.toLowerCase()];
      
      if (!finalPriceId) {
        return errorResponse(`Invalid plan: ${plan}`, 400);
      }
    }

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: finalPriceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/dashboard/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard/billing?canceled=true`,
      client_reference_id: user.id,
      metadata: {
        organization_id: organization_id,
        user_id: user.id,
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('[Create Checkout] Error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Failed to create checkout session',
      500,
      'CHECKOUT_ERROR'
    );
  }
}

