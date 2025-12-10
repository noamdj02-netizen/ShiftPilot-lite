# 🚀 Déploiement Rapide sur Vercel avec Domaine Personnalisé

## ⚡ Déploiement en 5 minutes

### Étape 1 : Installer Vercel CLI (si pas déjà fait)

```powershell
npm install -g vercel
```

### Étape 2 : Se connecter à Vercel

```powershell
vercel login
```

### Étape 3 : Déployer le projet

```powershell
# Depuis le répertoire du projet
vercel --prod
```

**Réponses aux prompts :**
- **Lier à un projet existant ?** : `N` (nouveau projet)
- **Nom du projet ?** : `shiftpilot` (ou laissez par défaut)
- **Répertoire ?** : `.` (répertoire courant)
- **Override settings ?** : `N` (utiliser vercel.json)

### Étape 4 : Configurer les Variables d'Environnement

**IMPORTANT** : Faites cela **AVANT** d'ajouter le domaine.

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet `shiftpilot`
3. **Settings** → **Environment Variables**
4. Ajoutez ces variables (copiez depuis votre `.env.local`) :

#### Variables OBLIGATOIRES :

```env
NEXT_PUBLIC_SUPABASE_URL=https://otuybbxfzjeuxppfihvv.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_XH6CjSHU-PCUvm-o_8xmIg_srdDxlor
SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
```

**⚠️ Pour chaque variable :**
- Cochez ✅ **Production**
- Cochez ✅ **Preview** (recommandé)
- Cliquez **Save**

### Étape 5 : Ajouter le Domaine Personnalisé

1. Dans Vercel Dashboard → **Settings** → **Domains**
2. Cliquez **Add Domain**
3. Entrez votre domaine (ex: `shiftpilot.fr`)
4. Cliquez **Add**

### Étape 6 : Configurer DNS

Vercel vous donnera des instructions. Généralement :

#### Pour le domaine racine (ex: shiftpilot.fr) :

**Option A : A Record (recommandé)**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**Option B : CNAME (si supporté par votre registrar)**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

#### Pour www (ex: www.shiftpilot.fr) :

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Étape 7 : Mettre à jour NEXT_PUBLIC_APP_URL

Une fois le domaine validé dans Vercel :

1. **Settings** → **Environment Variables**
2. Modifiez `NEXT_PUBLIC_APP_URL` :
   ```
   NEXT_PUBLIC_APP_URL=https://votre-domaine.com
   ```
3. **Redéployez** : Allez dans **Deployments** → Cliquez sur les 3 points → **Redeploy**

### Étape 8 : Vérifier le Déploiement

✅ **Checklist :**
- [ ] Site accessible sur `https://votre-domaine.com`
- [ ] HTTPS actif (cadenas vert)
- [ ] Pas d'erreurs dans la console (F12)
- [ ] Authentification fonctionnelle
- [ ] Dashboard accessible

---

## 🔧 Configuration Supabase pour Production

Après le déploiement, configurez Supabase :

1. Allez sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. **Authentication** → **URL Configuration**
4. Ajoutez dans **Redirect URLs** :
   ```
   https://votre-domaine.com/auth/callback
   https://votre-domaine.com/**
   ```
5. Dans **Site URL**, mettez :
   ```
   https://votre-domaine.com
   ```

---

## 🐛 Problèmes Courants

### ❌ Build Failed

**Solution :**
```powershell
# Testez le build localement
npm run build
```

Si ça fonctionne localement, vérifiez les logs dans Vercel Dashboard → Deployments

### ❌ Variables d'environnement non prises en compte

**Solution :**
1. Vérifiez que les variables sont dans **Production**
2. **Redéployez** après avoir ajouté/modifié des variables
3. Vérifiez l'orthographe (sensible à la casse)

### ❌ Domaine non valide

**Solution :**
1. Vérifiez les DNS avec [dnschecker.org](https://dnschecker.org)
2. Attendez jusqu'à 24h pour la propagation
3. Vérifiez que les enregistrements DNS sont corrects

### ❌ Erreurs d'authentification

**Solution :**
1. Vérifiez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
2. Vérifiez les Redirect URLs dans Supabase Dashboard
3. Vérifiez que `NEXT_PUBLIC_APP_URL` correspond à votre domaine

---

## 📝 Commandes Utiles

```powershell
# Voir les déploiements
vercel ls

# Voir les logs
vercel logs

# Redéployer
vercel --prod

# Ouvrir le dashboard
vercel dashboard
```

---

## ✅ Checklist Finale

- [ ] Projet déployé sur Vercel
- [ ] Variables d'environnement configurées
- [ ] Domaine ajouté et validé
- [ ] DNS configuré correctement
- [ ] `NEXT_PUBLIC_APP_URL` mis à jour
- [ ] Supabase Redirect URLs configurées
- [ ] Site accessible en HTTPS
- [ ] Toutes les fonctionnalités testées

---

**🎉 Félicitations ! Votre site est maintenant en ligne !**

