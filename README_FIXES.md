# 🔧 Guide de Correction des Erreurs de Migration

## ⚡ Solutions Rapides

### Erreur 1 : "syntax error at or near `"
**Solution** : Voir `CORRIGER_ERREUR_NOW.md` ou `SOLUTION_ERREUR_MIGRATION.md`

### Erreur 2 : "column schedule_id does not exist" ⬅️ **VOTRE ERREUR ACTUELLE**

#### Solution Rapide (30 secondes)

1. **Ouvrir** le fichier `CORRECTION_SCHEDULE_ID.sql`
2. **Sélectionner tout** (`Ctrl+A`)
3. **Copier** (`Ctrl+C`)
4. **Supabase Dashboard** → **SQL Editor** → **New query**
5. **Coller** (`Ctrl+V`)
6. **Run**

✅ **C'est fait !** La colonne `schedule_id` sera créée.

#### Vérification

Après avoir exécuté le script, exécutez :

```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'shifts' AND column_name = 'schedule_id';
```

Si vous voyez `schedule_id` → ✅ **Problème résolu !**

---

## 📋 Ordre d'Application Recommandé

Après avoir corrigé l'erreur :

1. ✅ **Vérifier** que `schedule_id` existe (script ci-dessus)
2. ✅ **Continuer** avec la migration 002
3. ✅ **Appliquer** la migration 003
4. ✅ **Continuer** le déploiement

---

## 📚 Documentation Complète

- `SOLUTION_COMPLETE_MIGRATION_ERROR.md` - Guide détaillé
- `CORRIGER_SCHEDULE_ID.md` - Solution rapide
- `GUIDE_RAPIDE_CORRECTION.md` - Guide rapide

---

**Fichier à utiliser maintenant** : `CORRECTION_SCHEDULE_ID.sql` ⚡

