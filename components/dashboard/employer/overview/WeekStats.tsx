'use client'

import { Clock, Euro, CheckCircle2, TrendingUp } from 'lucide-react'
import { KPICard } from '@/components/dashboard/ui/KPICard'

export function WeekStats() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Cette semaine</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={Clock}
          label="Total heures"
          value="420h"
          delta="+5%"
          deltaType="positive"
          color="blue"
        />
        <KPICard
          icon={Euro}
          label="Coût RH semaine"
          value="8,200€"
          delta="-12%"
          deltaType="positive"
          color="green"
        />
        <KPICard
          icon={CheckCircle2}
          label="Taux conformité"
          value="100%"
          delta=""
          deltaType="neutral"
          color="amber"
        />
        <KPICard
          icon={TrendingUp}
          label="Heure de pointe"
          value="19h-21h"
          delta="Samedi"
          deltaType="neutral"
          color="purple"
        />
      </div>
    </div>
  )
}

