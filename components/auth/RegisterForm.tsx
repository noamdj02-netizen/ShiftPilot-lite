'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, User, Building, ArrowRight, Loader2, Check } from 'lucide-react'

export function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'pro'
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, plan }),
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Erreur lors de l'inscription")
      }
      router.push('/planning?welcome=true')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-border'}`} />
        <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-border'}`} />
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-error-muted border border-error/20 rounded-xl text-error text-sm">
          {error}
        </div>
      )}

      {step === 1 ? (
        <>
          {/* Step 1: Personal Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="input-label">
                Prénom
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                <input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Marie"
                  className="input pl-12"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="input-label">
                Nom
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Fontaine"
                className="input"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="input-label">
              Email professionnel
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="marie@lecomptoir.fr"
                className="input pl-12"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="input-label">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="8 caractères minimum"
                className="input pl-12 pr-12"
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="input-helper">
              Min. 8 caractères avec majuscule, minuscule et chiffre
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Step 2: Restaurant Info */}
          <div>
            <label htmlFor="restaurantName" className="input-label">
              Nom du restaurant
            </label>
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
              <input
                id="restaurantName"
                type="text"
                value={formData.restaurantName}
                onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                placeholder="Le Comptoir Parisien"
                className="input pl-12"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="employeeCount" className="input-label">
              Nombre d'employés
            </label>
            <select
              id="employeeCount"
              value={formData.employeeCount}
              onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
              className="input"
              required
            >
              <option value="">Sélectionnez</option>
              <option value="1-5">1-5 employés</option>
              <option value="6-10">6-10 employés</option>
              <option value="11-25">11-25 employés</option>
              <option value="26-50">26-50 employés</option>
              <option value="50+">Plus de 50 employés</option>
            </select>
          </div>
          <div className="flex items-start gap-3">
            <input
              id="acceptTerms"
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary mt-1"
              required
            />
            <label htmlFor="acceptTerms" className="text-sm text-foreground-secondary">
              J'accepte les{' '}
              <Link href="/cgu" className="text-primary hover:underline">
                conditions d'utilisation
              </Link>{' '}
              et la{' '}
              <Link href="/confidentialite" className="text-primary hover:underline">
                politique de confidentialité
              </Link>
            </label>
          </div>
        </>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="btn-secondary flex-1"
          >
            Retour
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary flex-1"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : step === 1 ? (
            <>
              Continuer
              <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            <>
              Créer mon compte
              <Check className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {/* Login Link */}
      <p className="text-center text-sm text-foreground-secondary">
        Déjà un compte ?{' '}
        <Link href="/login" className="text-primary hover:text-primary-dark font-medium">
          Connectez-vous
        </Link>
      </p>
    </form>
  )
}

