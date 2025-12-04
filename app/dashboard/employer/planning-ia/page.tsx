'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck2, Sparkles, Clock, Users, TrendingUp, Bot } from 'lucide-react'
import { SectionTitle } from '@/components/dashboard/ui/SectionTitle'
import { DashboardCard } from '@/components/dashboard/ui/DashboardCard'
import { KPICard } from '@/components/dashboard/ui/KPICard'

export default function PlanningIAPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [planningMode, setPlanningMode] = useState<'balanced' | 'economic' | 'staff-friendly'>('balanced')

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => setIsGenerating(false), 3000)
  }

  return (
    <div className="space-y-6 relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400"
          whileHover={{ rotate: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Bot size={20} />
        </motion.div>
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">Planning IA</h1>
          <p className="text-black/60 dark:text-white/60">Génération automatique de vos plannings optimisés</p>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { id: 'balanced', label: 'Équilibré', desc: 'Répartition équitable des shifts' },
          { id: 'economic', label: 'Économique', desc: 'Optimisation des coûts' },
          { id: 'staff-friendly', label: 'Staff-friendly', desc: 'Priorité au bien-être' },
        ].map((mode) => (
          <motion.button
            key={mode.id}
            onClick={() => setPlanningMode(mode.id as any)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              planningMode === mode.id
                ? 'theme-border-primary theme-bg-light dark:theme-bg-dark'
                : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#1C1C1E] hover:theme-border-primary'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-sm font-semibold text-black dark:text-white mb-1">{mode.label}</div>
            <div className="text-xs text-black/60 dark:text-white/60 mt-1">{mode.desc}</div>
          </motion.button>
        ))}
      </div>

      {/* Generate Button */}
      <motion.button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full py-4 theme-primary hover:theme-primary text-white rounded-full font-semibold flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg transition-all"
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isGenerating ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            Génération en cours...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Générer le planning automatiquement
          </>
        )}
      </motion.button>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={Users}
          label="Employés disponibles"
          value="24/28"
          color="blue"
        />
        <KPICard
          icon={Clock}
          label="Heures nécessaires"
          value="420h"
          color="green"
        />
        <KPICard
          icon={TrendingUp}
          label="Risques surcharge"
          value="2"
          color="amber"
        />
        <KPICard
          icon={TrendingUp}
          label="Coût estimé optimisé"
          value="7,800€"
          delta="-9%"
          deltaType="positive"
          color="purple"
        />
      </div>

      {/* Planning Preview */}
      {!isGenerating && (
        <DashboardCard>
          <div className="text-center py-12 text-black/60 dark:text-white/60">
            <CalendarCheck2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Cliquez sur "Générer le planning" pour commencer</p>
          </div>
        </DashboardCard>
      )}
    </div>
  )
}

