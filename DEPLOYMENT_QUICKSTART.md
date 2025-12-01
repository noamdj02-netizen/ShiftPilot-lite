# 🚀 DÉPLOIEMENT RAPIDE - SHIFTPILOT

## ✅ GitHub : TERMINÉ

✅ Code poussé sur : `https://github.com/noamdj02-netizen/ShiftPilot-lite.git`
✅ Commit : `6f86399` - "feat: Production-ready refactor"

---

## 🔵 VERCEL : ÉTAPES RAPIDES

### 1. Aller sur Vercel
👉 https://vercel.com/new

### 2. Importer depuis GitHub
- Cliquer "Import Git Repository"
- Sélectionner `noamdj02-netizen/ShiftPilot-lite`
- Cliquer "Import"

### 3. Configuration (Auto-détecté)
- Framework: **Next.js** ✅
- Build Command: `npm run build` ✅
- Output Directory: `.next` ✅

### 4. Variables d'environnement (CRITIQUE)

Cliquer "Environment Variables" et ajouter :

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
SUPABASE_SERVICE_ROLE_KEY = your-service-role-key
NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
```

⚠️ **Remplacer par vos vraies valeurs Supabase**

### 5. Déployer
- Cliquer "Deploy"
- Attendre 2-3 minutes
- ✅ Votre app sera sur `https://your-app.vercel.app`

---

## ⚠️ POST-DÉPLOIEMENT OBLIGATOIRE

### 1. Appliquer migration Supabase

Dans Supabase Dashboard → SQL Editor :

1. Ouvrir `supabase/migrations/001_complete_schema.sql`
2. Copier-coller le contenu
3. Exécuter

### 2. Configurer Supabase Auth

Dans Supabase Dashboard → Settings → URL Configuration :

Ajouter dans "Redirect URLs" :
```
https://your-app.vercel.app/**
https://your-app.vercel.app/auth/callback
```

---

## ✅ VÉRIFICATION

1. ✅ Accéder à l'URL Vercel
2. ✅ Tester `/login/employer`
3. ✅ Tester l'onboarding
4. ✅ Vérifier les routes API

---

## 📚 Documentation complète

Voir `docs/DEPLOYMENT_VERCEL.md` pour les détails.

**Status** : Prêt pour Vercel ! 🚀

