# 🚀 Déploiement sur shiftpilot.fr - Guide rapide

## ✅ Déploiement terminé

Votre application est déployée sur Vercel :
- **URL de production** : https://shiftpilot-lite-landing-8hm6b145a.vercel.app
- **Inspect** : https://vercel.com/noam-brochets-projects-2ea9c979/shiftpilot-lite-landing/6gkasRJc7bUcJhV4r2xnjsT6nBhT

---

## 🌐 Configuration du domaine shiftpilot.fr

### Étape 1 : Ajouter le domaine dans Vercel Dashboard

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez le projet **shiftpilot-lite-landing**
3. Allez dans **Settings** → **Domains**
4. Cliquez sur **Add Domain**
5. Entrez `shiftpilot.fr` et `www.shiftpilot.fr`
6. Cliquez sur **Add**

### Étape 2 : Configurer les enregistrements DNS

Vercel vous donnera des instructions DNS. Configurez-les chez votre registrar :

#### Configuration DNS recommandée :

**Option A : Pointage via CNAME (Recommandé)**
```
Type    Name    Value
CNAME   @       cname.vercel-dns.com
CNAME   www     cname.vercel-dns.com
```

**Option B : Pointage via A records (si CNAME non supporté)**
```
Type    Name    Value
A       @       76.76.21.21
A       @       76.223.126.88
CNAME   www     shiftpilot.fr
```

### Étape 3 : Vérifier la configuration DNS

Une fois les DNS configurés, attendez 5-10 minutes, puis :

1. Retournez sur Vercel Dashboard → Settings → Domains
2. Vérifiez que le statut passe à **Valid Configuration** (coche verte)

### Étape 4 : Vérifier HTTPS automatique

Vercel configure automatiquement le certificat SSL. Le statut doit passer à **Valid** après quelques minutes.

---

## ⚙️ Variables d'environnement à configurer

Assurez-vous que ces variables sont configurées dans **Settings → Environment Variables** :

### Variables essentielles :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key

# Application (Mettre à jour avec le domaine final)
NEXT_PUBLIC_APP_URL=https://shiftpilot.fr

# Stripe (si utilisé)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Email (si utilisé)
EMAIL_API_KEY=re_...
RESEND_API_KEY=re_...

# Google Places (si utilisé)
GOOGLE_PLACES_API_KEY=votre-clé-api-google
```

**Important** : Après avoir configuré le domaine, mettez à jour `NEXT_PUBLIC_APP_URL` avec `https://shiftpilot.fr` et redéployez.

---

## 🔄 Redéploiement après configuration du domaine

Une fois le domaine configuré et `NEXT_PUBLIC_APP_URL` mis à jour :

```bash
vercel --prod --yes
```

Ou déclenchez un nouveau déploiement depuis le dashboard Vercel.

---

## ✅ Vérification finale

1. Testez https://shiftpilot.fr → Doit afficher la landing page
2. Testez https://www.shiftpilot.fr → Doit rediriger vers shiftpilot.fr
3. Testez la connexion : https://shiftpilot.fr/login
4. Vérifiez que HTTPS fonctionne (cadenas vert)

---

## 🆘 Dépannage

### Le domaine ne se connecte pas

1. Vérifiez les DNS avec : https://dnschecker.org/#A/shiftpilot.fr
2. Vérifiez que les enregistrements pointent vers Vercel
3. Attendez jusqu'à 48h pour la propagation DNS complète (généralement 5-15 minutes)

### Erreur "Domain already in use"

Le domaine est déjà lié à un autre projet Vercel. Dans ce cas :
1. Retirez-le de l'ancien projet dans Vercel Dashboard
2. Ou contactez le support Vercel

### HTTPS ne se configure pas

1. Vérifiez que les DNS sont correctement configurés
2. Attendez quelques minutes (Vercel génère le certificat automatiquement)
3. Vérifiez dans Settings → Domains → SSL

---

## 📝 Notes

- Le déploiement actuel est sur : `shiftpilot-lite-landing-8hm6b145a.vercel.app`
- Le projet Vercel : `shiftpilot-lite-landing`
- L'équipe : `noam-brochets-projects-2ea9c979`

