'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'

export function Hero() {
  return (
    <section
      data-hero-section="true"
      className="relative min-h-0 md:min-h-[80vh] w-full pt-20 md:pt-24 lg:pt-24 pb-8 md:pb-16 lg:pb-16 px-4 md:px-6 lg:px-8 overflow-x-hidden font-sans bg-white dark:bg-slate-950"
      style={{ zIndex: 0 }}
    >
      {/* Premium Background with Gradient Bloom */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-indigo-50/30 via-purple-50/20 to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pointer-events-none" style={{ zIndex: -1 }}></div>
      
      {/* Animated Bloom Halos */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-1/4 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-gradient-to-r from-blue-400/20 via-cyan-400/15 to-purple-400/20 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] pointer-events-none"
        style={{ zIndex: -1 }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-gradient-to-r from-purple-400/20 via-pink-400/15 to-blue-400/20 rounded-full blur-[60px] sm:blur-[80px] lg:blur-[100px] pointer-events-none"
        style={{ zIndex: -1 }}
      />

      {/* Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 dark:opacity-10 pointer-events-none" style={{ zIndex: -1 }}></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-8 md:pb-16 lg:pb-16" style={{ zIndex: 0 }}>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN - Text Content */}
          <div className="text-center md:text-left space-y-5 md:space-y-6 w-full max-w-full md:max-w-2xl order-1 md:order-1">
            {/* Main Title */}
            <div>
              <h1 className="text-xl md:text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.2] md:leading-tight text-slate-900 dark:text-white">
                La gestion des plannings{' '}
                <span className="relative inline-block">
                  <span className="relative">réinventée</span>
                  <span className="absolute bottom-0 md:bottom-1 left-0 right-0 h-1 md:h-3 bg-gradient-to-r from-blue-400/30 via-cyan-400/30 to-purple-400/30 dark:from-blue-500/20 dark:via-cyan-500/20 dark:to-purple-500/20 -z-0"></span>
                </span>{' '}
                pour les équipes terrain.
              </h1>
            </div>

            {/* Subtitle */}
            <div>
              <p className="text-sm md:text-lg lg:text-xl xl:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-full md:max-w-2xl font-light">
                ShiftPilot automatise vos horaires, simplifie la communication et vous fait gagner un temps précieux. Pour les managers, RH et PME.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <Link
                href="/register"
                className="group relative w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="relative flex items-center gap-2">
                  Démarrer l'essai gratuit
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/register"
                className="group w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl border-2 border-slate-300/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-slate-50/80 dark:hover:bg-slate-900/80 backdrop-blur-sm font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Demander une démo
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN - Visuals - Hidden on mobile, visible on desktop */}
          <div className="hidden md:block relative mt-8 md:mt-0 w-full order-2 md:order-2">
            {/* Dashboard Mockup with Glassmorphism */}
            <div className="relative w-full max-w-full md:max-w-3xl mx-auto lg:mx-0">
              <div className="relative">
                {/* Glow Effect Behind Dashboard */}
                <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-[2rem] blur-2xl opacity-60 pointer-events-none" style={{ zIndex: -1 }}></div>
                
                <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
                  {/* Top Header Bar - Clean & Light */}
                  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 md:gap-3 min-w-0">
                      <span className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400 truncate">Voir dashboard</span>
                      <span className="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">
                        Semaine 42
                      </span>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                      <button className="px-2 md:px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-xs font-semibold flex items-center gap-1 md:gap-1.5 shadow-sm transition-all duration-200">
                        <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="hidden md:inline">IA</span>
                      </button>
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                        AM
                      </div>
                      <button className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 backdrop-blur-sm transition-all duration-200">
                        <svg className="w-4 h-4 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Main Content - Mobile: Vertical Layout */}
                  <div className="flex flex-col md:flex-row">
                    {/* Dark Sidebar - Hidden on mobile */}
                    <div className="hidden md:flex w-16 bg-slate-800/95 dark:bg-slate-950/95 backdrop-blur-xl flex-col items-center py-6 gap-5 border-r border-slate-700/50 dark:border-slate-800/50">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                        <svg className="w-5 h-5 group-hover:text-white/70 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                        <svg className="w-5 h-5 group-hover:text-white/70 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                        <svg className="w-5 h-5 group-hover:text-white/70 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      {/* Section Header */}
                      <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl px-4 md:px-6 lg:px-8 py-4 md:py-6 border-b border-slate-200/50 dark:border-slate-800/50">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-4 md:mb-6">
                          <div>
                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">Planning de la semaine</h3>
                            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">4-10 Décembre 2025</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="px-2 md:px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            <button className="px-2 md:px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Compact Stats Row - Mobile: 2x2 Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-3">
                          {[
                            { 
                              label: 'Couverture', 
                              value: '95%', 
                              trend: '+2%',
                              icon: (
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                              ), 
                              bgColor: 'bg-emerald-50 dark:bg-emerald-950/20', 
                              iconColor: 'text-emerald-600 dark:text-emerald-400',
                              trendColor: 'text-emerald-600 dark:text-emerald-400'
                            },
                            { 
                              label: 'Shifts aujourd\'hui', 
                              value: '8', 
                              trend: '3 équipes',
                              icon: (
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              ), 
                              bgColor: 'bg-blue-50 dark:bg-blue-950/20', 
                              iconColor: 'text-blue-600 dark:text-blue-400',
                              trendColor: 'text-blue-600 dark:text-blue-400'
                            },
                            { 
                              label: 'Coût semaine', 
                              value: '€5.2K', 
                              trend: '-120€',
                              icon: (
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              ), 
                              bgColor: 'bg-amber-50 dark:bg-amber-950/20', 
                              iconColor: 'text-amber-600 dark:text-amber-400',
                              trendColor: 'text-amber-600 dark:text-amber-400'
                            },
                            { 
                              label: 'Équipe active', 
                              value: '12/15', 
                              trend: '+2',
                              icon: (
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              ), 
                              bgColor: 'bg-purple-50 dark:bg-purple-950/20', 
                              iconColor: 'text-purple-600 dark:text-purple-400',
                              trendColor: 'text-purple-600 dark:text-purple-400'
                            },
                          ].map((stat, idx) => (
                            <div
                              key={idx}
                              className={`${stat.bgColor} rounded-xl p-3 md:p-3 border border-slate-200/30 dark:border-slate-800/30`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div className={`${stat.iconColor} p-1.5 rounded-lg bg-white/60 dark:bg-slate-800/60`}>
                                  {stat.icon}
                                </div>
                                <span className={`text-base md:text-base font-bold ${stat.iconColor}`}>{stat.value}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-[10px] md:text-[10px] font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">{stat.label}</p>
                                <span className={`text-[9px] md:text-[9px] font-semibold ${stat.trendColor}`}>{stat.trend}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Planning Grid Section - Premium - Mobile: Vertical Cards */}
                      <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-b from-slate-50/40 to-white/60 dark:from-slate-950/40 dark:to-slate-900/60 backdrop-blur-sm">
                        {/* Mobile: Employee Cards Layout (Vertical) */}
                        <div className="md:hidden space-y-4">
                          {[
                            { name: 'Anna Smith', role: 'Vendeuse', team: 'Équipe caisse', shifts: [{ day: 'Mar', time: '9h-17h' }, { day: 'Jeu', time: '9h-17h' }, { day: 'Ven', time: '9h-17h' }], color: 'from-blue-500 to-blue-600', badge: 'CAISSE' },
                            { name: 'John Doe', role: 'Manager', team: 'Équipe terrain', shifts: [{ day: 'Lun', time: '9h-17h' }, { day: 'Mer', time: '9h-17h' }, { day: 'Ven', time: '9h-17h' }, { day: 'Sam', time: '9h-17h' }], color: 'from-emerald-500 to-emerald-600', badge: 'TERRAIN' },
                            { name: 'Marie Curie', role: 'Technicien', team: 'Équipe support', shifts: [{ day: 'Mar', time: '9h-17h' }, { day: 'Mer', time: '9h-17h' }, { day: 'Jeu', time: '9h-17h' }, { day: 'Dim', time: '9h-17h' }], color: 'from-amber-500 to-amber-600', badge: 'SUPPORT' },
                            { name: 'Tom Brown', role: 'Vendeur', team: 'Équipe caisse', shifts: [{ day: 'Lun', time: '9h-17h' }, { day: 'Mar', time: '9h-17h' }, { day: 'Jeu', time: '9h-17h' }, { day: 'Ven', time: '9h-17h' }], color: 'from-purple-500 to-purple-600', badge: 'CAISSE' },
                          ].map((employee, empIdx) => (
                            <div
                              key={empIdx}
                              className="bg-white/90 dark:bg-slate-900/90 rounded-xl p-4 border border-slate-200/50 dark:border-slate-800/50 shadow-sm"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                                  {employee.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{employee.name}</p>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-tight">
                                      {employee.badge}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">{employee.role}</p>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {employee.shifts.map((shift, shiftIdx) => (
                                  <div
                                    key={shiftIdx}
                                    className={`bg-gradient-to-br ${employee.color} rounded-lg px-3 py-2 text-white shadow-md`}
                                  >
                                    <p className="text-[10px] font-semibold">{shift.day}</p>
                                    <p className="text-xs font-bold">{shift.time}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Desktop: Original Grid Layout */}
                        <div className="hidden md:block">
                          {/* Days Header */}
                          <div className="grid grid-cols-[160px_repeat(7,1fr)] gap-3 mb-4">
                            <div></div>
                            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, idx) => (
                              <div key={day} className="text-center">
                                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">{day}</p>
                                <div className="h-12 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center shadow-sm">
                                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{idx + 4}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Employee Rows with Team Labels */}
                          <div className="space-y-3">
                            {[
                              { name: 'Anna Smith', role: 'Vendeuse', team: 'Équipe caisse', shifts: [0, 1, 0, 1, 1, 0, 0], color: 'from-blue-500 to-blue-600', times: ['', '9h-17h', '', '9h-17h', '9h-17h', '', ''], badge: 'CAISSE' },
                              { name: 'John Doe', role: 'Manager', team: 'Équipe terrain', shifts: [1, 0, 1, 0, 1, 1, 0], color: 'from-emerald-500 to-emerald-600', times: ['9h-17h', '', '9h-17h', '', '9h-17h', '9h-17h', ''], badge: 'TERRAIN' },
                              { name: 'Marie Curie', role: 'Technicien', team: 'Équipe support', shifts: [0, 1, 1, 1, 0, 0, 1], color: 'from-amber-500 to-amber-600', times: ['', '9h-17h', '9h-17h', '9h-17h', '', '', '9h-17h'], badge: 'SUPPORT' },
                              { name: 'Tom Brown', role: 'Vendeur', team: 'Équipe caisse', shifts: [1, 1, 0, 1, 1, 0, 0], color: 'from-purple-500 to-purple-600', times: ['9h-17h', '9h-17h', '', '9h-17h', '9h-17h', '', ''], badge: 'CAISSE' },
                            ].map((employee, empIdx) => (
                              <div
                                key={empIdx}
                                className="grid grid-cols-[160px_repeat(7,1fr)] gap-3"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                                    {employee.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{employee.name}</p>
                                      <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-tight">
                                        {employee.badge}
                                      </span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{employee.role}</p>
                                  </div>
                                </div>
                                {employee.shifts.map((hasShift, dayIdx) => (
                                  <div key={dayIdx} className="h-14 rounded-xl flex items-center justify-center">
                                    {hasShift ? (
                                      <div className={`w-full h-full bg-gradient-to-br ${employee.color} rounded-xl flex flex-col items-center justify-center text-white p-2 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105`}>
                                        <span className="text-[10px] font-semibold mb-0.5">{employee.times[dayIdx]}</span>
                                        <span className="text-[9px] opacity-90 font-medium">Shift</span>
                                      </div>
                                    ) : (
                                      <div className="w-full h-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-xl border border-slate-200/40 dark:border-slate-800/40"></div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
