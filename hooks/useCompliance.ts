import { useState, useMemo } from 'react'
import { useEmployees } from '@/hooks/useEmployees'
import { useShifts } from '@/hooks/useShifts'
import { startOfWeek, endOfWeek } from 'date-fns'

export function useCompliance(initialDate: Date = new Date()) {
  const [currentDate, setCurrentDate] = useState(initialDate)
  
  const weekStart = useMemo(() => startOfWeek(currentDate, { weekStartsOn: 1 }), [currentDate])
  const weekEnd = useMemo(() => endOfWeek(currentDate, { weekStartsOn: 1 }), [currentDate])

  const { employees, isLoading: empLoading } = useEmployees()
  const { shifts, isLoading: shiftsLoading } = useShifts(weekStart, weekEnd)

  const complianceData = useMemo(() => {
    if (!employees || !shifts) return []

    return employees.map(emp => {
      const empShifts = shifts.filter(s => s.employee_id === emp.id)
      
      // Rule 1: Total Hours
      const totalHours = empShifts.reduce((acc, s) => {
        const start = new Date(s.start_time)
        const end = new Date(s.end_time)
        return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60)
      }, 0)

      // Rule 2: Max consecutive days (simplified check for this week)
      const daysWorked = new Set(empShifts.map(s => new Date(s.start_time).toDateString())).size
      
      // Rule 3: Rest time (check if any shift ends < 11h before next start)
      const sortedShifts = [...empShifts].sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
      let restViolation = false
      for (let i = 0; i < sortedShifts.length - 1; i++) {
        const currentEnd = new Date(sortedShifts[i].end_time)
        const nextStart = new Date(sortedShifts[i+1].start_time)
        const diffHours = (nextStart.getTime() - currentEnd.getTime()) / (1000 * 60 * 60)
        if (diffHours < 11) restViolation = true
      }

      return {
        employee: emp,
        totalHours,
        daysWorked,
        restViolation,
        status: totalHours > 48 || restViolation || daysWorked > 6 ? 'danger' : totalHours > 40 ? 'warning' : 'success'
      }
    })
  }, [employees, shifts])

  const globalCompliance = useMemo(() => {
    if (complianceData.length === 0) return 100
    const compliant = complianceData.filter(c => c.status === 'success').length
    return Math.round((compliant / complianceData.length) * 100)
  }, [complianceData])

  return {
    currentDate,
    setCurrentDate,
    weekStart,
    weekEnd,
    complianceData,
    globalCompliance,
    isLoading: empLoading || shiftsLoading
  }
}

