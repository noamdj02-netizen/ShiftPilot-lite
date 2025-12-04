'use client'

import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { SectionTitle } from '@/components/dashboard/ui/SectionTitle'
import { ShiftCard } from '@/components/dashboard/ui/ShiftCard'

const shifts = [
  { id: 1, employeeName: 'Vous', role: 'Serveur', startTime: '09:00', endTime: '17:00', date: 'Lun 15 Jan' },
  { id: 2, employeeName: 'Vous', role: 'Serveur', startTime: '14:00', endTime: '22:00', date: 'Mer 17 Jan' },
  { id: 3, employeeName: 'Vous', role: 'Serveur', startTime: '10:00', endTime: '18:00', date: 'Ven 19 Jan' },
  { id: 4, employeeName: 'Vous', role: 'Serveur', startTime: '12:00', endTime: '20:00', date: 'Sam 20 Jan' },
]

export default function ShiftsPage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Mes shifts"
        subtitle="Tous vos shifts du mois"
      />

      <div className="space-y-3">
        {shifts.map((shift, i) => (
          <motion.div
            key={shift.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <ShiftCard
              employeeName={shift.employeeName}
              role={shift.role}
              startTime={shift.startTime}
              endTime={shift.endTime}
              date={shift.date}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

