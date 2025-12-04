# ⚡ Correction Immédiate - Erreur schedule_id

## ❌ Votre Erreur

```
ERROR: 42703: column "schedule_id" does not exist
```

## ✅ Solution en 1 Minute

### Méthode Rapide

1. **Ouvrir** le fichier `FIX_SCHEDULE_ID_NOW.sql` dans votre éditeur
2. **Copier TOUT le contenu** (`Ctrl+A` puis `Ctrl+C`)
3. **Supabase Dashboard** → **SQL Editor** → **New query**
4. **Coller** le contenu (`Ctrl+V`)
5. **Run**

✅ **C'est fait !** La colonne `schedule_id` sera créée si elle n'existe pas.

---

## 🔍 Vérification

Après avoir exécuté le script, vérifiez :

```sql
-- Vérifier que schedule_id existe maintenant
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'shifts' AND column_name = 'schedule_id';
```

**Résultat attendu** : 1 ligne avec `schedule_id`

---

## 🔄 Prochaines Étapes

Une fois `schedule_id` créée :

1. ✅ Appliquer la migration 002 (elle devrait maintenant fonctionner)
2. ✅ Appliquer la migration 003
3. ✅ Continuer avec le déploiement

---

**Fichier à utiliser** : `FIX_SCHEDULE_ID_NOW.sql`

**Temps** : ⚡ 1 minute

