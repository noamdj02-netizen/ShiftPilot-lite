# Changelog - ShiftPilot Fixes

## 🚀 Features & Backend

### Backend API (`/app/api/*`)
- **Employees** : Routes complètes (GET/POST/PATCH/DELETE) implémentées et sécurisées.
- **Shifts** : Routes complètes avec filtrage par date et RLS.
- **Restaurant** : Gestion des paramètres restaurant.
- **Time Off** : Gestion des demandes de congés.
- **Planning PDF** : Génération et téléchargement de PDF (`/api/planning/pdf`).
- **Email** : Envoi de plannings par email (`/api/email/send-planning`).
- **Documents RH** : Upload de fichiers vers Supabase Storage.

### Hooks & Frontend Logic
- **`useEmployees`** : Refactorisé pour utiliser l'API serveur et gérer correctement le loading/erreurs.
- **`useShifts`** : Nouveau hook pour la gestion des shifts.
- **`usePlanning`** : Logique métier du planning centralisée (navigation, calculs, drag & drop).
- **`useCompliance`** : Logique de vérification légale centralisée.

### Interface Utilisateur (UI)
- **Responsive** : Correction de la sidebar mobile, du planning mobile (vue liste), et des tableaux.
- **Navigation** : Navbar et Sidebar optimisées, ScrollToTop automatique.
- **Planning** : Nouvelle interface séparée (Desktop Grid vs Mobile List).
- **Conformité** : Page d'audit légal fonctionnelle avec indicateurs visuels.
- **Landing Page** : Nettoyage des composants dupliqués, navigation corrigée.

## 🛠 Correctifs Techniques

### Sécurité & Architecture
- **Multi-Tenant** : Validation de l'isolation des données par `restaurant_id`.
- **Supabase** : Typage strict des tables et colonnes.
- **Environnement** : Sécurisation des variables et création de `.env.example`.

### Code Quality
- **Nettoyage** : Suppression de ~30 fichiers morts/dupliqués (Navbar/Footer/Hero en double).
- **Refactoring** : Extraction de composants UI réutilisables.
- **Performance** : Utilisation de `useMemo`/`useCallback` pour les calculs lourds.
- **Logs** : Suppression des `console.log` de debug.

## 📝 Documentation
- `docs/ARCHITECTURE.md` : Vue d'ensemble technique.
- `docs/API.md` : Documentation des routes API.
- `TESTING.md` : Guide de tests manuels.
- `DEPLOYMENT.md` : Guide de déploiement Vercel.

