'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

const alerts = [
  { id: 1, type: 'warning', message: 'Repos non respecté : Marie D. (2 jours consécutifs)', severity: 'high' },
  { id: 2, type: 'critical', message: 'Absence non remplacée : Jean P. (demain 14h-22h)', severity: 'critical' },
]

export function CriticalAlerts() {
  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-xl border border-black/5 dark:border-white/5 p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Alertes critiques</h3>
      </div>
      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className={`p-3 rounded-lg border ${
              alert.severity === 'critical'
                ? 'bg-red-500/10 dark:bg-red-500/10 border-red-500/30 dark:border-red-500/30'
                : 'bg-amber-500/10 dark:bg-amber-500/10 border-amber-500/30 dark:border-amber-500/30'
            }`}
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                alert.severity === 'critical' ? 'text-red-400' : 'text-amber-400'
              }`} />
              <div className="text-sm text-slate-900 dark:text-white">{alert.message}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

