'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Send } from 'lucide-react'
import { SectionTitle } from '@/components/dashboard/ui/SectionTitle'
import { DashboardCard } from '@/components/dashboard/ui/DashboardCard'

const messages = [
  { id: 1, from: 'Manager', text: 'Planning de la semaine publié', time: 'Il y a 2h', read: false },
  { id: 2, from: 'Système', text: 'Rappel : Votre shift commence dans 1h', time: 'Il y a 5h', read: true },
]

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Messagerie"
        subtitle="Messages de l'équipe"
      />

      <div className="space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <DashboardCard className={msg.read ? '' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'}>
              <div className="flex items-start gap-3">
                <MessageCircle className={`w-5 h-5 mt-0.5 ${msg.read ? 'text-slate-400' : 'text-blue-500'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">{msg.from}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{msg.time}</div>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{msg.text}</div>
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

