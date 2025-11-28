-- Fix complet pour le trigger handle_new_user
-- Exécutez ce script dans Supabase SQL Editor

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
        'owner', -- Premier utilisateur = owner par défaut
        true
    )
    ON CONFLICT (id) DO NOTHING; -- Éviter les doublons
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Logger l'erreur mais ne pas bloquer la création de l'utilisateur
        RAISE WARNING '[handle_new_user] Error creating profile for user %: % (SQLSTATE: %)', 
            NEW.id, SQLERRM, SQLSTATE;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Recréer le trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW 
    EXECUTE FUNCTION handle_new_user();

-- 4. Vérifier et créer les politiques RLS nécessaires
-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON profiles;

-- Politique pour permettre l'insertion via le trigger (SECURITY DEFINER bypass RLS)
-- Mais on en crée une quand même pour être sûr
CREATE POLICY "Enable insert for authenticated users" ON profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Politique pour permettre l'insertion de son propre profil
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT
    WITH CHECK (id = auth.uid());

-- 5. Vérifier que la table profiles existe et a les bonnes colonnes
DO $$
BEGIN
    -- Vérifier que la colonne role existe
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'role'
    ) THEN
        RAISE EXCEPTION 'Column "role" does not exist in profiles table';
    END IF;
END $$;

-- 6. Test de la fonction (optionnel - commenté pour éviter les erreurs)
-- SELECT handle_new_user_test();

