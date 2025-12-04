# 🚀 Guide Complet de Déploiement - ShiftPilot

## 🎯 Vue d'ensemble

Ce guide complet vous accompagne étape par étape pour déployer ShiftPilot en production :
1. ✅ Appliquer les migrations Supabase
2. ✅ Configurer les variables d'environnement sur Vercel
3. ✅ Déployer sur Vercel
4. ✅ Tester en production

---

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Étape 1 : Migrations Supabase](#étape-1--migrations-supabase)
3. [Étape 2 : Configuration Vercel](#étape-2--configuration-vercel)
4. [Étape 3 : Variables d'Environnement](#étape-3--variables-denvironnement)
5. [Étape 4 : Déploiement](#étape-4--déploiement)
6. [Étape 5 : Tests](#étape-5--tests)
7. [Résolution de Problèmes](#résolution-de-problèmes)

---

## 📦 Prérequis

- ✅ Compte GitHub avec le repo ShiftPilot
- ✅ Compte Supabase ([supabase.com](https://supabase.com))
- ✅ Compte Vercel ([vercel.com](https://vercel.com))
- ✅ Accès au code du projet

---

## 🗄️ Étape 1 : Migrations Supabase

### Option A : Via Supabase Dashboard (⭐ Recommandé)

#### 1.1 Accéder au SQL Editor
1. Connectez-vous à [supabase.com](https://supabase.com)
2. Sélectionnez votre projet (ou créez-en un)
3. Dans le menu de gauche, cliquez sur **SQL Editor**
4. Cliquez sur **New query**

#### 1.2 Appliquer la Migration 001 (FONDATION)
1. Ouvrez le fichier : `supabase/migrations/001_complete_schema.sql`
2. **Copiez tout le contenu** (Ctrl+A puis Ctrl+C)
3. Collez dans le SQL Editor de Supabase
4. Cliquez sur **Run** (ou appuyez sur `Ctrl+Enter`)
5. ⚠️ **Vérifiez les résultats** - Il ne doit pas y avoir d'erreur

**Temps estimé** : 30-60 secondes

#### 1.3 Appliquer la Migration 002 (CORRECTIONS)
1. Ouvrez le fichier : `supabase/migrations/002_consolidate_schema_fixes.sql`
2. **Copiez tout le contenu**
3. Collez dans un **nouveau query** dans le SQL Editor
4. Cliquez sur **Run**
5. ⚠️ **Vérifiez les résultats**

**Temps estimé** : 10-30 secondes

#### 1.4 Appliquer la Migration 003 (OPTIMISATIONS)
1. Ouvrez le fichier : `supabase/migrations/003_enhance_rls_policies.sql`
2. **Copiez tout le contenu**
3. Collez dans un **nouveau query** dans le SQL Editor
4. Cliquez sur **Run**
5. ⚠️ **Vérifiez les résultats**

**Temps estimé** : 10-30 secondes

#### 1.5 Vérifier les Migrations
Exécutez cette requête dans le SQL Editor pour vérifier :

```sql
-- Vérifier les tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Vous devriez voir **12 tables** :
- ✅ organizations
- ✅ locations
- ✅ profiles
- ✅ employees
- ✅ schedules
- ✅ shifts
- ✅ time_off_requests
- ✅ message_channels
- ✅ messages
- ✅ labor_rules
- ✅ notifications
- ✅ audit_logs

**✅ Migrations complétées !**

### Option B : Via Supabase CLI (Alternative)

```bash
# Installer Supabase CLI
npm install -g supabase

# Lier le projet
supabase link --project-ref VOTRE_PROJECT_REF

# Appliquer les migrations
supabase db push
```

---

## 🌐 Étape 2 : Configuration Vercel

### 2.1 Créer un Compte Vercel
1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur **Sign Up**
3. Se connecter avec **GitHub** (recommandé)

### 2.2 Importer le Projet
1. Une fois connecté, cliquer sur **Add New...** → **Project**
2. Cliquer sur **Import Git Repository**
3. Chercher et sélectionner votre repo `ShiftPilot-lite`
4. Cliquer sur **Import**

### 2.3 Configurer le Projet
- **Project Name** : `shiftpilot` (ou votre choix)
- **Framework Preset** : Next.js (détecté automatiquement)
- **Root Directory** : `./` (par défaut)
- **Build Command** : `npm run build` (par défaut)
- **Output Directory** : `.next` (par défaut)

⚠️ **NE PAS CLIQUER SUR DEPLOY ENCORE** - On configure les variables d'environnement d'abord !

---

## 🔐 Étape 3 : Variables d'Environnement

### 3.1 Accéder aux Variables
Dans la page de configuration du projet Vercel :
1. Cliquer sur **Environment Variables** dans le menu de gauche
2. Ou après le déploiement : **Settings** → **Environment Variables**

### 3.2 Variables Obligatoires

#### 🔹 Supabase - URL et Clés

**1. NEXT_PUBLIC_SUPABASE_URL**
- **Description** : URL de votre projet Supabase
- **Où trouver** : Supabase Dashboard → **Settings** → **API** → **Project URL**
- **Exemple** : `https://xxxxxxxxxxxxx.supabase.co`
- **Environnements** : ✅ Production, ✅ Preview

**2. NEXT_PUBLIC_SUPABASE_ANON_KEY**
- **Description** : Clé anonyme Supabase (publique)
- **Où trouver** : Supabase Dashboard → **Settings** → **API** → **Project API keys** → **anon public**
- **Exemple** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Environnements** : ✅ Production, ✅ Preview

**3. SUPABASE_SERVICE_ROLE_KEY**
- **Description** : Clé service role (⚠️ SECRÈTE - serveur uniquement)
- **Où trouver** : Supabase Dashboard → **Settings** → **API** → **Project API keys** → **service_role**
- **Exemple** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Environnements** : ✅ Production, ✅ Preview
- ⚠️ **Ne jamais exposer cette clé côté client !**

#### 🔹 Application

**4. NEXT_PUBLIC_APP_URL**
- **Description** : URL de votre application Vercel
- **Valeur temporaire** : `https://shiftpilot.vercel.app`
- **⚠️ À mettre à jour** après le premier déploiement avec l'URL réelle
- **Environnements** : ✅ Production, ✅ Preview

### 3.3 Variables Optionnelles

#### 🔹 Stripe (si vous utilisez le paiement)

| Variable | Où trouver |
|----------|------------|
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API keys |
| `STRIPE_PRICE_LITE` | Stripe Dashboard → Products → Prices |
| `STRIPE_PRICE_PRO` | Stripe Dashboard → Products → Prices |
| `STRIPE_PRICE_BUSINESS` | Stripe Dashboard → Products → Prices |

#### 🔹 Resend (si vous utilisez les emails)

| Variable | Où trouver |
|----------|------------|
| `EMAIL_API_KEY` | Resend Dashboard → API Keys |

### 3.4 Comment Ajouter une Variable

1. Dans **Environment Variables**, cliquer sur **Add New**
2. Entrer le **Key** (nom de la variable)
3. Entrer la **Value** (valeur)
4. Sélectionner les **Environments** (Production, Preview, Development)
5. Cliquer sur **Save**
6. Répéter pour chaque variable

### 3.5 Liste Complète à Copier/Coller

Pour faciliter, voici la liste complète à configurer :

```
✅ OBLIGATOIRES:
NEXT_PUBLIC_SUPABASE_URL = https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL = https://shiftpilot.vercel.app (à mettre à jour après déploiement)

⚪ OPTIONNEL (Stripe):
STRIPE_SECRET_KEY = sk_live_...
STRIPE_WEBHOOK_SECRET = whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_...
STRIPE_PRICE_LITE = price_...
STRIPE_PRICE_PRO = price_...
STRIPE_PRICE_BUSINESS = price_...

⚪ OPTIONNEL (Resend):
EMAIL_API_KEY = re_...
```

---

## 🚀 Étape 4 : Déploiement

### 4.1 Premier Déploiement
1. Une fois toutes les variables ajoutées
2. Cliquer sur **Deploy** en bas de la page
3. ⏳ Attendre 2-5 minutes que le build se termine

### 4.2 Surveiller le Build
- Les logs de build s'affichent en temps réel
- ⚠️ **Vérifier qu'il n'y a pas d'erreurs**
- Si erreur, consulter les logs pour comprendre

### 4.3 Obtenir l'URL de Production
1. Une fois le build terminé, vous verrez :
   - ✅ **Ready** en vert
   - L'URL de production (ex: `https://shiftpilot-xxxxx.vercel.app`)

2. **Copier cette URL** - vous en aurez besoin !

### 4.4 Mettre à Jour NEXT_PUBLIC_APP_URL
1. Aller dans **Settings** → **Environment Variables**
2. Trouver `NEXT_PUBLIC_APP_URL`
3. Cliquer sur **Edit**
4. Remplacer par l'URL de production réelle
5. Cliquer sur **Save**
6. **Redeployer** (Aller dans **Deployments** → Cliquer sur les 3 points → **Redeploy**)

⚠️ **Important** : Cette étape est nécessaire pour que certaines fonctionnalités fonctionnent correctement.

---

## ✅ Étape 5 : Tests

### 5.1 Test Basique
1. Ouvrir l'URL de production dans un navigateur
2. Vérifier que la page se charge
3. Ouvrir la console (F12) et vérifier qu'il n'y a pas d'erreurs rouges

### 5.2 Tests Fonctionnels

#### ✅ Test 1 : Page d'Accueil
- [ ] Page se charge correctement
- [ ] Pas d'erreurs dans la console
- [ ] Navigation fonctionne

#### ✅ Test 2 : Authentification
- [ ] Aller sur `/login/employer`
- [ ] Page de login s'affiche
- [ ] Créer un compte test
- [ ] Se connecter avec le compte créé
- [ ] Redirection vers `/dashboard` fonctionne

#### ✅ Test 3 : Dashboard
- [ ] Page `/dashboard` accessible
- [ ] KPIs s'affichent (même si 0)
- [ ] Pas d'erreurs dans la console
- [ ] Navigation latérale fonctionne

#### ✅ Test 4 : Planning
- [ ] Page `/dashboard/planning` accessible
- [ ] Planning s'affiche (même si vide)
- [ ] Navigation entre semaines fonctionne

#### ✅ Test 5 : Employés
- [ ] Page `/dashboard/employees` accessible
- [ ] Liste se charge (même si vide)

#### ✅ Test 6 : Congés
- [ ] Page `/dashboard/time-off` accessible
- [ ] Liste se charge

#### ✅ Test 7 : Messages
- [ ] Page `/dashboard/messages` accessible
- [ ] Interface s'affiche

#### ✅ Test 8 : Paramètres
- [ ] Page `/dashboard/settings` accessible
- [ ] Informations s'affichent

### 5.3 Tests API (Optionnel)
Tester quelques routes API directement :
```bash
# Devrait retourner 401 (normal sans auth)
curl https://votre-app.vercel.app/api/dashboard/overview
```

---

## 🔍 Résolution de Problèmes

### ❌ Problème : Build échoue
**Solutions:**
1. Vérifier les logs de build dans Vercel
2. Vérifier que `package.json` est correct
3. Tester le build localement : `npm run build`
4. Vérifier les erreurs dans les logs

### ❌ Problème : Erreur 500 en production
**Solutions:**
1. Vérifier les logs : Vercel Dashboard → **Deployments** → **Functions**
2. Vérifier les variables d'environnement
3. Vérifier que Supabase est accessible
4. Vérifier les migrations Supabase

### ❌ Problème : Erreurs d'authentification
**Solutions:**
1. Vérifier `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Vérifier que les migrations sont appliquées
3. Vérifier les logs Supabase : Dashboard → **Logs**

### ❌ Problème : Variables d'environnement non prises en compte
**Solutions:**
1. Redéployer après avoir ajouté/modifié des variables
2. Vérifier que les variables sont dans le bon environnement
3. Vérifier l'orthographe des noms de variables

### ❌ Problème : Tables Supabase manquantes
**Solutions:**
1. Vérifier que toutes les migrations ont été appliquées
2. Vérifier l'ordre d'application (001, 002, 003)
3. Vérifier les erreurs dans le SQL Editor

---

## 📊 Vérifications Finales

### ✅ Checklist Complète
- [ ] Migrations Supabase appliquées (001, 002, 003)
- [ ] 12 tables créées dans Supabase
- [ ] RLS policies actives
- [ ] Variables d'environnement configurées dans Vercel
- [ ] Déploiement réussi sur Vercel
- [ ] Site accessible sur l'URL de production
- [ ] Authentification fonctionnelle
- [ ] Dashboard accessible
- [ ] Pas d'erreurs dans la console
- [ ] Logs vérifiés (pas d'erreurs critiques)

---

## 🎉 Félicitations !

Votre application **ShiftPilot est maintenant déployée en production** ! 🚀

### Prochaines Étapes
1. ✅ Tester toutes les fonctionnalités
2. ✅ Configurer un domaine personnalisé (optionnel)
3. ✅ Activer le monitoring (Vercel Analytics)
4. ✅ Inviter des utilisateurs beta
5. ✅ Collecter des feedbacks

---

## 📚 Documentation Additionnelle

Pour plus de détails, consultez :
- 📄 `docs/SUPABASE_MIGRATIONS_GUIDE.md` - Guide détaillé des migrations
- 📄 `docs/VERCEL_DEPLOYMENT_GUIDE.md` - Guide détaillé Vercel
- 📄 `DEPLOYMENT_CHECKLIST.md` - Checklist complète
- 📄 `README.md` - Documentation générale

---

**Date** : 2024
**Version** : 1.0.0
**Status** : ✅ Guide complet et prêt à l'emploi

