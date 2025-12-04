# 🔍 DÉPANNAGE - ERREUR ONBOARDING

## Erreur : "Une erreur est survenue"

### Causes possibles

1. **Table `organizations` n'existe pas**
   - Vérifiez que la migration de base a été appliquée
   - Dans Supabase Dashboard → SQL Editor, exécutez :
   ```sql
   SELECT * FROM organizations LIMIT 1;
   ```

2. **Table `locations` n'existe pas**
   - Vérifiez que la table existe :
   ```sql
   SELECT * FROM locations LIMIT 1;
   ```

3. **Permissions RLS (Row Level Security)**
   - Les politiques RLS peuvent bloquer l'insertion
   - Vérifiez les politiques dans Supabase Dashboard → Authentication → Policies

4. **Profil utilisateur manquant**
   - Le profil doit exister dans la table `profiles`
   - Vérifiez :
   ```sql
   SELECT * FROM profiles WHERE id = auth.uid();
   ```

5. **Erreur de validation**
   - Vérifiez que tous les champs obligatoires sont remplis
   - Nom, adresse, ville sont requis

### Solutions

#### Solution 1 : Vérifier les tables
```sql
-- Vérifier que les tables existent
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('organizations', 'locations', 'profiles', 'labor_rules', 'message_channels', 'audit_logs');
```

#### Solution 2 : Vérifier les permissions RLS
```sql
-- Vérifier les politiques pour organizations
SELECT * FROM pg_policies WHERE tablename = 'organizations';

-- Si aucune politique, créer une politique temporaire pour tester
CREATE POLICY "Allow authenticated users to create organizations" ON organizations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
```

#### Solution 3 : Vérifier le profil utilisateur
```sql
-- Vérifier votre profil
SELECT id, email, role, organization_id 
FROM profiles 
WHERE id = auth.uid();
```

#### Solution 4 : Logs détaillés
Ouvrez la console du navigateur (F12) et regardez :
- L'erreur exacte dans la console
- La réponse de l'API dans l'onglet Network
- Les logs serveur dans le terminal

### Messages d'erreur améliorés

Les messages d'erreur ont été améliorés pour être plus explicites :

- **400** : "Veuillez remplir tous les champs obligatoires"
- **401** : "Vous devez être connecté"
- **500** : "Erreur serveur. Vérifiez les logs."

### Test rapide

1. **Ouvrez la console du navigateur** (F12)
2. **Allez dans l'onglet Network**
3. **Soumettez le formulaire**
4. **Cliquez sur la requête `/api/auth/onboarding-employer`**
5. **Regardez la réponse** (onglet Response)

### Vérification manuelle

Pour créer une organisation manuellement (test) :

```sql
-- 1. Créer l'organisation
INSERT INTO organizations (name, slug, address, city, country, timezone)
VALUES (
  'Test Organization',
  'test-org-' || substr(md5(random()::text), 0, 7),
  '123 Test Street',
  'Paris',
  'FR',
  'Europe/Paris'
)
RETURNING id;

-- 2. Mettre à jour votre profil (remplacez ORG_ID par l'ID créé)
UPDATE profiles
SET organization_id = 'ORG_ID',
    role = 'OWNER'
WHERE id = auth.uid();
```

---

**Si le problème persiste**, vérifiez :
1. Les logs serveur (terminal où `npm run dev` tourne)
2. Les logs Supabase (Dashboard → Logs)
3. La console du navigateur (F12)

