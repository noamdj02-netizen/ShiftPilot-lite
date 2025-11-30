'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { usePlanning } from '@/hooks/usePlanning'
import { PlanningHeader } from '@/components/planning/PlanningHeader'
import { PlanningGrid } from '@/components/planning/PlanningGrid'
import { MobilePlanningList } from '@/components/planning/MobilePlanningList'

export default function PlanningPage() {
  const { restaurant, isLoading: isAuthLoading } = useAuth()
  const [isMobile, setIsMobile] = useState(false)
  
  const {
    currentDate,
    setCurrentDate,
    currentView,
    setCurrentView,
    isGenerating,
    startOfWeek,
    shiftsMap,
    employees,
    isLoading: isDataLoading,
    handleAutoPlan,
    handleRemoveShift,
    calculateHours,
    getShiftStyles,
    days
  } = usePlanning()

  // Responsive check
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
  }, [currentView, setCurrentView])

  const isLoading = isAuthLoading || isDataLoading

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
      <PlanningHeader
        currentDate={currentDate}
        currentView={currentView}
        startOfWeek={startOfWeek}
        isGenerating={isGenerating}
        onDateChange={setCurrentDate}
        onViewChange={setCurrentView}
        onAutoPlan={handleAutoPlan}
      />

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
            <MobilePlanningList
              days={days}
              employees={employees}
              shiftsMap={shiftsMap}
              getShiftStyles={getShiftStyles}
              onRemoveShift={handleRemoveShift}
            />
          </div>
        ) : (
          <PlanningGrid
            days={days}
            employees={employees}
            shiftsMap={shiftsMap}
            calculateHours={calculateHours}
            getShiftStyles={getShiftStyles}
            onRemoveShift={handleRemoveShift}
          />
        )}
      </div>
    </div>
  )
}
