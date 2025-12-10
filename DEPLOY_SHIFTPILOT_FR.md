# 🚀 Déploiement sur shiftpilot.fr - Guide Complet

## 📋 Prérequis

1. ✅ Compte Vercel créé ([vercel.com](https://vercel.com))
2. ✅ Projet GitHub connecté (optionnel mais recommandé)
3. ✅ Domaine `shiftpilot.fr` configuré chez votre registrar
4. ✅ Variables d'environnement prêtes (Supabase, Stripe, etc.)

---

## 🔧 ÉTAPE 1 : Déploiement Initial

### Option A : Via Vercel CLI (Plus Rapide)

```bash
# 1. Installer Vercel CLI (si pas déjà fait)
npm i -g vercel

# 2. Se connecter à Vercel
vercel login

# 3. Déployer en production
vercel --prod
```

**Réponses aux prompts :**
- Link to existing project? → `N` (créer nouveau projet)
- Project name? → `shiftpilot-lite-landing` ou `shiftpilot`
- Directory? → `.` (répertoire courant)
- Override settings? → `N` (utiliser vercel.json)

### Option B : Via Dashboard Vercel

1. Allez sur [vercel.com/new](https://vercel.com/new)
2. **Import Git Repository** :
   - Connectez votre GitHub/GitLab/Bitbucket
   - Sélectionnez le repository `shiftpilot-lite-landing`
3. **Configure Project** :
   - Framework Preset : **Next.js**
   - Root Directory : `.`
   - Build Command : `npm run build`
   - Output Directory : `.next` (automatique)
4. Cliquez sur **Deploy**

---

## 🔐 ÉTAPE 2 : Variables d'Environnement

**⚠️ IMPORTANT : Configurez ces variables AVANT d'ajouter le domaine.**

1. Dans Vercel Dashboard → **Settings** → **Environment Variables**
2. Ajoutez ces variables pour **Production, Preview, Development** :

### Variables OBLIGATOIRES :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-anon-key-ici
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key-ici

# URL de l'application (important pour les redirects)
NEXT_PUBLIC_APP_URL=https://shiftpilot.fr

# Google Places (si utilisé)
GOOGLE_PLACES_API_KEY=votre-clé-google-places
```

### Variables OPTIONNELLES (selon vos besoins) :

```env
# Stripe (si vous utilisez les paiements)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Twilio (pour SMS)
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...

# Resend (pour emails)
EMAIL_API_KEY=re_...
```

3. Après avoir ajouté les variables, **redéployez** :
   - Dashboard → **Deployments** → **Redeploy** sur le dernier déploiement

---

## 🌐 ÉTAPE 3 : Configuration du Domaine shiftpilot.fr

### 3.1 Dans Vercel Dashboard

1. Allez dans **Settings** → **Domains**
2. Cliquez sur **Add Domain**
3. Entrez : `shiftpilot.fr`
4. Cliquez sur **Add**

Vercel va vous donner les enregistrements DNS à configurer.

### 3.2 Configuration DNS chez votre Registrar

**Pour le domaine racine `shiftpilot.fr` :**

#### Option A : Configuration A + CNAME (Recommandée)

Allez dans les paramètres DNS de votre registrar et ajoutez :

```
Type    Nom          Valeur
----    ----         ------
A       @            76.76.21.21
CNAME   www          cname.vercel-dns.com
```

#### Option B : Configuration CNAME uniquement

Si votre registrar supporte les CNAME sur le domaine racine :

```
Type    Nom          Valeur
----    ----         ------
CNAME   @            cname.vercel-dns.com
CNAME   www          cname.vercel-dns.com
```

**Note :** Vercel vous donnera les valeurs exactes dans le dashboard.

### 3.3 Vérification DNS

```bash
# Vérifier que les DNS sont configurés
nslookup shiftpilot.fr
dig shiftpilot.fr
```

**Attendre 24-48h** pour la propagation DNS complète (généralement quelques minutes à quelques heures).

---

## ✅ ÉTAPE 4 : Vérifications Post-Déploiement

### 4.1 Vérifier le déploiement

1. Ouvrez `https://shiftpilot.fr` dans votre navigateur
2. Vérifiez que le site charge correctement
3. Testez la navigation mobile (menu burger)
4. Testez les pages d'authentification

### 4.2 Vérifier HTTPS

Vercel configure automatiquement SSL/HTTPS via Let's Encrypt. Vérifiez :
- ✅ Le cadenas vert dans la barre d'adresse
- ✅ Pas d'erreurs de certificat

### 4.3 Vérifier les Variables d'Environnement

1. Dashboard → **Settings** → **Environment Variables**
2. Vérifiez que toutes les variables sont présentes
3. Vérifiez que `NEXT_PUBLIC_APP_URL=https://shiftpilot.fr`

---

## 🔄 ÉTAPE 5 : Redirections (Important)

### Configurer la redirection www → non-www (ou inversement)

Dans Vercel Dashboard → **Settings** → **Domains** :

1. Ajoutez `www.shiftpilot.fr` si ce n'est pas déjà fait
2. Configurez la redirection :
   - **Redirect** : `www.shiftpilot.fr` → `shiftpilot.fr` (ou inversement selon votre préférence)

---

## 🛠️ ÉTAPE 6 : Mises à jour Futures

Pour chaque mise à jour :

```bash
# Option 1 : Via CLI
vercel --prod

# Option 2 : Push sur GitHub (si connecté)
git add .
git commit -m "Update: description des changements"
git push origin main
```

Vercel redéploie automatiquement si vous avez connecté GitHub.

---

## 🐛 Dépannage

### Le domaine ne fonctionne pas

1. **Vérifier les DNS** : Utilisez [whatsmydns.net](https://www.whatsmydns.net/#A/shiftpilot.fr)
2. **Vérifier dans Vercel** : Settings → Domains → Vérifier l'état
3. **Attendre la propagation** : Peut prendre jusqu'à 48h (généralement quelques heures)

### Erreur "Domain not configured"

1. Vérifiez que le domaine est bien ajouté dans Vercel
2. Vérifiez que les DNS pointent vers Vercel
3. Redéployez le projet après configuration du domaine

### Le site ne charge pas

1. Vérifiez les logs dans Vercel Dashboard → **Deployments** → Cliquez sur le déploiement
2. Vérifiez les variables d'environnement
3. Testez en local : `npm run build` pour vérifier les erreurs de build

### Variables d'environnement non prises en compte

1. **Redéployez** après avoir ajouté les variables
2. Vérifiez que les variables sont dans **Production** environment
3. Vérifiez l'orthographe des noms de variables (case-sensitive)

---

## 📞 Support

- **Documentation Vercel** : [vercel.com/docs](https://vercel.com/docs)
- **Status Vercel** : [vercel-status.com](https://www.vercel-status.com)
- **Support Vercel** : Dashboard → Help

---

## ✅ Checklist Finale

- [ ] Projet déployé sur Vercel
- [ ] Variables d'environnement configurées
- [ ] Domaine `shiftpilot.fr` ajouté dans Vercel
- [ ] DNS configurés chez le registrar
- [ ] HTTPS actif (cadenas vert)
- [ ] Site accessible sur https://shiftpilot.fr
- [ ] Menu mobile fonctionnel
- [ ] Authentification fonctionnelle
- [ ] Redirections configurées (www/non-www)

---

**🎉 Votre site est maintenant déployé sur https://shiftpilot.fr !**
