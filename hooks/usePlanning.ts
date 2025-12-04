import { useState, useMemo, useEffect, useCallback } from 'react'
import { useEmployees } from '@/hooks/useEmployees'
import { useShifts } from '@/hooks/useShifts'
import { Shift as UIShift } from '@/lib/types'
import { generateSmartPlanning } from '@/utils/planning-ai'
import { toast } from 'sonner'

export function usePlanning(initialDate: Date = new Date()) {
  const [currentDate, setCurrentDate] = useState(initialDate)
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('week')
  const [isGenerating, setIsGenerating] = useState(false)
  const [shiftsMap, setShiftsMap] = useState<Record<string, (UIShift | null)[]>>({})

  // Calculate date range for shifts
  const startOfWeek = useMemo(() => {
    const d = new Date(currentDate)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    const newDate = new Date(d.setDate(diff))
    newDate.setHours(0, 0, 0, 0)
    return newDate
  }, [currentDate])

  const endOfWeek = useMemo(() => {
    const d = new Date(startOfWeek)
    d.setDate(d.getDate() + 7)
    return d
  }, [startOfWeek])

  // Use existing hooks
  const { employees, isLoading: isEmployeesLoading, error: employeesError } = useEmployees()
  const { shifts: rawShifts, isLoading: isShiftsLoading, error: shiftsError, createShift, deleteShift } = useShifts(startOfWeek, endOfWeek)
  
  // Add timeout to prevent infinite loading
  const [loadingTimeout, setLoadingTimeout] = useState(false)
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isEmployeesLoading || isShiftsLoading) {
        console.warn('[usePlanning] Loading timeout after 10s, forcing stop')
        setLoadingTimeout(true)
      }
    }, 10000) // 10 seconds timeout
    
    return () => clearTimeout(timeout)
  }, [isEmployeesLoading, isShiftsLoading])

  // Process shifts into grid format
  useEffect(() => {
    if (!employees || !rawShifts) return

    const newMap: Record<string, (UIShift | null)[]> = {}
    
    employees.forEach((emp) => {
      newMap[emp.id] = Array(7).fill(null)
    })

    rawShifts.forEach((shift: any) => {
      if (!shift.employee_id) return
      
      const shiftDate = new Date(shift.start_time)
      let dayIndex = shiftDate.getDay() - 1
      if (dayIndex === -1) dayIndex = 6 

      if (newMap[shift.employee_id] && dayIndex >= 0 && dayIndex < 7) {
        newMap[shift.employee_id][dayIndex] = {
          id: shift.id,
          start: new Date(shift.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          end: new Date(shift.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: shift.role === 'Cuisinier' ? 'kitchen' : shift.role === 'Manager' ? 'admin' : 'work',
          label: shift.notes || 'Service'
        }
      }
    })

    setShiftsMap(newMap)
  }, [employees, rawShifts, startOfWeek])

  const handleAutoPlan = async () => {
    setIsGenerating(true)
    try {
      // Vérifier que les employés sont disponibles
      if (!employees || employees.length === 0) {
        throw new Error('Aucun employé disponible. Veuillez d\'abord ajouter des employés.')
      }

      const newPlanning = await generateSmartPlanning(
         employees, 
         shiftsMap as any, 
         startOfWeek
      )
      
      setShiftsMap(newPlanning)
      toast.success('Planning généré avec succès !')
      
      // Persist generated shifts
      toast.info('Sauvegarde en cours...')
      let savedCount = 0
      let errorCount = 0
      
      for (const [empId, empShifts] of Object.entries(newPlanning)) {
        if (!empShifts || !Array.isArray(empShifts)) continue
        
        for (let dayIndex = 0; dayIndex < empShifts.length; dayIndex++) {
           const shift = empShifts[dayIndex]
           if (shift && !shift.id && shift.start && shift.end) {
             try {
               const shiftDate = new Date(startOfWeek)
               shiftDate.setDate(shiftDate.getDate() + dayIndex)
               
               const [sh, sm] = shift.start.split(':').map(Number)
               if (isNaN(sh) || isNaN(sm)) {
                 console.warn('Invalid start time:', shift.start)
                 continue
               }
               
               const startTime = new Date(shiftDate)
               startTime.setHours(sh, sm, 0, 0)
               
               const [eh, em] = shift.end.split(':').map(Number)
               if (isNaN(eh) || isNaN(em)) {
                 console.warn('Invalid end time:', shift.end)
                 continue
               }
               
               const endTime = new Date(shiftDate)
               endTime.setHours(eh, em, 0, 0)
               if (endTime < startTime) endTime.setDate(endTime.getDate() + 1)

               await createShift({
                 profile_id: empId,
                 employee_id: empId,
                 start_time: startTime.toISOString(),
                 end_time: endTime.toISOString(),
                 role: shift.type === 'kitchen' ? 'Cuisinier' : shift.type === 'admin' ? 'Manager' : 'Serveur',
                 notes: shift.label || `Service ${shift.start}-${shift.end}`
               })
               savedCount++
             } catch (err) {
               console.error('Failed to save auto shift', err)
               errorCount++
             }
           }
        }
      }
      
      if (errorCount > 0) {
        toast.warning(`${savedCount} shifts sauvegardés, ${errorCount} erreurs`)
      } else {
        toast.success(`${savedCount} shifts sauvegardés avec succès`)
      }

    } catch (error) {
      console.error('Auto planning error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
      toast.error(`Erreur lors de la génération: ${errorMessage}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRemoveShift = async (empId: string, dayIndex: number) => {
    const shiftToRemove = shiftsMap[empId]?.[dayIndex]
    if (!shiftToRemove) return

    // Optimistic update
    setShiftsMap(prev => {
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
        await deleteShift(shiftToRemove.id)
        toast.success('Shift supprimé')
      } catch (error) {
        toast.error('Erreur lors de la suppression')
        // Revert could be implemented here
      }
    }
  }

  const calculateHours = (empShifts: (UIShift | null)[]) => {
    if (!empShifts) return 0
    return empShifts.reduce((acc, shift) => {
      if (!shift) return acc
      const start = parseInt(shift.start.split(':')[0])
      const end = parseInt(shift.end.split(':')[0])
      const duration = end < start ? (24 - start + end) : (end - start)
      return acc + duration
    }, 0)
  }

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

  // Generate days for header
  const days = useMemo(() => Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek)
    d.setDate(d.getDate() + i)
    return {
      name: new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(d),
      date: d.getDate().toString(),
      isToday: d.toDateString() === new Date().toDateString()
    }
  }), [startOfWeek])

  // Combine loading states but don't stay loading forever
  const isLoading = (isEmployeesLoading || isShiftsLoading) && !loadingTimeout
  
  // Log errors for debugging
  useEffect(() => {
    if (employeesError) {
      console.error('[usePlanning] Employees error:', employeesError)
    }
    if (shiftsError) {
      console.error('[usePlanning] Shifts error:', shiftsError)
    }
  }, [employeesError, shiftsError])

  return {
    currentDate,
    setCurrentDate,
    currentView,
    setCurrentView,
    isGenerating,
    startOfWeek,
    shiftsMap,
    employees: employees || [],
    isLoading,
    error: employeesError || shiftsError || null,
    handleAutoPlan,
    handleRemoveShift,
    calculateHours,
    getShiftStyles,
    days
  }
}


