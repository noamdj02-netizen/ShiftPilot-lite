'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type ContactForm = {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Form data:', data)
    toast.success('Message envoyé avec succès ! Nous vous répondrons sous 24h.')
    reset()
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Une question ? <span className="gradient-text">Contactez-nous</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Notre équipe est là pour vous aider à optimiser la gestion de votre établissement. 
            Réponse garantie sous 24h ouvrées.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-[#1C1C1E] p-8 rounded-2xl border border-white/5 space-y-6 hover:border-white/10 transition-colors">
              <h3 className="text-2xl font-semibold text-white mb-4">Nos coordonnées</h3>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#6C63FF]">mail</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email</h4>
                  <a href="mailto:support@shiftpilot.fr" className="text-slate-400 hover:text-[#6C63FF] transition-colors">
                    support@shiftpilot.fr
                  </a>
                  <p className="text-xs text-slate-500 mt-1">Pour le support technique et commercial</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#6C63FF]">location_on</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Bureaux</h4>
                  <p className="text-slate-400">
                    12 Avenue de la République<br/>
                    75011 Paris, France
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#6C63FF]">schedule</span>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Horaires</h4>
                  <p className="text-slate-400">Lundi - Vendredi : 9h - 18h</p>
                  <p className="text-slate-400">Samedi : 10h - 15h (Support urgence)</p>
                </div>
              </div>
            </div>

            {/* FAQ Quick Link */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#6C63FF]/20 to-purple-900/20 border border-[#6C63FF]/20">
              <h3 className="text-xl font-semibold text-white mb-2">Besoin d'une réponse immédiate ?</h3>
              <p className="text-slate-300 mb-4 text-sm">
                Consultez notre centre d'aide pour trouver des réponses aux questions fréquentes sur la configuration et l'utilisation.
              </p>
              <a href="#" className="text-[#6C63FF] font-medium hover:text-white transition-colors inline-flex items-center gap-1">
                Voir la FAQ <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-[#1C1C1E] p-8 md:p-10 rounded-2xl border border-white/5 shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Nom complet</label>
                  <input 
                    {...register('name', { required: 'Ce champ est requis' })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] outline-none transition-all placeholder:text-slate-600"
                    placeholder="Jean Dupont"
                  />
                  {errors.name && <span className="text-red-400 text-xs">{errors.name.message}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Email professionnel</label>
                  <input 
                    {...register('email', { 
                      required: 'Email requis',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Adresse email invalide"
                      }
                    })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] outline-none transition-all placeholder:text-slate-600"
                    placeholder="jean@restaurant.com"
                  />
                  {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Sujet</label>
                  <select 
                    {...register('subject', { required: 'Veuillez choisir un sujet' })}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:border-[#6C63FF] outline-none transition-all text-slate-300"
                  >
                    <option value="">Sélectionnez un sujet...</option>
                    <option value="demo">Demande de démo</option>
                    <option value="support">Support technique</option>
                    <option value="billing">Facturation</option>
                    <option value="other">Autre</option>
                  </select>
                  {errors.subject && <span className="text-red-400 text-xs">{errors.subject.message}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Message</label>
                  <textarea 
                    {...register('message', { required: 'Message requis', minLength: { value: 10, message: "Minimum 10 caractères" } })}
                    rows={5}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] outline-none transition-all placeholder:text-slate-600 resize-none"
                    placeholder="Comment pouvons-nous vous aider ?"
                  />
                  {errors.message && <span className="text-red-400 text-xs">{errors.message.message}</span>}
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#6C63FF] hover:bg-[#5a52d5] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#6C63FF]/20 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <span>Envoyer le message</span>
                      <span className="material-symbols-outlined text-sm">send</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
