'use client'

import { useState, useEffect } from 'react'
import { Star, Send, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/dashboard/ui/SectionTitle'
import { KPICard } from '@/components/dashboard/ui/KPICard'
import { DashboardCard } from '@/components/dashboard/ui/DashboardCard'

export default function ReviewsPage() {
  const [stats, setStats] = useState({ sent: 0, received: 0, rate: 0 })
  const [autoSend, setAutoSend] = useState(true)

  useEffect(() => {
    setStats({
      sent: 45,
      received: 18,
      rate: 40
    })
  }, [])

  const recentActivity = [
    { name: 'Sophie M.', status: 'sent', time: 'Il y a 2h' },
    { name: 'Pierre L.', status: 'reviewed', time: 'Il y a 3h', rating: 5 },
    { name: 'Marie D.', status: 'sent', time: 'Il y a 5h' },
    { name: 'Jean P.', status: 'reviewed', time: 'Il y a 6h', rating: 4 },
  ]

  return (
    <div className="space-y-6">
      <SectionTitle
        title="PilotReview"
        subtitle="Boostez vos avis Google automatiquement"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard
          icon={Send}
          label="Demandes envoyées"
          value={stats.sent}
          color="amber"
        />
        <KPICard
          icon={Star}
          label="Avis reçus"
          value={`+${stats.received}`}
          color="green"
        />
        <KPICard
          icon={TrendingUp}
          label="Taux de réponse"
          value={`${stats.rate}%`}
          color="blue"
        />
      </div>

      {/* Auto Send Toggle */}
      <DashboardCard>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Envoi automatique</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Envoyer une demande d'avis après chaque service
            </p>
          </div>
          <button
            onClick={() => setAutoSend(!autoSend)}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              autoSend ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <motion.div
              className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
              animate={{ x: autoSend ? 24 : 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </DashboardCard>

      {/* Recent Activity */}
      <DashboardCard>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Activité récente</h3>
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                    {item.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">{item.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{item.time}</div>
                </div>
              </div>
              {item.status === 'sent' ? (
                <Send className="w-5 h-5 text-blue-500" />
              ) : (
                <div className="flex items-center gap-1">
                  {Array.from({ length: item.rating || 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </DashboardCard>
    </div>
  )
}

