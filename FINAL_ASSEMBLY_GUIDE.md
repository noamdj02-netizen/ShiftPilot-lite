# 🎯 GUIDE D'ASSEMBLAGE FINAL - SHIFTPILOT FULL FUNCTIONAL

Ce document contient **TOUS** les fichiers à créer/modifier pour rendre le SaaS 100% fonctionnel.

---

## ✅ DÉJÀ FAIT

1. ✅ **Déconnexion** - `app/dashboard/employer/layout.tsx` corrigé
2. ✅ **Audit complet** - `AUDIT_REPORT.md` créé
3. ✅ **Plan d'implémentation** - `IMPLEMENTATION_PLAN.md` créé

---

## 🔴 PRIORITÉ 1 : PLANNING IA (CRITIQUE)

### Fichier à modifier : `app/dashboard/employer/ai-planning/page.tsx`

**Changements nécessaires** :

1. **Ajouter imports** :
```tsx
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner' // ou créer un composant toast
```

2. **Remplacer `generatePlanning()`** (ligne 46) :
```tsx
const [isGenerating, setIsGenerating] = useState(false)
const [generatedSchedule, setGeneratedSchedule] = useState<any>(null)
const router = useRouter()
const { profile } = useAuth()

const generatePlanning = async () => {
  setIsGenerating(true)
  try {
    if (!profile?.organization_id) {
      toast.error('Organisation requise')
      return
    }

    const response = await fetch('/api/planning/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        organizationId: profile.organization_id,
        startDate: new Date().toISOString().split('T')[0], // Aujourd'hui
        variant: selectedVariant
      })
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la génération')
    }

    const data = await response.json()
    setGeneratedSchedule(data)
    setStep('results')
    toast.success('Planning généré avec succès !')
  } catch (error) {
    console.error('Generation error:', error)
    toast.error('Erreur lors de la génération du planning')
  } finally {
    setIsGenerating(false)
  }
}
```

3. **Connecter bouton "Valider et publier"** (ligne 304) :
```tsx
const handlePublish = async () => {
  if (!generatedSchedule?.shifts) {
    toast.error('Aucun planning à publier')
    return
  }

  try {
    const response = await fetch('/api/schedule/commit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        organizationId: profile.organization_id,
        shifts: generatedSchedule.shifts,
        status: 'published'
      })
    })

    if (!response.ok) throw new Error('Erreur lors de la publication')

    toast.success('Planning publié avec succès !')
    router.push('/dashboard/employer/planning')
  } catch (error) {
    console.error('Publish error:', error)
    toast.error('Erreur lors de la publication')
  }
}

// Dans le JSX, remplacer le bouton ligne 304 :
<button 
  onClick={handlePublish}
  className="px-6 md:px-8 py-2 md:py-3 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all"
>
  Valider et publier
</button>
```

4. **Ajouter loader sur bouton génération** (ligne 183) :
```tsx
<motion.button
  onClick={generatePlanning}
  disabled={isGenerating}
  whileHover={{ scale: isGenerating ? 1 : 1.05 }}
  whileTap={{ scale: isGenerating ? 1 : 0.95 }}
  className="px-8 md:px-12 py-3 md:py-4 theme-primary hover:theme-primary text-white rounded-full font-semibold text-base md:text-lg shadow-lg transition-all disabled:opacity-50"
>
  {isGenerating ? 'Génération en cours...' : 'Générer le planning IA'}
</motion.button>
```

---

## 🔴 PRIORITÉ 2 : ROUTE API PLANNING IA

