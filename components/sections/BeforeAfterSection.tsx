'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * BeforeAfterSection - Optimisé pour responsive mobile/desktop
 * Comparaison visuelle avant/après avec mockups adaptatifs
 */
export function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState<'employeur' | 'employe'>('employeur')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const beforeContent = {
    employeur: {
      title: "Avant : Excel et fichiers dispersés",
      description: "3 heures par semaine à créer des plannings, vérifier la conformité manuellement, gérer les échanges par SMS...",
      items: [
        "Planning créé manuellement dans Excel",
        "Vérification de conformité à la main",
        "Échanges de shifts par SMS/WhatsApp",
        "Pas de vue d'ensemble multi-sites",
        "Risque d'erreurs et de non-conformité",
      ],
      mockup: (
        <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-3 border-2 border-dashed border-red-300 dark:border-red-800/50 shadow-inner">
          <div className="bg-white dark:bg-slate-950 rounded border border-slate-300 dark:border-slate-800 overflow-hidden">
            {/* Excel Header */}
            <div className="bg-slate-200 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 px-2 py-1.5 flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-[10px] font-mono text-slate-600 dark:text-slate-400">Planning_Semaine_15.xlsx</div>
            </div>
            
            {/* Excel Grid */}
            <div className="p-2">
              <div className="grid grid-cols-8 gap-px bg-slate-300 dark:bg-slate-700 text-[9px]">
                {/* Header Row */}
                <div className="bg-slate-300 dark:bg-slate-700 p-1 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-400 dark:border-slate-600"></div>
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => (
                  <div
                    key={i}
                    className="bg-slate-300 dark:bg-slate-700 p-1 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-400 dark:border-slate-600 text-center"
                  >
                    {day}
                  </div>
                ))}

                {/* Data Rows - deterministic (pas de Math.random pour éviter les erreurs d'hydratation) */}
                {['Marie', 'Jean', 'Sophie', 'Pierre'].map((name, row) => {
                  const rowShifts = [
                    ['9h-17h', '', '', '14h-22h', '', '', ''],         // Marie
                    ['', '9h-17h', '', '', '14h-22h', '', ''],         // Jean
                    ['', '', '9h-17h', '', '', '14h-22h', ''],         // Sophie
                    ['', '', '', '9h-17h', '', '', '10h-18h'],         // Pierre
                  ][row] || Array(7).fill('')

                  return (
                    <React.Fragment key={`row-${row}`}>
                      <div className="bg-slate-200 dark:bg-slate-800 p-1 text-slate-600 dark:text-slate-400 border-r border-slate-400 dark:border-slate-600 font-medium">
                        {name}
                      </div>
                      {rowShifts.map((time, col) => {
                        const isFilled = time !== ''
                        return (
                          <div
                            key={`cell-${row}-${col}`}
                            className={`p-1 border-r border-slate-400 dark:border-slate-600 ${
                              isFilled
                                ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                                : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-500'
                            }`}
                          >
                            {time}
                          </div>
                        )
                      })}
                    </React.Fragment>
                  )
                })}
              </div>

              {/* Error Messages */}
              <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded">
                <div className="text-[9px] text-red-600 dark:text-red-400 font-medium mb-1">⚠️ Erreurs détectées:</div>
                <div className="text-[8px] text-red-500 dark:text-red-500 space-y-0.5">
                  <div>• Conflit d'horaires: Marie/Pierre (Mer 14h)</div>
                  <div>• Heures max dépassées: Jean (45h/sem)</div>
                  <div>• Repos non respecté: Sophie</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    employe: {
      title: "Avant : Planning reçu par SMS",
      description: "Planning reçu tardivement, difficile à consulter, pas de visibilité sur les disponibilités des collègues...",
      items: [
        "Planning reçu par SMS le dimanche soir",
        "Format difficile à lire",
        "Pas de visibilité sur les shifts disponibles",
        "Échanges compliqués avec les collègues",
        "Pas d'historique des plannings",
      ],
      mockup: (
        <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-3 border-2 border-dashed border-red-300 dark:border-red-800/50 shadow-inner">
          <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-300 dark:border-slate-800 overflow-hidden">
            {/* Phone Header */}
            <div className="bg-slate-200 dark:bg-slate-800 px-3 py-2 flex items-center justify-between border-b border-slate-300 dark:border-slate-700">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">📱 Messages</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">12:34</div>
            </div>
            
            {/* SMS Messages */}
            <div className="p-3 space-y-3 bg-slate-50 dark:bg-slate-900">
              {/* Incoming SMS */}
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div className="flex-1">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-2 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="text-[10px] text-slate-600 dark:text-slate-400 mb-1">Patron • Dim 20:15</div>
                    <div className="text-xs text-slate-900 dark:text-white leading-relaxed">
                      Planning semaine prochaine:<br/>
                      Lun 9h-17h, Mer 14h-22h,<br/>
                      Ven 10h-18h. OK?
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Outgoing SMS */}
              <div className="flex gap-2 justify-end">
                <div className="flex-1 flex justify-end">
                  <div className="bg-blue-500 rounded-lg p-2 max-w-[80%] shadow-sm">
                    <div className="text-xs text-white leading-relaxed">
                      OK merci! Je peux échanger le mercredi avec Sophie?
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
              </div>
              
              {/* Another Incoming */}
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center">
                  <span className="text-xs">👤</span>
                </div>
                <div className="flex-1">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-2 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="text-[10px] text-slate-600 dark:text-slate-400 mb-1">Patron • Dim 20:18</div>
                    <div className="text-xs text-slate-900 dark:text-white leading-relaxed">
                      Je vérifie et je te dis...
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Error/Confusion */}
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded p-2">
                <div className="text-[9px] text-red-600 dark:text-red-400 font-medium">⚠️ Pas de réponse depuis 2 jours</div>
                <div className="text-[8px] text-red-500 dark:text-red-500 mt-1">Planning toujours incertain</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  }

  const afterContent = {
    employeur: {
      title: "Après : Dashboard unifié ShiftPilot",
      description: "Planification automatisée, conformité garantie, vue multi-sites en temps réel, économie de 10h/semaine.",
      items: [
        "Planning généré automatiquement par IA",
        "Conformité légale vérifiée en temps réel",
        "Vue d'ensemble multi-sites centralisée",
        "Alertes proactives sur les risques",
        "Export automatique vers la paie",
      ],
      mockup: (
        <div className="bg-white dark:bg-[#0D1B2A] rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">grid_view</span>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">ShiftPilot Dashboard</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Semaine 15 - 3 sites actifs</div>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xs">check</span>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: 'Employés', val: '24', delta: '+3', icon: 'group', color: 'blue' },
              { label: 'Heures', val: '420h', delta: '+5%', icon: 'schedule', color: 'green' },
              { label: 'Conformité', val: '100%', delta: '✓', icon: 'verified', color: 'emerald' },
              { label: 'Coûts', val: '8.2k€', delta: '-12%', icon: 'euro', color: 'purple' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className={`material-symbols-outlined text-${stat.color}-500 text-xs`}>{stat.icon}</span>
                  <div className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                </div>
                <div className="text-base font-bold text-slate-900 dark:text-white mb-0.5">{stat.val}</div>
                <div className="text-[9px] text-green-600 dark:text-green-400 font-medium">{stat.delta}</div>
              </div>
            ))}
          </div>

          {/* Planning Grid */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 mb-4 border border-slate-200 dark:border-slate-800 overflow-x-auto">
            <div className="text-xs font-semibold text-slate-900 dark:text-white mb-2">Planning de la semaine</div>
            <div className="min-w-[500px]">
              <div className="grid grid-cols-[90px_repeat(7,1fr)] gap-1 text-[9px]">
                {/* Header */}
                <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-slate-600 dark:text-slate-400 text-left text-[9px]">Employé</div>
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, idx) => (
                  <div key={day} className="p-1 bg-slate-100 dark:bg-slate-800 rounded text-center font-semibold text-slate-600 dark:text-slate-400">
                    <div className="text-[9px]">{day}</div>
                    <div className="text-[8px] text-slate-500 dark:text-slate-500">
                      {[52, 64, 58, 68, 62, 72, 66][idx]}h
                    </div>
                  </div>
                ))}

                {/* Employee Rows */}
                {[
                  { name: 'Marie D.', role: 'Serveuse', shifts: [
                    { day: 0, time: '9h-17h', type: 'service' },
                    { day: 2, time: '14h-22h', type: 'service' },
                    { day: 4, time: '10h-18h', type: 'service' },
                  ]},
                  { name: 'Jean P.', role: 'Cuisinier', shifts: [
                    { day: 0, time: '10h-18h', type: 'kitchen' },
                    { day: 1, time: '10h-18h', type: 'kitchen' },
                    { day: 3, time: '10h-18h', type: 'kitchen' },
                    { day: 5, time: '12h-20h', type: 'kitchen' },
                  ]},
                  { name: 'Sophie M.', role: 'Manager', shifts: [
                    { day: 1, time: '11h-19h', type: 'admin' },
                    { day: 3, time: '11h-19h', type: 'admin' },
                    { day: 5, time: '12h-22h', type: 'admin' },
                  ]},
                ].map((emp, i) => (
                  <React.Fragment key={i}>
                    <div className="p-1 flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-[7px] font-bold text-blue-600 dark:text-blue-400">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-slate-900 dark:text-white text-[9px] truncate">{emp.name.split(' ')[0]}</div>
                        <div className="text-[8px] text-slate-500 dark:text-slate-400 truncate">{emp.role}</div>
                      </div>
                    </div>
                    {Array.from({ length: 7 }).map((_, dayIdx) => {
                      const shift = emp.shifts.find(s => s.day === dayIdx)
                      const getShiftColor = (type: string) => {
                        switch (type) {
                          case 'admin': return 'bg-purple-500/20 border-purple-500/50 text-purple-700 dark:text-purple-300'
                          case 'kitchen': return 'bg-orange-500/20 border-orange-500/50 text-orange-700 dark:text-orange-300'
                          default: return 'bg-blue-500/20 border-blue-500/50 text-blue-700 dark:text-blue-300'
                        }
                      }
                      return (
                        <div key={dayIdx} className="p-0.5 min-h-[32px]">
                          {shift ? (
                            <div className={`h-full rounded border p-1 flex items-center justify-center ${getShiftColor(shift.type)}`}>
                              <div className="text-[8px] font-bold leading-tight">{shift.time}</div>
                            </div>
                          ) : (
                            <div className="h-full w-full"></div>
                          )}
                        </div>
                      )
                    })}
                  </React.Fragment>
                ))}

                {/* Totals Row */}
                <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[9px] font-semibold text-slate-600 dark:text-slate-400 text-right">
                  TOTAL
                </div>
                {[52, 64, 58, 68, 62, 72, 66].map((hours, idx) => (
                  <div key={idx} className="p-1 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[9px] text-center text-slate-600 dark:text-slate-400">
                    <div className="font-semibold">{hours}h</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-slate-500 dark:text-slate-400">Total semaine:</span>
                <span className="font-semibold text-slate-900 dark:text-white">442h planifiées</span>
              </div>
            </div>
          </div>

          {/* Planning Preview */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-semibold text-slate-900 dark:text-white">Planning d'aujourd'hui</div>
              <div className="text-[9px] text-green-600 dark:text-green-400 font-medium">✓ Conforme</div>
            </div>
            <div className="space-y-1.5">
              {[
                { name: 'Marie D.', time: '09:00 - 17:00', role: 'Serveuse', status: 'confirmed' },
                { name: 'Jean P.', time: '10:00 - 18:00', role: 'Cuisinier', status: 'confirmed' },
                { name: 'Sophie M.', time: '11:00 - 19:00', role: 'Manager', status: 'confirmed' },
              ].map((shift, i) => (
                <div key={i} className="flex items-center gap-2 p-1.5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-blue-600 dark:text-blue-400">{shift.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-medium text-slate-900 dark:text-white">{shift.name}</div>
                    <div className="text-[9px] text-slate-500 dark:text-slate-400">{shift.time} • {shift.role}</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    employe: {
      title: "Après : Application mobile intuitive",
      description: "Planning consultable 24/7, échanges de shifts en un clic, notifications en temps réel, tout au même endroit.",
      items: [
        "Planning consultable sur mobile/web",
        "Échanges de shifts en un clic",
        "Notifications push en temps réel",
        "Historique complet des plannings",
        "Demande de congés intégrée",
      ],
      mockup: (
        <div className="bg-white dark:bg-[#0D1B2A] rounded-xl p-3 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-sm mx-auto">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-sm">grid_view</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">ShiftPilot</div>
            </div>
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xs">notifications</span>
            </div>
          </div>

          {/* Week Selector */}
          <div className="flex items-center justify-between mb-4 p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
            <button className="p-1">
              <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-sm">chevron_left</span>
            </button>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">Semaine 15</div>
            <button className="p-1">
              <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-sm">chevron_right</span>
            </button>
          </div>

          {/* Today's Shifts */}
          <div className="mb-4">
            <div className="text-xs font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500 text-sm">today</span>
              Aujourd'hui
            </div>
            <div className="space-y-2">
              {[
                { time: '09:00 - 17:00', role: 'Serveuse', location: 'Restaurant Centre', status: 'confirmed' },
                { time: '18:00 - 22:00', role: 'Manager', location: 'Restaurant Centre', status: 'confirmed' },
              ].map((shift, i) => (
                <div key={i} className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{shift.time}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">{shift.role}</div>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-xs">check</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-xs">location_on</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{shift.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 border border-slate-200 dark:border-slate-800 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-blue-500 text-sm">swap_horiz</span>
              <span className="text-xs font-medium text-slate-900 dark:text-white">Échanger</span>
            </button>
            <button className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 border border-slate-200 dark:border-slate-800 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-purple-500 text-sm">event_busy</span>
              <span className="text-xs font-medium text-slate-900 dark:text-white">Congés</span>
            </button>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-3 text-white">
            <div className="text-[10px] text-blue-100 mb-1">Cette semaine</div>
            <div className="text-lg font-bold mb-1">24h planifiées</div>
            <div className="text-[10px] text-blue-100">3 shifts • 2 sites</div>
          </div>
        </div>
      ),
    },
  }

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white dark:bg-[#000000] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-white/5 rounded-full text-xs font-semibold tracking-wider uppercase text-black/60 dark:text-white/60 mb-6 border border-black/5 dark:border-white/10">
            <span className="material-symbols-outlined text-base">compare_arrows</span>
            Transformation
          </span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black dark:text-white tracking-tight mb-4">
            Avant. Après. <span className="text-black/40 dark:text-white/40">ShiftPilot.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto leading-relaxed">
            Découvrez la différence entre l'ancien système et ShiftPilot Enterprise
          </p>
        </motion.div>

        {/* Tabs - Full-width sur mobile */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex w-full sm:w-auto bg-slate-100 dark:bg-surface-dark rounded-lg p-1 border border-steel-dark/30">
            <button
              onClick={() => setActiveTab('employeur')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-md text-sm sm:text-base font-medium transition-all min-h-[48px] touch-manipulation flex items-center justify-center gap-2 ${
                activeTab === 'employeur'
                  ? 'bg-white dark:bg-background-dark text-accent shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 active:text-slate-900 dark:active:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-base sm:text-lg">business</span>
              <span>Vue Employeur</span>
            </button>
            <button
              onClick={() => setActiveTab('employe')}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-3 rounded-md text-sm sm:text-base font-medium transition-all min-h-[48px] touch-manipulation flex items-center justify-center gap-2 ${
                activeTab === 'employe'
                  ? 'bg-white dark:bg-background-dark text-accent shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 active:text-slate-900 dark:active:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-base sm:text-lg">person</span>
              <span>Vue Employé</span>
            </button>
          </div>
        </div>

        {/* Before/After Grid - Layout mobile optimisé */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-xs font-semibold">
                  AVANT
                </span>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  {beforeContent[activeTab].title}
                </h3>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-black/60 dark:text-white/60 mb-4">
                {beforeContent[activeTab].description}
              </p>
              <ul className="space-y-2">
                {beforeContent[activeTab].items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm sm:text-base md:text-lg text-black/70 dark:text-white/70">
                    <span className="material-symbols-outlined text-red-500 text-lg">close</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Mockups optimisés pour mobile */}
            <div className="mt-6 max-w-full">
              <div className="max-w-full h-auto max-h-[400px] object-contain overflow-hidden">
                {beforeContent[activeTab].mockup}
              </div>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-success/20 text-success rounded-full text-xs font-semibold">
                  APRÈS
                </span>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  {afterContent[activeTab].title}
                </h3>
              </div>
              <p className="text-black/60 dark:text-white/60 mb-4">
                {afterContent[activeTab].description}
              </p>
              <ul className="space-y-2">
                {afterContent[activeTab].items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-black/70 dark:text-white/70">
                    <span className="material-symbols-outlined text-success text-lg">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Mockups optimisés pour mobile */}
            <div className="mt-6 max-w-full">
              <div className="max-w-full h-auto max-h-[400px] object-contain overflow-hidden">
                {afterContent[activeTab].mockup}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Temps économisé", value: "10h/semaine", icon: "schedule" },
            { label: "Conformité", value: "100%", icon: "verified" },
            { label: "Satisfaction", value: "98%", icon: "favorite" },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-steel-dark/30 text-center">
              <span className="material-symbols-outlined text-3xl text-accent mb-3">{stat.icon}</span>
              <div className="text-3xl font-bold text-black dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-black/60 dark:text-white/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

