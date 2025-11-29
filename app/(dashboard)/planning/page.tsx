'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Employee, Shift } from '@/lib/types'
import { toast } from 'sonner'
import { shiftService, employeeService } from '@/lib/services'
import { useAuth } from '@/hooks/useAuth'
import { generateSmartPlanning } from '@/utils/planning-ai'

// Helper to format dates for display
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' }).format(date)
}

export default function PlanningPage() {
  const { restaurant } = useAuth()
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('week')
  const [isMobile, setIsMobile] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Real Data State
  const [employees, setEmployees] = useState<Employee[]>([])
  const [shifts, setShifts] = useState<Record<string, (Shift | null)[]>>({})
  const [currentDate, setCurrentDate] = useState(new Date())

  // Fetch Data
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024 && currentView === 'month') {
        setCurrentView('week')
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [currentView])

  useEffect(() => {
    if (!restaurant?.id) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        // 1. Get Employees
        const emps = await employeeService.getEmployees(restaurant.id)
        setEmployees(emps as any) // Casting for now as types align closely

        // 2. Get Shifts for the week
        const startOfWeek = getStartOfWeek(currentDate)
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(endOfWeek.getDate() + 7)

        const shiftsData = await shiftService.getShifts(restaurant.id, startOfWeek, endOfWeek)
        
        // Transform shifts into the grid format expected by UI
        const shiftsMap: Record<string, (Shift | null)[]> = {}
        
        // Initialize empty week for everyone
        emps.forEach((emp: any) => {
          shiftsMap[emp.id] = Array(7).fill(null)
        })

        // Populate with actual shifts
        shiftsData?.forEach((shift: any) => {
          const shiftDate = new Date(shift.start_time)
          // Simple day index calculation (0=Monday, 6=Sunday) - Adjust based on your locale/logic
          let dayIndex = shiftDate.getDay() - 1
          if (dayIndex === -1) dayIndex = 6 

          if (shiftsMap[shift.employee_id]) {
            shiftsMap[shift.employee_id][dayIndex] = {
              id: shift.id,
              start: new Date(shift.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              end: new Date(shift.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              type: shift.role === 'Cuisinier' ? 'kitchen' : shift.role === 'Manager' ? 'admin' : 'work', // Simple mapping
              label: shift.notes || 'Service'
            }
          }
        })

        setShifts(shiftsMap)

      } catch (error) {
        console.error('Error loading planning:', error)
        toast.error('Impossible de charger le planning')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [restaurant?.id, currentDate])

  const getStartOfWeek = (date: Date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
  }

  const handleAutoPlan = async () => {
    setIsGenerating(true)
    try {
      // 1. Generate shifts locally
      // We need to cast existing shifts to Record<string, Shift[]> where nulls are handled or filtered
      // The utility expects Shift[], but our state has (Shift | null)[]
      // We'll map nulls to something or filter them out for the utility if needed, 
      // but actually the utility fills nulls. 
      // Let's cast force it for now as the utility structure matches
      
      const startOfWeek = getStartOfWeek(currentDate)
      
      // Clean input for AI: Replace nulls with empty logic or let AI handle it
      // The AI util expects Record<string, Shift[]> but our state is (Shift|null)[]
      // We will need to adapt the AI util or cast here.
      // Let's assume AI util handles the array index mapping
      
      const newPlanning = await generateSmartPlanning(
         employees, 
         shifts as any, // Casting to satisfy TS, util needs to be robust
         startOfWeek
      )

      // 2. Update State
      setShifts(newPlanning)
      toast.success('Planning généré avec succès !')
      
      // 3. Persist to DB (Optional / Background)
      // This is complex because we need to convert UI time strings "09:00" back to Date objects for the current week
      // And create DB records.
      // For this demo step, we just show the UI update.
      toast.info('Sauvegarde automatique en cours...')
      
      // Simple persistence loop (best effort)
      Object.entries(newPlanning).forEach(([empId, empShifts]) => {
        empShifts.forEach(async (shift, dayIndex) => {
           // If it's a new shift (no ID) and exists
           if (shift && !shift.id) {
             const shiftDate = new Date(startOfWeek)
             shiftDate.setDate(shiftDate.getDate() + dayIndex)
             
             const startTime = new Date(shiftDate)
             const [sh, sm] = shift.start.split(':').map(Number)
             startTime.setHours(sh, sm)
             
             const endTime = new Date(shiftDate)
             const [eh, em] = shift.end.split(':').map(Number)
             endTime.setHours(eh, em)
             if (endTime < startTime) endTime.setDate(endTime.getDate() + 1) // Next day

             try {
               const savedShift: any = await shiftService.createShift({
                 restaurant_id: restaurant?.id,
                 employee_id: empId,
                 start_time: startTime.toISOString(),
                 end_time: endTime.toISOString(),
                 type: shift.type,
                 notes: 'Auto-généré'
               })
               // Update state with real ID to prevent duplicate saves
               if (savedShift) {
                 shift.id = savedShift.id
               }
             } catch (err) {
               console.error('Failed to save auto shift', err)
             }
           }
        })
      })

    } catch (error) {
      console.error('Auto planning error:', error)
      toast.error('Erreur lors de la génération')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRemoveShift = async (empId: string, dayIndex: number) => {
    const shiftToRemove = shifts[empId][dayIndex]
    if (!shiftToRemove) return // Already empty

    // Optimistic update
    setShifts(prev => {
      const newShifts = { ...prev }
      if (newShifts[empId]) {
        const updatedEmployeeShifts = [...newShifts[empId]]
        updatedEmployeeShifts[dayIndex] = null
        newShifts[empId] = updatedEmployeeShifts
      }
      return newShifts
    })

    if (shiftToRemove.id) {
      try {
        await shiftService.deleteShift(shiftToRemove.id)
        toast.success('Shift supprimé')
      } catch (error) {
        toast.error('Erreur lors de la suppression')
        // Revert could be here
      }
    }
  }

  // Generate days for header
  const startOfWeek = getStartOfWeek(currentDate)
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek)
    d.setDate(d.getDate() + i)
    return {
      name: new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(d),
      date: d.getDate().toString(),
      isToday: d.toDateString() === new Date().toDateString()
    }
  })

  const getShiftStyles = (type: string) => {
    switch (type) {
      case 'admin':
        return 'bg-purple-100 border-purple-200 text-purple-700 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-300'
      case 'kitchen':
        return 'bg-red-100 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300'
      default:
        return 'bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300'
    }
  }

  // Calculate weekly hours
  const calculateHours = (empShifts: (Shift | null)[]) => {
    if (!empShifts) return 0
    return empShifts.reduce((acc, shift) => {
      if (!shift) return acc
      const start = parseInt(shift.start.split(':')[0])
      const end = parseInt(shift.end.split(':')[0])
      const duration = end < start ? (24 - start + end) : (end - start)
      return acc + duration
    }, 0)
  }

  const MobilePlanningView = () => (
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
              const shift = shifts[res.id]?.[i]
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
                        onClick={() => handleRemoveShift(res.id, i)}
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
            {!employees.some(r => shifts[r.id]?.[i]) && (
              <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl">
                Aucun shift prévu
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Chargement du planning...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      {/* Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#1C1C1E] p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-lg p-1">
            <button 
              onClick={() => {
                const newDate = new Date(currentDate)
                newDate.setDate(newDate.getDate() - 7)
                setCurrentDate(newDate)
              }}
              className="p-1.5 hover:bg-white dark:hover:bg-white/10 rounded-md transition-colors text-slate-500 dark:text-slate-400"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <span className="px-3 py-1 text-sm font-semibold text-slate-900 dark:text-white whitespace-nowrap capitalize">
              Semaine du {startOfWeek.getDate()} {new Intl.DateTimeFormat('fr-FR', { month: 'short' }).format(startOfWeek)}
            </span>
            <button 
              onClick={() => {
                const newDate = new Date(currentDate)
                newDate.setDate(newDate.getDate() + 7)
                setCurrentDate(newDate)
              }}
              className="p-1.5 hover:bg-white dark:hover:bg-white/10 rounded-md transition-colors text-slate-500 dark:text-slate-400"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
          
          <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-white/10" />
          
          <div className="hidden md:flex bg-slate-100 dark:bg-white/5 rounded-lg p-1">
            {['Jour', 'Semaine', 'Mois'].map((view) => (
              <button
                key={view}
                onClick={() => setCurrentView(view === 'Semaine' ? 'week' : view === 'Jour' ? 'day' : 'month')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  (view === 'Semaine' && currentView === 'week') || 
                  (view === 'Jour' && currentView === 'day') || 
                  (view === 'Mois' && currentView === 'month')
                    ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleAutoPlan}
            disabled={isGenerating}
            className="hidden md:flex items-center gap-2 px-3 py-2 text-xs font-medium text-accent border border-accent/20 rounded-lg hover:bg-accent/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
            ) : (
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            )}
            <span>{isGenerating ? 'Calcul en cours...' : 'Auto-planning IA'}</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg text-xs font-medium hover:opacity-90 transition-opacity shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Nouveau Shift</span>
          </button>
        </div>
      </div>

      {/* Planning Grid / List */}
      <div className="flex-1 bg-white dark:bg-[#1C1C1E] rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden flex flex-col">
        {isMobile ? (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4 flex justify-end">
              <button 
                onClick={handleAutoPlan}
                disabled={isGenerating}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-accent border border-accent/20 rounded-lg hover:bg-accent/5 transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">{isGenerating ? 'refresh' : 'auto_awesome'}</span>
                <span>{isGenerating ? '...' : 'IA'}</span>
              </button>
            </div>
            <MobilePlanningView />
          </div>
        ) : (
          <>
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
            <div className="flex-1 overflow-y-auto">
              {employees.length === 0 && (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                  Aucun employé trouvé. Commencez par ajouter des membres à votre équipe.
                </div>
              )}
              {employees.map((res, i) => {
                const empShifts = shifts[res.id] || Array(7).fill(null)
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
                                  handleRemoveShift(res.id, j)
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
          </>
        )}
      </div>
    </div>
  )
}
