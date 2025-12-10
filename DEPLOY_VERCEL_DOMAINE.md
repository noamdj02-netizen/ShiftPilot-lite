# 🚀 Déploiement sur Vercel avec le domaine shiftpilot.fr

## Étape 1 : Déploiement initial sur Vercel

### Option A : Via Vercel CLI (Recommandé)

1. **Accepter la configuration Vercel** :
   ```bash
   # Répondez "Y" lorsque Vercel demande de configurer le projet
   vercel --prod
   ```

2. **Suivre les prompts** :
   - **Lier à un projet existant ?** : `N` (créer un nouveau projet)
   - **Nom du projet ?** : `shiftpilot` (ou laissez le nom par défaut)
   - **Répertoire ?** : `.` (répertoire courant)
   - **Override settings ?** : `N` (utiliser vercel.json)

3. **Le déploiement va démarrer**. Notez l'URL fournie (ex: `https://shiftpilot-xxxxx.vercel.app`)

### Option B : Via Dashboard Vercel

1. Allez sur [vercel.com/new](https://vercel.com/new)
2. Connectez-vous avec GitHub
3. Importez votre repository
4. Configurez les variables d'environnement (voir étape 2)
5. Cliquez sur **Deploy**

---

## Étape 2 : Configurer les Variables d'Environnement

**IMPORTANT** : Configurez ces variables **AVANT** d'ajouter le domaine personnalisé.

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez les variables suivantes :

### Variables OBLIGATOIRES :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key

# Application (à mettre à jour après avoir ajouté le domaine)
NEXT_PUBLIC_APP_URL=https://shiftpilot.fr
```

### Variables OPTIONNELLES (si utilisées) :

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_LITE_MONTHLY=price_...
STRIPE_PRICE_PRO_MONTHLY=price_...
STRIPE_PRICE_FULL_MONTHLY=price_...

# Resend
EMAIL_API_KEY=re_...

# Twilio (pour SMS)
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...

# Google Maps (pour avis Google)
GOOGLE_MAPS_API_KEY=...
```

5. Pour chaque variable, sélectionnez les environnements :
   - ✅ **Production**
   - ✅ **Preview** (recommandé)
   - ✅ **Development** (optionnel)

6. **Redéployez** après avoir ajouté les variables

---

## Étape 3 : Ajouter le Domaine Personnalisé shiftpilot.fr

### 3.1 Dans Vercel Dashboard

1. Allez dans **Settings** → **Domains**
2. Cliquez sur **Add Domain**
3. Entrez `shiftpilot.fr`
4. Cliquez sur **Add**
5. Vercel vous donnera des instructions DNS

### 3.2 Configuration DNS chez votre registrar

Vous devez configurer les enregistrements DNS suivants :

#### Pour shiftpilot.fr (domaine racine) :

**Option A : Configuration A (recommandée pour domaine racine)**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Option B : Configuration CNAME (si votre registrar le supporte)**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

#### Pour www.shiftpilot.fr (sous-domaine) :

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3.3 Vérification

1. Après avoir configuré DNS, attendez 1-24h (généralement quelques minutes)
2. Dans Vercel Dashboard → **Domains**, vérifiez que le statut est **Valid**
3. Testez : `https://shiftpilot.fr` et `https://www.shiftpilot.fr`

---

## Étape 4 : Mettre à jour NEXT_PUBLIC_APP_URL

1. Une fois le domaine configuré et validé
2. Allez dans **Settings** → **Environment Variables**
3. Mettez à jour `NEXT_PUBLIC_APP_URL` :
   ```
   NEXT_PUBLIC_APP_URL=https://shiftpilot.fr
   ```
4. **Redéployez** pour que la variable soit prise en compte

---

## Étape 5 : Forcer HTTPS et Redirection www

### 5.1 Redirection www → racine (optionnel)

Vercel gère automatiquement HTTPS et la redirection, mais vous pouvez forcer :

Dans `next.config.js`, ajoutez (déjà configuré si vous utilisez Vercel) :

```js
async redirects() {
  return [
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'www.shiftpilot.fr',
        },
      ],
      destination: 'https://shiftpilot.fr/:path*',
      permanent: true,
    },
  ];
}
```

---

## Étape 6 : Vérifications Post-Déploiement

### ✅ Checklist

- [ ] Site accessible sur `https://shiftpilot.fr`
- [ ] Site accessible sur `https://www.shiftpilot.fr` (redirige vers shiftpilot.fr)
- [ ] HTTPS actif (cadenas vert)
- [ ] Variables d'environnement configurées
- [ ] `NEXT_PUBLIC_APP_URL` = `https://shiftpilot.fr`
- [ ] Authentification fonctionnelle
- [ ] Dashboard accessible
- [ ] Pas d'erreurs dans la console (F12)
- [ ] Logs Vercel sans erreurs critiques

### Test des Routes

```bash
# Page d'accueil
curl https://shiftpilot.fr

# Dashboard (devrait rediriger vers login si non authentifié)
curl https://shiftpilot.fr/dashboard

# API
curl https://shiftpilot.fr/api/health
```

---

## Étape 7 : Configuration Stripe Webhooks (si utilisé)

Si vous utilisez Stripe, mettez à jour l'URL du webhook :

1. Allez sur [dashboard.stripe.com](https://dashboard.stripe.com)
2. **Developers** → **Webhooks**
3. Modifiez l'endpoint webhook :
   ```
   https://shiftpilot.fr/api/webhooks/stripe
   ```
4. Testez le webhook depuis Stripe Dashboard

---

## 🐛 Résolution de Problèmes

### Problème : Domaine non valide dans Vercel

**Solutions :**
- Vérifiez que les enregistrements DNS sont correctement configurés
- Utilisez [dnschecker.org](https://dnschecker.org) pour vérifier la propagation DNS
- Attendez jusqu'à 24h pour la propagation complète

### Problème : Erreurs 404 ou build failed

**Solutions :**
- Vérifiez les logs dans Vercel Dashboard → Deployments
- Vérifiez que toutes les variables d'environnement sont configurées
- Testez le build localement : `npm run build`

### Problème : Variables d'environnement non prises en compte

**Solutions :**
- Redéployez après avoir ajouté/modifié des variables
- Vérifiez que les variables sont dans l'environnement **Production**
- Vérifiez l'orthographe des noms de variables

### Problème : Erreurs d'authentification

**Solutions :**
- Vérifiez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Vérifiez que `NEXT_PUBLIC_APP_URL` correspond à votre domaine
- Vérifiez les Redirect URLs dans Supabase Dashboard → Authentication → URL Configuration

---

## 📝 Notes Importantes

1. **SSL/HTTPS** : Vercel fournit automatiquement un certificat SSL gratuit via Let's Encrypt
2. **DNS Propagation** : Peut prendre jusqu'à 24h (généralement quelques minutes)
3. **Redéploiements** : Chaque push sur la branche `main` déclenchera un redéploiement automatique
4. **Variables d'environnement** : Les changements nécessitent un redéploiement manuel ou un nouveau push

---

## 🎉 Félicitations !

Votre site ShiftPilot est maintenant accessible sur **https://shiftpilot.fr** !

### Prochaines Étapes

1. ✅ Tester toutes les fonctionnalités
2. ✅ Configurer Google Analytics (optionnel)
3. ✅ Configurer les webhooks Stripe si nécessaire
4. ✅ Monitorer les logs et performances

---

**Date** : $(date)
**Domaine** : https://shiftpilot.fr

