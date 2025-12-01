# 📊 ANALYSE & PLAN DE REFONTE - SHIFTPILOT PRODUCTION-READY

## 🔍 ÉTAT ACTUEL DU PROJET

### ✅ Ce qui existe déjà

1. **Structure Next.js 14**
   - App Router configuré
   - Routes API dans `app/api/`
   - Middleware d'authentification
   - Layouts séparés (marketing, dashboard, employee, auth)

2. **Supabase**
   - 16 migrations SQL existantes
   - Schéma de base (`organizations`, `profiles`, `shifts`, etc.)
   - RLS activé sur certaines tables
   - Client server-side configuré

3. **Frontend**
   - Composants UI (Radix UI)
   - Hooks personnalisés (`useAuth`, `usePlanning`, etc.)
   - Services backend dans `lib/services/`
   - Dashboard employeur partiel (`/dashboard/employer`)
   - Dashboard employé partiel (`/employee`)

4. **Fonctionnalités**
   - Onboarding employeur
   - Gestion des shifts
   - Planning avec IA
   - Messagerie (partielle)
   - Time-off requests
   - Exports PDF/Excel

### ⚠️ Problèmes identifiés

1. **Schéma Supabase incomplet/incohérent**
   - Tables manquantes : `schedules`, `time_off_requests`, `message_channels`, `labor_rules`
   - Relations pas toutes définies (ex: `schedules` → `shifts`)
   - RLS policies incomplètes
   - Enums à harmoniser avec les specs

2. **Routes API incomplètes**
   - Pas de route `/api/schedules` complète
   - Routes time-off basiques
   - Pas de route `/api/dashboard/overview`
   - Gestion d'erreurs incohérente

3. **UX/UI incohérente**
   - Dashboard employeur partiel
   - Dashboard employé non mobile-first
   - Pas de flow complet onboarding → planning → publication
   - Composants pas tous fonctionnels

4. **Architecture**
   - Services backend éparpillés
   - Pas de helpers centralisés pour auth/permissions
   - Types TypeScript pas tous alignés avec le schéma

---

## 🎯 PLAN DE REFONTE

### Phase 1 : Architecture Supabase complète ✅
**Objectif** : Schéma PostgreSQL propre, cohérent, avec RLS complet

**Actions** :
1. Créer migration consolidée avec toutes les tables selon specs
2. Définir les relations FK correctement
3. Implémenter RLS policies complètes (org isolation, role-based)
4. Créer les indexes nécessaires
5. Ajouter les triggers/functions utiles

**Livrable** : `supabase/migrations/001_complete_schema.sql`

---

### Phase 2 : Backend API refactoré ✅
**Objectif** : Routes API typées, sécurisées, fonctionnelles

**Actions** :
1. Créer helper `lib/api/auth-helper.ts` (vérif auth + permissions)
2. Refactorer `/api/auth/onboarding-employer`
3. Créer `/api/dashboard/overview`
4. Créer `/api/schedules` (POST, GET, PATCH)
5. Refactorer `/api/shifts` (CRUD complet)
6. Créer `/api/time-off` (POST, GET, PATCH)
7. Créer `/api/employee/me/schedule`
8. Refactorer `/api/messages`
9. Créer `/api/export/schedule/:id/pdf` (stub ou réel)

**Livrable** : Routes API complètes dans `app/api/`

---

### Phase 3 : Dashboard Employeur complet ✅
**Objectif** : Expérience complète pour créer/gérer plannings

**Actions** :
1. Page Dashboard Overview avec KPIs réels
2. Page Planning avec création/édition de shifts
3. Page Équipe avec CRUD employés
4. Page RH/Légal avec gestion règles
5. Page Paramètres
6. Composants réutilisables (`ScheduleEditor`, `EmployeeForm`, etc.)

**Livrable** : Dashboard employeur fonctionnel dans `app/dashboard/employer/`

---

### Phase 4 : Dashboard Employé (mobile-first) ✅
**Objectif** : Expérience mobile optimale pour les employés

**Actions** :
1. Refactorer `/employee` en mobile-first
2. Page Planning employé (semaine actuelle + suivante)
3. Page Demandes de congés
4. Page Messagerie
5. Page Profil
6. Navigation bottom bar mobile

**Livrable** : Dashboard employé mobile-first dans `app/employee/`

---

### Phase 5 : Responsive + PWA ✅
**Objectif** : App installable, responsive partout

**Actions** :
1. Vérifier responsive sur toutes les pages
2. Optimiser PWA (manifest, service worker)
3. Tester installation desktop + mobile
4. Optimiser performances (lazy loading, code splitting)

**Livrable** : App PWA fonctionnelle

---

### Phase 6 : Design System Documentation ✅
**Objectif** : Documentation Figma-like du design

**Actions** :
1. Documenter grille, spacing, typography
2. Documenter couleurs, composants
3. Documenter interactions, animations
4. Créer guide de style

**Livrable** : `docs/DESIGN_SYSTEM.md`

---

### Phase 7 : Documentation technique ✅
**Objectif** : README complet pour setup et usage

**Actions** :
1. README avec setup complet
2. Guide de déploiement
3. Guide de test (flux complets)
4. Documentation API

**Livrable** : Documentation complète dans `docs/`

---

## 📋 ORDRE D'IMPLÉMENTATION

1. ✅ **Phase 1** : Schéma Supabase complet
2. ✅ **Phase 2** : Backend API
3. ✅ **Phase 3** : Dashboard Employeur
4. ✅ **Phase 4** : Dashboard Employé
5. ✅ **Phase 5** : Responsive + PWA
6. ✅ **Phase 6** : Design System
7. ✅ **Phase 7** : Documentation

---

## 🚀 DÉMARRAGE

Je commence par la **Phase 1** : création du schéma Supabase complet et cohérent.

