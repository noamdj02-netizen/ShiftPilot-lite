'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

type UserRole = 'owner' | 'manager' | 'employee' | null

export default function PortalPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function determineRoute() {
      try {
        const supabase = supabaseClient
        
        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !user) {
          // Not authenticated, redirect to login
          router.push('/login')
          return
        }

        // Fetch user profile to determine role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role, organization_id')
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.error('Error fetching profile:', profileError)
          
          // If profile doesn't exist (PGRST116), redirect to dashboard
          if (profileError.code === 'PGRST116' || profileError.message?.includes('No rows')) {
            setStatus('redirecting')
            router.push('/dashboard/employer')
            return
          }
          
          // If recursion error, try using API route instead
          if (profileError.message?.includes('infinite recursion') || profileError.message?.includes('recursion')) {
            try {
              // Try fetching via API route which uses server-side Supabase client
              const response = await fetch('/api/auth/profile')
              if (response.ok) {
                const profileData = await response.json()
                if (profileData) {
                  setStatus('redirecting')
                  if (!profileData.organization_id) {
                    router.push('/dashboard/employer')
                    return
                  }
                  const role = profileData.role
                  if (role === 'owner' || role === 'manager') {
                    router.push('/dashboard/employer')
                  } else if (role === 'employee') {
                    router.push('/dashboard/employee')
                  } else {
                    router.push('/dashboard/employer')
                  }
                  return
                }
              }
            } catch (apiError) {
              console.error('API route also failed:', apiError)
            }
            
            setError('Erreur de configuration RLS. Veuillez contacter le support ou appliquer la migration 005_fix_profiles_rls_recursion.sql dans Supabase.')
            setStatus('error')
            return
          }
          
          // For other errors, show error message
          setError(`Erreur lors de la récupération du profil: ${profileError.message || 'Erreur inconnue'}`)
          setStatus('error')
          return
        }

        // If no profile data, redirect to dashboard
        if (!profile) {
          setStatus('redirecting')
          router.push('/dashboard/employer')
          return
        }

        setStatus('redirecting')

        // Determine route based on role and organization
        if (!profile.organization_id) {
          // No organization, redirect to dashboard
          router.push('/dashboard/employer')
          return
        }

        const role = profile.role as UserRole

        // Route based on role
        // Owner and Manager go to employer dashboard
        // Employee goes to employee dashboard
        if (role === 'owner' || role === 'manager') {
          router.push('/dashboard/employer')
        } else if (role === 'employee') {
          router.push('/dashboard/employee')
        } else {
          // Default to employer dashboard if role is unclear
          router.push('/dashboard/employer')
        }
      } catch (err) {
        console.error('Portal routing error:', err)
        setError('Une erreur est survenue')
        setStatus('error')
      }
    }

    determineRoute()
  }, [router])

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            ShiftPilot
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Portail d'accès
          </p>
        </motion.div>

        {/* Loading State */}
        {status === 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Vérification de votre accès...
            </p>
          </motion.div>
        )}

        {/* Redirecting State */}
        {status === 'redirecting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full"
            />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Redirection vers votre espace...
            </p>
          </motion.div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">
                {error || 'Une erreur est survenue'}
              </p>
              <p className="text-xs text-red-500 dark:text-red-400/80">
                Si le problème persiste, contactez le support ou réessayez plus tard.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setStatus('loading')
                  setError(null)
                  window.location.reload()
                }}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
              >
                Réessayer
              </button>
              <button
                onClick={() => router.push('/dashboard/employer')}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
              >
                Aller au dashboard
              </button>
              <button
                onClick={() => router.push('/login')}
                className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              >
                Retour à la connexion
              </button>
            </div>
          </motion.div>
        )}

        {/* Portal Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </div>
  )
}

