# 🚀 GUIDE DE DÉPLOIEMENT VERCEL

## ✅ ÉTAPE 1 : GitHub (TERMINÉ)

✅ Code poussé sur GitHub : `https://github.com/noamdj02-netizen/ShiftPilot-lite.git`

---

## 🔵 ÉTAPE 2 : Déployer sur Vercel

### Option A : Via Vercel Dashboard (Recommandé)

1. **Aller sur [vercel.com](https://vercel.com)**
   - Se connecter avec GitHub

2. **Importer le projet**
   - Cliquer "Add New..." → "Project"
   - Sélectionner le repo `ShiftPilot-lite`
   - Cliquer "Import"

3. **Configuration du projet**
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : `./` (par défaut)
   - **Build Command** : `npm run build` (par défaut)
   - **Output Directory** : `.next` (par défaut)
   - **Install Command** : `npm install` (par défaut)

4. **Variables d'environnement**
   - Cliquer "Environment Variables"
   - Ajouter les variables suivantes :

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

   ⚠️ **Important** : Remplacer par vos vraies valeurs Supabase

5. **Déployer**
   - Cliquer "Deploy"
   - Attendre la fin du build (2-3 minutes)

6. **Vérifier le déploiement**
   - Une fois terminé, Vercel fournit une URL : `https://your-app.vercel.app`
   - Tester l'application

---

### Option B : Via Vercel CLI

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel

# 4. Suivre les prompts :
# - Set up and deploy? Y
# - Which scope? (votre compte)
# - Link to existing project? N (première fois)
# - Project name? shiftpilot-lite
# - Directory? ./
# - Override settings? N

# 5. Ajouter les variables d'environnement
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_APP_URL

# 6. Redéployer avec les variables
vercel --prod
```

---

## ⚙️ CONFIGURATION POST-DÉPLOIEMENT

### 1. Vérifier les variables d'environnement

Dans Vercel Dashboard → Settings → Environment Variables :
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY` (optionnel, pour admin)
- ✅ `NEXT_PUBLIC_APP_URL` (URL de votre app Vercel)

### 2. Configurer Supabase

Dans Supabase Dashboard → Settings → API :
- Ajouter l'URL Vercel dans "Allowed Redirect URLs" :
  ```
  https://your-app.vercel.app/**
  https://your-app.vercel.app/auth/callback
  ```

### 3. Appliquer les migrations Supabase

⚠️ **CRITIQUE** : Appliquer la migration `001_complete_schema.sql` dans Supabase :

1. Aller dans Supabase Dashboard → SQL Editor
2. Ouvrir `supabase/migrations/001_complete_schema.sql`
3. Copier-coller le contenu
4. Exécuter

### 4. Vérifier le déploiement

- ✅ Accéder à `https://your-app.vercel.app`
- ✅ Tester la connexion
- ✅ Tester l'onboarding
- ✅ Vérifier que les routes API fonctionnent

---

## 🔄 DÉPLOIEMENTS AUTOMATIQUES

Vercel déploie automatiquement :
- ✅ Chaque push sur `main` → Production
- ✅ Chaque push sur une branche → Preview

Pour désactiver :
- Settings → Git → Ignore Build Step (si besoin)

---

## 📊 MONITORING

### Vercel Analytics (Optionnel)

1. Settings → Analytics
2. Activer Vercel Analytics
3. Voir les métriques de performance

### Logs

- Vercel Dashboard → Deployments → Cliquer sur un déploiement → Logs
- Voir les erreurs de build/runtime

---

## 🐛 DÉPANNAGE

### Build échoue

**Erreur** : "Module not found"
- Vérifier que `package.json` est à jour
- Vérifier que toutes les dépendances sont listées

**Erreur** : "Environment variable missing"
- Vérifier que toutes les variables sont définies dans Vercel

### Runtime erreurs

**Erreur** : "Supabase connection failed"
- Vérifier `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Vérifier que Supabase est accessible

**Erreur** : "Unauthorized"
- Vérifier que les redirect URLs sont configurées dans Supabase
- Vérifier que les RLS policies sont appliquées

### Performance

- Vérifier les logs Vercel pour les temps de réponse
- Utiliser Vercel Analytics pour identifier les bottlenecks

---

## ✅ CHECKLIST POST-DÉPLOIEMENT

- [ ] Code déployé sur Vercel
- [ ] Variables d'environnement configurées
- [ ] Migrations Supabase appliquées
- [ ] Redirect URLs configurées dans Supabase
- [ ] Application accessible sur l'URL Vercel
- [ ] Test de connexion fonctionnel
- [ ] Test d'onboarding fonctionnel
- [ ] Routes API testées
- [ ] PWA testée (manifest, service worker)
- [ ] Responsive vérifié

---

## 🔗 LIENS UTILES

- **Vercel Dashboard** : https://vercel.com/dashboard
- **Supabase Dashboard** : https://supabase.com/dashboard
- **Documentation Vercel** : https://vercel.com/docs
- **Documentation Next.js** : https://nextjs.org/docs

---

## 📝 NOTES

- **Domaine personnalisé** : Settings → Domains (optionnel)
- **Preview deployments** : Chaque PR crée une preview URL
- **Rollback** : Possible depuis Vercel Dashboard → Deployments

**Status** : Prêt pour déploiement Vercel ✅

