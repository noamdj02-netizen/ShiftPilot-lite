# 🔧 Solution Complète - Erreur "schedule_id does not exist"

## ❌ Votre Erreur

```
ERROR: 42703: column "schedule_id" does not exist
```

## 🔍 Le Problème

La colonne `schedule_id` devrait être créée dans la migration 001, mais elle n'existe pas. Cela peut arriver si :
- La migration 001 n'a pas été complètement appliquée
- Il y a eu une erreur lors de la création de la table `shifts`
- La table `shifts` existe mais sans la colonne `schedule_id`

## ✅ Solution Immédiate (2 minutes)

### Option A : Ajouter la Colonne Manquante

Exécutez ce SQL dans Supabase SQL Editor :

```sql
-- Vérifier que la table shifts existe
SELECT 1 FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'shifts';

-- Vérifier que la table schedules existe (nécessaire pour la référence)
SELECT 1 FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'schedules';

-- Ajouter la colonne schedule_id si elle n'existe pas
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'shifts' AND column_name = 'schedule_id'
    ) THEN
        ALTER TABLE shifts ADD COLUMN schedule_id UUID REFERENCES schedules(id) ON DELETE CASCADE;
        CREATE INDEX IF NOT EXISTS idx_shifts_schedule ON shifts(schedule_id);
    END IF;
END $$;
```

### Option B : Réappliquer la Migration 001 (Si rien ne fonctionne)

Si la table `shifts` n'existe pas ou est incomplète :

1. **Ouvrir** `supabase/migrations/001_complete_schema.sql`
2. **Copier TOUT le contenu** (Ctrl+A puis Ctrl+C)
3. **Supabase SQL Editor** → New query
4. **Coller** le contenu (Ctrl+V)
5. **Run**

⚠️ **Attention** : Si vous avez déjà des données, cela peut les affecter.

## 📋 Checklist de Vérification

### 1. Vérifier que les Tables Existent

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('schedules', 'shifts')
ORDER BY table_name;
```

**Résultat attendu** : 2 lignes (schedules et shifts)

### 2. Vérifier que schedule_id Existe

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'shifts' 
AND column_name = 'schedule_id';
```

**Résultat attendu** : 1 ligne avec `schedule_id` et `uuid`

### 3. Si schedule_id N'Existe Pas

Exécutez la solution Option A ci-dessus.

## 🔄 Après la Correction

Une fois `schedule_id` créée :

1. ✅ Continuer avec la migration 002 (elle devrait maintenant fonctionner)
2. ✅ Appliquer la migration 003
3. ✅ Vérifier que tout fonctionne

## 💡 Prévention

Pour éviter ce problème à l'avenir :

1. **Appliquez toujours les migrations dans l'ordre** : 001, 002, 003
2. **Vérifiez qu'il n'y a pas d'erreur** après chaque migration
3. **Vérifiez que les tables sont créées** avant de continuer

---

**Temps de résolution** : ⚡ 2 minutes

**Ensuite** : Continuez avec les autres migrations (002, 003)

