import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { UserProfile, Organization } from '@/lib/types'
import { toast } from 'sonner'

export function useSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const updateProfile = async (userId: string, updates: Partial<UserProfile>) => {
    setIsLoading(true)
    try {
      // @ts-ignore - Type mismatch between database schema types
      const { error } = await supabase
        .from('profiles')
        // @ts-ignore
        .update(updates)
        .eq('id', userId)

      if (error) throw error
      toast.success('Profil mis à jour avec succès')
      return true
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Erreur lors de la mise à jour du profil')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const updateOrganization = async (orgId: string, updates: Partial<Organization>) => {
    setIsLoading(true)
    try {
      // @ts-ignore - Type mismatch between database schema types
      const { error } = await supabase
        .from('organizations')
        // @ts-ignore
        .update(updates)
        .eq('id', orgId)

      if (error) throw error
      toast.success('Organisation mise à jour avec succès')
      return true
    } catch (error) {
      console.error('Error updating organization:', error)
      toast.error("Erreur lors de la mise à jour de l'organisation")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const updatePassword = async (password: string) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      toast.success('Mot de passe mis à jour')
      return true
    } catch (error) {
      console.error('Error updating password:', error)
      toast.error('Erreur lors de la mise à jour du mot de passe')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    updateProfile,
    updateOrganization,
    updatePassword,
    isLoading
  }
}

