# ✅ Checklist de Déploiement - ShiftPilot

## 🎯 Checklist Complète pour Déployer ShiftPilot en Production

---

## 📋 Phase 1 : Préparation

### Code & Git
- [ ] Tous les fichiers sont commités
- [ ] Code pushé sur GitHub
- [ ] Branche `main` (ou `master`) est à jour
- [ ] Aucune erreur de lint (`npm run lint`)
- [ ] Build local réussi (`npm run build`)

### Documentation
- [ ] README.md à jour
- [ ] Documentation complète
- [ ] Guide de déploiement lu

---

## 🗄️ Phase 2 : Migrations Supabase

### Méthode 1 : Via Dashboard (Recommandé)
- [ ] Accès au Supabase Dashboard
- [ ] SQL Editor ouvert
- [ ] Migration 001 appliquée (`001_complete_schema.sql`)
- [ ] Migration 002 appliquée (`002_consolidate_schema_fixes.sql`)
- [ ] Migration 003 appliquée (`003_enhance_rls_policies.sql`)
- [ ] Vérification : Toutes les tables existent
- [ ] Vérification : RLS policies actives

### Méthode 2 : Via CLI (Alternative)
- [ ] Supabase CLI installé
- [ ] Projet lié (`supabase link`)
- [ ] Migrations appliquées (`supabase db push`)
- [ ] Vérification des migrations

### Vérifications Post-Migration
- [ ] 12 tables créées (organizations, locations, profiles, employees, schedules, shifts, time_off_requests, message_channels, messages, labor_rules, notifications, audit_logs)
- [ ] RLS activé sur toutes les tables
- [ ] Index créés
- [ ] Enums créés (user_role, schedule_status, etc.)

---

## 🔐 Phase 3 : Variables d'Environnement

### Supabase (Obligatoire)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` configurée
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` configurée
- [ ] `SUPABASE_SERVICE_ROLE_KEY` configurée (⚠️ SECRÈTE)

### App (Obligatoire)
- [ ] `NEXT_PUBLIC_APP_URL` configurée (mise à jour après le premier déploiement)

### Stripe (Optionnel - si utilisé)
- [ ] `STRIPE_SECRET_KEY` configurée
- [ ] `STRIPE_WEBHOOK_SECRET` configurée
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` configurée
- [ ] Price IDs configurés (LITE, PRO, BUSINESS)

### Resend (Optionnel - si utilisé)
- [ ] `EMAIL_API_KEY` configurée

### Configuration Vercel
- [ ] Variables ajoutées dans Vercel Dashboard
- [ ] Environnements sélectionnés (Production, Preview)
- [ ] Variables sensibles marquées comme secrètes

---

## 🚀 Phase 4 : Déploiement Vercel

### Configuration Projet
- [ ] Compte Vercel créé
- [ ] Projet GitHub importé
- [ ] Framework détecté : Next.js
- [ ] Build command : `npm run build`
- [ ] Output directory : `.next`
- [ ] Variables d'environnement configurées

### Premier Déploiement
- [ ] Déploiement lancé
- [ ] Build réussi (vérifier les logs)
- [ ] URL de production obtenue
- [ ] `NEXT_PUBLIC_APP_URL` mise à jour avec l'URL de production
- [ ] Redéploiement effectué (pour prendre en compte la nouvelle URL)

