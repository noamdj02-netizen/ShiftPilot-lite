'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type PlanningVariant = 'balanced' | 'economical' | 'staff-friendly'

export default function AIPlanningPage() {
  const [step, setStep] = useState<'config' | 'generating' | 'results'>('config')
  const [selectedVariant, setSelectedVariant] = useState<PlanningVariant>('balanced')

  const variants = [
    {
      id: 'balanced' as PlanningVariant,
      name: 'Équilibré',
      icon: '⚖️',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Compromis optimal entre coût, équité et satisfaction',
      features: ['Respect des contraintes légales', 'Distribution équitable', 'Coût maîtrisé']
    },
    {
      id: 'economical' as PlanningVariant,
      name: 'Économique',
      icon: '💰',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Minimise les coûts tout en respectant les obligations',
      features: ['Optimisation maximum des coûts', 'Heures supplémentaires minimisées', 'Budget préservé']
    },
    {
      id: 'staff-friendly' as PlanningVariant,
      name: 'Staff-Friendly',
      icon: '❤️',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Priorise le bien-être et les préférences de l\'équipe',
      features: ['Disponibilités respectées', 'Repos optimisés', 'Satisfaction maximale']
    }
  ]

  const constraints = [
    { icon: '📋', label: 'Disponibilités employés', value: '12/15 déclarées', status: 'good' },
    { icon: '⚖️', label: 'Règles légales HCR', value: '100% activées', status: 'good' },
    { icon: '👥', label: 'Compétences & postes', value: '8 postes définis', status: 'good' },
    { icon: '💰', label: 'Budget hebdomadaire', value: '3,500€ max', status: 'warning' },
    { icon: '⏰', label: 'Heures contractuelles', value: '145h/semaine', status: 'good' }
  ]

  const generatePlanning = () => {
    setStep('generating')
    setTimeout(() => {
      setStep('results')
    }, 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl">
            🤖
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Planning IA</h1>
            <p className="text-slate-600 dark:text-slate-400">Générez un planning optimal en 30 secondes</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-4">
        {[
          { key: 'config', label: 'Configuration', icon: '⚙️' },
          { key: 'generating', label: 'Génération', icon: '⚡' },
          { key: 'results', label: 'Résultats', icon: '✨' }
        ].map((s, index) => (
          <div key={s.key} className="flex items-center gap-4">
            <div className={`
              flex items-center gap-3 px-6 py-3 rounded-xl transition-all
              ${step === s.key
                ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400'
              }
            `}>
              <span className="text-xl">{s.icon}</span>
              <span className="font-medium">{s.label}</span>
            </div>
            {index < 2 && (
              <div className={`w-12 h-1 rounded-full ${
                ['generating', 'results'].includes(step) && index === 0 || step === 'results' && index === 1
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500'
                  : 'bg-slate-200 dark:bg-slate-800'
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
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span>📊</span>
                Résumé des contraintes
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {constraints.map((constraint) => (
                  <div key={constraint.label} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-2xl">{constraint.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 dark:text-slate-400">{constraint.label}</p>
                      <p className="font-medium text-slate-900 dark:text-white">{constraint.value}</p>
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
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span>🎯</span>
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
                      relative overflow-hidden text-left rounded-2xl p-6 transition-all
                      ${selectedVariant === variant.id
                        ? `bg-gradient-to-br ${variant.gradient} text-white shadow-2xl scale-105`
                        : 'bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700'
                      }
                    `}
                  >
                    {selectedVariant === variant.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                    )}

                    <span className="text-5xl mb-4 block">{variant.icon}</span>
                    <h3 className={`text-xl font-bold mb-2 ${selectedVariant === variant.id ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                      {variant.name}
                    </h3>
                    <p className={`text-sm mb-4 ${selectedVariant === variant.id ? 'text-white/90' : 'text-slate-600 dark:text-slate-400'}`}>
                      {variant.description}
                    </p>

                    <div className="space-y-2">
                      {variant.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <span className={selectedVariant === variant.id ? 'text-white' : 'text-green-500'}>✓</span>
                          <span className={`text-sm ${selectedVariant === variant.id ? 'text-white/90' : 'text-slate-700 dark:text-slate-300'}`}>
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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center gap-3"
              >
                <span className="text-2xl">🚀</span>
                Générer le planning IA
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
              className="w-32 h-32 bg-gradient-to-br from-violet-500 to-purple-500 rounded-3xl flex items-center justify-center text-6xl mb-8 shadow-2xl"
            >
              🤖
            </motion.div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Génération en cours...
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
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
                    className="w-2 h-2 bg-violet-500 rounded-full"
                  />
                  <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
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
              className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white text-center"
            >
              <div className="text-6xl mb-4">✨</div>
              <h2 className="text-3xl font-bold mb-2">Planning généré avec succès !</h2>
              <p className="text-white/90">Votre planning optimal est prêt. Économie de 4h de travail manuel.</p>
            </motion.div>

            {/* Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
                <div className="text-3xl mb-3">💰</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Coût total</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">3,180€</p>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">-320€ vs manuel</p>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
                <div className="text-3xl mb-3">⚖️</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Conformité</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">100%</p>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">0 conflit détecté</p>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
                <div className="text-3xl mb-3">❤️</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Satisfaction équipe</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">94%</p>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium">+12% vs manuel</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                Valider et publier
              </button>
              <button className="px-8 py-3 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white rounded-xl font-medium border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                Modifier manuellement
              </button>
              <button className="px-8 py-3 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white rounded-xl font-medium border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                Générer à nouveau
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
