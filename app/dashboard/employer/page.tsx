'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Clock, CheckCircle2, DollarSign, TrendingUp, TrendingDown, Calendar, AlertCircle, CheckCircle, Info, Sparkles, MessageSquare, Star, Send } from 'lucide-react'

export default function EmployerDashboard() {
  const stats = [
    {
      icon: Users,
      label: 'Employés présents',
      value: '12/15',
      change: '+2',
      trend: 'up',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clock,
      label: 'Heures planifiées',
      value: '145h',
      change: '-5h',
      trend: 'down',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: CheckCircle2,
      label: 'Conformité planning',
      value: '98%',
      change: '+3%',
      trend: 'up',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: DollarSign,
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
    { type: 'warning', message: '2 demandes de congé en attente', icon: AlertCircle, color: 'border-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { type: 'info', message: 'Planning de la semaine prochaine à valider', icon: Info, color: 'border-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { type: 'success', message: '5 nouveaux avis Google cette semaine', icon: CheckCircle, color: 'border-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20' }
  ]

  const quickActions = [
    {
      title: 'Générer Planning IA',
      description: 'Créer un planning optimal en 1 clic',
      icon: Sparkles,
      href: '/dashboard/employer/ai-planning',
      gradient: 'from-violet-500 to-purple-500',
      badge: 'IA'
    },
    {
      title: 'Voir les messages',
      description: 'Répondre aux clients automatiquement',
      icon: MessageSquare,
      href: '/dashboard/employer/pilotbot',
      gradient: 'from-cyan-500 to-blue-500',
      badge: '12 nouveaux'
    },
    {
      title: 'Envoyer demande avis',
      description: 'Booster vos avis Google',
      icon: Star,
      href: '/dashboard/employer/pilotreview',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Notifier l\'équipe',
      description: 'Envoyer le planning par SMS',
      icon: Send,
      href: '/dashboard/employer/pilotsms',
      gradient: 'from-pink-500 to-rose-500'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Bonjour, John
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Voici ce qui se passe dans votre restaurant aujourd'hui
          </p>
        </div>

        <motion.div
          className="flex gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            href="/dashboard/employer/ai-planning"
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2 group"
          >
            <motion.div
              animate={{ rotate: 0 }}
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Sparkles size={20} />
            </motion.div>
            Générer Planning IA
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const StatIcon = stat.icon
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity blur-xl -z-10 rounded-2xl`} />
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-all shadow-sm group-hover:shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-md`}
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <StatIcon size={24} />
                  </motion.div>
                  <motion.span
                    className={`
                      px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1
                      ${stat.trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}
                    `}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendIcon size={14} />
                    {stat.change}
                  </motion.span>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const AlertIcon = alert.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.01, x: 5 }}
                className={`${alert.bgColor} backdrop-blur-xl rounded-xl p-4 border-l-4 ${alert.color} flex items-center gap-4 shadow-sm transition-all`}
              >
                <motion.div
                  animate={alert.type === 'warning' ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertIcon size={20} className={`
                    ${alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : ''}
                    ${alert.type === 'info' ? 'text-blue-600 dark:text-blue-400' : ''}
                    ${alert.type === 'success' ? 'text-green-600 dark:text-green-400' : ''}
                  `} />
                </motion.div>
                <p className="text-slate-700 dark:text-slate-300 flex-1 font-medium">{alert.message}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline whitespace-nowrap"
                >
                  Voir
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Planning du jour */}
        <motion.div
          className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-lg transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white"
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Calendar size={20} />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Planning du jour</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Jeudi 4 Décembre 2025</p>
              </div>
            </div>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/dashboard/employer/planning"
                className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Voir tout →
              </Link>
            </motion.div>
          </div>

          <div className="space-y-3">
            {todaySchedule.map((shift, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group"
              >
                <motion.div
                  className={`w-2 h-16 ${shift.color} rounded-full`}
                  whileHover={{ scaleX: 1.5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{shift.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{shift.role}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-medium text-slate-700 dark:text-slate-300">{shift.time}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">4h</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={20} />
            </motion.div>
            Actions rapides
          </h2>

          {quickActions.map((action, index) => {
            const ActionIcon = action.icon

            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link
                  href={action.href}
                  className="block group"
                >
                  <motion.div
                    className={`relative overflow-hidden bg-gradient-to-br ${action.gradient} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300`}
                    whileHover={{ y: -5 }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

                    <div className="relative">
                      <div className="flex items-start justify-between mb-3">
                        <motion.div
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <ActionIcon size={32} className="text-white" />
                        </motion.div>
                        {action.badge && (
                          <motion.span
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {action.badge}
                          </motion.span>
                        )}
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">{action.title}</h3>
                      <p className="text-white/80 text-sm">{action.description}</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
