-- Script de diagnostic pour vérifier la configuration
-- Exécutez ce script pour identifier le problème

-- 1. Vérifier que la table profiles existe
SELECT 
    'Table profiles exists' as check_name,
    CASE WHEN EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'profiles'
    ) THEN '✅ OK' ELSE '❌ MISSING' END as status;

-- 2. Vérifier que le trigger existe
SELECT 
    'Trigger on_auth_user_created exists' as check_name,
    CASE WHEN EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'on_auth_user_created'
    ) THEN '✅ OK' ELSE '❌ MISSING' END as status;

-- 3. Vérifier que la fonction handle_new_user existe
SELECT 
    'Function handle_new_user exists' as check_name,
    CASE WHEN EXISTS (
        SELECT 1 FROM pg_proc 
        WHERE proname = 'handle_new_user'
    ) THEN '✅ OK' ELSE '❌ MISSING' END as status;

-- 4. Vérifier les politiques RLS pour INSERT
SELECT 
    'RLS policies for INSERT' as check_name,
    COUNT(*) as policy_count,
    CASE WHEN COUNT(*) > 0 THEN '✅ OK' ELSE '❌ MISSING' END as status
FROM pg_policies 
WHERE tablename = 'profiles' AND cmd = 'INSERT';

-- 5. Vérifier que RLS est activé
SELECT 
    'RLS enabled on profiles' as check_name,
    CASE WHEN relrowsecurity THEN '✅ OK' ELSE '❌ DISABLED' END as status
FROM pg_class 
WHERE relname = 'profiles';

-- 6. Vérifier les colonnes de la table profiles
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'profiles'
ORDER BY ordinal_position;

-- 7. Vérifier les permissions de la fonction
SELECT 
    proname as function_name,
    prosecdef as is_security_definer,
    CASE WHEN prosecdef THEN '✅ OK' ELSE '❌ NOT SECURITY DEFINER' END as status
FROM pg_proc
WHERE proname = 'handle_new_user';

-- 8. Afficher les dernières erreurs (si disponibles)
SELECT 
    'Recent errors' as check_name,
    'Check Supabase Logs → Postgres Logs for details' as message;

