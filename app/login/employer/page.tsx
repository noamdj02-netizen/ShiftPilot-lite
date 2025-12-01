'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'

export default function EmployerLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Middleware will handle redirection based on role/org
      router.refresh()
      router.push('/dashboard/employer')
    } catch (error) {
      console.error(error)
      toast.error("Email ou mot de passe incorrect")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1C1C1E] border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Espace Employeur</h1>
          <p className="text-slate-400">Connectez-vous pour gérer votre établissement</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#6C63FF] outline-none transition-colors"
              placeholder="gerant@restaurant.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#6C63FF] outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#6C63FF] hover:bg-[#5a52d5] text-white font-bold py-3 rounded-xl transition-all transform active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>

          <div className="text-center text-sm text-slate-400">
            Pas encore de compte ?{' '}
            <Link href="/register/employer" className="text-[#6C63FF] hover:underline">
              Créer mon entreprise
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

