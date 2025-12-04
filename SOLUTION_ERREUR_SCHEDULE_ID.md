# 🔧 Solution - Erreur "column schedule_id does not exist"

## ❌ Votre Erreur

```
Error: Failed to run sql query: ERROR: 42703: column "schedule_id" does not exist
```

## 🔍 Diagnostic

Cette erreur indique que la colonne `schedule_id` n'existe pas dans la table `shifts`. Cela peut arriver si :

1. La migration 001 n'a pas été complètement appliquée
2. Il y a eu une erreur lors de la création de la table `shifts`
3. La migration 002 essaie d'utiliser `schedule_id` avant qu'elle n'existe

## ✅ Solution

### Option 1 : Vérifier et Réappliquer la Migration 001

La colonne `schedule_id` devrait être créée dans la migration 001. Vérifiez :

1. **Vérifier si la table `shifts` existe** :
   ```sql
   SELECT * FROM information_schema.tables 
   WHERE table_schema = 'public' AND table_name = 'shifts';
   ```

2. **Vérifier si la colonne `schedule_id` existe** :
   ```sql
   SELECT * FROM information_schema.columns 
   WHERE table_name = 'shifts' AND column_name = 'schedule_id';
   ```

3. **Si la colonne n'existe pas**, exécutez cette commande dans Supabase SQL Editor :
   ```sql
   -- Ajouter la colonne schedule_id si elle n'existe pas
   ALTER TABLE shifts ADD COLUMN schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE;
   ```

### Option 2 : Réappliquer les Migrations dans l'Ordre

Si vous n'êtes pas sûr de l'état actuel, la meilleure solution est de :

1. **Vérifier l'état actuel** :
   - Aller dans Supabase Dashboard → Table Editor
   - Vérifier quelles tables existent

2. **Réappliquer la Migration 001** (si nécessaire) :
   - Si la table `shifts` n'existe pas complètement
   - Ouvrir `supabase/migrations/001_complete_schema.sql`
   - Copier le **contenu** (pas le nom du fichier !)
   - Coller dans Supabase SQL Editor
   - Run

3. **Puis appliquer la Migration 004** (nouvelle migration de correction) :
   - Ouvrir `supabase/migrations/004_fix_schedule_id_column.sql`
   - Copier le **contenu**
   - Coller dans Supabase SQL Editor
   - Run

## 📋 Étape par Étape - Correction Rapide

### Étape 1 : Vérifier l'État Actuel

Dans Supabase SQL Editor, exécutez :

```sql
-- Vérifier les tables existantes
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Vous devriez voir au minimum :
- organizations
- schedules
- shifts

### Étape 2 : Vérifier la Colonne schedule_id

```sql
-- Vérifier les colonnes de la table shifts
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'shifts' 
ORDER BY ordinal_position;
```

### Étape 3 : Ajouter la Colonne si Manquante

Si `schedule_id` n'apparaît pas dans les résultats :

```sql
-- Vérifier que schedules existe
SELECT 1 FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'schedules';

-- Si schedules existe, ajouter schedule_id
ALTER TABLE shifts ADD COLUMN schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE;

-- Créer l'index
CREATE INDEX IF NOT EXISTS idx_shifts_schedule ON shifts(schedule_id);
```

### Étape 4 : Appliquer la Migration 004

Une nouvelle migration de correction a été créée. Appliquez-la :

1. Ouvrir `supabase/migrations/004_fix_schedule_id_column.sql`
2. Copier tout le contenu
3. Coller dans Supabase SQL Editor
4. Run

## 🔄 Solution Alternative : Migration Complète

Si vous préférez repartir de zéro (⚠️ Attention : supprime les données) :

```sql
-- ⚠️ ATTENTION : Ceci supprime toutes les données !
-- Utilisez uniquement sur un environnement de développement

DROP TABLE IF EXISTS shifts CASCADE;
DROP TABLE IF EXISTS schedules CASCADE;

-- Puis réappliquez la migration 001_complete_schema.sql
```

## ✅ Vérification Post-Correction

Après la correction, vérifiez :

```sql
-- Vérifier que schedule_id existe
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'shifts' AND column_name = 'schedule_id';

-- Devrait retourner une ligne avec 'schedule_id'
```

## 🎯 Prochaine Étape

Une fois `schedule_id` créée :

1. ✅ Appliquer la migration 002
2. ✅ Appliquer la migration 003
3. ✅ Continuer avec le déploiement

---

**Date** : 2024
**Status** : ✅ Solution complète

