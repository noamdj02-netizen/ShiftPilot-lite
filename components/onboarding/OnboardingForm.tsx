'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

const onboardingSchema = z.object({
  // Information Entreprise
  businessName: z.string().min(2, "Le nom de l'entreprise est requis"),
  businessType: z.string().min(1, "Le type d'activité est requis"),
  employeeCount: z.string().min(1, "Le nombre d'employés est requis"),
  
  // Adresse
  address: z.string().min(5, "L'adresse est requise"),
  city: z.string().min(2, "La ville est requise"),
  zipCode: z.string().min(4, "Le code postal est requis"),
  country: z.string().min(2, "Le pays est requis"),
  
  // Horaires
  openingTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format invalide (HH:MM)"),
  closingTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format invalide (HH:MM)"),
  timezone: z.string().default('Europe/Paris'),
  
  // RH
  maxShiftDuration: z.number().min(1).max(24),
  minRestDuration: z.number().min(0).max(24),
  breakDuration: z.number().min(0),
  
  // Contact
  managerPhone: z.string().min(10, "Numéro de téléphone valide requis"),
})

type OnboardingForm = z.infer<typeof onboardingSchema>

export function OnboardingForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const { register, handleSubmit, formState: { errors } } = useForm<OnboardingForm>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      timezone: 'Europe/Paris',
      maxShiftDuration: 10,
      minRestDuration: 11,
      breakDuration: 30,
      country: 'France'
    }
  })

  const onSubmit = async (data: OnboardingForm) => {
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error("Vous devez être connecté")
        return
      }

      const response = await fetch('/api/employer/create-restaurant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, userId: user.id }),
      })

      if (!response.ok) {
        let errorMessage = "Erreur lors de la création"
        
        try {
          const error = await response.json()
          errorMessage = error.error || error.message || errorMessage
          
          // Messages d'erreur plus explicites
          if (response.status === 400) {
            if (errorMessage.includes('Données incomplètes')) {
              errorMessage = 'Veuillez remplir tous les champs obligatoires'
            }
          } else if (response.status === 401) {
            errorMessage = 'Vous devez être connecté pour créer une organisation'
            router.push('/login')
            return
          } else if (response.status === 500) {
            errorMessage = `Erreur serveur: ${errorMessage}. Vérifiez la console pour plus de détails.`
          }
        } catch (parseError) {
          errorMessage = `Erreur ${response.status}: ${response.statusText}`
        }
        
        throw new Error(errorMessage)
      }

      const data = await response.json()
      toast.success("Votre espace restaurant a été créé !")
      
      // Rediriger vers le dashboard
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
    <div className="w-full max-w-3xl mx-auto bg-[#1C1C1E] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] bg-clip-text text-transparent">
          Bienvenue sur ShiftPilot
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Configurons votre espace de travail en quelques minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
        {/* Section 1: Informations Générales */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="material-symbols-outlined text-[#6C63FF]">storefront</span>
            Votre Établissement
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Nom de l'entreprise</label>
              <input 
                {...register('businessName')}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] outline-none transition-all"
                placeholder="Ex: Le Café Parisien"
              />
              {errors.businessName && <p className="text-red-400 text-xs">{errors.businessName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Type d'activité</label>
              <select 
                {...register('businessType')}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#6C63FF] outline-none"
              >
                <option value="">Sélectionner...</option>
                <option value="restaurant">Restaurant</option>
                <option value="bar">Bar / Café</option>
                <option value="hotel">Hôtel</option>
                <option value="bakery">Boulangerie</option>
                <option value="dark_kitchen">Dark Kitchen</option>
                <option value="other">Autre</option>
              </select>
              {errors.businessType && <p className="text-red-400 text-xs">{errors.businessType.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Nombre d'employés estimé</label>
              <select 
                {...register('employeeCount')}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#6C63FF] outline-none"
              >
                <option value="">Sélectionner...</option>
                <option value="1-5">1-5 employés</option>
                <option value="6-15">6-15 employés</option>
                <option value="16-50">16-50 employés</option>
                <option value="50+">50+ employés</option>
              </select>
              {errors.employeeCount && <p className="text-red-400 text-xs">{errors.employeeCount.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Téléphone pro</label>
              <input 
                {...register('managerPhone')}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#6C63FF] outline-none"
                placeholder="01 23 45 67 89"
              />
              {errors.managerPhone && <p className="text-red-400 text-xs">{errors.managerPhone.message}</p>}
            </div>
          </div>
        </div>

        {/* Section 2: Adresse */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="material-symbols-outlined text-[#6C63FF]">location_on</span>
            Adresse
          </h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Adresse complète</label>
              <input 
                {...register('address')}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#6C63FF] outline-none"
                placeholder="12 rue de la Paix"
              />
              {errors.address && <p className="text-red-400 text-xs">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2 col-span-1">
                <label className="text-sm font-medium text-slate-300">Code Postal</label>
                <input 
                  {...register('zipCode')}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#6C63FF] outline-none"
                  placeholder="75000"
                />
                {errors.zipCode && <p className="text-red-400 text-xs">{errors.zipCode.message}</p>}
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium text-slate-300">Ville</label>
                <input 
                  {...register('city')}
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#6C63FF] outline-none"
                  placeholder="Paris"
                />
                {errors.city && <p className="text-red-400 text-xs">{errors.city.message}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Opérations & RH */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="material-symbols-outlined text-[#6C63FF]">settings</span>
            Opérations & RH
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Heure d'ouverture</label>
              <input 
                type="time"
                {...register('openingTime')}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#6C63FF] outline-none"
              />
              {errors.openingTime && <p className="text-red-400 text-xs">{errors.openingTime.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Heure de fermeture</label>
              <input 
                type="time"
                {...register('closingTime')}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#6C63FF] outline-none"
              />
              {errors.closingTime && <p className="text-red-400 text-xs">{errors.closingTime.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Max heures / shift</label>
              <input 
                type="number"
                {...register('maxShiftDuration', { valueAsNumber: true })}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#6C63FF] outline-none"
              />
              {errors.maxShiftDuration && <p className="text-red-400 text-xs">{errors.maxShiftDuration.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Repos min (heures)</label>
              <input 
                type="number"
                {...register('minRestDuration', { valueAsNumber: true })}
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 focus:border-[#6C63FF] outline-none"
              />
              {errors.minRestDuration && <p className="text-red-400 text-xs">{errors.minRestDuration.message}</p>}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#6C63FF] hover:bg-[#5a52d5] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#6C63FF]/20 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-8"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Création de votre espace...
            </span>
          ) : (
            "Valider et accéder à mon dashboard"
          )}
        </button>
      </form>
    </div>
  )
}

