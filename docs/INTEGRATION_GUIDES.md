# 🔌 GUIDES D'INTÉGRATION - SERVICES EXTERNES

Ce document explique comment intégrer les services externes pour rendre ShiftPilot 100% opérationnel.

---

## 📱 1. INTÉGRATION SMS - TWILIO

### Étape 1 : Créer un compte Twilio

1. Allez sur [twilio.com](https://www.twilio.com)
2. Créez un compte gratuit (crédit de test inclus)
3. Récupérez vos identifiants :
   - **Account SID**
   - **Auth Token**
   - **Phone Number** (numéro Twilio)

### Étape 2 : Ajouter les variables d'environnement

Ajoutez dans `.env.local` :

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

### Étape 3 : Installer le SDK Twilio

```bash
npm install twilio
```

### Étape 4 : Modifier les routes API SMS

**Fichier** : `app/api/sms/send/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";
import twilio from 'twilio';

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

    const body = await request.json();
    const { phone, message, template_id, employee_id } = body;

    if (!phone || !message) {
      return NextResponse.json(
        { error: "phone and message are required" },
        { status: 400 }
      );
    }

    // Initialiser Twilio
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Envoyer le SMS
    const twilioResponse = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone
    });

    const supabase = await createClient();
    
    // Log dans database
    const { data, error } = await supabase
      .from('sms_messages')
      .insert({
        organization_id,
        phone,
        message,
        template_id: template_id || null,
        employee_id: employee_id || null,
        status: twilioResponse.status,
        sent_at: new Date().toISOString(),
        external_id: twilioResponse.sid // Sauvegarder l'ID Twilio
      })
      .select()
      .single();

    if (error) {
      console.error("SMS log error:", error);
    }

    return NextResponse.json({
      success: true,
      message_id: twilioResponse.sid,
      status: twilioResponse.status,
      log_id: data?.id
    });
  } catch (error) {
    console.error("SMS send error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

**Fichier** : `app/api/sms/send-bulk/route.ts` - Même principe, boucler sur les employés

---

## 🤖 2. INTÉGRATION CHATBOT IA - OPENAI

### Étape 1 : Créer un compte OpenAI

1. Allez sur [platform.openai.com](https://platform.openai.com)
2. Créez un compte
3. Ajoutez des crédits
4. Récupérez votre **API Key**

### Étape 2 : Ajouter la variable d'environnement

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Étape 3 : Installer le SDK OpenAI

```bash
npm install openai
```

### Étape 4 : Créer un service IA

**Créer** : `lib/services/ai-service.ts`

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function generateChatbotResponse(
  userMessage: string,
  faqs: Array<{ question: string; answer: string }>,
  organizationContext?: string
): Promise<string> {
  try {
    // Construire le contexte système avec les FAQ
    const systemPrompt = `Tu es un assistant chatbot pour un restaurant. 
Tu dois répondre aux questions des clients de manière amicale et professionnelle.

FAQ disponibles :
${faqs.map(faq => `Q: ${faq.question}\nR: ${faq.answer}`).join('\n\n')}

${organizationContext ? `Contexte: ${organizationContext}` : ''}

Si la question n'est pas dans les FAQ, réponds de manière générale ou demande plus de détails.`;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // ou 'gpt-4' pour plus de qualité
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 200
    });

    return completion.choices[0]?.message?.content || "Je n'ai pas compris votre question.";
  } catch (error) {
    console.error('OpenAI error:', error);
    throw new Error('Erreur lors de la génération de la réponse');
  }
}
```

### Étape 5 : Modifier la route chatbot

**Fichier** : `app/api/chatbot/message/route.ts`

```typescript
import { generateChatbotResponse } from '@/lib/services/ai-service';

// Dans la fonction POST, remplacer la logique de matching simple par :
const response = await generateChatbotResponse(message, faqs || [], org?.name);
```

---

## ⭐ 3. INTÉGRATION GOOGLE REVIEWS - GOOGLE PLACES API

### Étape 1 : Créer un projet Google Cloud

1. Allez sur [console.cloud.google.com](https://console.cloud.google.com)
2. Créez un nouveau projet
3. Activez l'API **Places API** et **Places API (New)**
4. Créez une clé API

### Étape 2 : Ajouter la variable d'environnement

```env
GOOGLE_PLACES_API_KEY=your_api_key_here
```

### Étape 3 : Installer le SDK Google

```bash
npm install @googlemaps/google-maps-services-js
```

### Étape 4 : Créer un service Google Reviews

**Créer** : `lib/services/google-reviews-service.ts`

```typescript
import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

export async function fetchGoogleReviews(placeId: string): Promise<GoogleReview[]> {
  try {
    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        fields: ['reviews', 'rating', 'user_ratings_total'],
        key: process.env.GOOGLE_PLACES_API_KEY!,
      },
    });

    return response.data.result.reviews || [];
  } catch (error) {
    console.error('Google Places API error:', error);
    throw new Error('Erreur lors de la récupération des avis');
  }
}

