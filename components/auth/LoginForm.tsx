'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
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
    setIsLoading(true)
    setError('')
    try {
      // TODO: Implémenter la connexion avec Supabase
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Erreur de connexion')
      }
      router.push('/planning')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-error-muted border border-error/20 rounded-xl text-error text-sm">
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="input-label">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="vous@restaurant.fr"
            className="input pl-12"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="password" className="input-label !mb-0">
            Mot de passe
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:text-primary-dark"
          >
            Oublié ?
          </Link>
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••"
            className="input pl-12 pr-12"
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
      </div>

      {/* Remember */}
      <div className="flex items-center gap-2">
        <input
          id="remember"
          type="checkbox"
          checked={formData.remember}
          onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
          className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
        />
        <label htmlFor="remember" className="text-sm text-foreground-secondary">
          Se souvenir de moi
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            Se connecter
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {/* Register Link */}
      <p className="text-center text-sm text-foreground-secondary">
        Pas encore de compte ?{' '}
        <Link href="/register" className="text-primary hover:text-primary-dark font-medium">
          Inscrivez-vous
        </Link>
      </p>
    </form>
  )
}

