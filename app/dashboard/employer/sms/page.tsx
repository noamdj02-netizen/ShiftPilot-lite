'use client'

import { useState, useEffect } from 'react'
import { Bell, Send, CheckCircle2, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/dashboard/ui/SectionTitle'
import { KPICard } from '@/components/dashboard/ui/KPICard'
import { DashboardCard } from '@/components/dashboard/ui/DashboardCard'

export default function SMSPage() {
  const [sentCount, setSentCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSentCount(prev => Math.min(prev + 1, 8))
    }, 300)
    return () => clearInterval(interval)
  }, [])

  const employees = [
    { id: 1, name: 'Marie D.', phone: '+33 6 12 34 56 78', status: 'sent' },
    { id: 2, name: 'Jean P.', phone: '+33 6 23 45 67 89', status: 'sent' },
    { id: 3, name: 'Sophie M.', phone: '+33 6 34 56 78 90', status: 'pending' },
    { id: 4, name: 'Pierre L.', phone: '+33 6 45 67 89 01', status: 'pending' },
  ]

  const messageTemplates = [
    { id: 'planning', title: 'Planning publié', text: '📅 Planning semaine 15 publié ! Votre shift : Lun 9h-17h, Mer 14h-22h, Ven 10h-18h' },
    { id: 'reminder', title: 'Rappel shift', text: '⏰ Rappel : Votre shift commence dans 1h (14h-22h)' },
    { id: 'change', title: 'Modification planning', text: '⚠️ Modification : Votre shift de demain est annulé' },
  ]

  return (
    <div className="space-y-6">
      <SectionTitle
        title="PilotSMS"
        subtitle="Gérer toute votre équipe par SMS"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <KPICard
          icon={Send}
          label="SMS envoyés"
          value={`${sentCount}/8`}
          color="green"
        />
        <KPICard
          icon={CheckCircle2}
          label="SMS lus"
          value="6"
          color="blue"
        />
        <KPICard
          icon={Clock}
          label="En attente"
          value="2"
          color="amber"
        />
        <KPICard
          icon={Users}
          label="Employés"
          value={employees.length}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Templates */}
        <DashboardCard>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Modèles de messages</h3>
          <div className="space-y-3">
            {messageTemplates.map((template) => (
              <motion.button
                key={template.id}
                className="w-full p-4 rounded-lg border-2 border-slate-200 dark:border-slate-800 hover:border-green-300 text-left transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                  {template.title}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {template.text}
                </div>
              </motion.button>
            ))}
          </div>
        </DashboardCard>

        {/* Recipients List */}
        <DashboardCard>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Destinataires</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {employees.map((emp, i) => (
              <motion.div
                key={emp.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{emp.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{emp.phone}</div>
                  </div>
                </div>
                {emp.status === 'sent' ? (
                  <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-semibold">Envoyé</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>En attente...</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Send Button */}
      <motion.button
        className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Send className="w-5 h-5" />
        Envoyer les SMS
      </motion.button>
    </div>
  )
}

