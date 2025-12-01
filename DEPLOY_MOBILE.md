# 🚀 DÉPLOIEMENT VERCEL - GUIDE MOBILE

## ✅ PRÉPARATION

Votre application est **100% prête** pour le déploiement mobile :
- ✅ PWA configurée (manifest + service worker)
- ✅ Design responsive mobile-first
- ✅ Bottom navigation pour mobile
- ✅ Safe areas iOS/Android
- ✅ Touch-friendly targets

---

## 📱 DÉPLOIEMENT EN 5 ÉTAPES

### ÉTAPE 1 : Aller sur Vercel (1 min)

1. Ouvrir [vercel.com/new](https://vercel.com/new) dans votre navigateur
2. Cliquer "Continue with GitHub"
3. Autoriser Vercel à accéder à vos repos GitHub

### ÉTAPE 2 : Importer le projet (1 min)

1. Dans la liste des repos, trouver **`ShiftPilot-lite`**
2. Cliquer sur "Import" à côté du repo
3. Vercel détecte automatiquement Next.js ✅

### ÉTAPE 3 : Configuration (2 min)

**Framework Preset** : Next.js (détecté automatiquement) ✅

**Variables d'environnement** - Cliquer "Environment Variables" et ajouter :

```
NEXT_PUBLIC_SUPABASE_URL
```
Valeur : `https://votre-projet.supabase.co`
*(Récupérer depuis Supabase Dashboard → Settings → API → Project URL)*

```
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Valeur : `votre-clé-anon-ici`
*(Récupérer depuis Supabase Dashboard → Settings → API → anon public key)*

### ÉTAPE 4 : Déployer (3 min)

1. Cliquer le bouton **"Deploy"** (en bas à droite)
2. Attendre 2-3 minutes pendant le build
3. ✅ Une fois terminé, vous verrez : **"Congratulations! Your project has been deployed"**
4. Cliquer sur le lien fourni (ex: `https://shiftpilot-lite.vercel.app`)

### ÉTAPE 5 : Tester sur mobile (2 min)

**Option A : Via QR Code**
1. Dans Vercel Dashboard → Deployments → Cliquer sur le dernier déploiement
2. Scanner le QR code avec votre téléphone
3. L'app s'ouvre dans le navigateur mobile

**Option B : Via URL directe**
1. Copier l'URL Vercel (ex: `https://shiftpilot-lite.vercel.app`)
2. L'envoyer par SMS/WhatsApp à votre téléphone
3. Ouvrir le lien sur mobile

**Option C : Installer comme PWA**
1. Ouvrir l'URL sur mobile (Chrome/Safari)
2. Voir le prompt "Ajouter à l'écran d'accueil"
3. Ou menu → "Installer l'application"
4. ✅ L'app apparaît comme une app native !

---

## ⚙️ CONFIGURATION SUPABASE (IMPORTANT)

### 1. Configurer les Redirect URLs

Après avoir obtenu votre URL Vercel :

1. Aller sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionner votre projet
3. Settings → Authentication → URL Configuration
4. Dans "Redirect URLs", ajouter :
   ```
   https://votre-app.vercel.app/**
   https://votre-app.vercel.app/auth/callback
   ```
5. Cliquer "Save"

### 2. Appliquer les migrations (CRITIQUE)

⚠️ **Sans ça, l'app ne fonctionnera pas !**

1. Dans Supabase Dashboard → SQL Editor
2. Ouvrir le fichier `supabase/migrations/001_complete_schema.sql` depuis votre repo local
3. **Copier TOUT le contenu** (Ctrl+A, Ctrl+C)
4. Coller dans SQL Editor (Ctrl+V)
5. Cliquer "Run" ou appuyer sur `Ctrl+Enter`
6. ✅ Vérifier qu'il n'y a pas d'erreurs (doit afficher "Success")

---

## 📱 TESTER SUR MOBILE

### Fonctionnalités à tester :

1. **Installation PWA**
   - Ouvrir l'URL sur mobile
   - Vérifier le prompt d'installation
   - Installer l'app
   - Vérifier qu'elle apparaît sur l'écran d'accueil

2. **Dashboard Employé** (mobile-first)
   - Se connecter avec un compte employé
   - Vérifier la navigation bottom bar
   - Tester le planning
   - Tester les demandes de congés
   - Tester la messagerie

3. **Dashboard Employeur** (responsive)
   - Se connecter avec un compte employeur
   - Vérifier que la sidebar se transforme en drawer sur mobile
   - Tester toutes les sections

4. **Responsive**
   - Tester en portrait et paysage
   - Vérifier qu'il n'y a pas de scroll horizontal
   - Vérifier que tous les boutons sont cliquables

---

## 🔧 DÉPANNAGE MOBILE

### L'app ne s'installe pas

**Chrome Android** :
- Vérifier que vous êtes en HTTPS
- Menu → "Installer l'application"
- Vérifier que le manifest est accessible : `https://votre-app.vercel.app/manifest.webmanifest`

**Safari iOS** :
- Menu → "Sur l'écran d'accueil"
- L'app s'ajoute comme bookmark (comportement iOS)

### Erreurs de connexion

- Vérifier que les Redirect URLs sont configurées dans Supabase
- Vérifier que les variables d'environnement sont correctes dans Vercel
- Vérifier les logs Vercel pour les erreurs

### L'app ne charge pas

- Vérifier que le build Vercel a réussi
- Vérifier les logs dans Vercel Dashboard → Deployments
- Vérifier la console du navigateur mobile (Chrome DevTools → Remote debugging)

---

## ✅ CHECKLIST FINALE

- [ ] Projet déployé sur Vercel
- [ ] URL Vercel obtenue
- [ ] Variables d'environnement configurées
- [ ] Redirect URLs configurées dans Supabase
- [ ] Migrations Supabase appliquées
- [ ] Application accessible sur mobile
- [ ] PWA installable
- [ ] Navigation fonctionnelle
- [ ] Connexion fonctionnelle
- [ ] Dashboard employé testé
- [ ] Dashboard employeur testé

---

## 🎯 URLS IMPORTANTES

- **Vercel Dashboard** : https://vercel.com/dashboard
- **Supabase Dashboard** : https://supabase.com/dashboard
- **Votre app** : `https://votre-app.vercel.app` (après déploiement)

---

## 📝 NOTES

- **Premier déploiement** : Peut prendre 3-5 minutes
- **Migrations** : ⚠️ N'oubliez pas d'appliquer `001_complete_schema.sql`
- **PWA** : Fonctionne mieux sur Chrome Android et Safari iOS
- **HTTPS** : Vercel fournit HTTPS automatiquement ✅

---

**Temps total** : ~15 minutes (déploiement + configuration)

**Status** : ✅ Prêt pour déploiement mobile

**Besoin d'aide ?** Voir `DEPLOYMENT_QUICKSTART.md` pour plus de détails

