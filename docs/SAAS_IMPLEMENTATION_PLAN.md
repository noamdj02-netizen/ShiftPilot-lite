# 🚀 ShiftPilot Enterprise - Plan d'Implémentation SaaS

## 📋 Vue d'ensemble

Ce document décrit l'implémentation complète du SaaS ShiftPilot Enterprise **SANS modifier la landing page existante**.

## ✅ État actuel

- ✅ Landing page complète (Hero, Bento, Demo, Pricing, FAQ)
- ✅ Structure Supabase avec migrations de base
- ✅ Authentification Supabase configurée
- ✅ Middleware de protection des routes
- ✅ Pages login/register existantes

## 🎯 À implémenter

### 1. Base de données ✅
- [x] Migration `004_add_ai_services.sql` créée
- [ ] Appliquer la migration dans Supabase
- [ ] Générer les types TypeScript

### 2. Pages Dashboard
- [ ] `/dashboard/page.tsx` - Vue d'ensemble
- [ ] `/dashboard/planning/page.tsx` - Planning manuel (drag & drop)
- [ ] `/dashboard/ai/page.tsx` - Planning IA
- [ ] `/dashboard/chatbot/page.tsx` - PilotBot
- [ ] `/dashboard/reviews/page.tsx` - PilotReview
- [ ] `/dashboard/messages/page.tsx` - PilotSMS
- [ ] `/dashboard/team/page.tsx` - Gestion équipe
- [ ] `/dashboard/settings/page.tsx` - Paramètres

### 3. Dashboard Employé
- [ ] `/employee/page.tsx` - Vue employé mobile-first

### 4. API Routes

#### Planning
- [ ] `POST /api/planning/generate` - Génération IA
- [ ] `POST /api/planning/optimize` - Optimisation
- [ ] `GET /api/planning/suggestions` - Suggestions
- [ ] `POST /api/shifts` - Créer shift
- [ ] `PUT /api/shifts/[id]` - Modifier shift
- [ ] `DELETE /api/shifts/[id]` - Supprimer shift
- [ ] `POST /api/shifts/drag-drop` - Drag & drop

#### PilotBot
- [ ] `POST /api/chatbot/message` - Envoyer message
- [ ] `POST /api/chatbot/train` - Entraîner FAQ
- [ ] `GET /api/chatbot/analytics` - Analytics
- [ ] `GET /api/chatbot/conversations` - Liste conversations

#### PilotReview
- [ ] `POST /api/reviews/send-request` - Envoyer demande avis
- [ ] `GET /api/reviews/stats` - Statistiques
- [ ] `GET /api/reviews/list` - Liste avis
- [ ] `POST /api/reviews/sync-google` - Sync Google Business

#### PilotSMS
- [ ] `POST /api/sms/send` - Envoyer SMS
- [ ] `POST /api/sms/send-bulk` - Envoyer en masse
- [ ] `GET /api/sms/status` - Statut message
- [ ] `GET /api/sms/history` - Historique

#### Team
- [ ] `GET /api/team/employees` - Liste employés
- [ ] `POST /api/team/employees` - Créer employé
- [ ] `PUT /api/team/employees/[id]` - Modifier employé
- [ ] `DELETE /api/team/employees/[id]` - Désactiver employé

### 5. Composants Dashboard

#### Planning
- [ ] `components/planning/PlanningGrid.tsx` - Grille drag & drop
- [ ] `components/planning/ShiftCard.tsx` - Carte shift
- [ ] `components/planning/WeekSelector.tsx` - Sélecteur semaine
- [ ] `components/planning/EmployeeColumn.tsx` - Colonne employé

#### IA Planning
- [ ] `components/ai/PlanningGenerator.tsx` - Générateur IA
- [ ] `components/ai/OptimizationMode.tsx` - Sélecteur mode
- [ ] `components/ai/PlanningPreview.tsx` - Aperçu planning généré
- [ ] `components/ai/ExplanationPanel.tsx` - Explications IA

