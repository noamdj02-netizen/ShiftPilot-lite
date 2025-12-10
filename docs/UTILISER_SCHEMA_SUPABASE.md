# 📊 Utiliser le schéma ShiftPilot dans Supabase

## 🎯 Où retrouver le schéma dans Supabase Dashboard

### 1. Voir les tables créées

1. Allez sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet ShiftPilot
3. Cliquez sur **Table Editor** dans le menu de gauche
4. Vous verrez toutes les tables :
   - `restaurants`
   - `employes`
   - `plannings`
   - `shifts`
   - `alertes`
   - `indisponibilites`
   - `contraintes_legales`
   - `previsions_activite`
   - `historique_fatigue`
   - `messages_planning`

### 2. Voir la structure des tables

1. Dans **Table Editor**, cliquez sur une table (ex: `restaurants`)
2. Vous verrez :
   - Toutes les colonnes
   - Les types de données
   - Les contraintes (UNIQUE, FOREIGN KEY, etc.)
   - Les index

### 3. Voir les politiques RLS

1. Allez dans **Authentication** → **Policies**
2. Ou dans **Table Editor**, cliquez sur une table → **Policies**
3. Vous verrez toutes les politiques RLS créées

### 4. Tester les requêtes SQL

1. Allez dans **SQL Editor**
2. Exécutez des requêtes de test :

```sql
-- Voir tous les restaurants
SELECT * FROM restaurants;

-- Voir tous les employés
SELECT * FROM employes;

-- Voir les plannings
SELECT * FROM plannings;
```

## 💻 Utiliser le schéma dans votre code

### Exemple : Créer un restaurant

```typescript
// app/api/restaurants/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  
  // Vérifier l'authentification
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  
  const body = await request.json()
  
  // Créer le restaurant
  const { data, error } = await supabase
    .from('restaurants')
    .insert({
      nom: body.nom,
      adresse: body.adresse,
      ville: body.ville,
      owner_id: user.id,
      plan: 'trial'
    })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ data })
}
```

### Exemple : Ajouter un employé

```typescript
// app/api/employes/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  
  const body = await request.json()
  
  // Récupérer le restaurant de l'utilisateur
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single()
  
  if (!restaurant) {
    return NextResponse.json({ error: 'Restaurant non trouvé' }, { status: 404 })
  }
  
  // Créer l'employé
  const { data, error } = await supabase
    .from('employes')
    .insert({
      restaurant_id: restaurant.id,
      prenom: body.prenom,
      nom: body.nom,
      email: body.email,
      telephone: body.telephone,
      role: body.role || 'serveur',
      taux_horaire: body.taux_horaire || 11.65
    })
    .select()
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ data })
}
```

### Exemple : Récupérer un planning avec ses shifts

```typescript
// app/api/plannings/[id]/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  
  // Récupérer le planning avec ses shifts
  const { data, error } = await supabase
    .from('plannings')
    .select(`
      *,
      shifts (
        *,
        employes (
          id,
          prenom,
          nom,
          role,
          couleur
        )
      )
    `)
    .eq('id', params.id)
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ data })
}
```

## 🔧 Générer les types TypeScript

Pour avoir l'autocomplétion dans votre code :

```bash
# Générer les types depuis Supabase
npx supabase gen types typescript --project-id otuybbxfzjeuxppfihvv > types/database.ts
```

Ensuite, utilisez les types dans votre code :

```typescript
import { Database } from '@/types/database'

type Restaurant = Database['public']['Tables']['restaurants']['Row']
type Employe = Database['public']['Tables']['employes']['Row']
type Planning = Database['public']['Tables']['plannings']['Row']
```

## 📝 Requêtes SQL utiles

### Créer un restaurant
```sql
INSERT INTO restaurants (nom, adresse, ville, owner_id, plan)
VALUES ('Mon Restaurant', '123 Rue de Paris', 'Paris', auth.uid(), 'trial');
```

### Ajouter un employé
```sql
INSERT INTO employes (restaurant_id, prenom, nom, email, role, taux_horaire)
VALUES (
  (SELECT id FROM restaurants WHERE owner_id = auth.uid() LIMIT 1),
  'Jean',
  'Dupont',
  'jean@example.com',
  'serveur',
  12.50
);
```

### Voir les employés avec leur restaurant
```sql
SELECT e.*, r.nom as restaurant_nom
FROM employes e
JOIN restaurants r ON e.restaurant_id = r.id;
```

## ✅ Votre schéma est prêt !

Toutes les tables sont disponibles dans Supabase Dashboard et prêtes à être utilisées dans votre application ShiftPilot.

