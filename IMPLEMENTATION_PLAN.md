# 🚀 PLAN D'IMPLÉMENTATION - SHIFTPILOT FULL FUNCTIONAL

## ✅ PHASE 1 : CORRECTIONS CRITIQUES (EN COURS)

### 1. ✅ Déconnexion
- [x] Fixer handler logout dans `app/dashboard/employer/layout.tsx`
- [x] Ajouter useRouter et useAuth
- [x] Ajouter handleLogout avec signOut + redirect

### 2. Planning IA - Génération
- [ ] Modifier `app/dashboard/employer/ai-planning/page.tsx`
  - [ ] Remplacer setTimeout par appel API `/api/planning/generate`
  - [ ] Ajouter loader pendant génération
  - [ ] Gérer erreurs avec toast
  - [ ] Sauvegarder schedule_id généré

### 3. Planning IA - Publication
- [ ] Modifier `app/dashboard/employer/ai-planning/page.tsx`
  - [ ] Connecter bouton "Valider et publier" à `/api/schedule/commit`
  - [ ] Rediriger vers `/dashboard/employer/planning` après publication
  - [ ] Ajouter toast de succès

### 4. Planning Manuel - Publication
- [ ] Modifier `app/dashboard/employer/planning/page.tsx`
  - [ ] Connecter bouton "Publier" à `/api/schedule/commit`
  - [ ] Collecter tous les shifts de la semaine
  - [ ] Envoyer avec status='published'
  - [ ] Ajouter toast de succès

---

## 🔧 PHASE 2 : ROUTES API MANQUANTES

### 5. Planning IA - Route améliorée
- [ ] Créer/améliorer `app/api/planning/generate/route.ts`
  - [ ] Utiliser `planningService.generateScheduleForWeek`
  - [ ] Sauvegarder dans table `schedules` si existe
  - [ ] Retourner schedule_id pour chargement

### 6. PilotBot - Chatbot
- [ ] Créer `app/api/chatbot/message/route.ts`
  - [ ] POST : Envoyer message et recevoir réponse IA
  - [ ] GET : Historique messages
  - [ ] Logs dans table `chatbot_messages`

- [ ] Créer `app/api/chatbot/faq/route.ts`
  - [ ] GET : Liste FAQ
  - [ ] POST : Créer FAQ
  - [ ] PUT : Modifier FAQ
  - [ ] DELETE : Supprimer FAQ

### 7. PilotSMS - SMS
- [ ] Créer `app/api/sms/send/route.ts`
  - [ ] POST : Envoyer SMS unique
  - [ ] Utiliser service SMS (Twilio/autre)
  - [ ] Log dans table `sms_messages`

- [ ] Créer `app/api/sms/send-bulk/route.ts`
  - [ ] POST : Envoyer SMS groupé
  - [ ] Template avec variables {prenom}, {heure_debut}, etc.
  - [ ] Logs batch

### 8. PilotReview - Avis Google
- [ ] Créer `app/api/reviews/send-request/route.ts`
  - [ ] POST : Envoyer demande avis à client
  - [ ] Email/SMS avec lien Google
  - [ ] Log dans table `review_requests`

- [ ] Créer `app/api/reviews/list/route.ts`
  - [ ] GET : Liste avis synchronisés depuis Google
  - [ ] Filtres par date, note, etc.

- [ ] Créer `app/api/reviews/stats/route.ts`
  - [ ] GET : Statistiques avis (moyenne, total, évolution)

---

## 🗄️ PHASE 3 : MIGRATIONS DATABASE

### 9. Tables manquantes
- [ ] Créer `supabase/migrations/023_add_chatbot_tables.sql`
  ```sql
  CREATE TABLE chatbot_faqs (...)
  CREATE TABLE chatbot_messages (...)
  ```

- [ ] Créer `supabase/migrations/024_add_sms_tables.sql`
  ```sql
  CREATE TABLE sms_messages (...)
  CREATE TABLE sms_templates (...)
  ```

- [ ] Créer `supabase/migrations/025_add_reviews_tables.sql`
  ```sql
  CREATE TABLE google_reviews (...)
  CREATE TABLE review_requests (...)
  ```

- [ ] Créer `supabase/migrations/026_add_ai_planning_logs.sql`
  ```sql
  CREATE TABLE ai_planning_logs (...)
  ```

---

## 🎨 PHASE 4 : CONNEXION FRONTEND

### 10. PilotBot Page
- [ ] Modifier `app/dashboard/employer/pilotbot/page.tsx`
  - [ ] Connecter bouton "Ajouter une question" à modal
  - [ ] Connecter modal à POST `/api/chatbot/faq`
  - [ ] Charger FAQ depuis GET `/api/chatbot/faq`
  - [ ] Afficher messages récents depuis GET `/api/chatbot/message`

### 11. PilotSMS Page
- [ ] Modifier `app/dashboard/employer/pilotsms/page.tsx`
  - [ ] Connecter bouton "Envoyer un SMS groupé" à modal
  - [ ] Modal avec sélection template + employés
  - [ ] Appel POST `/api/sms/send-bulk`
  - [ ] Charger historique depuis GET `/api/sms/messages`

### 12. PilotReview Page
- [ ] Modifier `app/dashboard/employer/pilotreview/page.tsx`
  - [ ] Connecter bouton "Envoyer une demande" à modal
  - [ ] Modal avec sélection clients récents
  - [ ] Appel POST `/api/reviews/send-request`
  - [ ] Charger avis depuis GET `/api/reviews/list`
  - [ ] Charger stats depuis GET `/api/reviews/stats`

---

## 📦 PHASE 5 : AMÉLIORATIONS UX

### 13. Toasts & Notifications
- [ ] Ajouter `sonner` (déjà dans package.json)
- [ ] Créer hook `useToast` si nécessaire
- [ ] Ajouter toasts sur tous les appels API :
  - [ ] Succès : "Planning généré avec succès"
  - [ ] Erreur : "Erreur lors de la génération"
  - [ ] Loading : Afficher pendant requêtes

### 14. Loaders
- [ ] Ajouter états `isLoading` sur tous les boutons
- [ ] Désactiver boutons pendant chargement
- [ ] Afficher spinner/loader

### 15. Gestion d'erreurs
- [ ] Try/catch sur tous les appels API
- [ ] Messages d'erreur utilisateur-friendly
- [ ] Logs erreurs côté serveur

---

## ✅ CHECKLIST FINALE

- [ ] Tous les boutons ont des handlers
- [ ] Toutes les routes API sont créées et testées
- [ ] Toutes les tables database existent
- [ ] Tous les appels API ont des loaders
- [ ] Tous les appels API ont des toasts
- [ ] La sécurité est vérifiée (auth + organization_id)
- [ ] Les types TypeScript sont à jour
- [ ] Le design n'est pas cassé

---

**Progression** : Phase 1 en cours (1/4 terminé)

