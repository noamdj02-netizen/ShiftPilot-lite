import { NextResponse } from 'next/server';
import { createErrorResponse, requireEnvVars } from '@/lib/api/error-handler';
import Stripe from 'stripe';

// Vérifier que Stripe est configuré
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export async function POST(req: Request) {
  try {
    // Valider les variables d'environnement Stripe
    const envError = requireEnvVars('STRIPE_WEBHOOK_SECRET', 'STRIPE_SECRET_KEY');
    if (envError) {
      return envError;
    }

    if (!stripeWebhookSecret || !stripeSecretKey) {
      return createErrorResponse(
        'Stripe webhook is not configured. Please set STRIPE_WEBHOOK_SECRET and STRIPE_SECRET_KEY.',
        500,
        'STRIPE_NOT_CONFIGURED'
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-06-20',
    });

    // Récupérer le body et la signature
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return createErrorResponse(
        'Missing stripe-signature header',
        400,
        'MISSING_SIGNATURE'
      );
    }

    let event: Stripe.Event;

    try {
      // Vérifier la signature du webhook
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        stripeWebhookSecret
      );
    } catch (err) {
      const error = err as Error;
      console.error('[Stripe Webhook] Signature verification failed:', error.message);
      return createErrorResponse(
        `Webhook signature verification failed: ${error.message}`,
        400,
        'INVALID_SIGNATURE'
      );
    }

    // Traiter les événements Stripe
    switch (event.type) {
      case 'checkout.session.completed':
        // TODO: Implémenter la logique pour gérer l'achat réussi
        console.log('[Stripe Webhook] Checkout session completed:', event.data.object);
        break;
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        // TODO: Implémenter la logique pour mettre à jour l'abonnement
        console.log('[Stripe Webhook] Subscription updated:', event.data.object);
        break;
      
      case 'customer.subscription.deleted':
        // TODO: Implémenter la logique pour annuler l'abonnement
        console.log('[Stripe Webhook] Subscription deleted:', event.data.object);
        break;
      
      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true, eventType: event.type });
  } catch (error) {
    console.error('[Stripe Webhook] Error:', error);
    return createErrorResponse(
      error instanceof Error ? error.message : 'Unknown error processing webhook',
      500,
      'WEBHOOK_ERROR'
    );
  }
}

