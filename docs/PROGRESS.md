# 🚀 SHIFTPILOT - PRODUCTION-READY REFACTOR

## ✅ CE QUI A ÉTÉ FAIT

### 1. Schéma Supabase Complet ✅
- **Fichier** : `supabase/migrations/001_complete_schema.sql`
- **Contenu** :
  - Toutes les tables selon spécifications
  - Enums harmonisés (user_role: OWNER, MANAGER, HR, EMPLOYEE)
  - Relations FK complètes
  - Indexes optimisés
  - RLS policies complètes (isolation par organisation, permissions par rôle)
  - Triggers et functions (updated_at, handle_new_user, sync_shift_profile_id)
  - Documentation inline (COMMENT)

### 2. Helpers API ✅
- **Fichier** : `lib/api/auth-helper.ts`
- **Fonctions** :
  - `getAuthenticatedUser()` - Vérifie auth + récupère profil
  - `requireOrganization()` - Vérifie qu'un user a une org
  - `requireRole()` - Vérifie les permissions
  - `requireOrganizationAccess()` - Vérifie l'accès à une org
  - `errorResponse()` / `successResponse()` - Helpers de réponse

### 3. Routes API Principales ✅
- **`POST /api/auth/onboarding-employer`** ✅
  - Crée organisation + location + règles RH + canal général
  - Met à jour profil en OWNER
  - Log audit

- **`GET /api/dashboard/overview`** ✅
  - Retourne KPIs (employés actifs, heures, coût, conformité, congés en attente)

- **`POST /api/schedules`** ✅
  - Crée un nouveau planning (DRAFT)

- **`GET /api/schedules`** ✅
  - Liste les plannings avec leurs shifts

- **`PATCH /api/schedules/:id/status`** ✅
  - Change statut (DRAFT → VALIDATED → PUBLISHED)
  - Notifications automatiques si PUBLISHED
  - Log audit

---

## 📋 CE QUI RESTE À FAIRE

### Routes API à créer/compléter

1. **`POST /api/shifts`** - Créer/éditer shifts (batch possible)
2. **`DELETE /api/shifts/:id`** - Supprimer un shift
3. **`POST /api/time-off`** - Employé crée demande congé
4. **`PATCH /api/time-off/:id`** - Manager approuve/refuse
5. **`GET /api/employee/me/schedule`** - Planning employé
6. **`POST /api/messages`** - Envoyer message
7. **`GET /api/messages?channel_id=...`** - Récupérer messages
8. **`GET /api/export/schedule/:id/pdf`** - Export PDF (stub ou réel)

### Dashboard Employeur

1. **Page Overview** (`/dashboard/employer`)
   - Utiliser `/api/dashboard/overview`
   - Afficher KPIs en temps réel
   - Actions rapides

2. **Page Planning** (`/dashboard/employer/planning`)
   - Créer planning (POST /api/schedules)
   - Éditer shifts (POST /api/shifts)
   - Publier planning (PATCH /api/schedules/:id/status)
   - Vue semaine avec drag & drop (optionnel)

3. **Page Équipe** (`/dashboard/employer/employees`)
   - Liste employés
   - CRUD employés
   - Lier employé à profile

4. **Page RH/Légal** (`/dashboard/employer/settings/legal`)
   - Gérer `labor_rules`
   - Afficher/modifier règles

5. **Page Paramètres** (`/dashboard/employer/settings`)
   - Infos organisation
   - Locations
   - Préférences

### Dashboard Employé (mobile-first)

1. **Page Planning** (`/employee`)
   - Semaine actuelle + suivante
   - Utiliser `/api/employee/me/schedule`
   - Design mobile-first

2. **Page Demandes** (`/employee/requests`)
   - Créer demande (POST /api/time-off)
   - Voir statut

3. **Page Messagerie** (`/employee/chat`)
   - Voir messages (GET /api/messages)
   - Envoyer message (POST /api/messages)

4. **Page Profil** (`/employee/profile`)
   - Infos personnelles
   - Heures totales

### Responsive + PWA

1. Vérifier responsive sur toutes les pages
2. Optimiser PWA (manifest, service worker déjà en place)
3. Tester installation

### Design System

1. Documenter grille, spacing, typography
2. Documenter couleurs, composants
3. Créer guide de style

---

## 🛠️ COMMENT CONTINUER

### Étape 1 : Appliquer la migration Supabase

```bash
# Dans Supabase Dashboard ou via CLI
# Appliquer: supabase/migrations/001_complete_schema.sql
```

⚠️ **Important** : Cette migration peut nécessiter des ajustements si des tables existent déjà. Vérifier les conflits.

### Étape 2 : Créer les routes API manquantes

Suivre le pattern établi dans `lib/api/auth-helper.ts` :
- Utiliser `getAuthenticatedUser()`
- Vérifier permissions avec `requireRole()`
- Utiliser `successResponse()` / `errorResponse()`

### Étape 3 : Refactorer les composants dashboard

- Utiliser les nouvelles routes API
- Gérer les états loading/error
- Implémenter les mutations (React Query recommandé)

### Étape 4 : Tester les flux complets

1. Onboarding employeur → Création org
2. Création planning → Ajout shifts → Publication
3. Employé voit planning → Demande congé → Manager approuve

---

## 📝 NOTES TECHNIQUES

### Schéma Supabase

- **Tables principales** : `organizations`, `locations`, `profiles`, `employees`, `schedules`, `shifts`
- **RLS** : Toutes les tables ont RLS activé avec policies par organisation
- **Relations** : 
  - `schedules` → `shifts` (1-to-many)
  - `employees` → `profiles` (many-to-1, nullable)
  - `shifts` → `employees` + `profiles` (redondance pour performance)

### Architecture API

- **Pattern** : Route handlers Next.js App Router
- **Auth** : Supabase Auth via `getAuthenticatedUser()`
- **Permissions** : Role-based (OWNER, MANAGER, HR, EMPLOYEE)
- **Isolation** : Multi-tenant via `organization_id` dans toutes les queries

### Prochaines étapes recommandées

1. ✅ Appliquer migration Supabase
2. ✅ Tester routes API créées
3. ⏭️ Créer routes API manquantes
4. ⏭️ Refactorer dashboard employeur
5. ⏭️ Créer dashboard employé mobile-first
6. ⏭️ Optimiser responsive + PWA
7. ⏭️ Documenter design system

---

## 🎯 OBJECTIF FINAL

Un SaaS production-ready avec :
- ✅ Architecture Supabase complète et sécurisée
- ✅ Backend API typé et fonctionnel
- ✅ Dashboard employeur complet
- ✅ Dashboard employé mobile-first
- ✅ PWA installable
- ✅ Documentation complète

**Status actuel** : ~30% complété (fondations posées)

