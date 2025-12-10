import React from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabaseClient as supabase } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  profile: any | null
  restaurant: any | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setProfile: (profile: any) => void
  setRestaurant: (restaurant: any) => void
  signIn: (email: string, pass: string) => Promise<void>
  signUp: (email: string, pass: string, userData: { first_name: string, last_name: string, restaurant_name: string, employee_count?: string, plan?: string }) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      restaurant: null,
      isLoading: true,
      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setRestaurant: (restaurant) => set({ restaurant }),
      
      signIn: async (email, pass) => {
        let data: any = null
        
        try {
          // Normalize email (trim and lowercase)
          const normalizedEmail = email.trim().toLowerCase()
          
          const response = await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password: pass,
          })
          
          data = response.data
          
          if (response.error) {
            console.error('Sign in error:', response.error)
            
            // Gérer spécifiquement les erreurs de configuration
            if (response.error.message.includes('Invalid API key') || response.error.message.includes('JWT')) {
              throw new Error('Erreur de configuration Supabase. Veuillez vérifier les variables d\'environnement.')
            }
            
            // Provide more user-friendly error messages
            if (response.error.message.includes('Invalid login credentials') || response.error.message.includes('Invalid credentials')) {
              throw new Error('Email ou mot de passe incorrect')
            } else if (response.error.message.includes('Email not confirmed')) {
              throw new Error('Veuillez confirmer votre email avant de vous connecter')
            } else {
              throw new Error(response.error.message || 'Erreur de connexion')
            }
          }
        } catch (err) {
          // Si l'erreur est liée à Supabase non configuré
          if (err instanceof Error && (err.message.includes('Supabase') || err.message.includes('API key') || err.message.includes('Invalid API key'))) {
            // Ne pas afficher l'erreur sur la landing page
            if (typeof window !== 'undefined' && window.location.pathname === '/') {
              throw new Error('Email ou mot de passe incorrect')
            }
            throw new Error('Configuration Supabase manquante. Veuillez configurer NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.')
          }
          throw err
        }
        
        // After successful login, update user state immediately
        if (data?.user) {
          // Update user state immediately for middleware to detect
          set({ user: data.user, isLoading: false })
          
          try {
            // Fetch restaurant directly using owner_id (new schema)
            const { data: restaurantData, error: restaurantError } = await (supabase
              .from('restaurants') as any)
              .select('*')
              .eq('owner_id', data.user.id)
              .maybeSingle()
            
            if (restaurantError) {
              console.error('Error fetching restaurant:', restaurantError)
              // Don't throw here, just log. We still want the user to be logged in.
            } else if (restaurantData) {
              set({ restaurant: restaurantData })
              // Create a profile-like object for compatibility
              set({ 
                profile: {
                  id: data.user.id,
                  restaurant_id: restaurantData.id,
                  email: data.user.email,
                  first_name: data.user.user_metadata?.first_name,
                  last_name: data.user.user_metadata?.last_name,
                }
              })
            } else {
              // No restaurant found, set profile without restaurant_id
              set({ 
                profile: {
                  id: data.user.id,
                  restaurant_id: null,
                  email: data.user.email,
                  first_name: data.user.user_metadata?.first_name,
                  last_name: data.user.user_metadata?.last_name,
                }
              })
            }
          } catch (err) {
             console.error('Unexpected error loading user data:', err)
             // Don't throw, user is already logged in
          }
        }
      },

      signUp: async (email, pass, userData) => {
        try {
          // 1. Sign up the user
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password: pass,
            options: {
              data: {
                first_name: userData.first_name,
                last_name: userData.last_name,
                role: 'employer', // Default role for new signups is employer
              },
            },
          })

          if (authError) {
            console.error('Sign up error:', authError)
            // Messages d'erreur plus clairs
            if (authError.message.includes('already registered') || authError.message.includes('already exists')) {
              throw new Error('Cet email est déjà utilisé. Connectez-vous ou utilisez un autre email.')
            } else if (authError.message.includes('Invalid email')) {
              throw new Error('Email invalide. Veuillez entrer une adresse email valide.')
            } else if (authError.message.includes('Password')) {
              throw new Error('Le mot de passe doit contenir au moins 8 caractères.')
            } else if (authError.message.includes('API key') || authError.message.includes('JWT')) {
              throw new Error('Erreur de configuration. Veuillez contacter le support.')
            }
            throw new Error(authError.message || 'Erreur lors de la création du compte')
          }

          if (!authData.user) {
            throw new Error('Impossible de créer le compte. Veuillez réessayer.')
          }

          // 2. Create the restaurant using RPC function (bypasses RLS safely)
          let restaurant: any = null
          
          try {
            // @ts-ignore
            const { data: restaurantData, error: restaurantError } = await supabase
              .rpc('create_restaurant_on_signup', {
                p_nom: userData.restaurant_name,
                p_owner_id: authData.user.id
              })

            if (restaurantError) {
              console.error('Restaurant creation error:', restaurantError)
              
              // Si la fonction RPC n'existe pas, essayer l'insertion directe
              if (restaurantError.message.includes('function') && restaurantError.message.includes('does not exist')) {
                console.warn('RPC function not found, trying direct insert...')
                // @ts-ignore
                const { data: directInsertData, error: directInsertError } = await supabase
                  .from('restaurants')
                  // @ts-ignore
                  .insert({ 
                    nom: userData.restaurant_name,
                    owner_id: authData.user.id,
                    plan: 'trial'
                  })
                  .select()
                  .single()
                
                if (directInsertError) {
                  // Messages d'erreur spécifiques pour la création du restaurant
                  if (directInsertError.code === '23505') { // Unique violation
                    throw new Error('Un restaurant avec ce nom existe déjà.')
                  } else if (directInsertError.message.includes('permission denied') || directInsertError.message.includes('RLS') || directInsertError.message.includes('row-level security')) {
                    throw new Error('Erreur de permissions. Veuillez exécuter la migration 027_fix_restaurant_creation.sql dans Supabase Dashboard → SQL Editor.')
                  } else if (directInsertError.message.includes('null value') || directInsertError.message.includes('required')) {
                    throw new Error('Informations manquantes. Veuillez remplir tous les champs.')
                  }
                  throw new Error(`Erreur lors de la création du restaurant: ${directInsertError.message}`)
                }
                
                restaurant = directInsertData
              } else {
                // Messages d'erreur spécifiques pour la création du restaurant
                if (restaurantError.code === '23505') { // Unique violation
                  throw new Error('Un restaurant avec ce nom existe déjà.')
                } else if (restaurantError.message.includes('permission denied') || restaurantError.message.includes('RLS') || restaurantError.message.includes('row-level security')) {
                  throw new Error('Erreur de permissions. Veuillez exécuter la migration 027_fix_restaurant_creation.sql dans Supabase Dashboard → SQL Editor.')
                } else if (restaurantError.message.includes('null value') || restaurantError.message.includes('required')) {
                  throw new Error('Informations manquantes. Veuillez remplir tous les champs.')
                }
                throw new Error(`Erreur lors de la création du restaurant: ${restaurantError.message}`)
              }
            } else {
              // RPC retourne un tableau, prendre le premier élément
              restaurant = Array.isArray(restaurantData) && restaurantData.length > 0 ? restaurantData[0] : restaurantData
            }
          } catch (rpcError) {
            // Si c'est déjà une Error, la re-lancer
            if (rpcError instanceof Error) {
              throw rpcError
            }
            throw new Error('Erreur lors de la création du restaurant')
          }

          // Mettre à jour l'état avec le restaurant créé
          if (restaurant) {
            set({ 
              restaurant: restaurant,
              profile: {
                id: authData.user.id,
                restaurant_id: restaurant.id,
                email: authData.user.email,
                first_name: userData.first_name,
                last_name: userData.last_name,
              }
            })
          }
        } catch (err) {
          // Re-throw avec un message plus clair si ce n'est pas déjà une Error
          if (err instanceof Error) {
            throw err
          }
          throw new Error('Une erreur inattendue est survenue. Veuillez réessayer.')
        }
      },

      signOut: async () => {
        await supabase.auth.signOut()
        set({ user: null, profile: null, restaurant: null })
      },

      resetPassword: async (email) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        })
        if (error) throw error
      },

      updatePassword: async (password) => {
        const { error } = await supabase.auth.updateUser({ password })
        if (error) throw error
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, profile: state.profile, restaurant: state.restaurant }),
    }
  )
)