#### PilotBot
- [ ] `components/chatbot/ChatInterface.tsx` - Interface chat
- [ ] `components/chatbot/FAQManager.tsx` - Gestionnaire FAQ
- [ ] `components/chatbot/ConversationList.tsx` - Liste conversations
- [ ] `components/chatbot/AnalyticsDashboard.tsx` - Analytics

#### PilotReview
- [ ] `components/reviews/ReviewStats.tsx` - Statistiques
- [ ] `components/reviews/ReviewList.tsx` - Liste avis
- [ ] `components/reviews/RequestSender.tsx` - Envoi demandes
- [ ] `components/reviews/ReviewChart.tsx` - Graphiques

#### PilotSMS
- [ ] `components/sms/MessageComposer.tsx` - Composer SMS
- [ ] `components/sms/MessageHistory.tsx` - Historique
- [ ] `components/sms/TemplateManager.tsx` - Gestion templates
- [ ] `components/sms/BulkSender.tsx` - Envoi en masse

#### Team
- [ ] `components/team/EmployeeList.tsx` - Liste employés
- [ ] `components/team/EmployeeCard.tsx` - Carte employé
- [ ] `components/team/EmployeeForm.tsx` - Formulaire employé
- [ ] `components/team/AvailabilityManager.tsx` - Gestion disponibilités

### 6. Intégrations externes

#### OpenAI
- [ ] Configuration API key
- [ ] Service `lib/services/openai.ts`
- [ ] Prompts pour planning IA
- [ ] Prompts pour chatbot

#### Twilio
- [ ] Configuration credentials
- [ ] Service `lib/services/twilio.ts`
- [ ] Webhook handler pour statuts SMS

#### Google Business API
- [ ] Configuration OAuth
- [ ] Service `lib/services/google-business.ts`
- [ ] Sync automatique des avis

## 🏗️ Architecture des dossiers

```
/app
  /dashboard
    /page.tsx
    /planning
      /page.tsx
    /ai
      /page.tsx
    /chatbot
      /page.tsx
    /reviews
      /page.tsx
    /messages
      /page.tsx
    /team
      /page.tsx
    /settings
      /page.tsx
  /employee
    /page.tsx
  /api
    /planning
      /generate/route.ts
      /optimize/route.ts
      /suggestions/route.ts
    /shifts
      /route.ts
      /[id]/route.ts
      /drag-drop/route.ts
    /chatbot
      /message/route.ts
      /train/route.ts
      /analytics/route.ts
      /conversations/route.ts
    /reviews
      /send-request/route.ts
      /stats/route.ts
      /list/route.ts
      /sync-google/route.ts
    /sms
      /send/route.ts
      /send-bulk/route.ts
      /status/route.ts
      /history/route.ts
    /team
      /employees/route.ts
      /employees/[id]/route.ts

/components
  /dashboard
    /DashboardLayout.tsx
    /Sidebar.tsx
    /Header.tsx
  /planning/*
  /ai/*
  /chatbot/*
  /reviews/*
  /sms/*
  /team/*

/lib
  /services
    /openai.ts
    /twilio.ts
    /google-business.ts
  /utils
    /planning.ts
    /validation.ts
```

## 🎨 Règles de design

1. **NE PAS modifier** les composants de `/components/sections`
2. **NE PAS modifier** les pages marketing
3. **Respecter** le style de la demo interactive existante
4. **Utiliser** les mêmes couleurs, ombres, arrondis
5. **Style** : dark élégant, pro, simple

## 🔐 Sécurité

- Toutes les API routes doivent vérifier l'authentification
- RLS (Row Level Security) activé sur toutes les tables
- Validation des inputs côté serveur
- Rate limiting sur les API critiques

## 📝 Prochaines étapes

1. Appliquer la migration `004_add_ai_services.sql`
2. Générer les types TypeScript
3. Créer les pages dashboard de base
4. Implémenter les API routes une par une
5. Créer les composants UI
6. Intégrer les services externes
7. Tests et finalisation