### Vérifications Post-Déploiement
- [ ] Site accessible sur l'URL de production
- [ ] Pas d'erreurs dans la console navigateur
- [ ] Logs Vercel vérifiés (pas d'erreurs critiques)

---

## ✅ Phase 5 : Tests Fonctionnels

### Authentification
- [ ] Page de login accessible (`/login/employer`)
- [ ] Création de compte fonctionnelle
- [ ] Connexion fonctionnelle
- [ ] Redirection après login correcte
- [ ] Déconnexion fonctionnelle

### Dashboard
- [ ] Page dashboard accessible (`/dashboard`)
- [ ] KPIs se chargent correctement
- [ ] Graphiques affichés
- [ ] Mini planning du jour visible
- [ ] Alertes RH affichées (si applicables)

### Planning
- [ ] Page planning accessible (`/dashboard/planning`)
- [ ] Navigation entre semaines fonctionnelle
- [ ] Génération IA fonctionnelle
- [ ] Workflow Draft → Review → Validated → Published fonctionnel

### Employés
- [ ] Page employés accessible (`/dashboard/employees`)
- [ ] Liste se charge (même si vide)
- [ ] Recherche fonctionnelle

### Congés
- [ ] Page congés accessible (`/dashboard/time-off`)
- [ ] Liste des demandes se charge
- [ ] Filtres fonctionnels
- [ ] Création de demande fonctionnelle (employé)
- [ ] Approbation/Refus fonctionnel (manager)

### Messagerie
- [ ] Page messages accessible (`/dashboard/messages`)
- [ ] Canaux se chargent
- [ ] Envoi de messages fonctionnel
- [ ] Temps réel fonctionnel (Supabase Realtime)

### Paramètres
- [ ] Page paramètres accessible (`/dashboard/settings`)
- [ ] Informations organisation affichées
- [ ] Modification fonctionnelle

### Dashboard Employé
- [ ] Page employé accessible (`/dashboard/employee`)
- [ ] Vue planning fonctionnelle
- [ ] Statistiques affichées

---

## 🔍 Phase 6 : Tests Techniques

### API Routes
- [ ] `/api/dashboard/overview` répond correctement
- [ ] `/api/schedules` fonctionnelle
- [ ] `/api/shifts` fonctionnelle
- [ ] `/api/employees` fonctionnelle
- [ ] `/api/timeoff` fonctionnelle
- [ ] `/api/messages` fonctionnelle
- [ ] Routes retournent les bonnes erreurs (401, 403, etc.)

### RLS Policies
- [ ] Un utilisateur ne voit que son organisation
- [ ] Un employé ne voit que ses shifts
- [ ] Un manager voit tous les shifts de son org
- [ ] Les données sont bien isolées

### Performance
- [ ] Page load time < 3s
- [ ] API response time < 500ms
- [ ] Pas d'erreurs de performance dans la console

### Responsive
- [ ] Mobile (320px - 768px) : Tout fonctionne
- [ ] Tablet (768px - 1024px) : Tout fonctionne
- [ ] Desktop (1024px+) : Tout fonctionne

---

## 🔒 Phase 7 : Sécurité

### Variables d'Environnement
- [ ] Aucune variable sensible dans le code
- [ ] `SUPABASE_SERVICE_ROLE_KEY` bien sécurisée
- [ ] Clés API non exposées

### RLS
- [ ] RLS activé sur toutes les tables
- [ ] Policies testées et fonctionnelles
- [ ] Isolation multi-tenant vérifiée

### Authentification
- [ ] Auth Supabase fonctionnelle
- [ ] Sessions sécurisées
- [ ] Logout fonctionnel

---

## 📊 Phase 8 : Monitoring

### Vercel Analytics
- [ ] Web Analytics activé
- [ ] Performance monitoring activé
- [ ] Logs accessibles

### Supabase
- [ ] Logs Supabase accessibles
- [ ] Monitoring des queries actif
- [ ] Alertes configurées (si nécessaire)

### Erreurs
- [ ] Système de tracking d'erreurs (Sentry, etc.)
- [ ] Notifications d'erreurs configurées

---

## 🌐 Phase 9 : Domaine Personnalisé (Optionnel)

- [ ] Domaine acheté
- [ ] Domain ajouté dans Vercel
- [ ] DNS configuré
- [ ] SSL activé automatiquement
- [ ] `NEXT_PUBLIC_APP_URL` mise à jour

---

## 🎉 Phase 10 : Finalisation

### Documentation Utilisateur
- [ ] Guide utilisateur créé (si nécessaire)
- [ ] FAQ créée (si nécessaire)
- [ ] Support configuré

### Communication
- [ ] Équipe informée du déploiement
- [ ] Utilisateurs beta invités (si applicable)
- [ ] Communication de lancement préparée

---

## ✅ Résumé

### Statut Global
- [ ] **TOUTES les étapes ci-dessus complétées**

### Prochaine Action
- [ ] Déployer en production
- [ ] Monitorer les premières heures
- [ ] Collecter les feedbacks
- [ ] Itérer et améliorer

---

## 🚨 En Cas de Problème

1. **Vérifier les logs** dans Vercel Dashboard → Deployments
2. **Vérifier les logs Supabase** dans Supabase Dashboard → Logs
3. **Consulter la documentation** dans `/docs`
4. **Vérifier les variables d'environnement** dans Vercel Settings
5. **Tester en local** pour reproduire le problème

---

**Date de complétion**: _______________
**Déployé par**: _______________
**URL de production**: _______________

**🎉 Félicitations ! ShiftPilot est en production !**

