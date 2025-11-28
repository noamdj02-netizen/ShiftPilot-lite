# Guide de configuration ShiftPilot

## 1. Configuration Supabase

### Récupérer les informations depuis le dashboard Supabase

1. Allez sur [supabase.com](https://supabase.com) et connectez-vous
2. Sélectionnez votre projet
3. Allez dans **Settings** → **API**
4. Vous trouverez :
   - **Project URL** : `https://xxxxx.supabase.co`
   - **anon/public key** : La clé publique
   - **service_role key** : La clé secrète (⚠️ ne jamais exposer côté client)

### Créer le fichier .env.local

Créez un fichier `.env.local` à la racine du projet avec le contenu suivant :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key

# PostgreSQL (optionnel, pour migrations directes)
POSTGRES_PASSWORD=ZSjOT2sUUfRBb43i
POSTGRES_URL=postgres://postgres.fapfeqinsxlamoolavnc:ZSjOT2sUUfRBb43i@aws-1-eu-west-3.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true
POSTGRES_URL_NON_POOLING=postgres://postgres.fapfeqinsxlamoolavnc:ZSjOT2sUUfRBb43i@aws-1-eu-west-3.pooler.supabase.com:5432/postgres?sslmode=require

# Stripe (à configurer plus tard)
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_PRICE_LITE=price_xxx
STRIPE_PRICE_PRO=price_xxx
STRIPE_PRICE_BUSINESS=price_xxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 2. Exécuter le schéma SQL

1. Dans le dashboard Supabase, allez dans **SQL Editor**
2. Créez un nouveau fichier SQL ou collez le contenu de `supabase/schema.sql`
3. Exécutez le script pour créer toutes les tables, fonctions et politiques RLS

## 3. Générer les types TypeScript

Une fois le schéma créé, générez les types TypeScript :

```bash
# Installer Supabase CLI si ce n'est pas fait
npm install -g supabase

# Se connecter
supabase login

# Lier le projet
supabase link --project-ref votre-project-ref

# Générer les types
npm run db:generate
```

Ou manuellement :

```bash
supabase gen types typescript --project-id votre-project-id > types/database.ts
```

## 4. Tester l'authentification

1. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Allez sur `http://localhost:3000/register`
3. Créez un compte de test
4. Vérifiez que vous êtes redirigé vers `/dashboard` après connexion

## 5. Prochaines étapes

- ✅ Phase 1 : Setup + Auth (Terminée)
- ⏳ Phase 2 : Dashboard Layout + Employees
- ⏳ Phase 3 : Planning + Shifts
- ⏳ Phase 4 : Stripe + Billing
- ⏳ Phase 5 : Features avancées

## ⚠️ Sécurité

- **NE COMMITEZ JAMAIS** le fichier `.env.local` dans Git
- Le fichier est déjà dans `.gitignore`
- Ne partagez jamais vos clés API publiquement
- Utilisez des variables d'environnement différentes pour production

