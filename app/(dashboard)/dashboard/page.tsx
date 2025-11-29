'use client'

import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Link from 'next/link'

const dataActivity = [
  { time: '08:00', value: 20, predicted: 22 },
  { time: '10:00', value: 50, predicted: 45 },
  { time: '12:00', value: 85, predicted: 80 },
  { time: '14:00', value: 60, predicted: 65 },
  { time: '16:00', value: 35, predicted: 40 },
  { time: '18:00', value: 90, predicted: 85 },
  { time: '20:00', value: 55, predicted: 60 },
  { time: '22:00', value: 30, predicted: 35 },
]

const dataRevenue = [
  { day: 'Lun', actual: 4200, target: 4000 },
  { day: 'Mar', actual: 3800, target: 3900 },
  { day: 'Mer', actual: 4500, target: 4100 },
  { day: 'Jeu', actual: 4800, target: 4600 },
  { day: 'Ven', actual: 6200, target: 6000 },
  { day: 'Sam', actual: 6800, target: 6500 },
  { day: 'Dim', actual: 5100, target: 5500 },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-4rem)] bg-background-light dark:bg-background-dark">
      {/* SaaS Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-surface-dark border-b border-steel-dark/30 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Tableau de bord</h1>
          <div className="h-6 w-px bg-slate-300 dark:bg-steel-dark"></div>
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-background-dark px-3 py-1.5 rounded text-sm text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-steel-dark/30 cursor-pointer hover:border-accent transition">
            <span className="material-symbols-outlined text-[18px]">store</span>
            <span>Paris - Le Marais</span>
            <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400">search</span>
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-background-dark border border-slate-200 dark:border-steel-dark/30 rounded text-sm w-64 focus:ring-1 focus:ring-accent focus:border-accent"
            />
          </div>
          <button className="relative p-2 text-slate-500 hover:text-accent transition">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border border-surface-dark"></span>
          </button>
          <div className="size-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            JD
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPI Grid - Enterprise Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Masse Salariale', val: '24,500€', delta: '-2.4%', trend: 'down', sub: 'vs N-1' },
            { label: 'Productivité / Heure', val: '84.20€', delta: '+5.1%', trend: 'up', sub: 'Objectif: 80€' },
            { label: 'Heures Planifiées', val: '1,240h', delta: '+0.8%', trend: 'neutral', sub: '98% Staffing' },
            { label: 'Score Conformité', val: '98/100', delta: '+2pts', trend: 'up', sub: 'Aucune violation' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-surface-dark p-5 rounded-lg border border-steel-dark/30 shadow-sm flex flex-col justify-between h-32"
            >
              <div className="flex justify-between items-start">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {stat.label}
                </p>
                <span
                  className={`material-symbols-outlined text-lg ${
                    stat.trend === 'up' ? 'text-success' : stat.trend === 'down' ? 'text-success' : 'text-warning'
                  }`}
                >
                  {stat.trend === 'up' ? 'trending_up' : stat.trend === 'down' ? 'trending_down' : 'trending_flat'}
                </span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.val}</p>
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                      stat.trend === 'up' ? 'bg-success/10 text-success' : stat.trend === 'down' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}
                  >
                    {stat.delta}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-surface-dark p-6 rounded-lg border border-steel-dark/30 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Prévision d'activité vs Réel</h3>
                <p className="text-xs text-slate-500">Comparaison du chiffre d'affaires et staffing</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-medium border border-steel-dark/30 rounded bg-slate-50 dark:bg-white/5 hover:bg-slate-100">
                  Hebdo
                </button>
                <button className="px-3 py-1 text-xs font-medium border border-transparent rounded text-slate-500 hover:text-white">
                  Mensuel
                </button>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataActivity} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1B263B',
                      borderColor: '#415A77',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area
                    name="Réel"
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorVal)"
                  />
                  <Area
                    name="Prévisionnel (IA)"
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

          {/* Secondary Chart - Revenue */}
          <div className="bg-white dark:bg-surface-dark p-6 rounded-lg border border-steel-dark/30 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Revenus Hebdo</h3>
            <p className="text-xs text-slate-500 mb-6">Performance commerciale vs Objectifs</p>
            <div className="flex-1 w-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{
                      backgroundColor: '#1B263B',
                      borderColor: '#415A77',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="actual" name="Réel" fill="#3B82F6" radius={[2, 2, 0, 0]} barSize={12} />
                  <Bar dataKey="target" name="Cible" fill="#334155" radius={[2, 2, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Operational Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alerts Panel */}
          <div className="bg-white dark:bg-surface-dark rounded-lg border border-steel-dark/30 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-steel-dark/30 flex justify-between items-center bg-slate-50 dark:bg-[#151e32]">
              <h3 className="font-bold text-sm uppercase tracking-wide text-slate-700 dark:text-slate-300">
                Alertes Opérationnelles
              </h3>
              <span className="px-2 py-0.5 rounded bg-error/20 text-error text-xs font-bold">3 Critiques</span>
            </div>
            <div className="divide-y divide-steel-dark/30">
              {[
                {
                  title: 'Violation Règle de Repos',
                  desc: 'Lucas M. - Repos < 11h entre shift soir et matin.',
                  severity: 'critical',
                },
                {
                  title: 'Heures Supplémentaires',
                  desc: 'Léa D. - Dépassement contractuel (+2h) cette semaine.',
                  severity: 'warning',
                },
                {
                  title: 'Contrat à renouveler',
                  desc: 'Thomas P. - Fin de CDD dans 7 jours.',
                  severity: 'info',
                },
              ].map((alert, i) => (
                <div
                  key={i}
                  className="p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div
                    className={`mt-1 size-2 rounded-full shrink-0 ${
                      alert.severity === 'critical' ? 'bg-error' : alert.severity === 'warning' ? 'bg-warning' : 'bg-info'
                    }`}
                  ></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-accent transition-colors">
                      {alert.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{alert.desc}</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs font-medium text-accent border border-accent/30 px-2 py-1 rounded hover:bg-accent/10">
                      Traiter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions / Status */}
          <div className="bg-white dark:bg-surface-dark rounded-lg border border-steel-dark/30 shadow-sm p-6">
            <h3 className="font-bold text-sm uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-4">
              État du service
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-steel-dark/30">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-success">cloud_done</span>
                  <div>
                    <p className="text-sm font-medium">Synchronisation Paie</p>
                    <p className="text-xs text-slate-500">Dernier export: Aujourd'hui 02:00</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-success">OK</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-steel-dark/30">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-success">sync</span>
                  <div>
                    <p className="text-sm font-medium">Connecteur POS (Zettle)</p>
                    <p className="text-xs text-slate-500">Données temps réel actives</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-success">OK</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-steel-dark/30">
              <h4 className="text-xs font-bold text-slate-500 mb-3">ACTIONS RAPIDES</h4>
              <div className="flex gap-2">
                <Link
                  href="/planning"
                  className="flex-1 py-2 bg-accent text-white rounded text-sm font-medium text-center hover:bg-accent/90 transition"
                >
                  Nouveau Planning
                </Link>
                <button className="flex-1 py-2 border border-steel-dark text-slate-700 dark:text-slate-300 rounded text-sm font-medium text-center hover:bg-slate-100 dark:hover:bg-white/5 transition">
                  Export RH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
