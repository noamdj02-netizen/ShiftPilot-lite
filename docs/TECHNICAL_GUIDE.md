# 🚀 SHIFTPILOT - GUIDE TECHNIQUE COMPLET

## 📋 TABLE DES MATIÈRES

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Migrations Supabase](#migrations-supabase)
4. [Démarrage](#démarrage)
5. [Architecture](#architecture)
6. [Flux Utilisateur](#flux-utilisateur)
7. [API Routes](#api-routes)
8. [Tests](#tests)
9. [Déploiement](#déploiement)

---

## 🔧 INSTALLATION

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Supabase (ou instance locale)
- Git

### Étapes

```bash
# 1. Cloner le repository
git clone <repo-url>
cd shiftpilot-lite-landing

# 2. Installer les dépendances
npm install

# 3. Copier le fichier d'environnement
cp env.example .env.local

# 4. Configurer les variables d'environnement (voir section Configuration)
```

---

## ⚙️ CONFIGURATION

### Variables d'environnement (`.env.local`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe (optionnel, pour billing)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend (optionnel, pour emails)
RESEND_API_KEY=re_...
```

### Obtenir les clés Supabase

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un projet
3. Aller dans **Settings** → **API**
4. Copier `URL` et `anon public key`
5. Pour `service_role_key` : **Settings** → **API** → **service_role** (⚠️ Ne jamais exposer côté client)

---

## 🗄️ MIGRATIONS SUPABASE

### Appliquer les migrations

#### Option 1 : Via Supabase Dashboard

1. Aller dans **SQL Editor**
2. Ouvrir `supabase/migrations/001_complete_schema.sql`
3. Copier-coller le contenu
4. Exécuter

#### Option 2 : Via Supabase CLI

```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter
supabase login

# Lier le projet
supabase link --project-ref your-project-ref

# Appliquer les migrations
supabase db push
```

### Vérifier les migrations

```sql
-- Vérifier que les tables existent
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Vérifier RLS
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

### ⚠️ Notes importantes

- La migration `001_complete_schema.sql` est **complète et autonome**
- Elle crée toutes les tables, indexes, RLS policies, triggers
- Si des tables existent déjà, certaines commandes peuvent échouer (utiliser `IF NOT EXISTS`)
- En cas de conflit, vérifier les noms de tables et ajuster si nécessaire

---

## 🚀 DÉMARRAGE

### Mode développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### Build production

```bash
npm run build
npm start
```

### Générer les types TypeScript depuis Supabase

```bash
npm run db:generate
```

Cela met à jour `types/database.ts` avec les types générés depuis votre schéma Supabase.

---

## 🏗️ ARCHITECTURE

### Structure du projet

```
shiftpilot-lite-landing/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Routes authentification
│   ├── (dashboard)/       # Dashboard général
│   ├── (marketing)/       # Pages marketing
│   ├── dashboard/employer/ # Dashboard employeur
│   ├── employee/          # Dashboard employé
│   └── api/               # Routes API
├── components/            # Composants React
│   ├── dashboard/         # Composants dashboard
│   ├── layout/            # Layout components
│   └── ui/                # UI primitives
├── lib/                   # Utilitaires et services
│   ├── api/               # Helpers API
│   ├── services/          # Services backend
│   └── supabase/          # Clients Supabase
├── hooks/                 # React hooks personnalisés
├── supabase/
│   └── migrations/        # Migrations SQL
└── types/                 # Types TypeScript
```

### Flux de données

```
Client (React) 
  → API Routes (Next.js)
    → Supabase Client (Server)
      → PostgreSQL (Supabase)
        → RLS Policies (Sécurité)
```

### Multi-tenancy

- **Isolation** : Chaque organisation a son `organization_id`
- **RLS** : Toutes les queries sont filtrées par `organization_id`
- **Permissions** : Role-based (OWNER, MANAGER, HR, EMPLOYEE)

---

## 👤 FLUX UTILISATEUR

### 1. Onboarding Employeur

**Route** : `/login/employer` → `/dashboard/employer`

**Flow** :
1. Utilisateur se connecte (Supabase Auth)
2. Si pas d'organisation → Formulaire d'onboarding s'affiche
3. Formulaire remplit :
   - Nom entreprise
   - Adresse, ville, pays
   - Nombre d'employés
   - Type établissement
4. **API** : `POST /api/auth/onboarding-employer`
   - Crée `organizations`
   - Crée `locations` (premier établissement)
   - Met à jour `profiles` (role = OWNER)
   - Crée `labor_rules` (règles par défaut)
   - Crée `message_channels` (canal général)
5. Redirection vers dashboard

### 2. Création d'un Planning

**Route** : `/dashboard/employer/planning`

**Flow** :
1. Employeur clique "Nouveau planning"
2. Sélectionne semaine + établissement
3. **API** : `POST /api/schedules`
   - Crée `schedules` (status = DRAFT)
4. Interface d'édition :
   - Ajouter shifts (POST /api/shifts)
   - Modifier shifts (PATCH /api/shifts/:id)
   - Supprimer shifts (DELETE /api/shifts/:id)
5. Valider → **API** : `PATCH /api/schedules/:id/status` (status = VALIDATED)
6. Publier → **API** : `PATCH /api/schedules/:id/status` (status = PUBLISHED)
   - Notifications créées pour tous les employés
   - Shifts marqués `is_published = true`

### 3. Vue Employé

**Route** : `/employee`

**Flow** :
1. Employé se connecte
2. **API** : `GET /api/employee/me/schedule`
   - Récupère shifts de la semaine actuelle + suivante
   - Filtre par `profile_id` (RLS)
3. Affiche planning
4. Peut :
   - Voir ses shifts
   - Demander congé (POST /api/time-off)
   - Envoyer message (POST /api/messages)

### 4. Gestion Demandes de Congés

**Route** : `/dashboard/employer/timeoff`

**Flow** :
1. Manager voit liste demandes (GET /api/time-off)
2. Approuve/Refuse → **API** : `PATCH /api/time-off/:id`
   - Met à jour `status` (APPROVED/REJECTED)
   - Notification créée pour l'employé

---

## 🔌 API ROUTES

### Authentification

#### `POST /api/auth/onboarding-employer`
Crée organisation + location + règles RH

**Body** :
```json
{
  "businessName": "Mon Restaurant",
  "brandName": "MR",
  "address": "123 Rue Example",
  "city": "Paris",
  "country": "FR",
  "timezone": "Europe/Paris",
  "locationName": "Restaurant Principal"
}
```

**Response** :
```json
{
  "success": true,
  "organization": { "id": "...", "name": "..." },
  "location": { "id": "...", "name": "..." }
}
```

### Dashboard

#### `GET /api/dashboard/overview`
Retourne KPIs pour l'employeur

**Response** :
```json
{
  "kpis": {
    "activeEmployees": 12,
    "hoursThisWeek": 186.5,
    "estimatedCost": 24500.00,
    "complianceScore": 98.5,
    "pendingTimeOffRequests": 3,
    "shiftsToday": 8
  },
  "week": {
    "start": "2024-01-15T00:00:00Z",
    "end": "2024-01-21T23:59:59Z"
  }
}
```

### Schedules

#### `POST /api/schedules`
Crée un nouveau planning

**Body** :
```json
{
  "location_id": "uuid",
  "week_start_date": "2024-01-15"
}
```

#### `GET /api/schedules?week_start=2024-01-15&location_id=uuid`
Récupère planning(s) avec shifts

#### `PATCH /api/schedules/:id/status`
Change statut (DRAFT → VALIDATED → PUBLISHED)

**Body** :
```json
{
  "status": "PUBLISHED"
}
```

### Shifts

#### `POST /api/shifts`
Crée un shift (ou batch)

**Body** :
```json
{
  "schedule_id": "uuid",
  "employee_id": "uuid",
  "role": "Serveur",
  "start_time": "2024-01-15T09:00:00Z",
  "end_time": "2024-01-15T17:00:00Z",
  "break_minutes": 30
}
```

#### `DELETE /api/shifts/:id`
Supprime un shift

### Time Off

#### `POST /api/time-off`
Employé crée demande

**Body** :
```json
{
  "start_date": "2024-02-01",
  "end_date": "2024-02-05",
  "reason": "Vacances"
}
```

#### `PATCH /api/time-off/:id`
Manager approuve/refuse

**Body** :
```json
{
  "status": "APPROVED"
}
```

### Employee

#### `GET /api/employee/me/schedule?week_start=2024-01-15`
Planning employé (semaine actuelle + suivante)

### Messages

#### `POST /api/messages`
Envoyer message

**Body** :
```json
{
  "channel_id": "uuid",
  "content": "Message texte"
}
```

#### `GET /api/messages?channel_id=uuid`
Récupérer messages d'un canal

---

## 🧪 TESTS

### Test manuel - Flux complet

#### 1. Créer compte employeur

```bash
# 1. Aller sur http://localhost:3000/login/employer
# 2. Créer compte
# 3. Remplir onboarding
# 4. Vérifier redirection vers /dashboard/employer
```

#### 2. Créer un planning

```bash
# 1. Aller sur /dashboard/employer/planning
# 2. Cliquer "Nouveau planning"
# 3. Sélectionner semaine
# 4. Ajouter des shifts
# 5. Publier
# 6. Vérifier que les shifts sont visibles
```

#### 3. Tester vue employé

```bash
# 1. Créer un compte employé (ou modifier un profile en EMPLOYEE)
# 2. Se connecter sur /employee
# 3. Vérifier que le planning publié est visible
# 4. Tester demande de congé
```

### Test API avec curl

```bash
# 1. Obtenir un token (via Supabase Auth)
TOKEN="your-jwt-token"

# 2. Tester overview
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/dashboard/overview

# 3. Créer un planning
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"location_id":"...","week_start_date":"2024-01-15"}' \
  http://localhost:3000/api/schedules
```

---

## 🚢 DÉPLOIEMENT

### Vercel (Recommandé)

1. **Connecter le repo** :
   - Aller sur [vercel.com](https://vercel.com)
   - Importer le projet GitHub

2. **Configurer les variables d'environnement** :
   - Dans Vercel Dashboard → Settings → Environment Variables
   - Ajouter toutes les variables de `.env.local`

3. **Déployer** :
   - Push sur `main` → Déploiement automatique

### Autres plateformes

- **Netlify** : Similaire à Vercel
- **Railway** : Support Next.js natif
- **Self-hosted** : Docker + Node.js

### Post-déploiement

1. ✅ Vérifier que les migrations Supabase sont appliquées
2. ✅ Tester l'onboarding
3. ✅ Vérifier les emails (si configuré)
4. ✅ Tester PWA (manifest, service worker)

---

## 📚 RESSOURCES

### Documentation

- **Plan de refonte** : `docs/REFACTOR_PLAN.md`
- **Progression** : `docs/PROGRESS.md`
- **Design System** : `docs/DESIGN_SYSTEM.md`

### Supabase

- [Documentation Supabase](https://supabase.com/docs)
- [RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [TypeScript Types](https://supabase.com/docs/reference/javascript/typescript-support)

### Next.js

- [Next.js 14 Docs](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)

---

## 🆘 DÉPANNAGE

### Problème : "Unauthorized" sur les routes API

**Solution** : Vérifier que :
1. L'utilisateur est bien connecté (Supabase Auth)
2. Le profil existe dans `profiles`
3. `organization_id` est défini (si requis)

### Problème : RLS bloque les queries

**Solution** : Vérifier que :
1. Les policies RLS sont bien créées
2. L'utilisateur a bien un `organization_id`
3. Les queries incluent `organization_id` dans les filtres

### Problème : Types TypeScript incorrects

**Solution** :
```bash
npm run db:generate
```

### Problème : Migration échoue

**Solution** :
1. Vérifier les conflits de noms de tables
2. Utiliser `IF NOT EXISTS` si nécessaire
3. Appliquer migration par migration si plusieurs fichiers

---

## ✅ CHECKLIST PRODUCTION

- [ ] Variables d'environnement configurées
- [ ] Migrations Supabase appliquées
- [ ] RLS policies vérifiées
- [ ] Types TypeScript générés
- [ ] Tests manuels effectués
- [ ] PWA testée (installation)
- [ ] Responsive vérifié (mobile + desktop)
- [ ] Performance optimisée
- [ ] Monitoring configuré (optionnel)
- [ ] Backup Supabase configuré

---

**Status** : Documentation complète ✅

Pour toute question, consulter les fichiers dans `docs/` ou les commentaires dans le code.

