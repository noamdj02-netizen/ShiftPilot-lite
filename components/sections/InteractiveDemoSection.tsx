'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { demoEmployees, demoShifts, demoDailyTotals, demoKPIs } from '@/lib/demo-data'

type DemoView = 'dashboard' | 'planning' | 'employees'

export function InteractiveDemoSection() {
  const [activeView, setActiveView] = useState<DemoView>('dashboard')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const views = [
    {
      id: 'dashboard' as DemoView,
      label: 'Dashboard',
      icon: 'dashboard',
      description: 'Vue d\'ensemble avec KPIs, graphiques et alertes en temps réel',
    },
    {
      id: 'planning' as DemoView,
      label: 'Planning',
      icon: 'calendar_month',
      description: 'Planification visuelle type spreadsheet avec gestion des shifts',
    },
    {
      id: 'employees' as DemoView,
      label: 'Collaborateurs',
      icon: 'group',
      description: 'Gestion complète des équipes avec tableaux et filtres avancés',
    },
  ]

  const renderDashboardMockup = () => (
    <div className="bg-white dark:bg-surface-dark rounded-xl border border-steel-dark/30 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-[#151e32] border-b border-steel-dark/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tableau de bord</h3>
          <div className="h-6 w-px bg-steel-dark/30"></div>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-background-dark px-3 py-1.5 rounded text-sm">
            <span className="material-symbols-outlined text-base">store</span>
            <span className="text-slate-600 dark:text-slate-300">Paris - Le Marais</span>
          </div>
        </div>
        <div className="size-8 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
          JD
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'CA Aujourd\'hui', val: demoKPIs.ca.value, delta: demoKPIs.ca.delta, sub: demoKPIs.ca.sub },
            { label: 'Couverts', val: demoKPIs.couverts.value, delta: demoKPIs.couverts.delta, sub: `Objectif: ${demoKPIs.couverts.target}` },
            { label: 'Factures', val: demoKPIs.factures.value, delta: demoKPIs.factures.delta, sub: `Panier: ${demoKPIs.factures.panierMoyen}` },
            { label: 'Productivité', val: demoKPIs.productivite.value, delta: demoKPIs.productivite.delta, sub: demoKPIs.productivite.sub },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-50 dark:bg-background-dark p-4 rounded-lg border border-steel-dark/30">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{stat.label}</div>
              <div className="text-xl font-bold text-slate-900 dark:text-white">{stat.val}</div>
              <div className="text-xs text-success mt-1">{stat.delta}</div>
              {stat.sub && <div className="text-[10px] text-slate-400 mt-0.5">{stat.sub}</div>}
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-background-dark rounded-lg p-4 border border-steel-dark/30">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Couverts par heure</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { time: '08:00', value: 8, predicted: 10 },
                    { time: '12:00', value: 45, predicted: 42 },
                    { time: '14:00', value: 32, predicted: 35 },
                    { time: '18:00', value: 52, predicted: 48 },
                    { time: '20:00', value: 38, predicted: 40 },
                  ]}
                  margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1B263B',
                      borderColor: '#415A77',
                      borderRadius: '4px',
                      fontSize: '10px',
                    }}
                  />
                  <Area
                    name="Réel"
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fill="#3B82F6"
                    fillOpacity={0.3}
                  />
                  <Area
                    name="IA"
                    type="monotone"
                    dataKey="predicted"
                    stroke="#6C63FF"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-background-dark rounded-lg p-4 border border-steel-dark/30">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">CA Hebdo</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { day: 'Lun', actual: 4200 },
                    { day: 'Mar', actual: 3800 },
                    { day: 'Mer', actual: 4500 },
                    { day: 'Jeu', actual: 4800 },
                    { day: 'Ven', actual: 6200 },
                    { day: 'Sam', actual: 6800 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1B263B',
                      borderColor: '#415A77',
                      borderRadius: '4px',
                      fontSize: '10px',
                    }}
                    formatter={(value: number) => [`${value}€`, '']}
                  />
                  <Bar dataKey="actual" fill="#3B82F6" radius={[2, 2, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Employees Active Today */}
        <div className="bg-slate-50 dark:bg-background-dark rounded-lg p-4 border border-steel-dark/30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Employés actifs aujourd'hui</h4>
            <span className="text-xs text-slate-500">{demoEmployees.filter(e => e.status === 'En shift').length}/{demoEmployees.length}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {demoEmployees.filter(e => e.status === 'En shift' || e.status === 'Actif').slice(0, 4).map((emp) => (
              <div key={emp.id} className="flex items-center gap-2 p-2 bg-white dark:bg-surface-dark rounded border border-steel-dark/30">
                <div className="size-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                  {emp.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">{emp.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-slate-500">{emp.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-red-500 text-base">warning</span>
            <span className="text-sm font-semibold text-red-700 dark:text-red-400">3 Alertes critiques</span>
          </div>
          <div className="text-xs text-red-600 dark:text-red-400">Violation repos • Heures sup • Contrat</div>
        </div>
      </div>
    </div>
  )

  const renderPlanningMockup = () => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const
    const dayLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    
    const getShiftColor = (type: string) => {
      switch (type) {
        case 'admin': return 'bg-purple-500/20 border-purple-500/50 text-purple-700 dark:text-purple-300'
        case 'kitchen': return 'bg-orange-500/20 border-orange-500/50 text-orange-700 dark:text-orange-300'
        default: return 'bg-blue-500/20 border-blue-500/50 text-blue-700 dark:text-blue-300'
      }
    }

    return (
      <div className="bg-white dark:bg-surface-dark rounded-xl border border-steel-dark/30 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-[#151e32] border-b border-steel-dark/30 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 dark:bg-background-dark rounded p-1 border border-steel-dark/30">
              <button className="px-2 py-1">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <span className="px-4 py-1 text-sm font-semibold">Semaine 29 (15-21 Juil)</span>
              <button className="px-2 py-1">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
            <button className="px-3 py-1.5 text-xs font-medium bg-accent text-white rounded">
              <span className="material-symbols-outlined text-xs align-middle mr-1">magic_button</span>
              Auto-planification IA
            </button>
          </div>
        </div>

        {/* Spreadsheet */}
        <div className="p-4 overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[180px_repeat(7,1fr)] gap-2 text-xs">
              {/* Header */}
              <div className="p-2 bg-slate-50 dark:bg-[#151e32] rounded font-semibold text-slate-500 text-left">Collaborateur</div>
              {dayLabels.map((day, idx) => (
                <div key={day} className="p-2 bg-slate-50 dark:bg-[#151e32] rounded text-center font-semibold text-slate-500">
                  <div>{day}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {demoDailyTotals[days[idx]].covers} cov. • {demoDailyTotals[days[idx]].hours}h
                  </div>
                </div>
              ))}

              {/* Rows */}
              {demoShifts.slice(0, 6).map((shift, i) => (
                <React.Fragment key={i}>
                  <div className="p-2 flex items-center gap-2">
                    <div className="size-7 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                      {shift.employee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 dark:text-white text-xs truncate">{shift.employee.split(' ')[0]}</div>
                      <div className="text-slate-500 text-[10px]">{shift.role}</div>
                    </div>
                  </div>
                  {days.map((day, j) => {
                    const shiftData = shift[day]
                    return (
                      <div key={j} className="p-1 min-h-[60px]">
                        {shiftData ? (
                          <div className={`h-full rounded border p-1.5 flex flex-col justify-between ${getShiftColor(shiftData.type)}`}>
                            <div className="text-[10px] font-bold">{shiftData.start}-{shiftData.end}</div>
                            {shiftData.covers > 0 && (
                              <div className="text-[9px] opacity-80 mt-0.5">
                                {shiftData.covers} couverts
                              </div>
                            )}
                            <div className="text-[9px] opacity-60 mt-0.5">
                              {shiftData.cost}€
                            </div>
                          </div>
                        ) : (
                          <div className="h-full w-full opacity-0 group-hover:opacity-100 flex items-center justify-center">
                            <div className="size-4 rounded border border-dashed border-slate-300 dark:border-slate-600"></div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}

              {/* Totals Row */}
              <div className="p-2 bg-slate-100 dark:bg-[#0B1622] rounded font-mono text-xs font-semibold text-slate-600 dark:text-slate-400 text-right">
                TOTAUX
              </div>
              {days.map((day, idx) => (
                <div key={day} className="p-2 bg-slate-100 dark:bg-[#0B1622] rounded font-mono text-xs text-center text-slate-600 dark:text-slate-400">
                  <div className="font-semibold">{demoDailyTotals[day].covers} cov.</div>
                  <div className="text-[10px]">{demoDailyTotals[day].hours}h • {demoDailyTotals[day].cost}€</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderEmployeesMockup = () => (
    <div className="bg-white dark:bg-surface-dark rounded-xl border border-steel-dark/30 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-[#151e32] border-b border-steel-dark/30 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Collaborateurs</h3>
          <p className="text-xs text-slate-500 mt-1">Gestion administrative et performance</p>
        </div>
        <button className="px-4 py-2 bg-accent text-white rounded text-sm font-medium">
          <span className="material-symbols-outlined text-base align-middle mr-1">add</span>
          Nouveau
        </button>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 flex gap-3 border-b border-steel-dark/30">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-2 top-2 text-slate-400 text-base">search</span>
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-8 pr-4 py-1.5 bg-white dark:bg-surface-dark border border-steel-dark/30 rounded text-sm"
            readOnly
          />
        </div>
        <select className="bg-white dark:bg-surface-dark border border-steel-dark/30 rounded px-3 py-1.5 text-sm">
          <option>Tous les départements</option>
        </select>
      </div>

      {/* Table */}
      <div className="p-6 overflow-x-auto">
        <div className="min-w-[900px]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-steel-dark/30">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Identité</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Poste</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Statut</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Heures/sem</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Prochain shift</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Performance</th>
              </tr>
            </thead>
            <tbody>
              {demoEmployees.slice(0, 6).map((emp, i) => (
                <tr key={i} className="border-b border-steel-dark/20 hover:bg-slate-50 dark:hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                        {emp.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">{emp.name}</div>
                        <div className="text-xs text-slate-500">ID: {emp.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-700 dark:text-slate-300">{emp.role}</div>
                    <div className="text-xs text-slate-500">{emp.department}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                      emp.status === 'En shift'
                        ? 'bg-success/10 text-success border-success/20'
                        : emp.status === 'Actif'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-slate-200 dark:border-white/10'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-900 dark:text-white font-medium">{emp.hoursThisWeek}h</div>
                    <div className="text-xs text-slate-500">/{emp.hours}h contrat</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-slate-700 dark:text-slate-300">{emp.nextShift}</div>
                  </td>
                  <td className="px-4 py-3">
                    {emp.performance.covers > 0 ? (
                      <div>
                        <div className="text-xs text-slate-900 dark:text-white">{emp.performance.covers} couverts</div>
                        <div className="text-[10px] text-slate-500">{emp.performance.revenue}€ CA</div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400">-</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#F5F5F7] dark:bg-[#1C1C1E] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-white/5 rounded-full text-xs font-semibold tracking-wider uppercase text-black/60 dark:text-white/60 mb-6 border border-black/5 dark:border-white/10">
            <span className="material-symbols-outlined text-base">play_circle</span>
            Démo Interactive
          </span>
          
          <h2 className="text-4xl md:text-5xl font-semibold text-black dark:text-white tracking-tight mb-4">
            Explorez ShiftPilot. <span className="text-black/40 dark:text-white/40">En direct.</span>
          </h2>
          <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto">
            Naviguez entre les différentes vues du dashboard et découvrez toutes les fonctionnalités
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white dark:bg-surface-dark rounded-lg p-1 border border-steel-dark/30 shadow-sm">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  activeView === view.id
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-base">{view.icon}</span>
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <motion.div
          key={activeView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <p className="text-black/60 dark:text-white/60">
            {views.find((v) => v.id === activeView)?.description}
          </p>
        </motion.div>

        {/* Demo Content */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeView === 'dashboard' && renderDashboardMockup()}
              {activeView === 'planning' && renderPlanningMockup()}
              {activeView === 'employees' && renderEmployeesMockup()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-semibold hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20 text-lg"
          >
            Essayer maintenant
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </Link>
          <p className="text-sm text-black/60 dark:text-white/60 mt-4">
            14 jours gratuits • Sans carte bancaire • Configuration en 5 minutes
          </p>
        </motion.div>
      </div>
    </section>
  )
}

