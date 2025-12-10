'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

type PlanningVariant = 'balanced' | 'economical' | 'staff-friendly'

export default function AIPlanningPage() {
  const router = useRouter()
  const { profile } = useAuth()
  const [step, setStep] = useState<'config' | 'generating' | 'results'>('config')
  const [selectedVariant, setSelectedVariant] = useState<PlanningVariant>('balanced')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [generatedSchedule, setGeneratedSchedule] = useState<any>(null)

  const variants = [
    {
      id: 'balanced' as PlanningVariant,
      name: 'Équilibré',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Compromis optimal entre coût, équité et satisfaction',
      features: ['Respect des contraintes légales', 'Distribution équitable', 'Coût maîtrisé']
    },
    {
      id: 'economical' as PlanningVariant,
      name: 'Économique',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Minimise les coûts tout en respectant les obligations',
      features: ['Optimisation maximum des coûts', 'Heures supplémentaires minimisées', 'Budget préservé']
    },
    {
      id: 'staff-friendly' as PlanningVariant,
      name: 'Staff-Friendly',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Priorise le bien-être et les préférences de l\'équipe',
      features: ['Disponibilités respectées', 'Repos optimisés', 'Satisfaction maximale']
    }
  ]

  const constraints = [
    { label: 'Disponibilités employés', value: '12/15 déclarées', status: 'good' },
    { label: 'Règles légales HCR', value: '100% activées', status: 'good' },
    { label: 'Compétences & postes', value: '8 postes définis', status: 'good' },
    { label: 'Budget hebdomadaire', value: '3,500€ max', status: 'warning' },
    { label: 'Heures contractuelles', value: '145h/semaine', status: 'good' }
  ]

  const generatePlanning = async () => {
    if (!profile?.restaurant_id) {
      toast.error('Restaurant requis. Veuillez créer votre restaurant.')
      return
    }

    setIsGenerating(true)
    setStep('generating')

    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1) // Lundi de cette semaine
      
      const response = await fetch('/api/planning/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId: profile.restaurant_id,
          startDate: startDate.toISOString().split('T')[0],
          variant: selectedVariant
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la génération')
      }

      const data = await response.json()
      setGeneratedSchedule(data)
      setStep('results')
      toast.success('Planning généré avec succès !')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error(error instanceof Error ? error.message : 'Erreur lors de la génération du planning')
      setStep('config')
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePublish = async () => {
    if (!generatedSchedule?.shifts || !profile?.restaurant_id) {
      toast.error('Aucun planning à publier')
      return
    }

    setIsPublishing(true)

    try {
      const response = await fetch('/api/schedule/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantId: profile.restaurant_id,
          shifts: generatedSchedule.shifts,
          status: 'published'
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur lors de la publication')
      }

      toast.success('Planning publié avec succès !')
      router.push('/dashboard/employer/planning')
    } catch (error) {
      console.error('Publish error:', error)
      toast.error(error instanceof Error ? error.message : 'Erreur lors de la publication')
    } finally {
      setIsPublishing(false)
    }
  }

  const handleRegenerate = () => {
    setStep('config')
    setGeneratedSchedule(null)
  }

  return (
    <div className="space-y-8 relative z-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Bot size={20} />
          </motion.div>
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">Planning IA</h1>
            <p className="text-black/60 dark:text-white/60">Générez un planning optimal en 30 secondes</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-4">
        {[
          { key: 'config', label: 'Configuration' },
          { key: 'generating', label: 'Génération' },
          { key: 'results', label: 'Résultats' }
        ].map((s, index) => (
          <div key={s.key} className="flex items-center gap-4">
            <div className={`
              flex items-center gap-3 px-6 py-3 rounded-full transition-all text-sm
              ${step === s.key
                ? 'theme-primary text-white shadow-lg'
                : 'bg-white dark:bg-[#1C1C1E] text-black/60 dark:text-white/60 border border-black/5 dark:border-white/5'
              }
            `}>
              <span className="font-medium">{s.label}</span>
            </div>
            {index < 2 && (
              <div className={`w-12 h-1 rounded-full ${
                ['generating', 'results'].includes(step) && index === 0 || step === 'results' && index === 1
                  ? 'theme-primary'
                  : 'bg-black/10 dark:bg-white/10'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Configuration Step */}
      <AnimatePresence mode="wait">
        {step === 'config' && (
          <motion.div
            key="config"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Contraintes Summary */}
            <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-4">
                Résumé des contraintes
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {constraints.map((constraint) => (
                  <div key={constraint.label} className="flex items-start gap-3 p-4 rounded-lg bg-black/5 dark:bg-white/5">
                    <div className="flex-1">
                      <p className="text-xs md:text-sm text-black/60 dark:text-white/60">{constraint.label}</p>
                      <p className="font-medium text-black dark:text-white">{constraint.value}</p>
                    </div>
                    <div className={`
                      w-2 h-2 rounded-full flex-shrink-0 mt-2
                      ${constraint.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'}
                    `} />
                  </div>
                ))}
              </div>
            </div>

            {/* Variant Selection */}
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-4">
                Choisissez votre mode de génération
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {variants.map((variant) => (
                  <motion.button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      relative overflow-hidden text-left rounded-lg p-4 md:p-6 transition-all
                      ${selectedVariant === variant.id
                        ? 'theme-primary text-white shadow-lg scale-105'
                        : 'bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/5 hover:theme-border-primary'
                      }
                    `}
                  >
                    {selectedVariant === variant.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                    )}

                    <h3 className={`text-lg md:text-xl font-semibold mb-2 ${selectedVariant === variant.id ? 'text-white' : 'text-black dark:text-white'}`}>
                      {variant.name}
                    </h3>
                    <p className={`text-xs md:text-sm mb-4 ${selectedVariant === variant.id ? 'text-white/90' : 'text-black/60 dark:text-white/60'}`}>
                      {variant.description}
                    </p>

                    <div className="space-y-2">
                      {variant.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <span className={selectedVariant === variant.id ? 'text-white' : 'text-green-600 dark:text-green-400'}>✓</span>
                          <span className={`text-xs md:text-sm ${selectedVariant === variant.id ? 'text-white/90' : 'text-black dark:text-white'}`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <motion.button
                onClick={generatePlanning}
                disabled={isGenerating}
                whileHover={isGenerating ? {} : { scale: 1.05 }}
                whileTap={isGenerating ? {} : { scale: 0.95 }}
                className="px-8 md:px-12 py-3 md:py-4 theme-primary hover:theme-primary text-white rounded-full font-semibold text-base md:text-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
              >
                {isGenerating ? 'Génération en cours...' : 'Générer le planning IA'}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Generating Step */}
        {step === 'generating' && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24"
          >
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity }
              }}
              className="w-24 h-24 md:w-32 md:h-32 theme-primary rounded-lg md:rounded-xl flex items-center justify-center mb-8 shadow-lg"
            >
              <motion.div
                animate={{
                  rotate: -360
                }}
                transition={{
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" }
                }}
              >
                <Logo size={48} />
              </motion.div>
            </motion.div>

            <h2 className="text-2xl md:text-3xl font-semibold text-black dark:text-white mb-4">
              Génération en cours...
            </h2>
            <p className="text-black/60 dark:text-white/60 text-base md:text-lg mb-8">
              L'IA analyse vos contraintes et crée le planning optimal
            </p>

            <div className="space-y-3 w-full max-w-md">
              {[
                { label: 'Analyse des disponibilités', delay: 0 },
                { label: 'Vérification des contraintes légales', delay: 0.5 },
                { label: 'Optimisation des coûts', delay: 1 },
                { label: 'Distribution équitable', delay: 1.5 },
                { label: 'Génération du planning', delay: 2 }
              ].map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: item.delay }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: item.delay }}
                    className="w-2 h-2 theme-primary rounded-full"
                  />
                  <span className="text-black dark:text-white">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results Step */}
        {step === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Success Message */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-green-600 rounded-lg p-6 md:p-8 text-white text-center"
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">Planning généré avec succès !</h2>
              <p className="text-white/90">Votre planning optimal est prêt. Économie de 4h de travail manuel.</p>
            </motion.div>

            {/* Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
                <p className="text-xs md:text-sm text-black/60 dark:text-white/60 mb-1">Coût total</p>
                <p className="text-2xl md:text-3xl font-semibold text-black dark:text-white">3,180€</p>
                <p className="text-green-600 dark:text-green-400 text-xs md:text-sm font-medium">-320€ vs manuel</p>
              </div>

              <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
                <p className="text-xs md:text-sm text-black/60 dark:text-white/60 mb-1">Conformité</p>
                <p className="text-2xl md:text-3xl font-semibold text-black dark:text-white">100%</p>
                <p className="text-green-600 dark:text-green-400 text-xs md:text-sm font-medium">0 conflit détecté</p>
              </div>

              <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
                <p className="text-xs md:text-sm text-black/60 dark:text-white/60 mb-1">Satisfaction équipe</p>
                <p className="text-2xl md:text-3xl font-semibold text-black dark:text-white">94%</p>
                <p className="text-green-600 dark:text-green-400 text-xs md:text-sm font-medium">+12% vs manuel</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center flex-wrap">
              <button 
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-6 md:px-8 py-2 md:py-3 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
              >
                {isPublishing ? 'Publication...' : 'Valider et publier'}
              </button>
              <button 
                onClick={() => router.push('/dashboard/employer/planning')}
                className="px-6 md:px-8 py-2 md:py-3 bg-white dark:bg-[#1C1C1E] text-black dark:text-white rounded-lg font-medium border border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                Modifier manuellement
              </button>
              <button 
                onClick={handleRegenerate}
                className="px-6 md:px-8 py-2 md:py-3 bg-white dark:bg-[#1C1C1E] text-black dark:text-white rounded-lg font-medium border border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                Générer à nouveau
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
