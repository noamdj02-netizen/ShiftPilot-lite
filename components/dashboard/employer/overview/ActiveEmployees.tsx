'use client'

import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { EmployeeCard } from '@/components/dashboard/ui/EmployeeCard'

const employees = [
  { id: 1, name: 'Marie D.', role: 'Serveuse', hours: 28, status: 'on-shift' as const },
  { id: 2, name: 'Jean P.', role: 'Cuisinier', hours: 32, status: 'active' as const },
  { id: 3, name: 'Sophie M.', role: 'Manager', hours: 35, status: 'on-shift' as const },
  { id: 4, name: 'Pierre L.', role: 'Serveur', hours: 25, status: 'active' as const },
  { id: 5, name: 'Thomas B.', role: 'Cuisinier', hours: 30, status: 'active' as const },
]

export function ActiveEmployees() {
  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-xl border border-black/5 dark:border-white/5 p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Équipe active aujourd'hui</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((emp, i) => (
          <motion.div
            key={emp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <EmployeeCard
              name={emp.name}
              role={emp.role}
              hours={emp.hours}
              status={emp.status}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

