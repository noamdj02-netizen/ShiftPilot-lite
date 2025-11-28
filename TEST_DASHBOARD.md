# Guide de test du Dashboard

## 🚀 Accès au Dashboard

1. **Démarrez le serveur** (déjà en cours) :
   ```bash
   npm run dev
   ```

2. **Ouvrez votre navigateur** :
   - URL : `http://localhost:3000`

## 📋 Checklist de test

### 1. Authentification
- [ ] Aller sur `/register` et créer un compte
- [ ] Vérifier la redirection vers `/dashboard` après inscription
- [ ] Se déconnecter et se reconnecter via `/login`
- [ ] Tester la réinitialisation de mot de passe

### 2. Dashboard Overview (`/dashboard`)
- [ ] Vérifier l'affichage des statistiques (Employés, Shifts, Heures, Couverture)
- [ ] Vérifier le message d'alerte si pas d'organisation
- [ ] Tester les boutons d'actions rapides
- [ ] Vérifier le responsive (mobile/desktop)

### 3. Navigation
- [ ] Tester la sidebar (desktop)
- [ ] Tester le menu mobile (bouton hamburger)
- [ ] Vérifier que les liens fonctionnent
- [ ] Vérifier l'état actif des liens selon la page

### 4. Header
- [ ] Vérifier l'affichage de l'avatar utilisateur
- [ ] Tester le menu déroulant utilisateur
- [ ] Vérifier la barre de recherche (desktop)
- [ ] Tester la déconnexion

### 5. Page Employés (`/dashboard/employees`)
- [ ] Voir la liste des employés (vide au début)
- [ ] Cliquer sur "Ajouter un employé"
- [ ] Remplir le formulaire et soumettre
- [ ] Vérifier le message d'erreur (l'utilisateur doit d'abord s'inscrire)
- [ ] Vérifier que votre propre profil apparaît dans la liste
- [ ] Tester l'édition d'un employé
- [ ] Tester la suppression (désactivation)

### 6. Pages placeholder
- [ ] `/dashboard/planning` - Affiche "En cours de développement"
- [ ] `/dashboard/shifts` - Affiche "En cours de développement"
- [ ] `/dashboard/time-tracking` - Affiche "En cours de développement"
- [ ] `/dashboard/analytics` - Affiche "En cours de développement"
- [ ] `/dashboard/settings` - Affiche "En cours de développement"

## 🐛 Problèmes connus

### Création d'employé
- **Problème** : On ne peut pas créer un employé sans qu'un utilisateur s'inscrive d'abord avec cet email
- **Solution temporaire** : Les utilisateurs doivent s'inscrire eux-mêmes
- **Solution future** : Implémenter l'invitation par email (Phase 4)

### Organisation
- **Problème** : Un utilisateur nouvellement inscrit n'a pas d'organisation
- **Solution** : Créer une organisation automatiquement lors de l'inscription (à implémenter)

## ✅ Points à vérifier

1. **Dark mode** : Le dashboard doit être en dark mode par défaut
2. **Responsive** : Tester sur mobile, tablette et desktop
3. **Navigation** : Tous les liens doivent fonctionner
4. **Auth** : Protection des routes, redirections correctes
5. **Performance** : Pas de lag, chargement rapide

## 📝 Notes

- Le dashboard est fonctionnel mais certaines fonctionnalités sont en placeholder
- La création d'employé nécessite que l'utilisateur existe déjà dans auth.users
- Les statistiques sont basiques pour l'instant (seront améliorées en Phase 3)

