// src/app/api/webhooks/stripe/route.ts

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient as createSupabaseClient } from '@/lib/supabase/server'

// On force le runtime Node (Stripe a besoin du runtime Node, pas Edge)
export const runtime = 'nodejs'

// -----------------------------
// 🔐 Stripe setup
// -----------------------------
function getStripe() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  if (!stripeSecretKey) {
    throw new Error('STRIPE_SECRET_KEY manquant dans .env')
  }
  return new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20',
  })
}

function getWebhookSecret() {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET manquant dans .env')
  }
  return webhookSecret
}

// -----------------------------
// 🧠 Mapping Stripe → plans internes
// -----------------------------
//
// Dans ton .env, tu auras :
// STRIPE_PRICE_LITE_MONTHLY=price_xxx
// STRIPE_PRICE_PRO_MONTHLY=price_yyy
// STRIPE_PRICE_FULL_MONTHLY=price_zzz
const PRICE_LITE = process.env.STRIPE_PRICE_LITE_MONTHLY || process.env.STRIPE_PRICE_LITE
const PRICE_PRO = process.env.STRIPE_PRICE_PRO_MONTHLY || process.env.STRIPE_PRICE_PRO
const PRICE_FULL = process.env.STRIPE_PRICE_FULL_MONTHLY || process.env.STRIPE_PRICE_BUSINESS

type PlanName = 'lite' | 'pro' | 'business'

function mapPriceToPlan(priceId: string | null | undefined): PlanName | null {
  if (!priceId) return null
  
  if (priceId === PRICE_LITE) return 'lite'
  if (priceId === PRICE_PRO) return 'pro'
  if (priceId === PRICE_FULL) return 'business'
  
  return null
}

// -----------------------------
// 🧵 Handler principal webhook
// -----------------------------
export async function POST(req: NextRequest) {
  const body = await req.text() // NE PAS faire req.json() avec Stripe
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    const webhookSecret = getWebhookSecret()
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error('❌ Erreur vérification webhook Stripe:', err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Pour debug au début
  console.log('✅ Webhook Stripe reçu :', event.type)

  try {
    const stripe = getStripe()
    
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event, stripe)
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionEvent(event)
        break

      default:
        // On ignore les autres pour l'instant
        console.log(`ℹ️ Événement Stripe ignoré : ${event.type}`)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err) {
    console.error('❌ Erreur interne dans le handler webhook :', err)
    return NextResponse.json({ error: 'Internal webhook error' }, { status: 500 })
  }
}

// -----------------------------
// 🧾 Handler : checkout.session.completed
// -----------------------------
async function handleCheckoutCompleted(event: Stripe.Event, stripe: Stripe) {
  const session = event.data.object as Stripe.Checkout.Session
  const subscriptionId = session.subscription as string | null
  const customerId = session.customer as string | null
  const organizationId = session.metadata?.organization_id || null
  const userId = session.metadata?.user_id || null

  if (!subscriptionId || !customerId) {
    console.warn('⚠️ session sans subscriptionId ou customerId, on ignore')
    return
  }

  if (!organizationId) {
    console.warn('⚠️ session sans organization_id dans metadata, on ignore')
    return
  }

  // On récupère la subscription chez Stripe pour connaître le price / plan
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const price = subscription.items.data[0]?.price
  const priceId = price?.id || null
  const plan = mapPriceToPlan(priceId)

  if (!plan) {
    console.warn('⚠️ Aucun plan trouvé pour priceId:', priceId)
  }

  const currentPeriodStart = subscription.current_period_start
    ? new Date(subscription.current_period_start * 1000).toISOString()
    : null

  const currentPeriodEnd = subscription.current_period_end
    ? new Date(subscription.current_period_end * 1000).toISOString()
    : null

  // Mapper le status Stripe vers notre enum
  const statusMap: Record<string, 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid'> = {
    'trialing': 'trialing',
    'active': 'active',
    'past_due': 'past_due',
    'canceled': 'canceled',
    'unpaid': 'unpaid',
    'incomplete': 'past_due',
    'incomplete_expired': 'canceled',
  }

  const subscriptionStatus = statusMap[subscription.status] || 'trialing'

  const supabase = await createSupabaseClient()

  // La table subscriptions utilise organization_id (pas restaurant_id ni user_id)
  const { error } = await supabase
    .from('subscriptions')
    .upsert(
      {
        organization_id: organizationId,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        stripe_price_id: priceId,
        plan: plan || 'lite',
        status: subscriptionStatus,
        current_period_start: currentPeriodStart,
        current_period_end: currentPeriodEnd,
        cancel_at_period_end: subscription.cancel_at_period_end || false,
      },
      {
        onConflict: 'stripe_subscription_id',
      },
    )

  if (error) {
    console.error('❌ Erreur Supabase (checkout.session.completed):', error)
    throw error
  }

  console.log('✅ Subscription créée/mise à jour après checkout:', {
    organizationId,
    userId,
    subscriptionId,
    plan,
    status: subscriptionStatus,
  })
}

// -----------------------------
// 📡 Handler : subscription.updated / deleted
// -----------------------------
async function handleSubscriptionEvent(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription
  const subscriptionId = subscription.id
  const customerId = subscription.customer as string | null
  const priceId = subscription.items.data[0]?.price?.id || null
  const plan = mapPriceToPlan(priceId)

  const currentPeriodStart = subscription.current_period_start
    ? new Date(subscription.current_period_start * 1000).toISOString()
    : null

  const currentPeriodEnd = subscription.current_period_end
    ? new Date(subscription.current_period_end * 1000).toISOString()
    : null

  // Mapper le status Stripe vers notre enum
  const statusMap: Record<string, 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid'> = {
    'trialing': 'trialing',
    'active': 'active',
    'past_due': 'past_due',
    'canceled': 'canceled',
    'unpaid': 'unpaid',
    'incomplete': 'past_due',
    'incomplete_expired': 'canceled',
  }

  const status = statusMap[subscription.status] || 'trialing'

  const supabase = await createSupabaseClient()

  const { error } = await supabase
    .from('subscriptions')
    .update({
      stripe_customer_id: customerId,
      stripe_price_id: priceId,
      plan: plan || 'lite',
      status,
      current_period_start: currentPeriodStart,
      current_period_end: currentPeriodEnd,
      cancel_at_period_end: subscription.cancel_at_period_end || false,
    })
    .eq('stripe_subscription_id', subscriptionId)

  if (error) {
    console.error('❌ Erreur Supabase (subscription event):', error)
    throw error
  }

  console.log('✅ Subscription mise à jour via webhook:', {
    subscriptionId,
    plan,
    status,
  })
}
