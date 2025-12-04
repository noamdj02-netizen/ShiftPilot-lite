# 🔐 Variables d'Environnement Vercel - ShiftPilot

## 📋 Instructions

Copiez ces variables dans **Vercel Dashboard → Settings → Environment Variables**

Sélectionnez les environnements : ✅ Production, ✅ Preview, ✅ Development

---

## ✅ Variables OBLIGATOIRES

### Supabase - URL et Clés

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
```

**🔍 Où trouver ces valeurs :**
1. Allez sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Settings** → **API**
4. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ SECRET

### Application URL

```bash
NEXT_PUBLIC_APP_URL=https://YOUR_PROJECT_NAME.vercel.app
```

**⚠️ Important :** 
- Pour le premier déploiement, mettez une URL temporaire (ex: `https://shiftpilot.vercel.app`)
- Après le premier déploiement, remplacez par votre vraie URL Vercel

---

## ⚙️ Variables OPTIONNELLES

### Stripe (si vous utilisez les paiements)

```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_LITE=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_BUSINESS=price_...
```

**🔍 Où trouver :** [dashboard.stripe.com](https://dashboard.stripe.com)

### Resend (si vous utilisez les emails)

```bash
EMAIL_API_KEY=re_...
```

**🔍 Où trouver :** [resend.com/api-keys](https://resend.com/api-keys)

---

## 📝 Checklist de Configuration

- [ ] `NEXT_PUBLIC_SUPABASE_URL` ajoutée
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` ajoutée
- [ ] `SUPABASE_SERVICE_ROLE_KEY` ajoutée ⚠️
- [ ] `NEXT_PUBLIC_APP_URL` ajoutée (temporaire)
- [ ] Variables Stripe ajoutées (si nécessaire)
- [ ] Variable Resend ajoutée (si nécessaire)
- [ ] Toutes les variables configurées pour Production + Preview + Development

---

## 🚀 Après Configuration

1. ✅ Cliquez sur **Deploy** dans Vercel
2. ✅ Attendez la fin du build (2-5 minutes)
3. ✅ Copiez l'URL de production générée
4. ✅ Mettez à jour `NEXT_PUBLIC_APP_URL` avec cette URL
5. ✅ Redeployez

---

**Status** : ⏳ En attente de vos valeurs Supabase

