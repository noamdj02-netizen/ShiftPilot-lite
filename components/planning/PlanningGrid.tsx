import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Employee, Shift as UIShift } from '@/lib/types'

interface PlanningGridProps {
  days: { name: string; date: string; isToday: boolean }[]
  employees: Employee[]
  shiftsMap: Record<string, (UIShift | null)[]>
  calculateHours: (empShifts: (UIShift | null)[]) => number
  getShiftStyles: (type: string) => string
  onRemoveShift: (empId: string, dayIndex: number) => void
}

export function PlanningGrid({
  days,
  employees,
  shiftsMap,
  calculateHours,
  getShiftStyles,
  onRemoveShift
}: PlanningGridProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1000px]">
        {/* Desktop Days Header */}
        <div className="grid grid-cols-[200px_repeat(7,1fr)] border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
          <div className="p-4 font-semibold text-xs text-slate-500 uppercase tracking-wider flex items-end">
            Employés
          </div>
          {days.map((day, i) => (
            <div
              key={i}
              className={`p-3 text-center border-l border-slate-200 dark:border-white/5 ${
                day.isToday ? 'bg-accent/5' : ''
              }`}
            >
              <p className={`text-xs uppercase font-medium mb-1 ${
                day.isToday ? 'text-accent' : 'text-slate-500 dark:text-slate-400'
              }`}>
                {day.name}
              </p>
              <div className={`inline-flex items-center justify-center size-8 rounded-full text-sm font-bold ${
                day.isToday ? 'bg-accent text-white' : 'text-slate-900 dark:text-white'
              }`}>
                {day.date}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Resources Rows */}
        <div className="flex-1">
          {employees.length === 0 && (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              Aucun employé trouvé. Commencez par ajouter des membres à votre équipe.
            </div>
          )}
          {employees.map((res, i) => {
            const empShifts = shiftsMap[res.id] || Array(7).fill(null)
            const weeklyHours = calculateHours(empShifts)
            
            return (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[200px_repeat(7,1fr)] border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group min-h-[100px]"
              >
                {/* Resource Info */}
                <div className="p-4 flex flex-col justify-center gap-1 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-[#1C1C1E] sticky left-0 z-10">
                  <div className="flex items-center gap-3">
                    <div className={`size-8 rounded-full ${res.color || 'bg-blue-500'} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                      {res.initials || (res.first_name || '').substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[120px]">{res.first_name} {res.last_name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{res.role}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                     <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">{weeklyHours}h</span>
                     <div className="h-1 flex-1 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                       <div 
                         className={`h-full rounded-full transition-all duration-500 ${weeklyHours > 35 ? 'bg-orange-500' : 'bg-green-500'}`} 
                         style={{ width: `${Math.min((weeklyHours / 35) * 100, 100)}%` }}
                       />
                     </div>
                  </div>
                </div>

                {/* Shifts Cells */}
                {empShifts.map((shift, j) => (
                  <div
                    key={j}
                    className={`p-2 border-l border-slate-200 dark:border-white/5 relative group/cell ${
                      j === 2 && days[2].isToday ? 'bg-accent/5' : ''
                    }`}
                  >
                    <AnimatePresence mode='wait'>
                      {shift ? (
                        <motion.div
                          key="shift"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          whileHover={{ scale: 1.02 }}
                          className={`h-full p-2 rounded-lg border shadow-sm cursor-pointer flex flex-col justify-center gap-1 relative group/shift ${getShiftStyles(shift.type)}`}
                        >
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              onRemoveShift(res.id, j)
                            }}
                            className="absolute -top-1.5 -right-1.5 size-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/shift:opacity-100 transition-opacity shadow-md z-20"
                          >
                            <span className="material-symbols-outlined text-[14px]">close</span>
                          </button>
                          
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-bold">
                              {shift.start} - {shift.end}
                            </span>
                            {shift.type === 'admin' && <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>}
                            {shift.type === 'kitchen' && <span className="material-symbols-outlined text-[14px]">restaurant</span>}
                          </div>
                          <p className="text-[11px] opacity-90 font-medium truncate capitalize">{shift.type === 'work' ? 'Service' : shift.type}</p>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="empty"
                          className="h-full w-full opacity-0 group-hover/cell:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <button className="size-8 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 dark:text-slate-500 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

