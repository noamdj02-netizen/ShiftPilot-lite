import React from 'react'

interface PlanningHeaderProps {
  currentDate: Date
  currentView: 'day' | 'week' | 'month'
  startOfWeek: Date
  isGenerating: boolean
  onDateChange: (newDate: Date) => void
  onViewChange: (view: 'day' | 'week' | 'month') => void
  onAutoPlan: () => void
}

export function PlanningHeader({
  currentDate,
  currentView,
  startOfWeek,
  isGenerating,
  onDateChange,
  onViewChange,
  onAutoPlan
}: PlanningHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#1C1C1E] p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
      <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
        <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-lg p-1 shrink-0">
          <button 
            onClick={() => {
              const newDate = new Date(currentDate)
              newDate.setDate(newDate.getDate() - 7)
              onDateChange(newDate)
            }}
            className="p-1.5 hover:bg-white dark:hover:bg-white/10 rounded-md transition-colors text-slate-500 dark:text-slate-400"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <span className="px-2 md:px-3 py-1 text-xs md:text-sm font-semibold text-slate-900 dark:text-white whitespace-nowrap capitalize">
            Sem. {startOfWeek.getDate()} {new Intl.DateTimeFormat('fr-FR', { month: 'short' }).format(startOfWeek)}
          </span>
          <button 
            onClick={() => {
              const newDate = new Date(currentDate)
              newDate.setDate(newDate.getDate() + 7)
              onDateChange(newDate)
            }}
            className="p-1.5 hover:bg-white dark:hover:bg-white/10 rounded-md transition-colors text-slate-500 dark:text-slate-400"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
        
        <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-white/10 shrink-0" />
        
        <div className="flex bg-slate-100 dark:bg-white/5 rounded-lg p-1 shrink-0">
          {['Jour', 'Semaine', 'Mois'].map((view) => (
            <button
              key={view}
              onClick={() => onViewChange(view === 'Semaine' ? 'week' : view === 'Jour' ? 'day' : 'month')}
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

      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
        <button 
          onClick={onAutoPlan}
          disabled={isGenerating}
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-accent border border-accent/20 rounded-lg hover:bg-accent/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 md:flex-none justify-center"
        >
          {isGenerating ? (
            <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
          ) : (
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          )}
          <span>{isGenerating ? 'Calcul...' : 'Auto-planning'}</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg text-xs font-medium hover:opacity-90 transition-opacity shadow-sm flex-1 md:flex-none justify-center">
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Nouveau</span>
        </button>
      </div>
    </div>
  )
}

