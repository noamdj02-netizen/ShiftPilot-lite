'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'

export function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'pro'
  const { signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    restaurantName: '',
    employeeCount: '',
    acceptTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }

    setIsLoading(true)
    setError('')
    try {
      await signUp(formData.email, formData.password, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        restaurant_name: formData.restaurantName,
        employee_count: formData.employeeCount,
        plan: plan
      })
      router.push('/dashboard?welcome=true')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Commencez gratuitement
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Créez votre compte en quelques secondes. Pas de carte requise.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-6">
          <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 1 ? 'bg-accent' : 'bg-slate-200 dark:bg-white/10'}`} />
          <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${step >= 2 ? 'bg-accent' : 'bg-slate-200 dark:bg-white/10'}`} />
        </div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Step 1: Personal Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="firstName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Prénom
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">person</span>
                    <input
                      id="firstName"
                      type="text"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="Marie"
                      className="w-full pl-10 pr-4 py-3 min-h-[48px] text-base bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all touch-manipulation"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="lastName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Nom
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Dupont"
                    className="w-full px-4 py-3 min-h-[48px] text-base bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all touch-manipulation"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email professionnel
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
                    placeholder="marie@restaurant.com"
                    className="w-full pl-10 pr-4 py-3 min-h-[48px] text-base bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all touch-manipulation"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Mot de passe
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="8 caractères minimum"
                    className="w-full pl-10 pr-10 py-3 min-h-[48px] text-base bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all touch-manipulation"
                    minLength={8}
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
                <p className="text-xs text-slate-500">
                  Min. 8 caractères avec majuscule et chiffre
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Step 2: Restaurant Info */}
              <div className="space-y-1.5">
                <label htmlFor="restaurantName" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Nom du restaurant
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">store</span>
                  <input
                    id="restaurantName"
                    type="text"
                    autoComplete="organization"
                    value={formData.restaurantName}
                    onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                    placeholder="Le Comptoir"
                    className="w-full pl-10 pr-4 py-3 min-h-[48px] text-base bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all touch-manipulation"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="employeeCount" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Nombre d'employés
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">group</span>
                  <select
                    id="employeeCount"
                    value={formData.employeeCount}
                    onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 min-h-[48px] text-base bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none cursor-pointer touch-manipulation"
                    required
                  >
                    <option value="" disabled>Sélectionnez</option>
                    <option value="1-5">1-5 employés</option>
                    <option value="6-10">6-10 employés</option>
                    <option value="11-25">11-25 employés</option>
                    <option value="26-50">26-50 employés</option>
                    <option value="50+">Plus de 50 employés</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px] pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      id="acceptTerms"
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="peer h-5 w-5 rounded border-slate-300 bg-slate-50 dark:bg-white/5 dark:border-white/10 text-accent focus:ring-accent/50 transition-all"
                      required
                    />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400 leading-tight group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                    J'accepte les{' '}
                    <Link href="/cgu" className="text-accent hover:underline font-medium">
                      conditions d'utilisation
                    </Link>{' '}
                    et la{' '}
                    <Link href="/confidentialite" className="text-accent hover:underline font-medium">
                      politique de confidentialité
                    </Link>
                  </span>
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex-1 py-3 px-4 min-h-[48px] bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 font-semibold rounded-xl active:bg-slate-200 dark:active:bg-white/20 transition-all touch-manipulation"
          >
            Retour
          </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 py-3 px-4 min-h-[48px] bg-slate-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl shadow-lg active:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 touch-manipulation"
          >
            {isLoading ? (
              <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
            ) : step === 1 ? (
              <>
                Continuer
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </>
            ) : (
              <>
                Créer mon compte
                <span className="material-symbols-outlined text-xl">check</span>
              </>
            )}
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-accent hover:text-accent/80 font-medium transition-colors">
            Se connecter
          </Link>
        </p>
      </form>
    </motion.div>
  )
}