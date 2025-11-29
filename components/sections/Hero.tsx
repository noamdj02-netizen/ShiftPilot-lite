'use client'

import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Clock, 
  ShieldCheck, 
  Settings,
  Clock as ClockIcon,
  Euro,
  TrendingUp,
  TrendingDown,
  CalendarCheck,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Zap,
  ChevronDown
} from 'lucide-react'
import { SectionReveal } from '@/components/ui/SectionReveal'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', active: true },
  { icon: Calendar, label: 'Planning' },
  { icon: Users, label: 'Employés' },
  { icon: Clock, label: 'Disponibilités' },
  { icon: ShieldCheck, label: 'Conformité' },
]

const kpiCards = [
  {
    icon: ClockIcon,
    value: '168h',
    label: 'Heures planifiées',
    trend: '+12%',
    trendUp: true,
    gradient: 'from-[#8976FD] to-[#7180FF]',
  },
  {
    icon: Euro,
    value: '3 240€',
    label: 'Coût salarial',
    trend: '-8%',
    trendUp: false,
    gradient: 'from-[#7180FF] to-[#6CC8FF]',
  },
  {
    icon: Users,
    value: '12',
    label: 'Employés actifs',
    trend: '+2',
    trendUp: true,
    gradient: 'from-[#FCA61F] to-[#FBBF24]',
  },
  {
    icon: CalendarCheck,
    value: '42',
    label: 'Shifts créés',
    trend: '+24%',
    trendUp: true,
    gradient: 'from-[#6CC8FF] to-[#7180FF]',
  },
]