export async function findPlaceId(organizationName: string, address?: string): Promise<string | null> {
  try {
    const query = address ? `${organizationName}, ${address}` : organizationName;
    
    const response = await client.textSearch({
      params: {
        query,
        key: process.env.GOOGLE_PLACES_API_KEY!,
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
```

### Étape 5 : Créer une route de synchronisation

**Créer** : `app/api/reviews/sync/route.ts`

```typescript
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
        { error: "Google Place ID not configured" },
        { status: 400 }
      );
    }

    // Récupérer les avis depuis Google
    const reviews = await fetchGoogleReviews(org.google_place_id);

    // Synchroniser dans la base de données
    const syncedReviews = [];
    for (const review of reviews) {
      const { data, error } = await supabase
        .from('google_reviews')
        .upsert({
          organization_id,
          reviewer_name: review.author_name,
          rating: review.rating,
          comment: review.text,
          review_date: new Date(review.time * 1000).toISOString(),
          google_review_id: `${org.google_place_id}_${review.time}`,
        }, {
          onConflict: 'google_review_id'
        })
        .select()
        .single();

      if (!error && data) {
        syncedReviews.push(data);
      }
    }

    return NextResponse.json({
      success: true,
      count: syncedReviews.length,
      reviews: syncedReviews
    });
  } catch (error) {
    console.error("Sync reviews error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

### Étape 6 : Ajouter un bouton de synchronisation

Dans `app/dashboard/employer/pilotreview/page.tsx`, ajouter :

```tsx
const handleSyncReviews = async () => {
  try {
    const response = await fetch('/api/reviews/sync', {
      method: 'POST'
    });

    if (!response.ok) throw new Error('Erreur lors de la synchronisation');

    const data = await response.json();
    toast.success(`${data.count} avis synchronisés !`);
    loadReviews();
  } catch (error) {
    console.error('Sync error:', error);
    toast.error('Erreur lors de la synchronisation');
  }
};
```

---

## 🔄 4. AUTOMATISATION (OPTIONNEL)

### Cron Job pour synchronisation automatique

**Créer** : `app/api/cron/sync-reviews/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { fetchGoogleReviews } from "@/lib/services/google-reviews-service";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Vérifier le header secret pour sécuriser le cron
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createClient();
  
  // Récupérer toutes les organisations avec google_place_id
  const { data: orgs } = await supabase
    .from('organizations')
    .select('id, google_place_id')
    .not('google_place_id', 'is', null);

  for (const org of orgs || []) {
    try {
      const reviews = await fetchGoogleReviews(org.google_place_id);
      // Synchroniser...
    } catch (error) {
      console.error(`Error syncing org ${org.id}:`, error);
    }
  }

  return NextResponse.json({ success: true });
}
```

**Configurer dans Vercel** :
- Settings → Cron Jobs
- Ajouter : `0 2 * * *` (tous les jours à 2h du matin)
- URL : `https://votre-domaine.com/api/cron/sync-reviews`
- Secret : Variable d'environnement `CRON_SECRET`

---

## 📋 CHECKLIST D'INTÉGRATION

### SMS (Twilio)
- [ ] Compte Twilio créé
- [ ] Variables d'environnement ajoutées
- [ ] SDK Twilio installé
- [ ] Routes API modifiées
- [ ] Test d'envoi SMS réussi

### Chatbot IA (OpenAI)
- [ ] Compte OpenAI créé
- [ ] Variable d'environnement ajoutée
- [ ] SDK OpenAI installé
- [ ] Service IA créé
- [ ] Route chatbot modifiée
- [ ] Test de réponse IA réussi

### Google Reviews
- [ ] Projet Google Cloud créé
- [ ] Places API activée
- [ ] Variable d'environnement ajoutée
- [ ] SDK Google installé
- [ ] Service Google Reviews créé
- [ ] Route sync créée
- [ ] Test de synchronisation réussi

---

## 💰 COÛTS ESTIMÉS

- **Twilio SMS** : ~0.0075€ par SMS (France)
- **OpenAI GPT-3.5** : ~0.001€ par requête
- **Google Places API** : Gratuit jusqu'à 1000 requêtes/mois, puis ~0.017€ par requête

---

## 🔒 SÉCURITÉ

- ✅ Ne jamais exposer les clés API côté client
- ✅ Utiliser des variables d'environnement
- ✅ Limiter les quotas API
- ✅ Logger les erreurs sans exposer les clés
- ✅ Valider les entrées utilisateur

---

**Une fois ces intégrations faites, votre SaaS sera 100% opérationnel avec des services réels !** 🚀

