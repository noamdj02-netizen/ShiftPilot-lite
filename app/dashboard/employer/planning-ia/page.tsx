'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck2, Sparkles, Clock, Users, TrendingUp } from 'lucide-react'
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
    <div className="space-y-6">
      <SectionTitle
        title="Planning IA"
        subtitle="Génération automatique de vos plannings optimisés"
      />

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { id: 'balanced', label: 'Équilibré', desc: 'Répartition équitable des shifts', icon: '⚖️' },
          { id: 'economic', label: 'Économique', desc: 'Optimisation des coûts', icon: '💰' },
          { id: 'staff-friendly', label: 'Staff-friendly', desc: 'Priorité au bien-être', icon: '❤️' },
        ].map((mode) => (
          <motion.button
            key={mode.id}
            onClick={() => setPlanningMode(mode.id as any)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              planningMode === mode.id
                ? 'border-accent bg-accent/10 dark:bg-accent/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-accent/50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-2xl mb-2">{mode.icon}</div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">{mode.label}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{mode.desc}</div>
          </motion.button>
        ))}
      </div>

      {/* Generate Button */}
      <motion.button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full py-4 bg-gradient-to-r from-accent to-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
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
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <CalendarCheck2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Cliquez sur "Générer le planning" pour commencer</p>
          </div>
        </DashboardCard>
      )}
    </div>
  )
}

