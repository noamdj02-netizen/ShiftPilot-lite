# 🔍 RAPPORT D'AUDIT COMPLET - SHIFTPILOT SAAS

**Date**: $(date)  
**Version**: 1.0  
**Objectif**: Vérifier et corriger tous les boutons et fonctionnalités backend

---

## 📊 RÉSUMÉ EXÉCUTIF

### ✅ Ce qui fonctionne
- ✅ Authentification (login/register) avec Supabase
- ✅ Routes API de base (employees, shifts, schedules)
- ✅ Middleware de protection des routes
- ✅ Structure de base de données solide

### ❌ Ce qui manque / est cassé
- ❌ **Déconnexion** : Bouton présent mais redirection manquante
- ❌ **Planning IA** : Génération simulée, pas d'appel API réel
- ❌ **Publication planning** : Bouton sans logique backend
- ❌ **PilotBot** : Aucune route API pour chatbot
- ❌ **PilotSMS** : Aucune route API pour SMS
- ❌ **PilotReview** : Aucune route API pour avis Google
- ❌ **Drag & Drop planning** : Pas de sauvegarde automatique
- ❌ **Chargement planning généré** : Pas d'intégration avec dashboard

---

## 🔴 PROBLÈMES CRITIQUES

### 1. DÉCONNEXION
**Fichier**: `app/dashboard/employer/layout.tsx` (ligne 293)  
**Problème**: Le bouton LogOut n'a pas de handler onClick  
**Solution**: Ajouter handler avec signOut() + redirect

### 2. PLANNING IA - GÉNÉRATION
**Fichier**: `app/dashboard/employer/ai-planning/page.tsx` (ligne 46)  
**Problème**: `generatePlanning()` fait juste un setTimeout, pas d'appel API  
**Solution**: Appeler `/api/planning/generate` avec les paramètres

### 3. PLANNING IA - PUBLICATION
**Fichier**: `app/dashboard/employer/ai-planning/page.tsx` (ligne 304)  
**Problème**: Bouton "Valider et publier" sans handler  
**Solution**: Créer route `/api/schedules/publish` et appeler

### 4. PLANNING MANUEL - PUBLICATION
**Fichier**: `app/dashboard/employer/planning/page.tsx` (ligne 58)  
**Problème**: Bouton "Publier" sans handler  
**Solution**: Utiliser route existante `/api/schedule/commit`

### 5. PILOTBOT - CHATBOT
**Fichier**: `app/dashboard/employer/pilotbot/page.tsx`  
**Problème**: Aucune route API pour chatbot  
**Solution**: Créer `/api/chatbot/message` et `/api/chatbot/faq`

### 6. PILOTSMS - ENVOI SMS
**Fichier**: `app/dashboard/employer/pilotsms/page.tsx` (ligne 104)  
**Problème**: Bouton "Envoyer un SMS groupé" sans handler  
**Solution**: Créer `/api/sms/send` et `/api/sms/send-bulk`

### 7. PILOTREVIEW - AVIS GOOGLE
**Fichier**: `app/dashboard/employer/pilotreview/page.tsx` (ligne 36)  
**Problème**: Bouton "Envoyer une demande" sans handler  
**Solution**: Créer `/api/reviews/send-request` et `/api/reviews/list`

---

## 🟡 PROBLÈMES MOYENS

### 8. PLANNING - DRAG & DROP
**Fichier**: `app/dashboard/employer/planning/page.tsx`  
**Problème**: Pas de sauvegarde automatique lors du drag & drop  
**Solution**: Ajouter handler onDrop qui appelle `/api/shifts/[id]` (PUT)

### 9. EMPLOYEES - CRUD
**Fichier**: `app/dashboard/employer/employees/page.tsx`  
**Problème**: Les boutons d'ajout/modification existent mais pas de modals/formulaires  
**Solution**: Créer composants modals avec appels API existants

### 10. CHARGEMENT PLANNING GÉNÉRÉ
**Fichier**: `app/dashboard/employer/ai-planning/page.tsx`  
**Problème**: Après génération, pas de chargement automatique dans `/dashboard/planning`  
**Solution**: Rediriger vers planning avec schedule_id en query param

---

