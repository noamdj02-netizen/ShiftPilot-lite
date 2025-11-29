'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement registration logic
    console.log('Register:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 lg:p-12">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-framer">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-foreground">
              Shift<span className="text-primary">Pilot</span>
            </span>
          </Link>

          {/* Header */}
          <h1 className="text-3xl font-bold text-foreground mb-2">Créer un compte</h1>
          <p className="text-foreground-muted mb-8">
            Commencez votre essai gratuit de 14 jours
          </p>

          {/* Benefits */}
          <div className="space-y-2 mb-8 p-4 bg-purple-50 rounded-2xl">
            {[
              "14 jours gratuits",
              "Sans carte bancaire",
              "Annulation en 1 clic",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-green-600" />
                {benefit}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Nom de l'établissement
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-border-soft text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Mon Restaurant"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-border-soft text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                <input
                  type="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-border-soft text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="w-4 h-4 rounded border-border-soft text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground-muted">
                  J'accepte les{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    conditions d'utilisation
                  </Link>
                </span>
              </label>
            </div>

            <Button variant="primary" size="lg" className="w-full" type="submit">
              Créer mon compte
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-foreground-muted">
              Déjà un compte ?{' '}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
