# Guide de dépannage ShiftPilot

## Erreur : "Database error saving new user"

### Problème
Lors de l'inscription, le trigger `handle_new_user()` ne peut pas créer le profil automatiquement.

### ⚡ Solution rapide (RECOMMANDÉE)

**Exécutez ce script SQL dans Supabase Dashboard → SQL Editor :**

```sql
-- Script de correction complet
-- Copiez-collez tout ce script dans Supabase SQL Editor

-- 1. Supprimer l'ancien trigger et fonction
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- 2. Recréer la fonction avec gestion d'erreur améliorée
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_first_name TEXT;
    v_last_name TEXT;
BEGIN
    -- Extraire les metadata
    v_first_name := NEW.raw_user_meta_data->>'first_name';
    v_last_name := NEW.raw_user_meta_data->>'last_name';
    
    -- Insérer le profil
    INSERT INTO public.profiles (
        id, 
        email, 
        first_name, 
        last_name, 
        role,
        is_active
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.email, ''),
        NULLIF(v_first_name, ''),
        NULLIF(v_last_name, ''),
        'owner',
        true
    )
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING '[handle_new_user] Error: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Recréer le trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW 
    EXECUTE FUNCTION handle_new_user();

-- 4. Créer les politiques RLS nécessaires
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON profiles;
CREATE POLICY "Enable insert for authenticated users" ON profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT
    WITH CHECK (id = auth.uid());
```

### Solutions alternatives

#### Solution 1 : Exécuter le script de correction SQL

1. Allez dans Supabase Dashboard → SQL Editor
2. Exécutez le contenu du fichier `supabase/fix-user-trigger-complete.sql`
3. Réessayez de créer un compte

#### Solution 2 : Vérifier les politiques RLS

Assurez-vous que les politiques suivantes existent :

```sql
-- Permettre l'insertion de profils
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT
    WITH CHECK (id = auth.uid());
```

#### Solution 3 : Vérifier que le trigger existe

```sql
-- Vérifier que le trigger existe
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Si absent, recréer :
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

#### Solution 4 : Vérifier les logs Supabase

1. Allez dans Supabase Dashboard → Logs → Postgres Logs
2. Cherchez les erreurs liées à `handle_new_user` ou `profiles`
3. Vérifiez les permissions de la fonction

### Vérification

Après avoir appliqué les corrections, testez :

1. Créez un nouveau compte via `/register`
2. Vérifiez dans Supabase Table Editor que le profil a été créé dans `profiles`
3. Vérifiez que `first_name` et `last_name` sont bien remplis

### Si le problème persiste

1. Vérifiez que le schéma SQL complet a été exécuté
2. Vérifiez que la table `profiles` existe
3. Vérifiez que les types ENUM existent (`user_role`, etc.)
4. Contactez le support avec les logs d'erreur complets

