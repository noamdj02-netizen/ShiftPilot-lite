'use client'

export default function PlanningPage() {
  const days = [
    { name: 'Lundi', date: '15' },
    { name: 'Mardi', date: '16' },
    { name: 'Mercredi', date: '17' },
    { name: 'Jeudi', date: '18' },
    { name: 'Vendredi', date: '19' },
    { name: 'Samedi', date: '20' },
    { name: 'Dimanche', date: '21' },
  ]

  const resources = [
    {
      name: 'Alice Martin',
      role: 'Serveuse',
      shifts: [
        null,
        { start: '09:00', end: '17:00', type: 'work' },
        { start: '09:00', end: '17:00', type: 'work' },
        null,
        { start: '18:00', end: '23:00', type: 'work' },
        { start: '10:00', end: '16:00', type: 'work' },
        null,
      ],
    },
    {
      name: 'Ben Dubois',
      role: 'Manager',
      shifts: [
        { start: '10:00', end: '18:00', type: 'admin' },
        null,
        { start: '10:00', end: '18:00', type: 'work' },
        { start: '10:00', end: '18:00', type: 'work' },
        null,
        null,
        null,
      ],
    },
    {
      name: 'Chloe Laurent',
      role: 'Barista',
      shifts: [
        null,
        null,
        null,
        { start: '17:00', end: '01:00', type: 'work' },
        { start: '17:00', end: '01:00', type: 'work' },
        { start: '17:00', end: '01:00', type: 'work' },
        null,
      ],
    },
    {
      name: 'Marc Lefebvre',
      role: 'Cuisinier',
      shifts: [
        { start: '09:00', end: '15:00', type: 'kitchen' },
        { start: '09:00', end: '15:00', type: 'kitchen' },
        null,
        null,
        { start: '18:00', end: '23:00', type: 'kitchen' },
        null,
        { start: '10:00', end: '15:00', type: 'kitchen' },
      ],
    },
  ]

  const getShiftColor = (type: string) => {
    switch (type) {
      case 'admin':
        return 'bg-purple-500/20 border-purple-500/50 text-purple-200'
      case 'kitchen':
        return 'bg-orange-500/20 border-orange-500/50 text-orange-200'
      default:
        return 'bg-blue-500/20 border-blue-500/50 text-blue-200'
    }
  }

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      {/* Toolbar */}
      <div className="px-6 py-4 bg-white dark:bg-surface-dark border-b border-steel-dark/30 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 dark:bg-background-dark rounded p-1 border border-slate-200 dark:border-steel-dark/30">
            <button className="px-2 py-1 hover:bg-white/10 rounded">
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <span className="px-4 py-1 text-sm font-semibold">Semaine 29 (15 - 21 Juil)</span>
            <button className="px-2 py-1 hover:bg-white/10 rounded">
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
          <div className="h-6 w-px bg-steel-dark/30"></div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium bg-accent text-white rounded shadow-sm">
              Vue Semaine
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-white rounded hover:bg-white/5 transition">
              Jour
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-white rounded hover:bg-white/5 transition">
              Mois
            </button>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-accent/50 text-accent rounded hover:bg-accent/10 transition">
            <span className="material-symbols-outlined text-sm">magic_button</span> Auto-planification IA
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-white dark:bg-surface-dark border border-slate-200 dark:border-steel-dark/30 rounded hover:bg-slate-50 dark:hover:bg-white/5 transition">
            <span className="material-symbols-outlined text-sm">download</span> Exporter
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-white dark:bg-surface-dark border border-slate-200 dark:border-steel-dark/30 rounded hover:bg-slate-50 dark:hover:bg-white/5 transition">
            <span className="material-symbols-outlined text-sm">filter_list</span> Filtres
          </button>
        </div>
      </div>

      {/* Spreadsheet Header */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-[250px_repeat(7,1fr)] bg-slate-50 dark:bg-[#151e32] border-b border-steel-dark/30 sticky top-0 z-10">
            <div className="p-4 border-r border-steel-dark/30 font-semibold text-xs text-slate-500 uppercase tracking-wider flex items-end">
              Collaborateur
            </div>
            {days.map((day, i) => (
              <div
                key={i}
                className={`p-3 border-r border-steel-dark/30 text-center ${i === 6 ? 'border-r-0' : ''}`}
              >
                <p className="text-xs text-slate-500 uppercase font-medium">{day.name}</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{day.date}</p>
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-steel-dark/20 bg-white dark:bg-surface-dark">
            {resources.map((res, i) => (
              <div key={i} className="grid grid-cols-[250px_repeat(7,1fr)] hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                {/* Resource Cell */}
                <div className="p-4 border-r border-steel-dark/30 flex items-center gap-3">
                  <div className="size-8 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">
                    {res.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{res.name}</p>
                    <p className="text-xs text-slate-500">{res.role}</p>
                  </div>
                </div>

                {/* Days Cells */}
                {res.shifts.map((shift, j) => (
                  <div
                    key={j}
                    className={`p-2 border-r border-steel-dark/30 min-h-[80px] relative ${j === 6 ? 'border-r-0' : ''}`}
                  >
                    {shift ? (
                      <div
                        className={`h-full rounded border p-2 flex flex-col justify-center cursor-pointer hover:brightness-110 transition ${getShiftColor(
                          shift.type
                        )}`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-bold">
                            {shift.start} - {shift.end}
                          </span>
                          {shift.type === 'admin' && (
                            <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
                          )}
                        </div>
                        <p className="text-[10px] opacity-80 mt-1 capitalize">{shift.type}</p>
                      </div>
                    ) : (
                      <div className="h-full w-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button className="size-6 rounded flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400">
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Summary Row */}
            <div className="grid grid-cols-[250px_repeat(7,1fr)] bg-slate-50 dark:bg-[#0B1622] font-mono text-xs border-t border-steel-dark/30">
              <div className="p-3 border-r border-steel-dark/30 text-right font-medium text-slate-500">
                TOTAL HEURES
              </div>
              {[7, 8, 12, 14, 18, 5, 6].map((h, i) => (
                <div key={i} className="p-3 border-r border-steel-dark/30 text-center text-slate-400">
                  {h}h
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
