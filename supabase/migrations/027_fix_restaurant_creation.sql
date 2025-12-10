-- =============================================
-- FIX: Création de restaurant lors de l'inscription
-- =============================================
-- 
-- Problème: La politique RLS bloque la création de restaurant
-- lors de l'inscription car la session n'est pas encore complètement établie.
--
-- Solution: Créer une fonction SQL sécurisée (SECURITY DEFINER)
-- qui permet de créer un restaurant en contournant RLS de manière sécurisée.
--
-- =============================================

-- Fonction pour créer un restaurant lors de l'inscription
-- Note: Cette fonction utilise SECURITY DEFINER pour contourner RLS
-- Elle vérifie que l'utilisateur existe dans auth.users pour la sécurité
CREATE OR REPLACE FUNCTION create_restaurant_on_signup(
  p_nom VARCHAR(255),
  p_owner_id UUID
)
RETURNS TABLE (
  id UUID,
  nom VARCHAR(255),
  owner_id UUID,
  plan VARCHAR(20),
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_exists BOOLEAN;
BEGIN
  -- Vérifier que l'utilisateur existe dans auth.users
  -- (plus fiable que auth.uid() qui peut être NULL juste après signUp)
  SELECT EXISTS(SELECT 1 FROM auth.users WHERE auth.users.id = p_owner_id) INTO v_user_exists;
  
  IF NOT v_user_exists THEN
    RAISE EXCEPTION 'User does not exist';
  END IF;
  
  -- Vérifier que l'utilisateur n'a pas déjà un restaurant
  IF EXISTS(SELECT 1 FROM public.restaurants WHERE public.restaurants.owner_id = p_owner_id) THEN
    RAISE EXCEPTION 'User already has a restaurant';
  END IF;
  
  -- Créer le restaurant
  INSERT INTO public.restaurants (
    nom,
    owner_id,
    plan,
    horaires_ouverture
  )
  VALUES (
    p_nom,
    p_owner_id,
    'trial',
    '{
      "lundi": {"ouvert": true, "debut": "11:00", "fin": "23:00", "coupure": false},
      "mardi": {"ouvert": true, "debut": "11:00", "fin": "23:00", "coupure": false},
      "mercredi": {"ouvert": true, "debut": "11:00", "fin": "23:00", "coupure": false},
      "jeudi": {"ouvert": true, "debut": "11:00", "fin": "23:00", "coupure": false},
      "vendredi": {"ouvert": true, "debut": "11:00", "fin": "00:00", "coupure": false},
      "samedi": {"ouvert": true, "debut": "11:00", "fin": "00:00", "coupure": false},
      "dimanche": {"ouvert": false, "debut": null, "fin": null, "coupure": false}
    }'::jsonb
  );
  
  -- Retourner les données du restaurant créé avec RETURN QUERY
  RETURN QUERY
  SELECT 
    r.id,
    r.nom,
    r.owner_id,
    r.plan,
    r.created_at
  FROM public.restaurants r
  WHERE r.owner_id = p_owner_id
  ORDER BY r.created_at DESC
  LIMIT 1;
END;
$$;

-- Donner les permissions d'exécution aux utilisateurs authentifiés
GRANT EXECUTE ON FUNCTION create_restaurant_on_signup(VARCHAR, UUID) TO authenticated;

-- Politique RLS pour permettre l'insertion (au cas où)
-- La fonction SECURITY DEFINER devrait contourner RLS, mais on s'assure que la politique existe
DO $$
BEGIN
  -- Vérifier si la politique existe déjà
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'restaurants' 
    AND policyname = 'Utilisateurs créent leurs restaurants'
  ) THEN
    CREATE POLICY "Utilisateurs créent leurs restaurants"
      ON restaurants FOR INSERT
      WITH CHECK (owner_id = auth.uid());
  END IF;
END $$;
