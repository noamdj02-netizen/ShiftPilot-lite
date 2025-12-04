# 📋 Guide d'Application des Migrations Supabase

## 🎯 Vue d'ensemble

Ce guide explique comment appliquer les migrations Supabase dans le bon ordre pour mettre à jour votre base de données avec toutes les tables, RLS policies, et index nécessaires.

---

## 📦 Migrations Disponibles

1. **001_complete_schema.sql** - Schéma complet initial (tables, enums, RLS de base)
2. **002_consolidate_schema_fixes.sql** - Consolidation et corrections du schéma
3. **003_enhance_rls_policies.sql** - Amélioration des RLS policies et index optimisés

---

## ✅ Méthode 1 : Via Supabase Dashboard (Recommandé pour débutants)

### Étape 1 : Accéder au SQL Editor
1. Connectez-vous à votre projet sur [supabase.com](https://supabase.com)
2. Allez dans **SQL Editor** dans le menu de gauche
3. Cliquez sur **New query**

### Étape 2 : Appliquer la Migration 001
1. Ouvrez le fichier `supabase/migrations/001_complete_schema.sql`
2. Copiez tout le contenu
3. Collez-le dans le SQL Editor
4. Cliquez sur **Run** (ou `Ctrl+Enter`)
5. ⚠️ **Vérifiez qu'il n'y a pas d'erreur** dans les résultats

### Étape 3 : Appliquer la Migration 002
1. Ouvrez le fichier `supabase/migrations/002_consolidate_schema_fixes.sql`
2. Copiez tout le contenu
3. Collez-le dans le SQL Editor
4. Cliquez sur **Run**
5. ⚠️ **Vérifiez qu'il n'y a pas d'erreur**

### Étape 4 : Appliquer la Migration 003
1. Ouvrez le fichier `supabase/migrations/003_enhance_rls_policies.sql`
2. Copiez tout le contenu
3. Collez-le dans le SQL Editor
4. Cliquez sur **Run**
5. ⚠️ **Vérifiez qu'il n'y a pas d'erreur**

### Étape 5 : Vérification
Exécutez cette requête pour vérifier que toutes les tables existent :

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Vous devriez voir :
- organizations
- locations
- profiles
- employees
- schedules
- shifts
- time_off_requests
- message_channels
- messages
- labor_rules
- notifications
- audit_logs

---

## ✅ Méthode 2 : Via Supabase CLI (Recommandé pour développement)

### Prérequis
```bash
# Installer Supabase CLI
npm install -g supabase

# Ou via Homebrew (Mac)
brew install supabase/tap/supabase
```

### Étape 1 : Lier votre projet
```bash
# Dans le répertoire du projet
supabase link --project-ref votre-project-ref

# Vous pouvez trouver votre project-ref dans:
# Supabase Dashboard → Settings → General → Reference ID
```

### Étape 2 : Appliquer les migrations
```bash
# Appliquer toutes les migrations
supabase db push

# Ou migrer vers une version spécifique
supabase migration up
```

### Étape 3 : Vérifier le statut
```bash
# Lister les migrations appliquées
supabase migration list
```

---

## ✅ Méthode 3 : Via MCP Supabase (Si configuré)

Si vous avez configuré le MCP Supabase, vous pouvez utiliser les outils directement depuis Cursor.

### Vérifier les migrations existantes
```typescript
// Utiliser mcp_supabase_list_migrations
```

### Appliquer une migration
```typescript
// Utiliser mcp_supabase_apply_migration
```

---

## 🔍 Vérifications Post-Migration

### 1. Vérifier les Tables
```sql
SELECT 
    table_name,
    (SELECT count(*) 
     FROM information_schema.columns 
     WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
ORDER BY table_name;
```

### 2. Vérifier les RLS Policies
```sql
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

### 3. Vérifier les Index
```sql
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

### 4. Vérifier les Enums
```sql
SELECT 
    t.typname as enum_name,
    array_agg(e.enumlabel ORDER BY e.enumsortorder) as enum_values
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
WHERE t.typname IN ('user_role', 'schedule_status', 'time_off_status', 'message_channel_type')
GROUP BY t.typname;
```

---

## ⚠️ Erreurs Courantes et Solutions

### Erreur : "relation already exists"
**Solution**: La table existe déjà. Vérifiez si vous devez la supprimer d'abord ou si la migration est déjà appliquée.

### Erreur : "policy already exists"
**Solution**: Utilisez `DROP POLICY IF EXISTS` avant de créer la policy (déjà inclus dans la migration 003).

### Erreur : "permission denied"
**Solution**: Vérifiez que vous utilisez le bon compte et que vous avez les permissions nécessaires.

### Erreur : "column does not exist"
**Solution**: Vérifiez que la migration 001 a été appliquée correctement avant d'appliquer les suivantes.

---

## 🔄 Ordre d'Application (Important!)

**IMPORTANT**: Appliquez les migrations dans cet ordre exact :

1. ✅ **001_complete_schema.sql** (FONDATION)
   - Crée toutes les tables, enums, contraintes de base
   - Crée les RLS policies de base
   - Crée les triggers et fonctions

2. ✅ **002_consolidate_schema_fixes.sql** (CORRECTIONS)
   - Corrige les incohérences
   - Ajoute des colonnes manquantes
   - S'assure que RLS est activé partout

3. ✅ **003_enhance_rls_policies.sql** (OPTIMISATIONS)
   - Améliore les RLS policies existantes
   - Ajoute des index optimisés
   - Finalise les permissions

---

## 📝 Notes Importantes

### Avant d'appliquer
- ⚠️ **Sauvegardez votre base de données** (backup)
- ⚠️ **Testez sur un environnement de développement** d'abord
- ⚠️ **Vérifiez que vous avez les permissions** nécessaires

### Après avoir appliqué
- ✅ Vérifiez que toutes les tables existent
- ✅ Testez les RLS policies avec différents utilisateurs
- ✅ Vérifiez que les index sont créés
- ✅ Testez quelques requêtes de base

### En cas de problème
1. Vérifiez les logs dans Supabase Dashboard → Logs
2. Consultez les erreurs dans le SQL Editor
3. Vérifiez que l'ordre d'application est correct
4. Contactez le support si nécessaire

---

## 🚀 Prochaines Étapes

Une fois les migrations appliquées :

1. ✅ Vérifier que toutes les tables existent
2. ✅ Tester les RLS policies
3. ✅ Configurer les variables d'environnement
4. ✅ Déployer sur Vercel
5. ✅ Tester en production

---

**Date**: 2024
**Status**: ✅ Guide complet

