'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'

interface LoginFormProps {
  userType?: 'employer' | 'employee'
}

export function LoginForm({ userType = 'employer' }: LoginFormProps) {
  const router = useRouter()
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [configError, setConfigError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  })

  // Vérifier la configuration Supabase au chargement (seulement si on est sur une page d'auth)
  useEffect(() => {
    // Ne pas afficher l'erreur sur la landing page
    if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
      return
    }
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    // Support des nouvelles clés publishable et des anciennes clés anon
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 
                        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    // Ne pas afficher l'erreur si les variables sont définies (même si ce sont des placeholders)
    // L'erreur ne sera affichée que si les variables sont vraiment manquantes
    if (!supabaseUrl) {
      setConfigError('NEXT_PUBLIC_SUPABASE_URL n\'est pas configuré. Veuillez le configurer dans Vercel Environment Variables.')
    } else if (!supabaseKey) {
      setConfigError('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ou NEXT_PUBLIC_SUPABASE_ANON_KEY n\'est pas configuré. Veuillez configurer l\'une de ces variables dans Vercel Environment Variables.')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleLogin(formData.email, formData.password)
  }

  const handleLogin = async (email: string, pass: string) => {
    setIsLoading(true)
    setError('')
    try {
      // Validate inputs
      if (!email || !pass) {
        setError('Veuillez remplir tous les champs')
        setIsLoading(false)
        return
      }
      
      // Sign in using the auth hook which handles state management
      // The hook uses supabaseClient internally and will set cookies via SSR
      await signIn(email, pass)
      
      // Wait for Supabase SSR to set cookies in the browser
      // This is critical for the middleware to detect the session
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      // Force a full page reload to ensure cookies are sent to server
      // The middleware will detect the authenticated user and allow access
      const redirectPath = userType === 'employee' ? '/dashboard/employee' : '/dashboard/employer'
      window.location.replace(redirectPath)
    } catch (err) {
      // Login error handling
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      
      // Ne pas afficher l'erreur de configuration Supabase sur la landing page
      if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
        if (errorMessage.includes('Configuration Supabase')) {
          setError('Email ou mot de passe incorrect')
        } else {
          setError(errorMessage)
        }
      } else {
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    // Use a fixed demo account - in a real scenario this would be a specific seeded user
    // For now we'll use these credentials which should be created in Supabase
    const demoEmail = "demo@shiftpilot.app"
    const demoPass = "demo1234" 
    
    setFormData({ ...formData, email: demoEmail, password: demoPass })
    await handleLogin(demoEmail, demoPass)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {userType === 'employer' && (
        <div className="space-y-2 text-center sm:text-left mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Bon retour parmi nous
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Entrez vos identifiants pour accéder à votre dashboard
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Configuration Error Alert */}
        {configError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg text-yellow-800 dark:text-yellow-400 text-sm"
          >
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-lg flex-shrink-0">warning</span>
              <div className="flex-1">
                <p className="font-semibold mb-1">Configuration Supabase manquante</p>
                <p className="text-xs opacity-90">{configError}</p>
                <p className="text-xs mt-2 opacity-75">
                  Allez dans Vercel Dashboard → Settings → Environment Variables pour configurer les variables.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">error</span>
            {error}
          </motion.div>
        )}

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Email {userType === 'employer' ? 'professionnel' : ''}
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">mail</span>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={userType === 'employer' ? 'nom@entreprise.com' : 'votre@email.com'}
              className="w-full pl-10 pr-4 py-3 min-h-[48px] text-base bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all touch-manipulation"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Mot de passe
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-accent hover:text-accent/80 font-medium transition-colors"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-3 min-h-[48px] text-base bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all touch-manipulation"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 active:text-slate-600 dark:active:text-slate-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </div>

        {/* Remember */}
        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            checked={formData.remember}
            onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
            className="w-4 h-4 rounded border-slate-300 text-accent focus:ring-accent bg-slate-50 dark:bg-white/5 dark:border-white/10"
          />
          <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none">
            Se souvenir de moi
          </label>
        </div>

        {/* Submit */}
        <div className="space-y-3">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full min-h-[48px] py-3 px-4 bg-slate-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl shadow-lg active:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-base touch-manipulation"
          >
            {isLoading ? (
              <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
            ) : (
              <>
                Se connecter
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </>
            )}
          </button>

        </div>

        {/* Register Link */}
        {userType === 'employer' && (
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-accent hover:text-accent/80 font-medium transition-colors">
              Créer un compte employeur
            </Link>
          </p>
        )}
      </form>
    </motion.div>
  )
}