# 🚀 DÉPLOIEMENT RAPIDE - SHIFTPILOT

## ✅ ÉTAT ACTUEL

- ✅ **GitHub** : Code synchronisé sur `https://github.com/noamdj02-netizen/ShiftPilot-lite.git`
- ✅ **Dernier commit** : `9514754` - fix: Add missing fields to schedule query
- ✅ **Build** : Prêt pour Vercel

---

## 📋 DÉPLOIEMENT VERCEL - GUIDE RAPIDE

### Méthode 1 : Via Dashboard Vercel (Recommandé - 5 minutes)

1. **Aller sur [vercel.com](https://vercel.com)**
   - Se connecter avec votre compte GitHub

2. **Importer le projet**
   - Cliquer "Add New..." → "Project"
   - Sélectionner le repository `noamdj02-netizen/ShiftPilot-lite`
   - Cliquer "Import"

3. **Configuration automatique**
   - Vercel détecte automatiquement Next.js
   - Framework Preset : Next.js ✅
   - Root Directory : `./` ✅
   - Build Command : `npm run build` ✅

4. **Variables d'environnement** (IMPORTANT)
   
   Cliquer "Environment Variables" et ajouter :
   
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://votre-projet.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = votre-clé-anon
   ```
   
   ⚠️ **Où trouver ces valeurs ?**
   - Aller sur [supabase.com/dashboard](https://supabase.com/dashboard)
   - Sélectionner votre projet
   - Settings → API
   - Copier "Project URL" et "anon public" key

5. **Déployer**
   - Cliquer "Deploy"
   - Attendre 2-3 minutes
   - ✅ Votre app sera disponible sur `https://shiftpilot-lite.vercel.app` (ou nom personnalisé)

---

### Méthode 2 : Via Vercel CLI

```bash
# 1. Installer Vercel CLI (si pas déjà fait)
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Déployer depuis le dossier du projet
vercel

# 4. Suivre les prompts :
# - Set up and deploy? → Y
# - Which scope? → Votre compte
# - Link to existing project? → N (première fois)
# - Project name? → shiftpilot-lite
# - Directory? → ./
# - Override settings? → N

# 5. Ajouter les variables d'environnement
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# 6. Déployer en production
vercel --prod
```

---

## ⚙️ CONFIGURATION POST-DÉPLOIEMENT

### 1. Configurer Supabase Auth Redirect URLs

Après le déploiement, vous obtiendrez une URL Vercel (ex: `https://shiftpilot-lite.vercel.app`)

**Dans Supabase Dashboard** :
1. Aller dans Settings → Authentication → URL Configuration
2. Ajouter dans "Redirect URLs" :
   ```
   https://votre-app.vercel.app/**
   https://votre-app.vercel.app/auth/callback
   ```

### 2. Appliquer les migrations Supabase (CRITIQUE)

⚠️ **IMPORTANT** : La base de données doit être configurée avant d'utiliser l'app

1. Aller dans Supabase Dashboard → SQL Editor
2. Ouvrir le fichier `supabase/migrations/001_complete_schema.sql`
3. Copier tout le contenu
4. Coller dans SQL Editor
5. Cliquer "Run" ou `Ctrl+Enter`
6. ✅ Vérifier qu'il n'y a pas d'erreurs

### 3. Mettre à jour NEXT_PUBLIC_APP_URL dans Vercel

1. Vercel Dashboard → Settings → Environment Variables
2. Ajouter ou modifier :
   ```
   NEXT_PUBLIC_APP_URL = https://votre-app.vercel.app
   ```
3. Redéployer (automatique ou manuel)

---

## ✅ CHECKLIST DE VÉRIFICATION

Après le déploiement, vérifier :

- [ ] Application accessible sur l'URL Vercel
- [ ] Page d'accueil s'affiche correctement
- [ ] Connexion fonctionne (`/login/employer`)
- [ ] Onboarding fonctionne (création d'organisation)
- [ ] Dashboard employeur s'affiche
- [ ] Routes API fonctionnent (pas d'erreurs 500)
- [ ] PWA installable (bouton "Installer" sur mobile/desktop)

---

## 🔄 DÉPLOIEMENTS AUTOMATIQUES

Vercel déploie automatiquement :
- ✅ Chaque push sur `main` → Production
- ✅ Chaque PR → Preview URL

**Pas besoin de redéployer manuellement après chaque commit !**

---

## 🐛 DÉPANNAGE RAPIDE

### Build échoue

**Erreur TypeScript** :
- Vérifier les logs Vercel pour l'erreur exacte
- Les types sont temporairement contournés avec `as any` (normal jusqu'à ce que les migrations soient appliquées)

**Variables manquantes** :
- Vérifier que `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont définies

### Runtime erreurs

**"Supabase connection failed"** :
- Vérifier les variables d'environnement dans Vercel
- Vérifier que Supabase est accessible

**"Unauthorized" ou erreurs d'authentification** :
- Vérifier que les Redirect URLs sont configurées dans Supabase
- Vérifier que les migrations RLS sont appliquées

---

## 📊 MONITORING

### Vercel Analytics
- Settings → Analytics → Activer (optionnel)
- Voir les métriques de performance

### Logs
- Vercel Dashboard → Deployments → Cliquer sur un déploiement → Logs
- Voir les erreurs en temps réel

---

## 🔗 LIENS UTILES

- **Vercel Dashboard** : https://vercel.com/dashboard
- **Supabase Dashboard** : https://supabase.com/dashboard
- **Repository GitHub** : https://github.com/noamdj02-netizen/ShiftPilot-lite

---

## 📝 NOTES IMPORTANTES

1. **Premier déploiement** : Le build peut prendre 3-5 minutes
2. **Migrations** : ⚠️ N'oubliez pas d'appliquer `001_complete_schema.sql` dans Supabase
3. **Variables** : Les variables `NEXT_PUBLIC_*` sont accessibles côté client
4. **Domaine personnalisé** : Possible via Settings → Domains (optionnel)

---

**Status** : ✅ Prêt pour déploiement Vercel

**Temps estimé** : 10-15 minutes (incluant configuration)
