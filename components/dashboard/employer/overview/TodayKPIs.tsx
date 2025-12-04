'use client'

import { Euro, Clock, Users, TrendingUp } from 'lucide-react'
import { KPICard } from '@/components/dashboard/ui/KPICard'

export function TodayKPIs() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white">Aujourd'hui</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={Euro}
          label="CA estimé"
          value="2,450€"
          delta="+12%"
          deltaType="positive"
          color="green"
        />
        <KPICard
          icon={Clock}
          label="Heures staff"
          value="24h"
          delta=""
          deltaType="neutral"
          color="blue"
        />
        <KPICard
          icon={Users}
          label="Employés actifs"
          value="8/12"
          delta=""
          deltaType="neutral"
          color="purple"
        />
        <KPICard
          icon={TrendingUp}
          label="Charge travail"
          value="85%"
          delta="+5%"
          deltaType="positive"
          color="amber"
        />
      </div>
    </div>
  )
}

