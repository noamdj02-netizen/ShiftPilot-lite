'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Building2, MapPin, Users, Briefcase } from 'lucide-react'
import { toast } from 'sonner'
import { Logo } from '@/components/ui/Logo'

export default function EmployerOnboardingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    brandName: '',
    address: '',
    city: '',
    country: 'FR',
    locationName: '',
    locationAddress: '',
    employeeCount: '',
    businessType: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.businessName || !formData.address || !formData.city) {
      toast.error('Veuillez remplir tous les champs obligatoires')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/onboarding-employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: formData.businessName,
          brandName: formData.brandName || formData.businessName,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          locationName: formData.locationName || `${formData.businessName} (Principal)`,
          locationAddress: formData.locationAddress || formData.address,
          employeeCount: formData.employeeCount ? parseInt(formData.employeeCount) : null,
          businessType: formData.businessType || 'restaurant'
        })
      })

      if (!response.ok) {
        let errorMessage = 'Erreur lors de la création de l\'organisation'
        
        try {
          const data = await response.json()
          errorMessage = data.error || errorMessage
          
          // Messages d'erreur plus explicites
          if (response.status === 400) {
            if (errorMessage.includes('Missing required fields')) {
              errorMessage = 'Veuillez remplir tous les champs obligatoires (nom, adresse, ville)'
            } else if (errorMessage.includes('already has an organization')) {
              errorMessage = 'Vous avez déjà une organisation. Redirection...'
              setTimeout(() => router.push('/dashboard/employer'), 2000)
            }
          } else if (response.status === 401) {
            errorMessage = 'Vous devez être connecté pour créer une organisation'
            router.push('/login')
          } else if (response.status === 500) {
            errorMessage = 'Erreur serveur. Veuillez réessayer ou contacter le support.'
          }
        } catch (parseError) {
          // Si la réponse n'est pas du JSON valide
          errorMessage = `Erreur ${response.status}: ${response.statusText}`
        }
        
        throw new Error(errorMessage)
      }

      const data = await response.json()
      toast.success('Organisation créée avec succès !')
      
      // Attendre un peu avant la redirection pour que le toast soit visible
      setTimeout(() => {
        router.push('/dashboard/employer')
        router.refresh()
      }, 1000)
    } catch (error) {
      console.error('Onboarding error:', error)
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Erreur lors de la création. Vérifiez votre connexion et réessayez.'
      
      toast.error(errorMessage, {
        duration: 5000,
        description: 'Si le problème persiste, vérifiez la console pour plus de détails.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#000000] dark:to-[#1C1C1E] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl shadow-xl p-8 md:p-12 border border-black/5 dark:border-white/5">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size={48} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
              Bienvenue sur ShiftPilot !
            </h1>
            <p className="text-black/60 dark:text-white/60">
              Créez votre organisation en quelques étapes
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-black/60 dark:text-white/60" />
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  Informations de l'entreprise
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Nom de l'entreprise <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Restaurant Le Gourmet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Nom de la marque (optionnel)
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Le Gourmet"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-black/60 dark:text-white/60" />
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  Adresse
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Adresse <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 123 Rue de la Paix"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Ville <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Paris"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Pays
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="FR">France</option>
                    <option value="BE">Belgique</option>
                    <option value="CH">Suisse</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-black/60 dark:text-white/60" />
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  Premier établissement (optionnel)
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Nom de l'établissement
                </label>
                <input
                  type="text"
                  value={formData.locationName}
                  onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Restaurant Le Gourmet (Principal)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Adresse de l'établissement
                </label>
                <input
                  type="text"
                  value={formData.locationAddress}
                  onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: 123 Rue de la Paix"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? 'Création en cours...' : 'Créer mon organisation'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
