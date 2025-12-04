'use client'

import { useState, useEffect } from 'react'
import { Bell, Send, CheckCircle2, Clock, Users, Smartphone } from 'lucide-react'
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
    { id: 'planning', title: 'Planning publié', text: 'Planning semaine 15 publié ! Votre shift : Lun 9h-17h, Mer 14h-22h, Ven 10h-18h' },
    { id: 'reminder', title: 'Rappel shift', text: 'Rappel : Votre shift commence dans 1h (14h-22h)' },
    { id: 'change', title: 'Modification planning', text: 'Modification : Votre shift de demain est annulé' },
  ]

  return (
    <div className="space-y-6 relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center text-pink-600 dark:text-pink-400"
          whileHover={{ rotate: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Smartphone size={20} />
        </motion.div>
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">PilotSMS</h1>
          <p className="text-black/60 dark:text-white/60">Gérer toute votre équipe par SMS</p>
        </div>
      </div>

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
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Modèles de messages</h3>
          <div className="space-y-3">
            {messageTemplates.map((template) => (
              <motion.button
                key={template.id}
                className="w-full p-4 rounded-lg border-2 border-black/5 dark:border-white/5 hover:theme-border-primary text-left transition-all bg-white dark:bg-[#1C1C1E]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-sm font-semibold text-black dark:text-white mb-1">
                  {template.title}
                </div>
                <div className="text-xs text-black/60 dark:text-white/60">
                  {template.text}
                </div>
              </motion.button>
            ))}
          </div>
        </DashboardCard>

        {/* Recipients List */}
        <DashboardCard>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Destinataires</h3>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {employees.map((emp, i) => (
              <motion.div
                key={emp.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full theme-primary flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-black dark:text-white">{emp.name}</div>
                    <div className="text-xs text-black/60 dark:text-white/60">{emp.phone}</div>
                  </div>
                </div>
                {emp.status === 'sent' ? (
                  <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-semibold">Envoyé</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-black/60 dark:text-white/60">
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
        className="w-full py-4 theme-primary hover:theme-primary text-white rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg transition-all"
        style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Send className="w-5 h-5" />
        Envoyer les SMS
      </motion.button>
    </div>
  )
}

