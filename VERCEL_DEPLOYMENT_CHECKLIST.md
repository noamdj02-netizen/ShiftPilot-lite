# Checklist de déploiement Vercel - ShiftPilot

Cette checklist garantit un déploiement réussi et stable sur Vercel.

## ✅ Pré-requis avant le déploiement

### 1. Variables d'environnement
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - URL de votre projet Supabase
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Clé anonyme Supabase (publique)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Clé service role Supabase (secrète)
- [ ] `NEXT_PUBLIC_APP_URL` - URL de production (ex: https://votredomaine.com)
- [ ] `STRIPE_SECRET_KEY` - Clé secrète Stripe (optionnel si billing activé)
- [ ] `STRIPE_WEBHOOK_SECRET` - Secret webhook Stripe (optionnel)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Clé publique Stripe (optionnel)
- [ ] `EMAIL_API_KEY` - Clé API Resend (optionnel si emails activés)

**Où configurer sur Vercel :**
1. Allez sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet
3. Settings > Environment Variables
4. Ajoutez toutes les variables ci-dessus
5. Sélectionnez les environnements (Production, Preview, Development)

### 2. Configuration Supabase
- [ ] Projet Supabase créé et configuré
- [ ] Migrations SQL appliquées (voir `supabase/migrations/`)
- [ ] Politiques RLS (Row Level Security) configurées
- [ ] Types TypeScript générés (`npm run db:generate`)
- [ ] Storage buckets configurés si nécessaire

### 3. Configuration Stripe (si billing activé)
- [ ] Compte Stripe créé (test ou production)
- [ ] Webhook configuré pointant vers `https://votredomaine.com/api/webhooks/stripe`
- [ ] Prices créés (Lite, Pro, Business) et IDs sauvegardés
- [ ] Variables d'environnement Stripe configurées

### 4. Configuration GitHub
- [ ] Repository GitHub créé
- [ ] Code poussé sur la branche `main` (ou la branche de déploiement)
- [ ] `.gitignore` vérifié (pas de fichiers sensibles commités)
- [ ] Pas de `.env.local` dans le repo

## ✅ Vérifications techniques

### 5. Build local
```bash
# Tester le build localement
npm install
npm run build
```
- [ ] Build réussit sans erreur
- [ ] Aucun warning critique
- [ ] Types TypeScript valides
- [ ] Tous les imports sont corrects

### 6. Configuration Next.js
- [ ] `next.config.js` configuré correctement
- [ ] Configuration Three.js compatible Edge Runtime
- [ ] Headers de sécurité configurés
- [ ] Images optimisées (formats AVIF/WebP)

### 7. Middleware
- [ ] `middleware.ts` optimisé et fonctionnel
- [ ] Pas de double création de client Supabase
- [ ] Routes protégées correctement configurées
- [ ] Performances middleware vérifiées

### 8. Routes API
- [ ] Toutes les routes API ont une gestion d'erreur
- [ ] Validation des variables d'environnement dans les routes critiques
- [ ] Webhooks Stripe implémentés (si nécessaire)
- [ ] Routes de test fonctionnelles

## ✅ Déploiement Vercel

### 9. Première connexion
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre compte GitHub
3. Importez votre repository
4. Vercel détecte automatiquement Next.js

### 10. Configuration projet
- [ ] Framework Preset: Next.js (détecté automatiquement)
- [ ] Root Directory: `./` (racine)
- [ ] Build Command: `npm run build` (par défaut)
- [ ] Output Directory: `.next` (par défaut)
- [ ] Install Command: `npm install` (par défaut)

### 11. Variables d'environnement
Ajoutez toutes les variables listées dans la section 1, en faisant attention à :
- [ ] Variables avec préfixe `NEXT_PUBLIC_` sont exposées côté client
- [ ] Variables sans préfixe sont uniquement serveur
- [ ] Vérifiez les valeurs pour Production vs Preview

### 12. Premier déploiement
- [ ] Lancez le déploiement
- [ ] Suivez les logs de build
- [ ] Vérifiez qu'il n'y a pas d'erreur

## ✅ Post-déploiement

### 13. Tests fonctionnels
- [ ] Page d'accueil charge correctement
- [ ] Authentification fonctionne (login/register)
- [ ] Redirections middleware fonctionnent
- [ ] Dashboard accessible après login
- [ ] Routes API répondent correctement
- [ ] Images se chargent correctement

### 14. Tests de sécurité
- [ ] Routes protégées inaccessibles sans auth
- [ ] Variables secrètes ne sont pas exposées côté client
- [ ] Headers de sécurité présents
- [ ] HTTPS activé

### 15. Monitoring
- [ ] Vercel Analytics activé (optionnel)
- [ ] Logs Vercel accessibles et surveillés
- [ ] Erreurs surveillées dans les logs

## 🔧 Dépannage

### Build échoue
1. Vérifiez les logs de build dans Vercel
2. Testez le build localement : `npm run build`
3. Vérifiez les variables d'environnement
4. Vérifiez les imports TypeScript

### Erreurs runtime
1. Vérifiez les logs dans Vercel Dashboard > Functions
2. Vérifiez que les variables d'environnement sont bien configurées
3. Vérifiez la connexion Supabase
4. Testez les routes API individuellement

### Erreurs d'authentification
1. Vérifiez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Vérifiez les politiques RLS dans Supabase
3. Vérifiez le middleware

### Erreurs Stripe
1. Vérifiez que toutes les variables Stripe sont configurées
2. Vérifiez que le webhook est bien configuré dans Stripe Dashboard
3. Vérifiez que l'URL du webhook pointe vers Vercel

## 📝 Notes importantes

1. **Variables d'environnement** : Les variables sont scellées au moment du build pour les routes API et au runtime pour les composants client
2. **Edge Runtime** : Le middleware s'exécute sur Edge Runtime de Vercel - évitez les dépendances Node.js non supportées
3. **Three.js** : Les composants 3D sont exclus du SSR pour optimiser les performances
4. **Build optimisé** : Next.js optimise automatiquement le code pour la production

## 🎯 Résultat attendu

Après avoir suivi cette checklist, vous devriez avoir :
- ✅ Un build Vercel qui réussit
- ✅ Une application déployée et accessible
- ✅ Toutes les fonctionnalités opérationnelles
- ✅ Aucune erreur critique dans les logs

---

**Dernière mise à jour** : Après les corrections de build Vercel
**Version** : 1.0.0

