# 📋 Variables d'Environnement Vercel - À Copier/Coller

## ⚡ Instructions Rapides

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `shiftpilot`
3. **Settings** → **Environment Variables**
4. Pour chaque variable ci-dessous :
   - Cliquez **Add New**
   - Collez le nom et la valeur
   - Cochez ✅ **Production**, ✅ **Preview**, ✅ **Development**
   - Cliquez **Save**

---

## ✅ Variables OBLIGATOIRES

### 1. Supabase URL
```
NEXT_PUBLIC_SUPABASE_URL
```
Valeur :
```
https://otuybbxfzjeuxppfihvv.supabase.co
```

---

### 2. Supabase Publishable Key
```
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
```
Valeur :
```
sb_publishable_XH6CjSHU-PCUvm-o_8xmIg_srdDxlor
```

---

### 3. Supabase Service Role Key
```
SUPABASE_SERVICE_ROLE_KEY
```
⚠️ **À récupérer depuis Supabase Dashboard** :
1. Allez sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. **Settings** → **API**
4. Copiez la clé **service_role** (section "Project API keys")
5. Collez-la ici

Valeur (exemple) :
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 4. Application URL (Temporaire - à mettre à jour après déploiement)
```
NEXT_PUBLIC_APP_URL
```
Valeur temporaire (remplacez après le premier déploiement) :
```
https://shiftpilot.vercel.app
```

**⚠️ Après avoir ajouté votre domaine personnalisé, mettez à jour avec :**
```
https://votre-domaine.com
```

---

## ⚙️ Variables OPTIONNELLES (si utilisées)

### Stripe (si vous utilisez les paiements)

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_LITE_MONTHLY
STRIPE_PRICE_PRO_MONTHLY
STRIPE_PRICE_FULL_MONTHLY
```

---

### Resend (si vous utilisez les emails)

```
EMAIL_API_KEY
```

---

### Twilio (si vous utilisez les SMS)

```
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER
```

---

### Google Maps (si vous utilisez les cartes)

```
GOOGLE_MAPS_API_KEY
```

---

## 📝 Checklist

- [ ] `NEXT_PUBLIC_SUPABASE_URL` ajoutée
- [ ] `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` ajoutée
- [ ] `SUPABASE_SERVICE_ROLE_KEY` ajoutée (⚠️ récupérer depuis Supabase)
- [ ] `NEXT_PUBLIC_APP_URL` ajoutée (temporaire)
- [ ] Toutes les variables configurées pour **Production** + **Preview** + **Development**
- [ ] Redéployé après avoir ajouté les variables

---

## 🚀 Après Configuration

1. ✅ Redéployez : **Deployments** → Cliquez sur les 3 points → **Redeploy**
2. ✅ Vérifiez que le build réussit
3. ✅ Testez l'application sur l'URL Vercel
4. ✅ Ajoutez votre domaine personnalisé
5. ✅ Mettez à jour `NEXT_PUBLIC_APP_URL` avec votre domaine
6. ✅ Redéployez à nouveau

---

## 🔗 Liens Utiles

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Guide de déploiement complet](DEPLOY_VERCEL_RAPIDE.md)

