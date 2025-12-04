'use client'

import { motion } from 'framer-motion'
import { TodayKPIs } from './TodayKPIs'
import { WeekStats } from './WeekStats'
import { ActiveEmployees } from './ActiveEmployees'
import { CriticalAlerts } from './CriticalAlerts'
import { ActivityChart } from './ActivityChart'
import { CoversChart } from './CoversChart'

interface DashboardOverviewProps {
  organizationId: string
}

export function DashboardOverview({ organizationId }: DashboardOverviewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white mb-2">Vue d'ensemble</h1>
        <p className="text-black/60 dark:text-white/60">Tableau de bord de votre restaurant</p>
      </div>

      {/* KPIs Journée */}
      <TodayKPIs />

      {/* KPIs Semaine */}
      <WeekStats />

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart />
        <CoversChart />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employés actifs */}
        <ActiveEmployees />

        {/* Alertes critiques */}
        <CriticalAlerts />
      </div>
    </motion.div>
  )
}

