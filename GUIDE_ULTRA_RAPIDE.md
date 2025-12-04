# ⚡ Guide Ultra-Rapide - Déploiement Vercel

## 🎯 En 3 Étapes Simples

### ✅ Étape 1 : Ouvrir Vercel Dashboard

1. Aller sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionner votre projet (ID: `prj_SnAUtLXzpI26t8gD0bGNlOMjm3N6`)
3. **Settings** → **Environment Variables**

### ✅ Étape 2 : Ajouter les Variables

Copier-coller ces 4 variables (voir le fichier `COPIER_COLLER_VERCEL.txt` pour les valeurs) :

#### Variable 1
```
Nom: NEXT_PUBLIC_SUPABASE_URL
Valeur: https://otuybbxfzjeuxppfihvv.supabase.co
```

#### Variable 2
```
Nom: NEXT_PUBLIC_SUPABASE_ANON_KEY
Valeur: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXliYnhmempldXhwcGZpaHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzAxMDgsImV4cCI6MjA3OTU0NjEwOH0.bUkmSjrZocyRkTK3bK9d3PJN2-kTSIJeWyqbaHbBaJY
```

#### Variable 3 ⚠️
```
Nom: SUPABASE_SERVICE_ROLE_KEY
Valeur: [À récupérer depuis Supabase Dashboard → Settings → API → service_role]
```

#### Variable 4
```
Nom: NEXT_PUBLIC_APP_URL
Valeur: https://shiftpilot.vercel.app
```

**Pour chaque variable :**
- Cocher : ✅ Production, ✅ Preview, ✅ Development
- Cliquer sur **Save**

### ✅ Étape 3 : Déployer

1. Cliquer sur **Deploy** dans Vercel
2. Attendre 2-5 minutes
3. C'est fait ! 🎉

---

## 📝 Après le Déploiement

1. Copier l'URL de production (ex: `https://shiftpilot-xxxxx.vercel.app`)
2. Mettre à jour `NEXT_PUBLIC_APP_URL` avec cette URL
3. Redeployer

---

## 🔍 Fichiers Utiles

- **`COPIER_COLLER_VERCEL.txt`** - Toutes les valeurs en format simple
- **`VERCEL_ENV_VARIABLES_PRETE.md`** - Guide détaillé
- **`VERCEL_DEPLOYMENT_FINAL.md`** - Guide complet

---

**Status** : ✅ Prêt en 3 étapes !

