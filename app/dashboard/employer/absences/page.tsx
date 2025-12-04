'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Umbrella } from 'lucide-react'

type TabType = 'pending' | 'approved' | 'rejected' | 'all'
type AbsenceType = 'Congés' | 'Maladie' | 'RTT'

interface Absence {
  id: number
  employee: string
  type: AbsenceType
  startDate: string
  endDate: string
  status: 'pending' | 'approved' | 'rejected'
  reason: string
  daysRequested: number
  photo?: string
}

export default function AbsencesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('pending')

  const stats = [
    {
      label: 'Demandes en attente',
      value: '3',
      change: '+1',
      trend: 'up',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      label: 'Approuvées ce mois',
      value: '8',
      change: '+2',
      trend: 'up',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Rejetées',
      value: '1',
      change: '0',
      trend: 'neutral',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      label: 'Jours d\'absence',
      value: '24j',
      change: '+5j',
      trend: 'up',
      gradient: 'from-blue-500 to-cyan-500'
    }
  ]

  const absences: Absence[] = [
    {
      id: 1,
      employee: 'Marie Dupont',
      type: 'Congés',
      startDate: '10/12/2025',
      endDate: '17/12/2025',
      status: 'pending',
      reason: 'Vacances de fin d\'année',
      daysRequested: 8
    },
    {
      id: 2,
      employee: 'Jean Martin',
      type: 'Maladie',
      startDate: '02/12/2025',
      endDate: '04/12/2025',
      status: 'approved',
      reason: 'Grippe',
      daysRequested: 3
    },
    {
      id: 3,
      employee: 'Sophie Bernard',
      type: 'RTT',
      startDate: '09/12/2025',
      endDate: '10/12/2025',
      status: 'pending',
      reason: 'RTT',
      daysRequested: 2
    },
    {
      id: 4,
      employee: 'Lucas Petit',
      type: 'Congés',
      startDate: '20/12/2025',
      endDate: '02/01/2026',
      status: 'approved',
      reason: 'Vacances de Noël',
      daysRequested: 14
    },
    {
      id: 5,
      employee: 'Emma Dubois',
      type: 'Maladie',
      startDate: '05/12/2025',
      endDate: '06/12/2025',
      status: 'pending',
      reason: 'Gastro-entérite',
      daysRequested: 2
    },
    {
      id: 6,
      employee: 'Thomas Leclerc',
      type: 'Congés',
      startDate: '15/11/2025',
      endDate: '18/11/2025',
      status: 'rejected',
      reason: 'Période haute',
      daysRequested: 4
    }
  ]

  const filteredAbsences = absences.filter(abs => {
    if (activeTab === 'all') return true
    return abs.status === activeTab
  })

  const getTypeColor = (type: AbsenceType) => {
    switch(type) {
      case 'Congés':
        return { bg: 'theme-bg-light dark:theme-bg-dark', text: 'theme-text-primary dark:theme-text-primary-light' }
      case 'Maladie':
        return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400' }
      case 'RTT':
        return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400' }
    }
  }

  const tabs = [
    { key: 'pending', label: 'En attente', count: absences.filter(a => a.status === 'pending').length },
    { key: 'approved', label: 'Approuvées', count: absences.filter(a => a.status === 'approved').length },
    { key: 'rejected', label: 'Rejetées', count: absences.filter(a => a.status === 'rejected').length },
    { key: 'all', label: 'Toutes', count: absences.length }
  ]

  return (
    <div className="space-y-8 relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Umbrella size={20} />
          </motion.div>
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">
              Absences & Congés
            </h1>
            <p className="text-black/60 dark:text-white/60 mt-2">
              Gérez les demandes de congé et absences de votre équipe
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 md:px-6 py-2 md:py-3 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all text-sm md:text-base"
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
        >
          Voir calendrier
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10"
              style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
            />
            <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <span className={`
                  px-2 py-1 rounded-full text-[10px] md:text-xs font-semibold
                  ${stat.trend === 'up' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : stat.trend === 'down' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60'}
                `}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-black/60 dark:text-white/60 text-xs md:text-sm font-medium">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-semibold text-black dark:text-white mt-1">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white dark:bg-[#1C1C1E] rounded-full p-1 border border-black/5 dark:border-white/5 w-fit overflow-x-auto">
        {tabs.map((tab) => (
          <motion.button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as TabType)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap text-sm ${
              activeTab === tab.key
                ? 'theme-primary text-white'
                : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            {tab.label}
            <span className={`text-xs font-semibold ${activeTab === tab.key ? 'bg-white/30' : 'bg-black/5 dark:bg-white/5'} px-2 py-0.5 rounded-full`}>
              {tab.count}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Absences List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {filteredAbsences.map((absence, index) => {
            const typeColor = getTypeColor(absence.type)
            const statusColor = {
              pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: 'En attente' },
              approved: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Approuvée' },
              rejected: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Rejetée' }
            }[absence.status]

            return (
              <motion.div
                key={absence.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 border border-black/5 dark:border-white/5 hover:theme-border-primary transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  {/* Left side - Employee info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full theme-primary flex items-center justify-center text-white font-semibold text-sm md:text-base">
                      {absence.employee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-black dark:text-white">{absence.employee}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${typeColor.bg} ${typeColor.text}`}>
                          {absence.type}
                        </span>
                        <span className="text-xs text-black/60 dark:text-white/60">
                          {absence.startDate} → {absence.endDate} ({absence.daysRequested}j)
                        </span>
                      </div>
                      <p className="text-xs text-black/60 dark:text-white/60 mt-1">
                        Raison: {absence.reason}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusColor.bg} ${statusColor.text}`}>
                      {statusColor.label}
                    </span>

                    {/* Actions */}
                    {absence.status === 'pending' && (
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400 rounded-lg font-medium text-xs md:text-sm transition-colors"
                        >
                          Approuver
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg font-medium text-xs md:text-sm transition-colors"
                        >
                          Rejeter
                        </motion.button>
                      </div>
                    )}
                    {absence.status !== 'pending' && (
                      <button className="px-4 py-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white rounded-lg font-medium text-xs md:text-sm transition-colors">
                        Détails
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredAbsences.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Aucune absence pour cette catégorie</h3>
          <p className="text-black/60 dark:text-white/60">Tout est bon pour votre équipe!</p>
        </motion.div>
      )}

      {/* Calendar View */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
        <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-6">
          Calendrier des absences (Décembre 2025)
        </h2>

        <div className="grid grid-cols-7 gap-2">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
            <div key={day} className="text-center font-semibold text-black/60 dark:text-white/60 py-2 text-sm">
              {day}
            </div>
          ))}

          {[...Array(31)].map((_, i) => {
            const date = i + 1
            const hasAbsence = absences.some(a => {
              const startDay = parseInt(a.startDate.split('/')[0])
              const endDay = parseInt(a.endDate.split('/')[0])
              return date >= startDay && date <= endDay
            })

            return (
              <div
                key={i}
                className={`aspect-square flex items-center justify-center rounded-lg border transition-colors ${
                  hasAbsence
                    ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 font-semibold'
                    : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-black dark:text-white'
                }`}
              >
                {date}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
