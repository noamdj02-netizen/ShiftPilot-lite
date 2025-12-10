# 🚀 Guide d'application de la migration ShiftPilot

## Fichier de migration

**Fichier:** `supabase/migrations/026_shiftpilot_production_schema_FINAL.sql`

## Étapes pour appliquer la migration

### 1. Accéder à Supabase Dashboard

1. Allez sur [supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet ShiftPilot
3. Cliquez sur **SQL Editor** dans le menu de gauche

### 2. Ouvrir le fichier de migration

1. Ouvrez le fichier `supabase/migrations/026_shiftpilot_production_schema_FINAL.sql` dans votre éditeur
2. Sélectionnez tout le contenu (Ctrl+A)
3. Copiez le contenu (Ctrl+C)

### 3. Exécuter la migration

1. Dans Supabase SQL Editor, cliquez sur **New Query**
2. Collez le contenu du fichier (Ctrl+V)
3. Cliquez sur **Run** ou appuyez sur `Ctrl+Enter`

### 4. Vérifier le résultat

La migration devrait s'exécuter sans erreur. Vous devriez voir :
- ✅ Toutes les tables créées
- ✅ Tous les index créés
- ✅ RLS activé
- ✅ Politiques créées

### 5. Vérifier les tables créées

Exécutez cette requête pour vérifier que toutes les tables existent :

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'restaurants', 'employes', 'plannings', 'shifts', 
    'alertes', 'indisponibilites', 'contraintes_legales',
    'previsions_activite', 'historique_fatigue', 'messages_planning'
  )
ORDER BY table_name;
```

Vous devriez voir 10 tables.

### 6. Vérifier les politiques RLS

Exécutez cette requête pour vérifier les politiques :

```sql
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

## ⚠️ Important

- **Sauvegarde:** Assurez-vous d'avoir une sauvegarde de votre base de données avant d'appliquer la migration
- **Données existantes:** Si vous avez des données existantes, elles seront préservées (sauf si une table est supprimée et recréée)
- **Test:** Testez d'abord sur un environnement de développement si possible

## 🔧 En cas d'erreur

Si vous rencontrez une erreur :

1. **Notez le message d'erreur exact**
2. **Vérifiez quelle ligne cause l'erreur**
3. **Vérifiez que vous utilisez bien le fichier `_FINAL.sql`**

Les erreurs courantes :
- `column "restaurant_id" does not exist` → Utilisez le fichier `_FINAL.sql` qui gère cela
- `relation already exists` → Normal, les tables sont créées avec `IF NOT EXISTS`
- `policy already exists` → Normal, les politiques sont supprimées avant d'être recréées

## ✅ Après la migration

Une fois la migration appliquée avec succès :

1. **Générer les types TypeScript** (optionnel) :
   ```bash
   npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
   ```

2. **Tester les requêtes** :
   - Créer un restaurant
   - Ajouter un employé
   - Créer un planning

3. **Vérifier les politiques RLS** :
   - Connectez-vous avec un utilisateur
   - Vérifiez qu'il ne voit que ses propres données

## 📚 Documentation

Pour plus d'informations sur le schéma, consultez :
- `docs/DATABASE_SCHEMA.md` - Documentation complète du schéma

