'use client'

import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { DashboardCard } from '@/components/dashboard/ui/DashboardCard'

interface TeamMember {
  name: string
  role: string
  startTime: string
  endTime: string
  avatar?: string
}

// Mock data - in production, this would come from props or API
const mockTeamMembers: TeamMember[] = [
  { name: 'Marie Dubois', role: 'Serveuse', startTime: '09:00', endTime: '17:00' },
  { name: 'Jean Martin', role: 'Cuisinier', startTime: '10:00', endTime: '18:00' },
  { name: 'Sophie Bernard', role: 'Barmaid', startTime: '14:00', endTime: '22:00' },
]

export function TeamTodayCard() {
  return (
    <DashboardCard>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Équipe aujourd'hui</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {mockTeamMembers.length} personne{mockTeamMembers.length > 1 ? 's' : ''} en shift
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          {mockTeamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                    {member.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {member.role}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-slate-900 dark:text-white">
                  {member.startTime} - {member.endTime}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardCard>
  )
}