## 📁 ROUTES API MANQUANTES

### À créer :
1. `/api/planning/generate` - Génération planning IA (existe mais incomplet)
2. `/api/schedules/publish` - Publication d'un planning
3. `/api/chatbot/message` - Envoi message chatbot
4. `/api/chatbot/faq` - CRUD FAQ chatbot
5. `/api/sms/send` - Envoi SMS unique
6. `/api/sms/send-bulk` - Envoi SMS groupé
7. `/api/reviews/send-request` - Envoi demande avis
8. `/api/reviews/list` - Liste des avis
9. `/api/reviews/stats` - Statistiques avis

### Routes existantes à vérifier :
- ✅ `/api/employees` - GET, POST
- ✅ `/api/shifts` - GET, POST
- ✅ `/api/schedule/generate` - POST
- ✅ `/api/schedule/commit` - POST (à vérifier)

---

## 🗄️ TABLES DATABASE MANQUANTES

### À créer (migrations) :
1. `chatbot_faqs` - FAQ du chatbot
2. `chatbot_messages` - Logs des messages
3. `sms_messages` - Historique SMS
4. `google_reviews` - Avis Google synchronisés
5. `review_requests` - Demandes d'avis envoyées
6. `ai_planning_logs` - Logs génération IA

---

## 🔧 ACTIONS CORRECTIVES

### Phase 1 : Corrections critiques (priorité haute)
1. ✅ Fixer déconnexion
2. ✅ Connecter génération Planning IA
3. ✅ Connecter publication planning
4. ✅ Créer routes API PilotBot
5. ✅ Créer routes API PilotSMS
6. ✅ Créer routes API PilotReview

### Phase 2 : Améliorations (priorité moyenne)
7. ✅ Ajouter drag & drop avec sauvegarde
8. ✅ Créer modals CRUD employees
9. ✅ Redirection après génération IA

### Phase 3 : Optimisations (priorité basse)
10. ✅ Ajouter toasts/notifications
11. ✅ Ajouter loaders sur tous les boutons
12. ✅ Améliorer gestion d'erreurs

---

## 📝 FICHIERS À CRÉER/MODIFIER

### Nouveaux fichiers :
- `app/api/planning/generate/route.ts` (améliorer)
- `app/api/schedules/publish/route.ts` (nouveau)
- `app/api/chatbot/message/route.ts` (nouveau)
- `app/api/chatbot/faq/route.ts` (nouveau)
- `app/api/sms/send/route.ts` (nouveau)
- `app/api/sms/send-bulk/route.ts` (nouveau)
- `app/api/reviews/send-request/route.ts` (nouveau)
- `app/api/reviews/list/route.ts` (nouveau)
- `app/api/reviews/stats/route.ts` (nouveau)
- `supabase/migrations/023_add_chatbot_tables.sql` (nouveau)
- `supabase/migrations/024_add_sms_tables.sql` (nouveau)
- `supabase/migrations/025_add_reviews_tables.sql` (nouveau)

### Fichiers à modifier :
- `app/dashboard/employer/layout.tsx` - Fixer logout
- `app/dashboard/employer/ai-planning/page.tsx` - Connecter génération + publication
- `app/dashboard/employer/planning/page.tsx` - Connecter publication + drag & drop
- `app/dashboard/employer/pilotbot/page.tsx` - Connecter chatbot
- `app/dashboard/employer/pilotsms/page.tsx` - Connecter SMS
- `app/dashboard/employer/pilotreview/page.tsx` - Connecter reviews
- `app/dashboard/employer/employees/page.tsx` - Ajouter modals CRUD

---

## ✅ CHECKLIST FINALE

- [ ] Tous les boutons ont des handlers
- [ ] Toutes les routes API sont créées
- [ ] Toutes les tables database existent
- [ ] Tous les appels API ont des loaders
- [ ] Tous les appels API ont des toasts d'erreur
- [ ] Tous les appels API ont des toasts de succès
- [ ] La sécurité est vérifiée (auth + organization_id)
- [ ] Les types TypeScript sont à jour
- [ ] Les tests fonctionnent

---

**Prochaines étapes** : Implémenter toutes les corrections dans l'ordre de priorité.

