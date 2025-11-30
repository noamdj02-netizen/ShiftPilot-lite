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
        // Normalize email (trim and lowercase)
        const normalizedEmail = email.trim().toLowerCase()
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password: pass,
        })
        
        if (error) {
          console.error('Sign in error:', error)
          // Provide more user-friendly error messages
          if (error.message.includes('Invalid login credentials') || error.message.includes('Invalid credentials')) {
            throw new Error('Email ou mot de passe incorrect')
          } else if (error.message.includes('Email not confirmed')) {
            throw new Error('Veuillez confirmer votre email avant de vous connecter')
          } else {
            throw new Error(error.message || 'Erreur de connexion')
          }
        }
        
        // After successful login, fetch user profile and restaurant
        if (data?.user) {
          try {
            // Fetch profile
            const { data: profileData, error: profileError } = await (supabase
              .from('profiles') as any)
              .select('*')
              .eq('id', data.user.id)
              .single()
            
            if (profileError) {
              console.error('Error fetching profile:', profileError)
              // Don't throw here, just log. We still want the user to be logged in.
            }
            
            if (profileData) {
              set({ profile: profileData })
              
              // Fetch restaurant/organization if exists
              if (profileData.organization_id || profileData.restaurant_id) {
                const orgId = profileData.organization_id || profileData.restaurant_id
                const tableName = profileData.organization_id ? 'organizations' : 'restaurants'
                const { data: orgData } = await (supabase
                  .from(tableName) as any)
                  .select('*')
                  .eq('id', orgId)
                  .single()
                
                if (orgData) {
                  set({ restaurant: orgData })
                }
              }
            }
          } catch (err) {
             console.error('Unexpected error loading user data:', err)
          }
        }
      },

      signUp: async (email, pass, userData) => {
        // 1. Sign up the user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password: pass,
          options: {
            data: {
              first_name: userData.first_name,
              last_name: userData.last_name,
              role: 'employer', // Default role for new signups is employer
              // Store plan and employee count in metadata if needed, or just ignore for now
            },
          },
        })

        if (authError) throw authError
        if (!authData.user) throw new Error('No user created')

        // 2. Create the restaurant (Tenant)
        // Ideally this should be done via a trigger or a secure RPC to ensure atomicity,
        // but for simplicity in client-side initiation we do it here. 
        // RLS policies must allow authenticated users to create a restaurant.
        
        // NOTE: Since the profile is created via trigger on auth.users insert (see schema.sql),
        // we just need to create the restaurant and link it.
        
        // @ts-ignore - Type mismatch between database schema types
        const { data: restaurantData, error: restaurantError } = await supabase
          .from('restaurants')
          // @ts-ignore
          .insert({ name: userData.restaurant_name })
          .select()
          .single()

        if (restaurantError) throw restaurantError

        // 3. Update the profile with the restaurant_id
        // @ts-ignore - Type mismatch between database schema types
        const { error: profileError } = await supabase
          .from('profiles')
          // @ts-ignore
          .update({ restaurant_id: restaurantData.id })
          .eq('id', authData.user.id)

        if (profileError) throw profileError
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
        // Fetch profile
        const { data: profileData } = await (supabase
          .from('profiles') as any)
          .select('*')
          .eq('id', userId)
          .single()
        
        if (profileData) {
          setProfile(profileData)
          
          // Fetch restaurant/organization if exists
          if (profileData.organization_id || profileData.restaurant_id) {
            const orgId = profileData.organization_id || profileData.restaurant_id
            const tableName = profileData.organization_id ? 'organizations' : 'restaurants'
            const { data: orgData } = await (supabase
              .from(tableName) as any)
              .select('*')
              .eq('id', orgId)
              .single()
            
            if (orgData) {
              setRestaurant(orgData)
            }
          }
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
