'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const dataHours = [
  { week: 'Sem 1', heures: 180, prevision: 185 },
  { week: 'Sem 2', heures: 195, prevision: 190 },
  { week: 'Sem 3', heures: 186, prevision: 188 },
  { week: 'Sem 4', heures: 192, prevision: 195 },
]

const dataEmployees = [
  { name: 'Marie D.', heures: 35, progression: 100 },
  { name: 'Thomas M.', heures: 32, progression: 91 },
  { name: 'Sophie B.', heures: 39, progression: 100 },
  { name: 'Lucas P.', heures: 28, progression: 80 },
  { name: 'Emma L.', heures: 35, progression: 100 },
  { name: 'Antoine M.', heures: 39, progression: 100 },
]

const dataService = [
  { name: 'Midi', value: 45, color: '#6C63FF' },
  { name: 'Soir', value: 55, color: '#8B5CF6' },
]

const dataRole = [
  { role: 'Serveur', heures: 120 },
  { role: 'Barman', heures: 80 },
  { role: 'Chef de rang', heures: 100 },
  { role: 'Commis', heures: 60 },
  { role: 'Chef', heures: 40 },
]

export default function StatistiquesPage() {
  const [period, setPeriod] = useState<'semaine' | 'mois' | 'annee'>('semaine')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Statistiques</h1>
          <p className="text-slate-400 mt-1">Analyse détaillée de votre activité</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
            <button onClick={() => setPeriod('semaine')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${period === 'semaine' ? 'bg-[#6C63FF] text-white' : 'text-slate-400'}`}>
              Semaine
            </button>
            <button onClick={() => setPeriod('mois')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${period === 'mois' ? 'bg-[#6C63FF] text-white' : 'text-slate-400'}`}>
              Mois
            </button>
            <button onClick={() => setPeriod('annee')} className={`px-4 py-2 rounded-lg text-sm transition-colors ${period === 'annee' ? 'bg-[#6C63FF] text-white' : 'text-slate-400'}`}>
              Année
            </button>
          </div>
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">download</span>
            Export
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-400">schedule</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">208h</p>
              <p className="text-sm text-slate-400">Heures totales</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-400">payments</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">27,500€</p>
              <p className="text-sm text-slate-400">Coût masse salariale</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-400">trending_up</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">82.50€</p>
              <p className="text-sm text-slate-400">Productivité</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-400">gavel</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">98%</p>
              <p className="text-sm text-slate-400">Conformité</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Évolution des heures</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dataHours}>
              <defs>
                <linearGradient id="colorHeures" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.2} />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1C1C1E',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#fff'
                }}
              />
              <Area type="monotone" dataKey="heures" stroke="#6C63FF" fillOpacity={1} fill="url(#colorHeures)" />
              <Area type="monotone" dataKey="prevision" stroke="#8B5CF6" strokeDasharray="5 5" fillOpacity={0} />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Heures par employé</h3>
          <div className="space-y-4">
            {dataEmployees.map((emp, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white">{emp.name}</span>
                  <span className="text-sm text-slate-400">{emp.heures}h ({emp.progression}%)</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] rounded-full transition-all" style={{ width: `${emp.progression}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Répartition Midi/Soir</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataService}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {dataService.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1C1C1E',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#fff'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Répartition par poste</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataRole} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} opacity={0.2} />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis dataKey="role" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1C1C1E',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="heures" fill="#6C63FF" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6 space-y-4">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-400">gavel</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">98%</p>
                <p className="text-sm text-slate-400">Conformité</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-400">schedule</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">4.2h</p>
                <p className="text-sm text-slate-400">Temps économisé</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-400">warning</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-sm text-slate-400">Conflits</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold text-white mb-6">Détail par collaborateur</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-sm text-slate-400 font-medium">Nom</th>
              <th className="text-left py-3 px-4 text-sm text-slate-400 font-medium">Poste</th>
              <th className="text-right py-3 px-4 text-sm text-slate-400 font-medium">Heures</th>
              <th className="text-right py-3 px-4 text-sm text-slate-400 font-medium">Taux</th>
              <th className="text-center py-3 px-4 text-sm text-slate-400 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody>
            {dataEmployees.map((emp, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 text-sm text-white">{emp.name}</td>
                <td className="py-3 px-4 text-sm text-slate-400">Serveur</td>
                <td className="py-3 px-4 text-sm text-white text-right">{emp.heures}h</td>
                <td className="py-3 px-4 text-sm text-slate-400 text-right">{emp.progression}%</td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    emp.progression >= 95 ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {emp.progression >= 95 ? 'Conforme' : 'Sous-staffé'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}

