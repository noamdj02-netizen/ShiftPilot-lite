'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Logo } from '@/components/ui/Logo'
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Umbrella, 
  MessageSquare, 
  Star, 
  Phone, 
  Settings,
  ChevronLeft,
  Zap,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Moon,
  Sun
} from 'lucide-react'

export function Hero() {
  const [serviceMode, setServiceMode] = useState(false)

  return (
    <section
      data-hero-section="true"
      className="relative min-h-0 md:min-h-[80vh] w-full pt-20 md:pt-24 lg:pt-28 pb-8 md:pb-16 lg:pb-20 px-4 md:px-6 lg:px-8 font-sans bg-white"
      style={{ zIndex: 0 }}
    >
      {/* Background - Light blue/white gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-white pointer-events-none" style={{ zIndex: -1 }}></div>

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-8 md:pb-16 lg:pb-20" style={{ zIndex: 0 }}>
        <div className="flex flex-col space-y-12 md:space-y-16 lg:space-y-20">
          
          {/* Top Section - Text Content (Centered) */}
          <div className="flex flex-col items-center text-center space-y-8 md:space-y-10">
            
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100/80 border border-blue-200/50 rounded-full"
            >
              {/* Avatars avec photos de profil */}
              <div className="flex -space-x-1.5 sm:-space-x-2">
                {[
                  'https://i.pravatar.cc/150?img=1',
                  'https://i.pravatar.cc/150?img=12',
                  'https://i.pravatar.cc/150?img=33',
                  'https://i.pravatar.cc/150?img=47',
                ].map((avatarUrl, i) => (
                  <img
                    key={i}
                    src={avatarUrl}
                    alt={`Utilisateur ${i + 1}`}
                    className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-blue-700">
                <span className="hidden sm:inline">Utilisé par plus de </span>1M+ utilisateurs
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-tight text-black max-w-5xl px-4"
            >
              <span className="text-black">Planifiez Vos Équipes. Unifiez Vos Sites.</span>{' '}
              <span className="text-blue-600">Simplifiez</span>{' '}
              <span className="text-black">Vos Opérations.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 leading-relaxed max-w-3xl font-light px-4"
            >
              Centralisez vos plannings, vos équipes et vos sites sur une seule plateforme. La performance terrain, sans la complexité.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="px-4"
            >
              <Link
                href="#fonctionnalites"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm sm:text-base transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 w-full sm:w-auto min-h-[44px] sm:min-h-[52px] touch-manipulation"
              >
                <span className="hidden sm:inline">Découvrir les fonctionnalités</span>
                <span className="sm:hidden">Découvrir</span>
              </Link>
            </motion.div>
          </div>

          {/* Bottom Section - Full Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-7xl mx-auto"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="flex flex-row">
                {/* Left Sidebar */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 flex-shrink-0"
                >
                  {/* Logo */}
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <Logo size={32} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-slate-900">ShiftPilot</span>
                          <ChevronLeft className="w-4 h-4 text-slate-500" />
                    </div>
                        <span className="text-sm font-semibold text-slate-600">Dashboard Pro</span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 p-4 space-y-1">
                    {[
                      { icon: BarChart3, label: "Vue d'ensemble", active: true },
                      { icon: Calendar, label: "Planning Manuel" },
                      { icon: Calendar, label: "Planning IA", badge: "NEW" },
                      { icon: Users, label: "Employés" },
                      { icon: Umbrella, label: "Congés & Absences" },
                      { icon: MessageSquare, label: "PilotBot", badge: "IA" },
                      { icon: Star, label: "PilotReview", badge: "IA" },
                      { icon: Phone, label: "PilotSMS", badge: "IA" },
                      { icon: Settings, label: "Paramètres" },
                    ].map((item, idx) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 + idx * 0.05 }}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                          item.active
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm font-medium flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full font-medium">
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </nav>

                  {/* User Profile */}
                  <div className="p-4 border-t border-slate-200">
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                        JD
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-900 truncate">John Doe</div>
                        <div className="text-xs text-slate-500">Manager</div>
                      </div>
                      <ChevronLeft className="w-4 h-4 text-slate-400 rotate-180" />
                    </div>
                  </div>
                </motion.div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 sm:py-6"
                  >
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4">
                      <div className="min-w-0 flex-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-black mb-1">Bonjour, John</h2>
                        <p className="text-xs sm:text-sm text-slate-700">
                          {serviceMode 
                            ? "Mode service actif - Focus 18h-23h" 
                            : "Voici ce qui se passe dans votre restaurant aujourd'hui"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
                        {/* Service Mode Toggle */}
                        <button
                          onClick={() => setServiceMode(!serviceMode)}
                          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                            serviceMode
                              ? 'bg-orange-600 hover:bg-orange-700 text-white'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {serviceMode ? <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                          <span className="hidden sm:inline">Mode Service</span>
                          <span className="sm:hidden">Service</span>
                        </button>
                        <button className="hidden md:flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-xs sm:text-sm transition-colors">
                          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className="hidden lg:inline">Générer Planning IA</span>
                          <span className="lg:hidden">IA</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* KPIs Critiques avec Indicateurs de Tension */}
                  <div className="px-4 sm:px-6 pb-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                      {/* Card 1: Tension Personnel - CRITIQUE */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.2 }}
                        className="relative bg-white rounded-lg p-2 sm:p-3 border-l-4 border-red-500 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        </div>
                        <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-red-500/10 flex items-center justify-center">
                              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
                            </div>
                          <div>
                              <span className="text-[9px] sm:text-[10px] font-medium text-black block">Tension</span>
                              <span className="text-[8px] sm:text-[9px] text-red-600 font-semibold">Critique</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-slate-900 mb-0.5">80%</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-500 mb-1.5 sm:mb-2">12/15 présents</div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-1 sm:mb-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '80%' }}
                            transition={{ duration: 0.8, delay: 1.4 }}
                            className="h-full bg-red-500 rounded-full"
                          />
                        </div>
                        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-red-600">
                          <AlertTriangle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span className="truncate">-3 ce soir</span>
                        </div>
                      </motion.div>

                      {/* Card 2: Conformité Juridique */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.25 }}
                        className="relative bg-white rounded-lg p-2 sm:p-3 border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-green-500/10 flex items-center justify-center">
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                            </div>
                            <span className="text-[9px] sm:text-[10px] font-medium text-black">Conformité</span>
                          </div>
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-black mb-0.5">98%</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-700 mb-1.5 sm:mb-2">Planning OK</div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-1 sm:mb-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '98%' }}
                            transition={{ duration: 0.8, delay: 1.45 }}
                            className="h-full bg-green-500 rounded-full"
                          />
                        </div>
                        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-green-600">
                          <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span>+3%</span>
                        </div>
                      </motion.div>

                      {/* Card 3: Coût réel vs prévu */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.3 }}
                        className="relative bg-white rounded-lg p-2 sm:p-3 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-blue-500/10 flex items-center justify-center">
                              <TrendingDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                            </div>
                            <span className="text-[9px] sm:text-[10px] font-medium text-black">Coût</span>
                          </div>
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-black mb-0.5">3,240€</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-700 mb-1.5 sm:mb-2">
                          <span className="line-through">3,360€</span> <span className="hidden sm:inline">prévu</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-1 sm:mb-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '96.4%' }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                            className="h-full bg-blue-500 rounded-full"
                          />
                        </div>
                        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-green-600">
                          <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span>-120€</span>
                        </div>
                      </motion.div>

                      {/* Card 4: Fiabilité Équipe */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.35 }}
                        className="relative bg-white rounded-lg p-2 sm:p-3 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-purple-500/10 flex items-center justify-center">
                              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
                            </div>
                            <span className="text-[9px] sm:text-[10px] font-medium text-black">Fiabilité</span>
                          </div>
                        </div>
                        <div className="text-lg sm:text-xl font-bold text-black mb-0.5">94%</div>
                        <div className="text-[9px] sm:text-[10px] text-slate-700 mb-1.5 sm:mb-2">Présence</div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-1 sm:mb-1.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '94%' }}
                            transition={{ duration: 0.8, delay: 1.55 }}
                            className="h-full bg-purple-500 rounded-full"
                          />
                        </div>
                        <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-orange-600">
                          <AlertCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span>2 absences</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>


                  {/* Analytics Section avec Graphiques Pertinents */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/50"
                  >
                    {/* Section Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-black">Analyse opérationnelle</h3>
                        <p className="text-xs sm:text-sm text-slate-700">
                          {serviceMode ? 'Focus service 18h-23h' : '4-10 Décembre 2025'}
                        </p>
                      </div>
                      <Link href="#" className="text-xs sm:text-sm text-blue-600 hover:underline">
                        Voir tout →
                      </Link>
                                </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {/* Mini Planning avec Absences */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                        className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <h4 className="text-xs sm:text-sm font-semibold text-black">Mini Planning</h4>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500"></div>
                            <span className="text-[10px] sm:text-xs text-slate-500">4-10 Déc</span>
                              </div>
                              </div>
                        
                        {/* Header des jours */}
                        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
                          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day) => (
                            <div key={day} className="text-center">
                              <span className="text-[9px] sm:text-[10px] font-medium text-slate-500">{day}</span>
                            </div>
                          ))}
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2 sm:mb-3">
                          {[4, 5, 6, 7, 8, 9, 10].map((date, idx) => (
                            <div key={date} className="text-center">
                              <span className="text-[10px] sm:text-xs font-semibold text-slate-700">{date}</span>
                            </div>
                          ))}
                      </div>

                        {/* Planning Grid */}
                        <div className="space-y-2">
                          {[
                            { name: 'Marie D.', role: 'Serveuse', absences: [false, true, false, false, false, true, false], present: 5 },
                            { name: 'Jean P.', role: 'Cuisinier', absences: [false, false, true, true, false, false, false], present: 5 },
                            { name: 'Sophie L.', role: 'Bar', absences: [false, false, false, false, false, false, true], present: 6 },
                          ].map((employee, empIdx) => (
                            <div key={empIdx} className="space-y-1">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-[8px] sm:text-[9px] font-semibold flex-shrink-0">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                  <div className="min-w-0 flex-1">
                                    <span className="text-[9px] sm:text-[10px] font-medium text-black block truncate">{employee.name}</span>
                                    <span className="text-[8px] sm:text-[9px] text-slate-700 block truncate">{employee.role}</span>
                                  </div>
                                </div>
                                <span className="text-[8px] sm:text-[9px] text-slate-700 flex-shrink-0 ml-2">{employee.present}/7</span>
                              </div>
                              <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                                {employee.absences.map((isAbsent, dayIdx) => (
                                  <motion.div
                                    key={dayIdx}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.2, delay: 1.6 + empIdx * 0.15 + dayIdx * 0.02 }}
                                    className={`h-5 sm:h-6 rounded flex items-center justify-center ${
                                      isAbsent
                                        ? 'bg-red-100 border border-red-300'
                                        : 'bg-green-100 border border-green-300'
                                    }`}
                                  >
                                    {isAbsent ? (
                                      <XCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-600" />
                                    ) : (
                                      <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600" />
                                    )}
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Légende */}
                        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-200">
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-green-100 border border-green-300 flex items-center justify-center">
                              <CheckCircle2 className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-green-600" />
                            </div>
                            <span className="text-[8px] sm:text-[9px] text-slate-500">Présent</span>
                          </div>
                          <div className="flex items-center gap-1 sm:gap-1.5">
                            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded bg-red-100 border border-red-300 flex items-center justify-center">
                              <XCircle className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-red-600" />
                            </div>
                            <span className="text-[8px] sm:text-[9px] text-slate-500">Absent</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Graphique 2: Charge par Poste (Mode Service si actif) */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.6 }}
                        className="bg-white rounded-xl p-3 sm:p-5 border border-slate-200 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <h4 className="text-xs sm:text-sm font-semibold text-black">
                            {serviceMode ? 'Charge Service (18h-23h)' : 'Charge par Poste'}
                          </h4>
                          {serviceMode && (
                            <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-orange-100 text-orange-600 rounded-full font-medium">
                              Service
                            </span>
                          )}
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                          {[
                            { poste: 'Cuisine', charge: 85, max: 100, couleur: 'bg-blue-500', service: 95 },
                            { poste: 'Salle', charge: 70, max: 100, couleur: 'bg-purple-500', service: 90 },
                            { poste: 'Bar', charge: 60, max: 100, couleur: 'bg-green-500', service: 75 },
                            { poste: 'Caissier', charge: 50, max: 100, couleur: 'bg-yellow-500', service: 65 },
                          ].map((poste, i) => {
                            const value = serviceMode ? poste.service : poste.charge
                            return (
                              <div key={poste.poste}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[10px] sm:text-xs font-medium text-black">{poste.poste}</span>
                                  <span className="text-[10px] sm:text-xs font-bold text-black">{value}%</span>
                                </div>
                                <div className="h-2 sm:h-3 bg-slate-100 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${value}%` }}
                                    transition={{ duration: 0.8, delay: 1.7 + i * 0.1 }}
                                    className={`h-full ${poste.couleur} rounded-full`}
                                  />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </motion.div>

                      {/* Graphique 3: Coût Réel vs Prévu */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.7 }}
                        className="bg-white rounded-xl p-3 sm:p-5 border border-slate-200 shadow-sm"
                      >
                        <h4 className="text-xs sm:text-sm font-semibold text-black mb-3 sm:mb-4">Coût réel vs prévu</h4>
                        <div className="h-40 sm:h-48 relative">
                          <svg className="w-full h-full" viewBox="0 0 400 180" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="realGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                              </linearGradient>
                              <linearGradient id="plannedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgba(168, 85, 247, 0.2)" />
                                <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
                              </linearGradient>
                            </defs>
                            {/* Ligne prévu (pointillée) */}
                            <motion.path
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1, delay: 1.8 }}
                              d="M 0 140 L 66 135 L 132 130 L 198 125 L 264 120 L 330 115 L 400 110"
                              stroke="rgb(168, 85, 247)"
                              strokeWidth="2"
                              strokeDasharray="4,4"
                              fill="none"
                            />
                            {/* Zone prévu */}
                            <motion.path
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1, delay: 1.85 }}
                              d="M 0 140 L 66 135 L 132 130 L 198 125 L 264 120 L 330 115 L 400 110 L 400 180 L 0 180 Z"
                              fill="url(#plannedGradient)"
                            />
                            {/* Zone réel */}
                            <motion.path
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1, delay: 1.9 }}
                              d="M 0 145 L 66 140 L 132 135 L 198 130 L 264 125 L 330 120 L 400 115 L 400 180 L 0 180 Z"
                              fill="url(#realGradient)"
                            />
                            {/* Ligne réel */}
                            <motion.path
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 1, delay: 1.95 }}
                              d="M 0 145 L 66 140 L 132 135 L 198 130 L 264 125 L 330 120 L 400 115"
                              stroke="rgb(59, 130, 246)"
                              strokeWidth="3"
                              fill="none"
                            />
                          </svg>
                          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] sm:text-xs text-slate-500 px-1 sm:px-2">
                            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
                              <span key={day} className="text-[8px] sm:text-[9px]">{day}</span>
                            ))}
                          </div>
                          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex flex-col gap-1.5 sm:gap-2">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded"></div>
                              <span className="text-[9px] sm:text-xs text-slate-600">Réel</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <div className="w-2 h-2 sm:w-3 sm:h-3 border-2 border-purple-500"></div>
                              <span className="text-[9px] sm:text-xs text-slate-600">Prévu</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Graphique 4: Fiabilité Équipe */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.8 }}
                        className="bg-white rounded-xl p-3 sm:p-5 border border-slate-200 shadow-sm"
                      >
                        <h4 className="text-xs sm:text-sm font-semibold text-black mb-3 sm:mb-4">Fiabilité par équipe</h4>
                        <div className="h-40 sm:h-48 flex items-end gap-2 sm:gap-3">
                          {[
                            { team: 'Cuisine', reliability: 92, color: 'bg-blue-500' },
                            { team: 'Salle', reliability: 88, color: 'bg-purple-500' },
                            { team: 'Bar', reliability: 95, color: 'bg-green-500' },
                            { team: 'Caissier', reliability: 100, color: 'bg-emerald-500' },
                          ].map((team, i) => (
                            <motion.div
                              key={team.team}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              transition={{ duration: 0.6, delay: 1.9 + i * 0.1 }}
                              className="flex-1 flex flex-col items-center gap-2"
                            >
                              <div 
                                className={`w-full ${team.color} rounded-t-lg transition-all hover:opacity-80 relative`}
                                style={{ height: `${team.reliability}%`, minHeight: '50px' }}
                              >
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-[9px] sm:text-xs font-bold text-white">{team.reliability}%</span>
                                </div>
                              </div>
                              <span className="text-[9px] sm:text-xs text-black font-medium">{team.team}</span>
                            </motion.div>
                            ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Day Buttons */}
                    <div className="flex gap-1.5 sm:gap-2 mt-4 sm:mt-6 overflow-x-auto pb-2 scrollbar-hide">
                      {['Lun 1', 'Mar 2', 'Mer 3', 'Jeu 4', 'Ven 5'].map((day, idx) => (
                        <motion.button
                          key={day}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 1.8 + idx * 0.05 }}
                          className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-all flex-shrink-0 ${
                            idx === 0
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {day}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Notifications Bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 2.0 }}
                    className="bg-slate-100 border-t border-slate-200 px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[10px] sm:text-xs">!</span>
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 truncate">
                        2 demandes de congé en attente
                      </span>
                    </div>
                    <Link href="#" className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 flex-shrink-0">
                      Voir
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
