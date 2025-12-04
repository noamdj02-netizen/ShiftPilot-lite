'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function EmployerDashboard() {
  const stats = [
    {
      icon: '👥',
      label: 'Employés présents',
      value: '12/15',
      change: '+2',
      trend: 'up',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '⏰',
      label: 'Heures planifiées',
      value: '145h',
      change: '-5h',
      trend: 'down',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '✅',
      label: 'Conformité planning',
      value: '98%',
      change: '+3%',
      trend: 'up',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '💰',
      label: 'Coût semaine',
      value: '3,240€',
      change: '-120€',
      trend: 'down',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  const todaySchedule = [
    { time: '08:00-12:00', name: 'Marie Dupont', role: 'Serveur', color: 'bg-blue-500' },
    { time: '08:00-14:00', name: 'Jean Martin', role: 'Cuisine', color: 'bg-purple-500' },
    { time: '12:00-18:00', name: 'Sophie Bernard', role: 'Serveur', color: 'bg-pink-500' },
    { time: '14:00-22:00', name: 'Lucas Petit', role: 'Cuisine', color: 'bg-orange-500' },
    { time: '18:00-23:00', name: 'Emma Dubois', role: 'Serveur', color: 'bg-green-500' }
  ]

  const alerts = [
    { type: 'warning', message: '2 demandes de congé en attente', icon: '⚠️', color: 'border-yellow-500' },
    { type: 'info', message: 'Planning de la semaine prochaine à valider', icon: 'ℹ️', color: 'border-blue-500' },
    { type: 'success', message: '5 nouveaux avis Google cette semaine', icon: '⭐', color: 'border-green-500' }
  ]

  const quickActions = [
    {
      title: 'Générer Planning IA',
      description: 'Créer un planning optimal en 1 clic',
      icon: '🤖',
      href: '/dashboard/employer/ai-planning',
      gradient: 'from-violet-500 to-purple-500',
      badge: 'IA'
    },
    {
      title: 'Voir les messages',
      description: 'Répondre aux clients automatiquement',
      icon: '💬',
      href: '/dashboard/employer/pilotbot',
      gradient: 'from-cyan-500 to-blue-500',
      badge: '12 nouveaux'
    },
    {
      title: 'Envoyer demande avis',
      description: 'Booster vos avis Google',
      icon: '⭐',
      href: '/dashboard/employer/pilotreview',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Notifier l\'équipe',
      description: 'Envoyer le planning par SMS',
      icon: '📱',
      href: '/dashboard/employer/pilotsms',
      gradient: 'from-pink-500 to-rose-500'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Bonjour, John 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Voici ce qui se passe dans votre restaurant aujourd'hui
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/dashboard/employer/ai-planning"
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2"
          >
            <span className="text-xl">🤖</span>
            Générer Planning IA
          </Link>
        </div>
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
                  ${stat.trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}
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

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl p-4 border-l-4 ${alert.color} flex items-center gap-4`}
            >
              <span className="text-2xl">{alert.icon}</span>
              <p className="text-slate-700 dark:text-slate-300 flex-1">{alert.message}</p>
              <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Voir
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Planning du jour */}
        <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-xl">
                📅
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Planning du jour</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Jeudi 4 Décembre 2025</p>
              </div>
            </div>
            <Link
              href="/dashboard/employer/planning"
              className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Voir tout →
            </Link>
          </div>

          <div className="space-y-3">
            {todaySchedule.map((shift, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className={`w-2 h-16 ${shift.color} rounded-full`} />
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white">{shift.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{shift.role}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-medium text-slate-700 dark:text-slate-300">{shift.time}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">4h</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>⚡</span>
            Actions rapides
          </h2>

          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <Link
                href={action.href}
                className="block group"
              >
                <div className={`relative overflow-hidden bg-gradient-to-br ${action.gradient} rounded-2xl p-6 hover:shadow-xl transition-all duration-300`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-4xl">{action.icon}</span>
                      {action.badge && (
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                          {action.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">{action.title}</h3>
                    <p className="text-white/80 text-sm">{action.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
