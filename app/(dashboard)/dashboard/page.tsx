'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

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
  { day: 'Lun', actual: 0, target: 0 },
  { day: 'Mar', actual: 3800, target: 3900 },
  { day: 'Mer', actual: 4500, target: 4100 },
  { day: 'Jeu', actual: 4800, target: 4600 },
  { day: 'Ven', actual: 6200, target: 6000 },
  { day: 'Sam', actual: 6800, target: 6500 },
  { day: 'Dim', actual: 5100, target: 5500 },
]

const alerts = [
  { id: 1, severity: 'critical', message: 'Sous-effectif prévu vendredi soir (-2 serveurs)', action: 'Recruter' },
  { id: 2, severity: 'warning', message: 'Dépassement budget masse salariale de 3.2%', action: 'Ajuster' },
  { id: 3, severity: 'info', message: 'Nouvelle demande de congé de Marie pour le 15/12', action: 'Voir' },
]

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('semaine')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
          <p className="text-slate-400 mt-1">Vue d'ensemble de votre activité</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white hover:bg-white/10 transition-colors">
            Cette semaine
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-[#6C63FF] to-[#4F46E5] rounded-xl text-sm text-white hover:opacity-90 transition-opacity shadow-lg shadow-[#6C63FF]/25">
            Nouveau planning
          </button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-4 sm:p-5 lg:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-400">payments</span>
            </div>
            <span className="text-xs text-red-400 font-medium">-2.4%</span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">24,500€</p>
          <p className="text-sm text-slate-400">Masse Salariale</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-400">trending_up</span>
            </div>
            <span className="text-xs text-green-400 font-medium">+5.1%</span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">84.20€</p>
          <p className="text-sm text-slate-400">Productivité/Heure</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-400">schedule</span>
            </div>
            <span className="text-xs text-green-400 font-medium">+0.8%</span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">186h</p>
          <p className="text-sm text-slate-400">Heures Planifiées</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-400">gavel</span>
            </div>
            <span className="text-xs text-green-400 font-medium">+2pts</span>
          </div>
          <p className="text-2xl font-bold text-white mb-1">98/100</p>
          <p className="text-sm text-slate-400">Score Conformité</p>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="lg:col-span-2 bg-[#1C1C1E] border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Prévision d'activité vs Réel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dataActivity}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.2} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
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
              <Area type="monotone" dataKey="value" stroke="#6C63FF" fillOpacity={1} fill="url(#colorValue)" />
              <Area type="monotone" dataKey="predicted" stroke="#8B5CF6" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Revenus Hebdo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.2} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
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
              <Bar dataKey="actual" fill="#6C63FF" radius={[8, 8, 0, 0]} />
              <Bar dataKey="target" fill="#8B5CF6" fillOpacity={0.3} radius={[8, 8, 0, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Alertes Opérationnelles</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-xl border ${
                alert.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                alert.severity === 'warning' ? 'bg-amber-500/10 border-amber-500/30' :
                'bg-blue-500/10 border-blue-500/30'
              }`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm text-white">{alert.message}</p>
                  </div>
                  <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-white transition-colors whitespace-nowrap">
                    {alert.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">État du service</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-white">Service en cours</span>
              </div>
              <span className="text-sm text-slate-400">Midi</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg">add</span>
                Ajouter shift
              </button>
              <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg">swap_horiz</span>
                Échanger
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
