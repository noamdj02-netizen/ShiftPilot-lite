# ✅ CORRECTION - ONBOARDING ORGANISATION

## Problème résolu

L'erreur **"Organisation requise. Veuillez compléter votre profil."** apparaissait car l'utilisateur n'avait pas d'organisation associée.

## ✅ Solutions appliquées

### 1. Page d'onboarding créée
**Fichier** : `app/onboarding/employer/page.tsx`
- Formulaire complet pour créer une organisation
- Champs : nom entreprise, adresse, ville, pays, établissement
- Validation et gestion d'erreurs
- Redirection automatique vers le dashboard après création

### 2. Redirection automatique
**Fichier** : `app/dashboard/employer/layout.tsx`
- Vérification automatique si l'utilisateur a une organisation
- Redirection vers `/onboarding/employer` si pas d'organisation
- Utilise `useAuth` pour vérifier le profil

### 3. Route API corrigée
**Fichier** : `app/api/auth/onboarding-employer/route.ts`
- Vérification améliorée de l'organisation existante
- Création complète : organisation + établissement + règles RH

## 🚀 Utilisation

### Pour un nouvel utilisateur
1. Se connecter avec un compte employeur
2. Redirection automatique vers `/onboarding/employer`
3. Remplir le formulaire :
   - **Nom de l'entreprise** (obligatoire)
   - **Adresse** (obligatoire)
   - **Ville** (obligatoire)
   - **Pays** (défaut: France)
   - **Établissement** (optionnel)
4. Cliquer sur "Créer mon organisation"
5. Redirection automatique vers le dashboard

### Pour un utilisateur existant sans organisation
1. Aller sur `/onboarding/employer` manuellement
2. Ou être redirigé automatiquement depuis le dashboard

## 📋 Ce qui est créé lors de l'onboarding

1. **Organisation** (`organizations`)
   - Nom, slug, adresse, ville, pays, timezone

2. **Établissement** (`locations`)
   - Premier établissement lié à l'organisation

3. **Profil utilisateur** (`profiles`)
   - Mise à jour avec `organization_id`
   - Rôle défini sur `OWNER`

4. **Règles RH** (`labor_rules`)
   - Règles par défaut pour la France
   - Max 48h/semaine, repos 11h entre shifts, etc.

5. **Canal de messagerie** (`message_channels`)
   - Canal "Général" pour l'équipe

## 🔍 Vérification

Pour vérifier qu'une organisation a été créée :

```sql
-- Dans Supabase SQL Editor
SELECT 
  o.name as organization_name,
  p.email,
  p.role,
  p.organization_id
FROM profiles p
LEFT JOIN organizations o ON o.id = p.organization_id
WHERE p.email = 'votre-email@example.com';
```

## ⚠️ Notes importantes

- L'onboarding ne peut être fait qu'une seule fois par utilisateur
- Si l'utilisateur a déjà une organisation, la route retourne une erreur 400
- Le formulaire valide les champs obligatoires avant envoi
- Les erreurs sont affichées via des toasts

---

**L'onboarding est maintenant fonctionnel ! 🎉**

