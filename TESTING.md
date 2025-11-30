# Guide de Test - ShiftPilot

Ce document décrit les scénarios de test à exécuter pour valider le bon fonctionnement de l'application.

## 1. Authentification

### 1.1 Inscription Employer
- [ ] Aller sur `/register`
- [ ] Remplir le formulaire (Nom, Prénom, Email, MDP, Nom du Restaurant)
- [ ] Valider
- [ ] Vérifier la redirection vers le Dashboard
- [ ] Vérifier que le restaurant a été créé en base (table `restaurants`)
- [ ] Vérifier que le profil a le rôle `employer` et le bon `restaurant_id`

### 1.2 Login
- [ ] Aller sur `/login`
- [ ] Entrer les identifiants créés
- [ ] Valider
- [ ] Vérifier la redirection vers `/dashboard`

## 2. Dashboard Employer

### 2.1 Gestion des Employés
- [ ] Aller sur "Collaborateurs" (`/dashboard/employees`)
- [ ] Cliquer sur "Ajouter un employé"
- [ ] Remplir la fiche (Nom, Prénom, Email, Rôle, Contrat)
- [ ] Valider
- [ ] Vérifier l'apparition dans la liste
- [ ] Modifier l'employé (changer le rôle ou la couleur)
- [ ] Supprimer l'employé (si pas de shifts liés)

### 2.2 Planning
- [ ] Aller sur "Planning" (`/dashboard/planning`)
- [ ] Vérifier l'affichage de la semaine en cours
- [ ] Vérifier la présence des employés créés en ligne
- [ ] **Création de shift** :
  - [ ] Cliquer sur une case vide
  - [ ] (Si modal) Remplir horaires et rôle
  - [ ] (Si auto) Vérifier la création d'un shift par défaut
- [ ] **Modification** : Déplacer ou modifier un shift
- [ ] **Suppression** : Supprimer un shift
- [ ] **Auto-planning** :
  - [ ] Cliquer sur le bouton "Auto-planning" (ou IA)
  - [ ] Vérifier que des shifts sont générés
  - [ ] Vérifier le calcul des heures hebdo

### 2.3 Conformité
- [ ] Aller sur "Conformité" (`/dashboard/compliance`)
- [ ] Vérifier que les compteurs d'heures correspondent au planning
- [ ] Créer un shift de nuit court (<11h repos) et vérifier l'alerte
- [ ] Vérifier le score global

### 2.4 Paramètres
- [ ] Aller sur "Paramètres"
- [ ] Modifier le nom du restaurant
- [ ] Vérifier la persistance après rechargement

## 3. Espace Employé (Mobile First)

### 3.1 Accès
- [ ] Se connecter avec un compte employé (créé par l'employeur)
- [ ] Vérifier la redirection vers la vue mobile du planning

### 3.2 Planning
- [ ] Vérifier la lisibilité sur mobile (iPhone SE / 375px)
- [ ] Vérifier que seuls ses shifts (ou ceux de l'équipe selon règles) sont visibles

## 4. Fonctionnalités Avancées

### 4.1 Export PDF
- [ ] Aller sur le planning
- [ ] Cliquer sur "Exporter PDF"
- [ ] Vérifier le téléchargement et le contenu du fichier

### 4.2 Upload Document RH
- [ ] Aller sur l'espace RH (si disponible) ou fiche employé
- [ ] Uploader un PDF (CV ou contrat)
- [ ] Vérifier le succès de l'upload (Supabase Storage)

## 5. Technique & Sécurité

- [ ] Vérifier qu'un utilisateur A ne voit pas les données du restaurant B (Multi-tenant RLS)
- [ ] Vérifier qu'une route protégée (`/dashboard`) redirige vers `/login` si non connecté

