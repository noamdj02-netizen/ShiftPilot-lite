# Migration 005 - Correction récursion RLS profiles

## Problème
La table `profiles` avait des politiques RLS qui causaient une récursion infinie car elles référençaient la table `profiles` elle-même dans leurs conditions.

## Solution
Cette migration :
1. Vérifie que la table `profiles` existe (doit être créée par la migration 001)
2. Crée des fonctions `SECURITY DEFINER` pour bypasser RLS :
   - `get_user_organization_id()` : obtient l'organization_id de l'utilisateur
   - `is_user_manager_or_owner()` : vérifie si l'utilisateur est manager/owner
3. Recrée les politiques RLS sans récursion

## Ordre d'exécution
⚠️ **IMPORTANT** : Cette migration doit être exécutée APRÈS la migration 001 qui crée la table `profiles`.

Ordre recommandé :
1. `001_complete_schema.sql` - Crée la table profiles
2. `002_consolidate_schema_fixes.sql` (si applicable)
3. `003_enhance_rls_policies.sql` (si applicable)
4. `005_fix_profiles_rls_recursion.sql` - Corrige la récursion

## Exécution
Dans Supabase Dashboard → SQL Editor, exécutez le contenu de ce fichier.

Ou via CLI :
```bash
supabase db push
```

## Vérification
Après exécution, testez que le portail fonctionne sans erreur de récursion.