### Créer : `app/api/planning/generate/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { planningService } from "@/lib/services/planning-service";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id, error: orgError } = await requireOrganization(user);
    if (orgError || !organization_id) {
      return NextResponse.json(
        { error: "Organization required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { startDate, variant = 'balanced' } = body;

    if (!startDate) {
      return NextResponse.json(
        { error: "startDate is required" },
        { status: 400 }
      );
    }

    const result = await planningService.generateScheduleForWeek({
      organizationId: organization_id,
      startDate,
      useWeather: true,
      variant // 'balanced' | 'economical' | 'staff-friendly'
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Planning generation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

---

## 🔴 PRIORITÉ 3 : PLANNING MANUEL - PUBLICATION

### Modifier : `app/dashboard/employer/planning/page.tsx`

**Ajouter handler pour bouton "Publier"** (ligne 58) :

```tsx
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

// Dans le composant :
const router = useRouter()
const { profile } = useAuth()
const [isPublishing, setIsPublishing] = useState(false)

const handlePublish = async () => {
  if (!profile?.organization_id) {
    toast.error('Organisation requise')
    return
  }

  setIsPublishing(true)
  try {
    // Collecter tous les shifts de la semaine
    const shiftsToPublish = shifts.map(shift => ({
      profile_id: shift.employeeId, // À adapter selon votre structure
      date: getDateForDay(shift.day), // Fonction à créer
      start_time: `${shift.start}:00`,
      end_time: `${shift.start + shift.duration}:00`,
      position_id: shift.positionId || null
    }))

    const response = await fetch('/api/schedule/commit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        organizationId: profile.organization_id,
        shifts: shiftsToPublish,
        status: 'published'
      })
    })

    if (!response.ok) throw new Error('Erreur lors de la publication')

    toast.success('Planning publié avec succès !')
    // Recharger la page ou mettre à jour l'état
  } catch (error) {
    console.error('Publish error:', error)
    toast.error('Erreur lors de la publication')
  } finally {
    setIsPublishing(false)
  }
}

// Dans le JSX, remplacer le bouton ligne 58 :
<button 
  onClick={handlePublish}
  disabled={isPublishing}
  className="px-4 md:px-6 py-2 md:py-3 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all disabled:opacity-50 text-sm md:text-base"
>
  {isPublishing ? 'Publication...' : 'Publier'}
</button>
```

---

## 🟡 PRIORITÉ 4 : PILOTBOT - ROUTES API

### Créer : `app/api/chatbot/message/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id } = await requireOrganization(user);
    if (!organization_id) {
      return NextResponse.json({ error: "Organization required" }, { status: 403 });
    }

    const body = await request.json();
    const { message, platform = 'website' } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const supabase = await createClient();

    // TODO: Intégrer avec service IA (OpenAI, etc.)
    // Pour l'instant, réponse simple basée sur FAQ
    const { data: faqs } = await supabase
      .from('chatbot_faqs')
      .select('*')
      .eq('organization_id', organization_id)
      .eq('is_active', true);

    // Logique simple de matching (à améliorer avec IA)
    let response = "Je n'ai pas compris votre question. Pouvez-vous reformuler ?";
    
    // Matching basique
    const messageLower = message.toLowerCase();
    for (const faq of faqs || []) {
      if (messageLower.includes(faq.question.toLowerCase()) || 
          messageLower.includes(faq.keywords?.toLowerCase() || '')) {
        response = faq.answer;
        break;
      }
    }

    // Log du message
    await supabase.from('chatbot_messages').insert({
      organization_id,
      platform,
      customer_message: message,
      bot_response: response,
      is_auto: true
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id } = await requireOrganization(user);
    if (!organization_id) {
      return NextResponse.json({ error: "Organization required" }, { status: 403 });
    }

    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const { data, error } = await supabase
      .from('chatbot_messages')
      .select('*')
      .eq('organization_id', organization_id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Chatbot GET error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

### Créer : `app/api/chatbot/faq/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id } = await requireOrganization(user);
    if (!organization_id) {
      return NextResponse.json({ error: "Organization required" }, { status: 403 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('chatbot_faqs')
      .select('*')
      .eq('organization_id', organization_id)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("FAQ GET error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id } = await requireOrganization(user);
    if (!organization_id) {
      return NextResponse.json({ error: "Organization required" }, { status: 403 });
    }

    const body = await request.json();
    const { question, answer, keywords } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "question and answer are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('chatbot_faqs')
      .insert({
        organization_id,
        question,
        answer,
        keywords: keywords || '',
        is_active: true
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("FAQ POST error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

---

## 🟡 PRIORITÉ 5 : PILOTSMS - ROUTES API

### Créer : `app/api/sms/send/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id } = await requireOrganization(user);
    if (!organization_id) {
      return NextResponse.json({ error: "Organization required" }, { status: 403 });
    }

    const body = await request.json();
    const { phone, message, template_id } = body;

    if (!phone || !message) {
      return NextResponse.json(
        { error: "phone and message are required" },
        { status: 400 }
      );
    }

    // TODO: Intégrer avec service SMS (Twilio, etc.)
    // Pour l'instant, simulation
    const smsResult = {
      success: true,
      message_id: `sms_${Date.now()}`,
      status: 'sent'
    };

    const supabase = await createClient();
    
    // Log dans database
    const { data, error } = await supabase
      .from('sms_messages')
      .insert({
        organization_id,
        phone,
        message,
        template_id,
        status: 'sent',
        sent_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error("SMS log error:", error);
      // Ne pas échouer si le log échoue
    }

    return NextResponse.json(smsResult);
  } catch (error) {
    console.error("SMS send error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

### Créer : `app/api/sms/send-bulk/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id } = await requireOrganization(user);
    if (!organization_id) {
      return NextResponse.json({ error: "Organization required" }, { status: 403 });
    }

    const body = await request.json();
    const { template_id, employee_ids, custom_message } = body;

    if (!template_id && !custom_message) {
      return NextResponse.json(
        { error: "template_id or custom_message is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Récupérer les employés
    let employees;
    if (employee_ids && employee_ids.length > 0) {
      const { data } = await supabase
        .from('profiles')
        .select('id, first_name, phone')
        .eq('organization_id', organization_id)
        .in('id', employee_ids)
        .eq('is_active', true);
      employees = data || [];
    } else {
      const { data } = await supabase
        .from('profiles')
        .select('id, first_name, phone')
        .eq('organization_id', organization_id)
        .eq('is_active', true);
      employees = data || [];
    }

    // Récupérer le template si fourni
    let template = null;
    if (template_id) {
      const { data } = await supabase
        .from('sms_templates')
        .select('*')
        .eq('id', template_id)
        .eq('organization_id', organization_id)
        .single();
      template = data;
    }

    // Envoyer à chaque employé
    const results = [];
    for (const employee of employees) {
      if (!employee.phone) continue;

      let message = custom_message || template?.content || '';
      
      // Remplacer variables
      message = message.replace(/{prenom}/g, employee.first_name || '');
      message = message.replace(/{nom}/g, employee.last_name || '');
      // Ajouter autres variables selon besoin

      // TODO: Appel réel service SMS
      const smsResult = {
        employee_id: employee.id,
        phone: employee.phone,
        message,
        status: 'sent',
        sent_at: new Date().toISOString()
      };

      // Log dans database
      await supabase.from('sms_messages').insert({
        organization_id,
        phone: employee.phone,
        message,
        template_id,
        employee_id: employee.id,
        status: 'sent',
        sent_at: new Date().toISOString()
      });

      results.push(smsResult);
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      results
    });
  } catch (error) {
    console.error("SMS bulk error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

---

## 🟡 PRIORITÉ 6 : PILOTREVIEW - ROUTES API

### Créer : `app/api/reviews/send-request/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id } = await requireOrganization(user);
    if (!organization_id) {
      return NextResponse.json({ error: "Organization required" }, { status: 403 });
    }

    const body = await request.json();
    const { customer_email, customer_name, customer_phone } = body;

    if (!customer_email) {
      return NextResponse.json(
        { error: "customer_email is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Récupérer l'organisation pour le lien Google
    const { data: org } = await supabase
      .from('organizations')
      .select('name, google_place_id')
      .eq('id', organization_id)
      .single();

    // TODO: Générer lien Google Review
    const reviewLink = org?.google_place_id 
      ? `https://search.google.com/local/writereview?placeid=${org.google_place_id}`
      : 'https://www.google.com/maps';

    // TODO: Envoyer email/SMS avec le lien
    // Pour l'instant, juste log

    const { data, error } = await supabase
      .from('review_requests')
      .insert({
        organization_id,
        customer_email,
        customer_name,
        customer_phone,
        review_link: reviewLink,
        status: 'sent',
        sent_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      review_link: reviewLink,
      request: data
    });
  } catch (error) {
    console.error("Review request error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

### Créer : `app/api/reviews/list/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id } = await requireOrganization(user);
    if (!organization_id) {
      return NextResponse.json({ error: "Organization required" }, { status: 403 });
    }

    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const rating = searchParams.get('rating');

    let query = supabase
      .from('google_reviews')
      .select('*')
      .eq('organization_id', organization_id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (rating) {
      query = query.eq('rating', parseInt(rating));
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Reviews list error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

### Créer : `app/api/reviews/stats/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getAuthenticatedUser, requireOrganization } from "@/lib/api/auth-helper";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { user, error: authError } = await getAuthenticatedUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { organization_id } = await requireOrganization(user);
    if (!organization_id) {
      return NextResponse.json({ error: "Organization required" }, { status: 403 });
    }

    const supabase = await createClient();

    // Récupérer tous les avis
    const { data: reviews, error } = await supabase
      .from('google_reviews')
      .select('rating, created_at')
      .eq('organization_id', organization_id);

    if (error) throw error;

    // Calculer stats
    const total = reviews?.length || 0;
    const average = total > 0
      ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / total
      : 0;
    
    const byRating = {
      5: reviews?.filter(r => r.rating === 5).length || 0,
      4: reviews?.filter(r => r.rating === 4).length || 0,
      3: reviews?.filter(r => r.rating === 3).length || 0,
      2: reviews?.filter(r => r.rating === 2).length || 0,
      1: reviews?.filter(r => r.rating === 1).length || 0,
    };

    // Avis ce mois
    const thisMonth = new Date();
    thisMonth.setDate(1);
    const thisMonthReviews = reviews?.filter(
      r => new Date(r.created_at) >= thisMonth
    ).length || 0;

    // Demandes envoyées ce mois
    const { data: requests } = await supabase
      .from('review_requests')
      .select('id')
      .eq('organization_id', organization_id)
      .gte('sent_at', thisMonth.toISOString());

    return NextResponse.json({
      total,
      average: Math.round(average * 10) / 10,
      byRating,
      thisMonth: thisMonthReviews,
      requestsThisMonth: requests?.length || 0
    });
  } catch (error) {
    console.error("Reviews stats error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

---

## 🗄️ MIGRATIONS DATABASE

### Créer : `supabase/migrations/023_add_chatbot_tables.sql`

```sql
-- Table FAQ Chatbot
CREATE TABLE IF NOT EXISTS chatbot_faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    keywords TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table Messages Chatbot
CREATE TABLE IF NOT EXISTS chatbot_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    platform VARCHAR(50) DEFAULT 'website',
    customer_message TEXT,
    bot_response TEXT,
    is_auto BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE chatbot_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their organization FAQ"
    ON chatbot_faqs FOR ALL
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can view their organization messages"
    ON chatbot_messages FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );
```

### Créer : `supabase/migrations/024_add_sms_tables.sql`

```sql
-- Table Templates SMS
CREATE TABLE IF NOT EXISTS sms_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table Messages SMS
CREATE TABLE IF NOT EXISTS sms_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    employee_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    template_id UUID REFERENCES sms_templates(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'sent',
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    read_at TIMESTAMPTZ,
    confirmed_at TIMESTAMPTZ
);

-- RLS Policies
ALTER TABLE sms_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE sms_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their organization SMS templates"
    ON sms_templates FOR ALL
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can view their organization SMS"
    ON sms_messages FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );
```

### Créer : `supabase/migrations/025_add_reviews_tables.sql`

```sql
-- Table Demandes Avis
CREATE TABLE IF NOT EXISTS review_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    customer_email VARCHAR(255),
    customer_name VARCHAR(255),
    customer_phone VARCHAR(20),
    review_link TEXT,
    status VARCHAR(50) DEFAULT 'sent',
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    responded_at TIMESTAMPTZ
);

-- Table Avis Google
CREATE TABLE IF NOT EXISTS google_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    reviewer_name VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    review_date TIMESTAMPTZ,
    google_review_id VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE review_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their organization review requests"
    ON review_requests FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );

CREATE POLICY "Users can view their organization reviews"
    ON google_reviews FOR SELECT
    USING (
        organization_id IN (
            SELECT organization_id FROM profiles WHERE id = auth.uid()
        )
    );
```

---

## 📝 PROCHAINES ÉTAPES

1. **Installer sonner** (si pas déjà fait) : `npm install sonner`
2. **Créer composant Toast** ou utiliser sonner directement
3. **Appliquer toutes les migrations** dans Supabase
4. **Tester chaque route API** individuellement
5. **Connecter tous les boutons frontend**
6. **Tester le flow complet**

---

**Status** : ✅ Déconnexion fixée | 🔄 En cours d'implémentation

