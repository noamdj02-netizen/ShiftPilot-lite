'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton'

interface LoginFormProps {
  userType?: 'employer' | 'employee'
}

export function LoginForm({ userType = 'employer' }: LoginFormProps) {
  const router = useRouter()
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  })

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
      
      await signIn(email, pass)
      
      // Small delay to ensure state is updated
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Redirect to portal for smart routing based on user role
      router.push('/portal')
    } catch (err) {
      // Login error handling
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
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
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Bon retour parmi nous
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Entrez vos identifiants pour accéder à votre dashboard
          </p>
        </div>
      )}

      {/* Google Login Button */}
      <div className="space-y-3">
        <GoogleLoginButton userType={userType} />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-[#1C1C1E] px-2 text-slate-500 dark:text-slate-400">
              Ou
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={userType === 'employer' ? 'nom@entreprise.com' : 'votre@email.com'}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
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
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
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
            className="w-full py-3 px-4 bg-slate-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl shadow-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
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