# Architecture Technique - ShiftPilot

## Vue d'ensemble

ShiftPilot est une application SaaS de gestion de plannings pour restaurants, construite avec Next.js 14 (App Router), Supabase (PostgreSQL, Auth, Storage) et Tailwind CSS.

L'application est conçue pour être "Multi-Tenant", c'est-à-dire que chaque restaurant (et ses données) est isolé des autres.

## Stack Technique

- **Frontend** : Next.js 14, React, Tailwind CSS, Framer Motion, Lucide React.
- **Backend** : Next.js API Routes (Serverless Functions), Supabase (BaaS).
- **Base de Données** : PostgreSQL (via Supabase).
- **Authentification** : Supabase Auth.
- **Stockage** : Supabase Storage (pour les documents RH).
- **Déploiement** : Vercel.

## Structure du Projet

```
/app
  /(dashboard)      # Routes protégées de l'application (Dashboard, Planning, RH...)
  /(marketing)      # Pages marketing (Blog, Features...)
  /api              # Routes API serveur (Backend)
  layout.tsx        # Layout racine
  page.tsx          # Landing Page
/components
  /layout           # Composants structurels (Navbar, Sidebar, Footer)
  /ui               # Composants UI génériques (Button, Card, Input...)
  /sections         # Sections de la Landing Page
  /planning         # Composants spécifiques au module Planning
  /shared           # Composants partagés (Logo...)
/hooks              # Custom React Hooks (useAuth, useEmployees...)
/lib                # Utilitaires, types, configuration Supabase
  /supabase         # Client & Server clients
  /types.ts         # Types TypeScript globaux
```

## Modèle de Données & Multi-Tenant

L'isolation des données est garantie par le champ `restaurant_id` présent sur toutes les tables métier (`employees`, `shifts`, etc.).

### Tables Principales

- `profiles` : Utilisateurs (liés à `auth.users`). Contient le rôle (`employer`, `employee`) et le `restaurant_id`.
- `restaurants` : Entités tenants.
- `employees` : Collaborateurs d'un restaurant.
- `shifts` : Créneaux de travail.

### Sécurité (RLS)

Les politiques RLS (Row Level Security) de PostgreSQL assurent que :
- Un utilisateur ne peut voir/modifier que les données liées à son `restaurant_id`.
- Un employé ne peut voir que ses propres données (ou celles de son équipe selon configuration).

## Flux de Données

1. **Client** : Les composants React utilisent des Hooks (`useEmployees`, `useShifts`) pour récupérer les données.
2. **API** : Les Hooks appellent les routes API Next.js (`/app/api/*`).
3. **Serveur** : Les routes API vérifient l'authentification (Supabase Auth) et effectuent les requêtes DB en filtrant par `restaurant_id`.
4. **Base de Données** : Supabase renvoie les données sécurisées.

## Composants Clés

### Planning (`/dashboard/planning`)
- Gère l'affichage et l'édition des shifts.
- Utilise `usePlanning` pour la logique métier (calculs d'heures, navigation date).
- Responsive : Vue grille sur Desktop, vue liste sur Mobile.

### Conformité (`/dashboard/compliance`)
- Analyse les shifts pour détecter les violations du code du travail (repos 11h, 48h max, etc.).
- Logique encapsulée dans `useCompliance`.

## Déploiement

Voir `DEPLOYMENT.md` pour les instructions détaillées.