// Hook to initialize auth state listener
export const useAuth = () => {
  const store = useAuthStore()
  const { setUser, setProfile, setRestaurant } = store
  
  // Initialize auth state listener
  React.useEffect(() => {
    const loadUserData = async (userId: string) => {
      try {
        // Fetch restaurant directly using owner_id (new schema)
        const { data: restaurantData } = await (supabase
          .from('restaurants') as any)
          .select('*')
          .eq('owner_id', userId)
          .maybeSingle()
        
        if (restaurantData) {
          setRestaurant(restaurantData)
          // Create a profile-like object for compatibility
          const { data: { user } } = await supabase.auth.getUser()
          setProfile({
            id: userId,
            restaurant_id: restaurantData.id,
            email: user?.email,
            first_name: user?.user_metadata?.first_name,
            last_name: user?.user_metadata?.last_name,
          })
        } else {
          // No restaurant found
          const { data: { user } } = await supabase.auth.getUser()
          setProfile({
            id: userId,
            restaurant_id: null,
            email: user?.email,
            first_name: user?.user_metadata?.first_name,
            last_name: user?.user_metadata?.last_name,
          })
        }
      } catch (error) {
        console.error('Error loading user data:', error)
      }
    }
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        // Load profile and restaurant
        loadUserData(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
        setRestaurant(null)
      }
      useAuthStore.setState({ isLoading: false })
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user)
        await loadUserData(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
        setRestaurant(null)
      }
      useAuthStore.setState({ isLoading: false })
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser, setProfile, setRestaurant])

  return store
}
