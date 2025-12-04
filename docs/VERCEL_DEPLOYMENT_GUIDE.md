# 🚀 Guide de Déploiement Vercel - ShiftPilot

## 🎯 Vue d'ensemble

Ce guide vous accompagne pas à pas pour déployer ShiftPilot sur Vercel, configurer les variables d'environnement, et tester en production.

---

## 📋 Prérequis

- ✅ Compte GitHub avec le repo ShiftPilot
- ✅ Compte Vercel (gratuit via [vercel.com](https://vercel.com))
- ✅ Projet Supabase configuré
- ✅ Migrations Supabase appliquées

---

## 🔧 Étape 1 : Préparation du Repo GitHub

### 1.1 Vérifier que tout est commité
```bash
git status
git add .
git commit -m "feat: Complete ShiftPilot SaaS implementation"
git push origin main
```

### 1.2 Vérifier le repo GitHub
- Aller sur votre repo GitHub
- Vérifier que tous les fichiers sont présents
- Vérifier la branche `main` (ou `master`)

---

## 🌐 Étape 2 : Configuration Vercel

### 2.1 Créer un nouveau projet
1. Aller sur [vercel.com/new](https://vercel.com/new)
2. Se connecter avec GitHub
3. Cliquer sur **Import Git Repository**
4. Sélectionner votre repo `ShiftPilot-lite`
5. Cliquer sur **Import**

### 2.2 Configuration du projet
- **Project Name**: `shiftpilot` (ou votre choix)
- **Framework Preset**: Next.js (détecté automatiquement)
- **Root Directory**: `./` (par défaut)
- **Build Command**: `npm run build` (par défaut)
- **Output Directory**: `.next` (par défaut)
- **Install Command**: `npm install` (par défaut)

⚠️ **NE PAS CLIQUER SUR DEPLOY ENCORE** - On configure les variables d'environnement d'abord

---

## 🔐 Étape 3 : Configuration des Variables d'Environnement

### 3.1 Accéder aux Variables d'Environnement
1. Dans la page de configuration du projet Vercel
2. Cliquer sur **Environment Variables** dans le menu de gauche
3. Ou après le déploiement : **Settings → Environment Variables**

### 3.2 Ajouter les Variables (Obligatoires)

#### Supabase - Variables Publiques
Ces variables sont accessibles côté client (commencent par `NEXT_PUBLIC_`)

| Variable | Description | Où la trouver |
|----------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de votre projet Supabase | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anonyme Supabase | Supabase Dashboard → Settings → API → Project API keys → anon public |

#### Supabase - Variables Privées (Serveur uniquement)

| Variable | Description | Où la trouver |
|----------|-------------|---------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role (⚠️ SECRÈTE) | Supabase Dashboard → Settings → API → Project API keys → service_role |

#### App

| Variable | Description | Valeur |
|----------|-------------|--------|
| `NEXT_PUBLIC_APP_URL` | URL de votre app Vercel | `https://votre-app.vercel.app` (après le premier déploiement) |

### 3.3 Ajouter les Variables (Optionnelles)

#### Stripe (si vous utilisez le paiement)
| Variable | Description | Où la trouver |
|----------|-------------|---------------|
| `STRIPE_SECRET_KEY` | Clé secrète Stripe | Stripe Dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Secret webhook Stripe | Stripe Dashboard → Developers → Webhooks |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe | Stripe Dashboard → Developers → API keys |
| `STRIPE_PRICE_LITE` | Price ID Lite | Stripe Dashboard → Products |
| `STRIPE_PRICE_PRO` | Price ID Pro | Stripe Dashboard → Products |
| `STRIPE_PRICE_BUSINESS` | Price ID Business | Stripe Dashboard → Products |

#### Resend (si vous utilisez les emails)
| Variable | Description | Où la trouver |
|----------|-------------|---------------|
| `EMAIL_API_KEY` | Clé API Resend | Resend Dashboard → API Keys |

### 3.4 Configuration par Environnement

Pour chaque variable, choisir les environnements :
- ✅ **Production**
- ✅ **Preview** (recommandé pour tester)
- ✅ **Development** (optionnel)

### 3.5 Exemple de Configuration Complète

```bash
# Supabase (OBLIGATOIRE)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# App (OBLIGATOIRE - à remplacer après le premier déploiement)
NEXT_PUBLIC_APP_URL=https://shiftpilot.vercel.app

# Stripe (OPTIONNEL)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_LITE=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_BUSINESS=price_...

# Resend (OPTIONNEL)
EMAIL_API_KEY=re_...
```

---

## 🚀 Étape 4 : Déploiement

### 4.1 Premier Déploiement
1. Une fois toutes les variables d'environnement ajoutées
2. Cliquer sur **Deploy**
3. Attendre la fin du build (2-5 minutes)

### 4.2 Mise à jour de NEXT_PUBLIC_APP_URL
1. Une fois le déploiement terminé
2. Copier l'URL de production (ex: `https://shiftpilot-xxxxx.vercel.app`)
3. Aller dans **Settings → Environment Variables**
4. Modifier `NEXT_PUBLIC_APP_URL` avec la nouvelle URL
5. **Redeployer** pour que la variable soit prise en compte

---

## ✅ Étape 5 : Vérifications Post-Déploiement

### 5.1 Vérifier le Déploiement
1. Aller sur l'URL de production
2. Vérifier que la page se charge
3. Vérifier la console du navigateur (F12) pour les erreurs

### 5.2 Tests Fonctionnels

#### Test 1 : Authentification
- [ ] Aller sur `/login/employer`
- [ ] Créer un compte ou se connecter
- [ ] Vérifier la redirection après login

#### Test 2 : Dashboard
- [ ] Accéder à `/dashboard`
- [ ] Vérifier que les KPIs se chargent
- [ ] Vérifier qu'il n'y a pas d'erreurs dans la console

#### Test 3 : Planning
- [ ] Accéder à `/dashboard/planning`
- [ ] Vérifier que la page se charge
- [ ] Tester la navigation entre semaines

#### Test 4 : Employés
- [ ] Accéder à `/dashboard/employees`
- [ ] Vérifier que la liste se charge (même si vide)

#### Test 5 : API Routes
Tester quelques routes API directement :
```bash
# Tester le dashboard overview (nécessite auth)
curl https://votre-app.vercel.app/api/dashboard/overview

# Devrait retourner 401 Unauthorized (normal sans auth)
```

### 5.3 Vérifier les Logs
1. Dans Vercel Dashboard → **Deployments**
2. Cliquer sur le dernier déploiement
3. Aller dans **Functions** pour voir les logs des API routes
4. Vérifier qu'il n'y a pas d'erreurs

---

## 🔍 Étape 6 : Résolution de Problèmes

### Problème : Build échoue
**Solutions:**
1. Vérifier les logs de build dans Vercel
2. Vérifier que toutes les dépendances sont dans `package.json`
3. Vérifier que `next.config.js` est correct
4. Tester le build localement : `npm run build`

### Problème : Erreurs 500 en production
**Solutions:**
1. Vérifier les logs dans Vercel → Deployments → Functions
2. Vérifier les variables d'environnement
3. Vérifier que Supabase est accessible
4. Vérifier les RLS policies dans Supabase

### Problème : Erreurs d'authentification
**Solutions:**
1. Vérifier `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Vérifier que les migrations Supabase sont appliquées
3. Vérifier que RLS est bien configuré
4. Vérifier les logs Supabase Dashboard → Logs

### Problème : Variables d'environnement non prises en compte
**Solutions:**
1. Vérifier que les variables sont dans le bon environnement (Production/Preview)
2. Redéployer après avoir ajouté/modifié des variables
3. Vérifier que les variables commencent bien par `NEXT_PUBLIC_` si nécessaire côté client

---

## 🎯 Étape 7 : Configuration de Domain Personnalisé (Optionnel)

### 7.1 Ajouter un Domain
1. Dans Vercel Dashboard → **Settings → Domains**
2. Ajouter votre domaine (ex: `shiftpilot.com`)
3. Suivre les instructions DNS

### 7.2 Mettre à jour NEXT_PUBLIC_APP_URL
1. Mettre à jour `NEXT_PUBLIC_APP_URL` avec votre domaine
2. Redéployer

---

## 📊 Étape 8 : Monitoring et Analytics

### 8.1 Vercel Analytics (Recommandé)
1. Dans Vercel Dashboard → **Analytics**
2. Activer **Web Analytics** (gratuit)
3. Surveiller les performances

### 8.2 Logs et Monitoring
- Vérifier régulièrement les logs dans Vercel
- Configurer des alertes si nécessaire
- Monitorer les erreurs dans la console

---

## ✅ Checklist Finale

### Avant le Déploiement
- [ ] Migrations Supabase appliquées
- [ ] Variables d'environnement préparées
- [ ] Code commité et pushé sur GitHub
- [ ] Build local réussi (`npm run build`)

### Configuration Vercel
- [ ] Projet créé sur Vercel
- [ ] Repo GitHub lié
- [ ] Variables d'environnement ajoutées
- [ ] Configuration du projet correcte

### Après le Déploiement
- [ ] Site accessible
- [ ] Authentification fonctionnelle
- [ ] Dashboard accessible
- [ ] Routes API fonctionnelles
- [ ] Pas d'erreurs dans la console
- [ ] Logs vérifiés

---

## 🎉 Félicitations !

Votre application ShiftPilot est maintenant déployée sur Vercel et accessible en production !

### Prochaines Étapes
1. ✅ Tester toutes les fonctionnalités
2. ✅ Configurer un domaine personnalisé
3. ✅ Activer le monitoring
4. ✅ Inviter des utilisateurs beta
5. ✅ Collecter des feedbacks

---

**Date**: 2024
**Status**: ✅ Guide complet