const shifts = [
  {
    initials: 'AM',
    name: 'Alice Martin',
    role: 'Service midi · 11h-15h',
    date: 'Lundi 16/10',
    hours: '4h',
    gradient: 'from-[#8976FD] to-[#7180FF]',
  },
  {
    initials: 'TB',
    name: 'Thomas Bernard',
    role: 'Service soir · 18h-23h',
    date: 'Mardi 17/10',
    hours: '5h',
    gradient: 'from-[#7180FF] to-[#6CC8FF]',
  },
  {
    initials: 'SD',
    name: 'Sophie Dubois',
    role: 'Service complet · 10h-22h',
    date: 'Mercredi 18/10',
    hours: '12h',
    gradient: 'from-[#FCA61F] to-[#FBBF24]',
  },
]

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#FAFAFA] to-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Text Centered */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <SectionReveal>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-indigo-200 shadow-sm mb-6">
              <div className="w-2 h-2 rounded-full mr-2 bg-[#8976FD] animate-pulse" />
              <span className="text-xs font-semibold text-[#8976FD]">Nouveau</span>
              <span className="mx-2 text-xs text-indigo-400">·</span>
              <span className="text-xs text-indigo-700">IA générative de plannings</span>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              style={{ color: '#1a1a2e', lineHeight: '1.05' }}
            >
              Automatisez vos plannings de restaurant
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="text-xl text-indigo-600 mb-10 leading-relaxed font-medium max-w-3xl mx-auto">
              ShiftPilot génère des plannings optimisés et conformes au Code du travail en quelques secondes, sans Excel, sans conflits et sans surcoûts.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-4 text-base font-semibold text-white rounded-xl shadow-lg transition-all hover:scale-[1.03] active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, #8976FD 0%, #7180FF 100%)' }}
              >
                Démarrer gratuitement
              </button>
              <button className="px-8 py-4 text-base font-semibold text-indigo-700 bg-white border border-indigo-300 rounded-xl shadow-sm hover:border-indigo-400 transition-all hover:scale-[1.03] active:scale-[0.97]">
                Voir une démo
              </button>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.4}>
            <p className="text-xs text-indigo-500 mt-6">Aucune carte bancaire requise · Essai gratuit de 14 jours</p>
          </SectionReveal>
        </div>

        {/* Dashboard Preview - Centered */}
        <SectionReveal delay={0.5}>
          <div className="max-w-6xl mx-auto">
            <div 
              className="rounded-3xl overflow-hidden shadow-premium border border-indigo-200"
              style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)' }}
            >
              <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r border-indigo-200 p-6 hidden lg:block">
                  <div className="mb-8">
                    <div className="text-lg font-bold tracking-tight" style={{ letterSpacing: '-0.05em' }}>
                      <span className="bg-gradient-to-r from-[#8976FD] to-[#7180FF] bg-clip-text text-transparent">
                        SHIFTPILOT
                      </span>
                    </div>
                  </div>

                  <nav className="space-y-1">
                    {sidebarItems.map((item, index) => (
                      <a
                        key={item.label}
                        href="#"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-indigo-50 hover:translate-x-1 ${
                          item.active 
                            ? 'bg-indigo-100 text-[#8976FD] font-semibold' 
                            : 'text-indigo-700'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </nav>

                  <div className="mt-8 pt-8 border-t border-indigo-200">
                    <a
                      href="#"
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-indigo-700 transition-all hover:bg-indigo-50 hover:translate-x-1"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Paramètres</span>
                    </a>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-hidden">
                  {/* Header */}
                  <div className="bg-white border-b border-indigo-200 px-8 py-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-indigo-900">Tableau de bord</h2>
                      <p className="text-sm text-indigo-500 font-medium mt-1">Vue d'ensemble de votre activité</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <select className="pl-4 pr-10 py-2 bg-white border border-indigo-300 rounded-xl text-sm font-semibold text-indigo-700 appearance-none cursor-pointer">
                          <option>Semaine 42</option>
                          <option>Semaine 41</option>
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-500 pointer-events-none" />
                      </div>
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white cursor-pointer transition-all hover:-translate-y-0.5"
                        style={{ background: 'linear-gradient(135deg, #8976FD 0%, #7180FF 100%)' }}
                      >
                        AM
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-8 space-y-8" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {/* KPI Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {kpiCards.map((kpi, index) => (
                        <motion.div
                          key={kpi.label}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-white rounded-2xl p-6 border border-indigo-200 transition-all hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(137,118,253,0.15)]"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ 
                                background: `linear-gradient(135deg, ${kpi.gradient.includes('#8976FD') ? 'rgba(137, 118, 253, 0.1)' : kpi.gradient.includes('#7180FF') ? 'rgba(113, 128, 255, 0.1)' : kpi.gradient.includes('#FCA61F') ? 'rgba(252, 166, 31, 0.1)' : 'rgba(108, 200, 255, 0.1)'}, ${kpi.gradient.includes('#8976FD') ? 'rgba(113, 128, 255, 0.1)' : kpi.gradient.includes('#7180FF') ? 'rgba(108, 200, 255, 0.1)' : kpi.gradient.includes('#FCA61F') ? 'rgba(251, 191, 36, 0.1)' : 'rgba(113, 128, 255, 0.1)'})` 
                              }}
                            >
                              <kpi.icon 
                                className="w-5 h-5" 
                                style={{ 
                                  color: kpi.gradient.includes('#8976FD') ? '#8976FD' : 
                                         kpi.gradient.includes('#7180FF') ? '#7180FF' : 
                                         kpi.gradient.includes('#FCA61F') ? '#FCA61F' : '#6CC8FF'
                                }} 
                              />
                            </div>
                            <div className={`flex items-center space-x-1 text-xs font-bold ${kpi.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                              {kpi.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              <span>{kpi.trend}</span>
                            </div>
                          </div>
                          <div className="text-3xl font-bold text-indigo-900 mb-1">{kpi.value}</div>
                          <div className="text-sm text-indigo-600 font-medium">{kpi.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Planning Preview */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="bg-white rounded-2xl p-8 border border-indigo-200 shadow-soft"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-lg font-bold text-indigo-900">Planning de la semaine</h3>
                          <p className="text-sm text-indigo-500 font-medium mt-1">Aperçu des shifts à venir</p>
                        </div>
                        <button 
                          className="px-4 py-2 text-sm font-semibold rounded-xl text-white transition-all hover:scale-[1.03] active:scale-[0.97] flex items-center space-x-2"
                          style={{ background: 'linear-gradient(135deg, #8976FD 0%, #7180FF 100%)' }}
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Générer avec IA</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {shifts.map((shift, index) => (
                          <motion.div
                            key={shift.initials}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center space-x-4 p-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] hover:z-10"
                            style={{ 
                              background: `linear-gradient(135deg, ${shift.gradient.includes('#8976FD') ? 'rgba(137, 118, 253, 0.08)' : shift.gradient.includes('#7180FF') ? 'rgba(113, 128, 255, 0.08)' : 'rgba(252, 166, 31, 0.08)'}, ${shift.gradient.includes('#8976FD') ? 'rgba(113, 128, 255, 0.08)' : shift.gradient.includes('#7180FF') ? 'rgba(108, 200, 255, 0.08)' : 'rgba(252, 166, 31, 0.08)'})` 
                            }}
                          >
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                              style={{ background: `linear-gradient(135deg, ${shift.gradient})` }}
                            >
                              {shift.initials}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-indigo-900">{shift.name}</div>
                              <div className="text-xs text-indigo-600 font-medium mt-1">{shift.role}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-indigo-900">{shift.date}</div>
                              <div 
                                className="text-xs font-semibold mt-1"
                                style={{ 
                                  color: shift.gradient.includes('#8976FD') ? '#8976FD' : 
                                         shift.gradient.includes('#7180FF') ? '#7180FF' : '#FCA61F'
                                }}
                              >
                                {shift.hours}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-indigo-200 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex -space-x-2">
                            {shifts.map((shift) => (
                              <div
                                key={shift.initials}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white"
                                style={{ background: `linear-gradient(135deg, ${shift.gradient})` }}
                              >
                                {shift.initials}
                              </div>
                            ))}
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-indigo-700 bg-indigo-100 border-2 border-white">
                              +9
                            </div>
                          </div>
                          <span className="text-sm text-indigo-600 font-medium">12 employés planifiés</span>
                        </div>
                        <button className="text-sm font-semibold bg-gradient-to-r from-[#8976FD] to-[#7180FF] bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                          Voir tout →
                        </button>
                      </div>
                    </motion.div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-6">
                      {[
                        { icon: CheckCircle, label: 'Conformité', value: '100%', progress: 100, color: '#22C55E' },
                        { icon: AlertCircle, label: 'Conflits', value: '0', progress: 0, color: '#8976FD' },
                        { icon: Zap, label: 'Optimisation', value: '94%', progress: 94, color: '#FCA61F' },
                      ].map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                          className="bg-white rounded-2xl p-6 border border-indigo-200 shadow-soft"
                        >
                          <div className="flex items-center space-x-3 mb-4">
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center"
                              style={{ 
                                background: stat.color === '#22C55E' ? 'rgba(34, 197, 94, 0.1)' : 
                                          stat.color === '#8976FD' ? 'rgba(137, 118, 253, 0.1)' : 
                                          'rgba(252, 166, 31, 0.1)'
                              }}
                            >
                              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                            </div>
                            <div>
                              <div className="text-xs text-indigo-500 font-medium">{stat.label}</div>
                              <div className="text-lg font-bold text-indigo-900">{stat.value}</div>
                            </div>
                          </div>
                          <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${stat.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, delay: 0.6 + index * 0.1 }}
                              className="h-full rounded-full"
                              style={{ 
                                background: `linear-gradient(90deg, ${stat.color} 0%, ${stat.color === '#22C55E' ? '#16A34A' : stat.color === '#8976FD' ? '#7180FF' : '#FBBF24'} 100%)` 
                              }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
