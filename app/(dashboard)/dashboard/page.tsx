'use client'

import { motion } from 'framer-motion'
import { 
  AreaChart, Area, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts'
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Tableau de bord
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Aperçu de l'activité et des performances
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 flex items-center gap-2 text-sm">
            <span className="material-symbols-outlined text-slate-400">calendar_today</span>
            <span className="text-slate-700 dark:text-slate-200 font-medium">Cette semaine</span>
          </div>
          <Link 
            href="/planning" 
            className="bg-accent hover:bg-accent/90 text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Nouveau planning
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Masse Salariale', val: '24,500€', delta: '-2.4%', trend: 'down', sub: 'vs N-1', icon: 'payments', color: 'text-blue-500' },
          { label: 'Productivité / Heure', val: '84.20€', delta: '+5.1%', trend: 'up', sub: 'Objectif: 80€', icon: 'trending_up', color: 'text-green-500' },
          { label: 'Heures Planifiées', val: '1,240h', delta: '+0.8%', trend: 'neutral', sub: '98% Staffing', icon: 'schedule', color: 'text-purple-500' },
          { label: 'Score Conformité', val: '98/100', delta: '+2pts', trend: 'up', sub: 'Aucune violation', icon: 'gavel', color: 'text-orange-500' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-[#1C1C1E] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-slate-100 dark:bg-white/5 ${stat.color}`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                stat.trend === 'down' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-400'
              }`}>
                {stat.delta}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.val}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white dark:bg-[#1C1C1E] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Prévision d'activité vs Réel</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Comparaison du chiffre d'affaires et staffing</p>
            </div>
            <div className="flex bg-slate-100 dark:bg-white/5 rounded-lg p-1">
              <button className="px-3 py-1 text-xs font-medium rounded bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm">Hebdo</button>
              <button className="px-3 py-1 text-xs font-medium rounded text-slate-500 hover:text-slate-900 dark:hover:text-white">Mensuel</button>
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
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.2} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C1C1E',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Area
                  name="Réel"
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorVal)"
                />
                <Area
                  name="Prévisionnel (IA)"
                  type="monotone"
                  dataKey="predicted"
                  stroke="#6C63FF"
                  strokeWidth={3}
                  strokeDasharray="4 4"
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Chart - Revenue */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-[#1C1C1E] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col"
        >
          <h3 className="font-bold text-slate-900 dark:text-white mb-1">Revenus Hebdo</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Performance vs Objectifs</p>
          <div className="flex-1 w-full min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.2} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{
                    backgroundColor: '#1C1C1E',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="actual" name="Réel" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={16} />
                <Bar dataKey="target" name="Cible" fill="#334155" radius={[4, 4, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-white/5">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Alertes Opérationnelles
            </h3>
            <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold">3 Critiques</span>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-white/5">
            {[
              { title: 'Violation Règle de Repos', desc: 'Lucas M. - Repos < 11h entre shift soir et matin.', severity: 'critical' },
              { title: 'Heures Supplémentaires', desc: 'Léa D. - Dépassement contractuel (+2h) cette semaine.', severity: 'warning' },
              { title: 'Contrat à renouveler', desc: 'Thomas P. - Fin de CDD dans 7 jours.', severity: 'info' },
            ].map((alert, i) => (
              <div key={i} className="p-4 flex gap-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <div className={`mt-1 size-2 rounded-full shrink-0 ${
                  alert.severity === 'critical' ? 'bg-red-500' : alert.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-accent transition-colors">
                    {alert.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{alert.desc}</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-xs font-medium text-accent border border-accent/30 px-3 py-1 rounded hover:bg-accent/10">
                    Traiter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm p-6"
        >
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">
            État du service
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400">cloud_done</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Synchronisation Paie</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Dernier export: Aujourd'hui 02:00</p>
                </div>
              </div>
              <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">OK</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">sync</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Connecteur POS (Zettle)</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Données temps réel actives</p>
                </div>
              </div>
              <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">OK</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Actions Rapides</h4>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/planning"
                className="flex items-center justify-center gap-2 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent/90 transition shadow-lg shadow-accent/25"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                Nouveau Planning
              </Link>
              <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Export RH
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}