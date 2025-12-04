'use client'

import { NextShiftCard } from '@/components/dashboard/employee/NextShiftCard'
import { TeamTodayCard } from '@/components/dashboard/employee/TeamTodayCard'
import { DashboardCard } from '@/components/dashboard/ui/DashboardCard'
import { Bell } from 'lucide-react'

export default function EmployeeDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Mon planning</h1>
        <p className="text-slate-500 dark:text-slate-400">Bienvenue sur votre espace</p>
      </div>

      {/* Next Shift */}
      <NextShiftCard
        date="Lundi 15 Janvier"
        startTime="09:00"
        endTime="17:00"
        role="Serveur"
        location="Restaurant principal"
      />

      {/* Team Today */}
      <TeamTodayCard />

      {/* Reminders */}
      <DashboardCard>
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Rappels</h3>
        </div>
        <div className="space-y-2">
          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-slate-900 dark:text-white">
              ⏰ Votre shift commence dans 2h
            </p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-slate-900 dark:text-white">
              📅 Planning de la semaine disponible
            </p>
          </div>
        </div>
      </DashboardCard>
    </div>
  )
}
