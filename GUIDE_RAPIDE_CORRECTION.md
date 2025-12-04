# 🚨 Guide Rapide - Corriger l'Erreur schedule_id

## ❌ Votre Erreur Actuelle

```
ERROR: 42703: column "schedule_id" does not exist
```

## ✅ Solution la Plus Simple (30 secondes)

### Étape 1 : Exécuter le Script de Correction

1. **Ouvrir** le fichier : `FIX_SCHEDULE_ID_NOW.sql`
2. **Sélectionner tout** (`Ctrl+A`)
3. **Copier** (`Ctrl+C`)
4. **Supabase Dashboard** → **SQL Editor** → **New query**
5. **Coller** (`Ctrl+V`)
6. **Run**

✅ **C'est tout !** La colonne `schedule_id` sera créée automatiquement.

---

## 🔍 Pourquoi Cette Erreur ?

La colonne `schedule_id` devrait être créée dans la migration 001, mais elle n'existe pas. Cela peut arriver si :
- La migration 001 n'a pas été complètement appliquée
- Il y a eu une erreur partielle lors de la création de la table

---

## 📋 Vérification Rapide

Après avoir exécuté le script, vérifiez :

```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'shifts' AND column_name = 'schedule_id';
```

**Si vous voyez `schedule_id` dans les résultats → ✅ C'est corrigé !**

---

## 🔄 Continuer les Migrations

Une fois corrigé :

1. ✅ **Migration 002** devrait maintenant fonctionner
2. ✅ **Migration 003** ensuite
3. ✅ **Déploiement Vercel**

---

**Fichier à utiliser** : `FIX_SCHEDULE_ID_NOW.sql`  
**Temps** : ⚡ 30 secondes

