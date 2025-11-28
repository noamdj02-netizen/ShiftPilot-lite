-- Fix pour le trigger handle_new_user
-- Ce script améliore la fonction pour utiliser les metadata de l'utilisateur

-- Supprimer l'ancien trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Améliorer la fonction pour utiliser les metadata
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', NULL),
        COALESCE(NEW.raw_user_meta_data->>'last_name', NULL),
        'owner' -- Premier utilisateur = owner
    );
    RETURN NEW;
EXCEPTION
    WHEN others THEN
        -- Log l'erreur mais ne bloque pas la création de l'utilisateur
        RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recréer le trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Ajouter une politique pour permettre l'insertion de profils (nécessaire pour le trigger)
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile" ON profiles
    FOR INSERT
    WITH CHECK (id = auth.uid());

-- Permettre aussi l'insertion via SECURITY DEFINER (pour le trigger)
-- Le trigger utilise SECURITY DEFINER donc il peut bypasser RLS

