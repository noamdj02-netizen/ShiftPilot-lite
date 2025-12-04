# 🔐 Variables d'Environnement Vercel - Prêtes à Copier

## 🚀 Identifiants Vercel

### Project ID
```
prj_SnAUtLXzpI26t8gD0bGNlOMjm3N6
```

### Verification Token / API Token
```
vck_8P7aM4mYP72EFPAVUerFhLAu7rPmnohqhMDfqDy1kaARNTMrTd0QWntW
```

---

## ✅ Vos Valeurs Supabase (Récupérées depuis Cursor)

### Variables OBLIGATOIRES - À Copier dans Vercel

```bash
NEXT_PUBLIC_SUPABASE_URL=https://otuybbxfzjeuxppfihvv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXliYnhmempldXhwcGZpaHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzAxMDgsImV4cCI6MjA3OTU0NjEwOH0.bUkmSjrZocyRkTK3bK9d3PJN2-kTSIJeWyqbaHbBaJY
```

### ⚠️ Variable à Récupérer Manuellement

La `SUPABASE_SERVICE_ROLE_KEY` est un secret et doit être récupérée depuis le Dashboard Supabase :

```bash
SUPABASE_SERVICE_ROLE_KEY=VOTRE_SERVICE_ROLE_KEY_ICI
```

**🔍 Comment la récupérer :**
1. Allez sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Settings** → **API**
4. Dans la section **Project API keys**, copiez la clé **service_role** (⚠️ elle commence par `eyJ...`)
5. Collez-la dans Vercel

---

## 📋 Configuration Complète pour Vercel

### Étape 1 : Ouvrir Vercel Dashboard
1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet ShiftPilot (Project ID: `prj_SnAUtLXzpI26t8gD0bGNlOMjm3N6`) ou créez-le si ce n'est pas fait

### Étape 2 : Aller dans Environment Variables
1. Cliquez sur **Settings** (dans le menu de gauche)
2. Cliquez sur **Environment Variables**

### Étape 3 : Ajouter les Variables

Pour chaque variable, suivez ces étapes :
1. Cliquez sur **Add New**
2. Collez le **Nom** et la **Valeur**
3. Cochez : ✅ Production, ✅ Preview, ✅ Development
4. Cliquez sur **Save**

---

## 🚀 Liste Complète des Variables

### 1. Supabase URL
```
Nom: NEXT_PUBLIC_SUPABASE_URL
Valeur: https://otuybbxfzjeuxppfihvv.supabase.co
Environnements: ✅ Production ✅ Preview ✅ Development
```

### 2. Supabase Anon Key
```
Nom: NEXT_PUBLIC_SUPABASE_ANON_KEY
Valeur: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dXliYnhmempldXhwcGZpaHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzAxMDgsImV4cCI6MjA3OTU0NjEwOH0.bUkmSjrZocyRkTK3bK9d3PJN2-kTSIJeWyqbaHbBaJY
Environnements: ✅ Production ✅ Preview ✅ Development
```

### 3. Supabase Service Role Key ⚠️
```
Nom: SUPABASE_SERVICE_ROLE_KEY
Valeur: [À récupérer depuis Supabase Dashboard → Settings → API → service_role key]
Environnements: ✅ Production ✅ Preview ✅ Development
```

### 4. App URL (Temporaire - à mettre à jour après le déploiement)
```
Nom: NEXT_PUBLIC_APP_URL
Valeur: https://shiftpilot.vercel.app
Environnements: ✅ Production ✅ Preview ✅ Development
```

**⚠️ Important :** Après le premier déploiement, remplacez cette valeur par l'URL réelle générée par Vercel.

---

## ⚙️ Variables Optionnelles (Stripe)

Si vous utilisez Stripe pour les paiements, ajoutez aussi :

```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_LITE=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_BUSINESS=price_...
```

## ⚙️ Variable Optionnelle (Resend)

Si vous utilisez Resend pour les emails :

```
EMAIL_API_KEY=re_...
```

---

## ✅ Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL` ajoutée ✅ (valeur prête ci-dessus)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` ajoutée ✅ (valeur prête ci-dessus)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` ajoutée ⚠️ (à récupérer depuis Supabase Dashboard)
- [ ] `NEXT_PUBLIC_APP_URL` ajoutée (temporaire, à mettre à jour après déploiement)
- [ ] Toutes les variables configurées pour Production + Preview + Development
- [ ] Cliquer sur **Deploy** dans Vercel

---

## 🎯 Après Configuration

1. ✅ **Déployez** votre projet dans Vercel
2. ✅ **Attendez** la fin du build (2-5 minutes)
3. ✅ **Copiez** l'URL de production générée (ex: `https://shiftpilot-xxxxx.vercel.app`)
4. ✅ **Mettez à jour** `NEXT_PUBLIC_APP_URL` avec cette URL
5. ✅ **Redeployez** pour que la nouvelle URL soit prise en compte

---

**💡 Astuce :** Vous pouvez copier-coller directement les valeurs ci-dessus dans Vercel (sauf la SERVICE_ROLE_KEY qui doit être récupérée manuellement).

---

**Status** : ✅ **PRÊT - Vos valeurs Supabase sont ci-dessus !**

