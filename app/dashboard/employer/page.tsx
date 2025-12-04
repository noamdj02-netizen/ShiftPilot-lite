'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Clock, CheckCircle2, DollarSign, TrendingUp, TrendingDown, Calendar, AlertCircle, CheckCircle, Info, Sparkles, MessageSquare, Star, Send } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

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
    { type: 'info', message: 'Planning de la semaine prochaine à valider', icon: Info, color: 'theme-border-primary', bgColor: 'theme-bg-light dark:theme-bg-dark' },
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
    <div className="space-y-8 relative z-10">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-black dark:text-white">
            Bonjour, John
          </h1>
          <p className="text-black/60 dark:text-white/60 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
            Voici ce qui se passe dans votre restaurant aujourd'hui
          </p>
        </div>

        <motion.div
          className="w-full sm:w-auto"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            href="/dashboard/employer/ai-planning"
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all flex items-center justify-center gap-2 group text-sm sm:text-base"
            style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
          >
            <motion.div
              animate={{ rotate: 0 }}
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Sparkles size={18} className="sm:w-5 sm:h-5" />
            </motion.div>
            <span className="hidden sm:inline">Générer Planning IA</span>
            <span className="sm:hidden">IA</span>
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
              <div className="bg-white dark:bg-[#1C1C1E] rounded-lg border border-black/5 dark:border-white/5 p-4 md:p-6 shadow-sm group-hover:shadow-md transition-all h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${
                      stat.label.includes('Employés') ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                      stat.label.includes('Heures') ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                      stat.label.includes('Conformité') ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                      'theme-bg-light dark:theme-bg-dark theme-text-light dark:theme-text-dark'
                    } flex items-center justify-center`}
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <StatIcon size={20} />
                  </motion.div>
                  <motion.span
                    className={`
                      px-2 py-1 rounded-full text-[10px] md:text-xs font-semibold flex items-center gap-1
                      ${stat.trend === 'up' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'}
                    `}
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendIcon size={12} />
                    {stat.change}
                  </motion.span>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <p className="text-black/60 dark:text-white/60 text-xs md:text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-semibold text-black dark:text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Planning de la semaine avec graphiques */}
      <motion.div
        className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-all"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 theme-bg-light dark:theme-bg-dark rounded-lg flex items-center justify-center theme-text-primary dark:theme-text-primary-light"
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Calendar size={20} />
            </motion.div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white">Planning de la semaine</h2>
              <p className="text-xs md:text-sm text-black/60 dark:text-white/60">4-10 Décembre 2025</p>
            </div>
          </div>
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              href="/dashboard/employer/planning"
              className="text-sm theme-text-primary dark:theme-text-primary-light font-medium hover:underline"
            >
              Voir tout →
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          {/* Graphique des heures par jour */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-3 sm:mb-4">Heures planifiées par jour</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={[
                  { day: 'Lun', hours: 145, cost: 3200 },
                  { day: 'Mar', hours: 152, cost: 3350 },
                  { day: 'Mer', hours: 138, cost: 3050 },
                  { day: 'Jeu', hours: 165, cost: 3650 },
                  { day: 'Ven', hours: 178, cost: 3900 },
                  { day: 'Sam', hours: 190, cost: 4200 },
                  { day: 'Dim', hours: 160, cost: 3550 }
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" />
                <XAxis dataKey="day" stroke="currentColor" className="text-xs" />
                <YAxis stroke="currentColor" className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-primary)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Bar dataKey="hours" fill="var(--theme-primary, #3B82F6)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Graphique des coûts */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-black dark:text-white mb-3 sm:mb-4">Coût journalier (€)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart
                data={[
                  { day: 'Lun', cost: 3200 },
                  { day: 'Mar', cost: 3350 },
                  { day: 'Mer', cost: 3050 },
                  { day: 'Jeu', cost: 3650 },
                  { day: 'Ven', cost: 3900 },
                  { day: 'Sam', cost: 4200 },
                  { day: 'Dim', cost: 3550 }
                ]}
              >
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--theme-primary, #3B82F6)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--theme-primary, #3B82F6)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" />
                <XAxis dataKey="day" stroke="currentColor" className="text-xs" />
                <YAxis stroke="currentColor" className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-primary)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Area type="monotone" dataKey="cost" stroke="var(--theme-primary, #3B82F6)" fillOpacity={1} fill="url(#colorCost)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grille de la semaine */}
        <div className="grid grid-cols-7 gap-2">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, index) => (
            <div key={day} className="text-center">
              <p className="text-xs font-medium text-black/60 dark:text-white/60 mb-2">{day}</p>
              <div className="space-y-1">
                {index < 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="h-8 rounded-lg flex items-center justify-center text-xs font-medium text-white"
                    style={{ backgroundColor: 'var(--theme-primary, #3B82F6)' }}
                  >
                    {index + 1}
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

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
                className={`bg-white dark:bg-[#1C1C1E] rounded-lg p-4 border-l-4 ${alert.color} flex items-center gap-4 shadow-sm transition-all border border-black/5 dark:border-white/5`}
              >
                <motion.div
                  animate={alert.type === 'warning' ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertIcon size={20} className={`
                    ${alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : ''}
                    ${alert.type === 'info' ? 'theme-text-primary dark:theme-text-primary-light' : ''}
                    ${alert.type === 'success' ? 'text-green-600 dark:text-green-400' : ''}
                  `} />
                </motion.div>
                <p className="text-black dark:text-white flex-1 font-medium">{alert.message}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm theme-text-primary dark:theme-text-primary-light font-medium hover:underline whitespace-nowrap"
                >
                  Voir
                </motion.button>
              </motion.div>
            )
          })}
        </div>
      )}


      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Planning du jour */}
        <motion.div
          className="lg:col-span-2 bg-white dark:bg-[#1C1C1E] rounded-lg p-3 sm:p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                className="w-8 h-8 sm:w-10 sm:h-10 theme-bg-light dark:theme-bg-dark rounded-lg flex items-center justify-center theme-text-primary dark:theme-text-primary-light"
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Calendar size={18} className="sm:w-5 sm:h-5" />
              </motion.div>
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-black dark:text-white">Planning du jour</h2>
                <p className="text-xs sm:text-sm text-black/60 dark:text-white/60">Jeudi 4 Décembre 2025</p>
              </div>
            </div>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href="/dashboard/employer/planning"
                className="text-xs sm:text-sm theme-text-primary dark:theme-text-primary-light font-medium hover:underline"
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
                className="flex items-center gap-4 p-3 md:p-4 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer group border border-black/5 dark:border-white/5"
              >
                <motion.div
                  className="w-2 h-12 md:h-16 rounded-full"
                  style={{ backgroundColor: shift.color }}
                  whileHover={{ scaleX: 1.5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
                <div className="flex-1">
                  <p className="font-medium text-black dark:text-white group-hover:theme-text-primary dark:group-hover:theme-text-primary-light transition-colors">{shift.name}</p>
                  <p className="text-xs md:text-sm text-black/60 dark:text-white/60">{shift.role}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-medium text-black dark:text-white text-sm md:text-base">{shift.time}</p>
                  <p className="text-xs text-black/60 dark:text-white/60">4h</p>
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
          <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={20} className="theme-text-primary dark:theme-text-primary-light" />
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
                    className="relative overflow-hidden bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-black/5 dark:border-white/5"
                    whileHover={{ y: -2 }}
                  >
                    <div className="relative">
                      <div className="flex items-start justify-between mb-3">
                        <motion.div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            action.title.includes('IA') ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                            action.title.includes('messages') ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' :
                            action.title.includes('avis') ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                            'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
                          }`}
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <ActionIcon size={20} />
                        </motion.div>
                        {action.badge && (
                          <motion.span
                            className="px-2 py-1 theme-bg-light dark:theme-bg-dark theme-text-primary dark:theme-text-primary-light text-xs font-semibold rounded-full"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {action.badge}
                          </motion.span>
                        )}
                      </div>
                      <h3 className="text-black dark:text-white font-semibold text-base md:text-lg mb-1">{action.title}</h3>
                      <p className="text-black/60 dark:text-white/60 text-xs md:text-sm">{action.description}</p>
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
