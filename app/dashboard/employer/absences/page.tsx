'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  photo: string
}

export default function AbsencesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('pending')

  const stats = [
    {
      icon: '⏳',
      label: 'Demandes en attente',
      value: '3',
      change: '+1',
      trend: 'up',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '✅',
      label: 'Approuvées ce mois',
      value: '8',
      change: '+2',
      trend: 'up',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '❌',
      label: 'Rejetées',
      value: '1',
      change: '0',
      trend: 'neutral',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: '🗓️',
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
      daysRequested: 8,
      photo: '👩‍💼'
    },
    {
      id: 2,
      employee: 'Jean Martin',
      type: 'Maladie',
      startDate: '02/12/2025',
      endDate: '04/12/2025',
      status: 'approved',
      reason: 'Grippe',
      daysRequested: 3,
      photo: '👨‍💼'
    },
    {
      id: 3,
      employee: 'Sophie Bernard',
      type: 'RTT',
      startDate: '09/12/2025',
      endDate: '10/12/2025',
      status: 'pending',
      reason: 'RTT',
      daysRequested: 2,
      photo: '👩‍💼'
    },
    {
      id: 4,
      employee: 'Lucas Petit',
      type: 'Congés',
      startDate: '20/12/2025',
      endDate: '02/01/2026',
      status: 'approved',
      reason: 'Vacances de Noël',
      daysRequested: 14,
      photo: '👨‍💼'
    },
    {
      id: 5,
      employee: 'Emma Dubois',
      type: 'Maladie',
      startDate: '05/12/2025',
      endDate: '06/12/2025',
      status: 'pending',
      reason: 'Gastro-entérite',
      daysRequested: 2,
      photo: '👩‍💼'
    },
    {
      id: 6,
      employee: 'Thomas Leclerc',
      type: 'Congés',
      startDate: '15/11/2025',
      endDate: '18/11/2025',
      status: 'rejected',
      reason: 'Période haute',
      daysRequested: 4,
      photo: '👨‍💼'
    }
  ]

  const filteredAbsences = absences.filter(abs => {
    if (activeTab === 'all') return true
    return abs.status === activeTab
  })

  const getTypeColor = (type: AbsenceType) => {
    switch(type) {
      case 'Congés':
        return { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', icon: '🏖️' }
      case 'Maladie':
        return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', icon: '🤒' }
      case 'RTT':
        return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', icon: '📅' }
    }
  }

  const tabs = [
    { key: 'pending', label: 'En attente', icon: '⏳', count: absences.filter(a => a.status === 'pending').length },
    { key: 'approved', label: 'Approuvées', icon: '✅', count: absences.filter(a => a.status === 'approved').length },
    { key: 'rejected', label: 'Rejetées', icon: '❌', count: absences.filter(a => a.status === 'rejected').length },
    { key: 'all', label: 'Toutes', icon: '📋', count: absences.length }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
            Absences & Congés
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Gérez les demandes de congé et absences de votre équipe
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center gap-2"
        >
          <span className="text-xl">📅</span>
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
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                  {stat.icon}
                </div>
                <span className={`
                  px-3 py-1 rounded-full text-xs font-bold
                  ${stat.trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : stat.trend === 'down' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400'}
                `}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white/80 dark:bg-slate-900/80 rounded-xl p-1 border border-slate-200/50 dark:border-slate-800/50 w-fit overflow-x-auto">
        {tabs.map((tab) => (
          <motion.button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as TabType)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
            <span className={`text-xs font-bold ${activeTab === tab.key ? 'bg-white/30' : 'bg-slate-200 dark:bg-slate-700'} px-2 py-0.5 rounded-full`}>
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
              pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: '⏳ En attente' },
              approved: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: '✅ Approuvée' },
              rejected: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: '❌ Rejetée' }
            }[absence.status]

            return (
              <motion.div
                key={absence.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl p-4 border border-slate-200/50 dark:border-slate-800/50 hover:border-green-500/30 dark:hover:border-green-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  {/* Left side - Employee info */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-xl">
                      {absence.photo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 dark:text-white">{absence.employee}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${typeColor.bg} ${typeColor.text}`}>
                          {typeColor.icon} {absence.type}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {absence.startDate} → {absence.endDate} ({absence.daysRequested}j)
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
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
                          className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg font-medium text-sm transition-colors"
                        >
                          ✅ Approuver
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg font-medium text-sm transition-colors"
                        >
                          ❌ Rejeter
                        </motion.button>
                      </div>
                    )}
                    {absence.status !== 'pending' && (
                      <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium text-sm transition-colors">
                        👁️ Détails
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
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Aucune absence pour cette catégorie</h3>
          <p className="text-slate-600 dark:text-slate-400">Tout est bon pour votre équipe!</p>
        </motion.div>
      )}

      {/* Calendar View */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <span>📅</span>
          Calendrier des absences (Décembre 2025)
        </h2>

        <div className="grid grid-cols-7 gap-2">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
            <div key={day} className="text-center font-bold text-slate-600 dark:text-slate-400 py-2 text-sm">
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
                    ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 font-bold'
                    : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-400'
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
