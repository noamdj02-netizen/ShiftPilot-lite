import React from 'react'
import { Employee, Shift as UIShift } from '@/lib/types'

interface MobilePlanningListProps {
  days: { name: string; date: string; isToday: boolean }[]
  employees: Employee[]
  shiftsMap: Record<string, (UIShift | null)[]>
  getShiftStyles: (type: string) => string
  onRemoveShift: (empId: string, dayIndex: number) => void
}

export function MobilePlanningList({
  days,
  employees,
  shiftsMap,
  getShiftStyles,
  onRemoveShift
}: MobilePlanningListProps) {
  return (
    <div className="space-y-6 pb-20">
      {days.map((day, i) => (
        <div key={i} className={`space-y-3 ${day.isToday ? 'bg-accent/5 -mx-4 px-4 py-4' : ''}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-bold ${day.isToday ? 'text-accent' : 'text-slate-900 dark:text-white'}`}>
              {day.name} {day.date}
            </h3>
            {day.isToday && <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">Aujourd'hui</span>}
          </div>
          
          <div className="grid gap-3">
            {employees.map((res) => {
              const shift = shiftsMap[res.id]?.[i]
              if (!shift) return null
              return (
                <div key={res.id} className={`relative p-4 rounded-xl border shadow-sm ${getShiftStyles(shift.type)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`size-8 rounded-full ${res.color || 'bg-gray-500'} flex items-center justify-center text-white text-xs font-bold`}>
                        {res.initials || (res.first_name || '').substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium">{res.first_name} {res.last_name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs opacity-70 font-mono">
                        {shift.start} - {shift.end}
                      </span>
                      <button 
                        onClick={() => onRemoveShift(res.id, i)}
                        className="p-1 hover:bg-black/10 rounded-full transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pl-11">
                    <span className="text-sm font-medium capitalize">{shift.type === 'work' ? 'Service' : shift.type}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/20 uppercase tracking-wider font-bold">
                      {shift.type}
                    </span>
                  </div>
                </div>
              )
            })}
            {!employees.some(r => shiftsMap[r.id]?.[i]) && (
              <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl">
                Aucun shift prévu
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

