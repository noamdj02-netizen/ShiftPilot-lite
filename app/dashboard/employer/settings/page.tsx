'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Palette } from 'lucide-react'
import { useColorTheme } from '@/hooks/useColorTheme'

type SettingsSection = 'restaurant' | 'restaurant-params' | 'hours' | 'legal' | 'billing' | 'notifications' | 'team' | 'colors'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('restaurant')

  const sections = [
    { key: 'restaurant', label: 'Informations restaurant' },
    { key: 'restaurant-params', label: 'Paramètres restaurant' },
    { key: 'hours', label: 'Horaires d\'ouverture' },
    { key: 'legal', label: 'Paramètres légaux' },
    { key: 'billing', label: 'Facturation & Abonnement' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'team', label: 'Équipe & Permissions' },
    { key: 'colors', label: 'Personnalisation des couleurs' }
  ]

  const colorPalettes = [
    {
      id: 'blue',
      name: 'Bleu Professionnel',
      primary: '#3B82F6',
      primaryDark: '#2563EB',
      primaryLight: '#60A5FA',
      description: 'Couleur par défaut, professionnelle et moderne'
    },
    {
      id: 'purple',
      name: 'Violet Élégant',
      primary: '#8B5CF6',
      primaryDark: '#7C3AED',
      description: 'Élégant et créatif',
      preview: ['bg-purple-600', 'bg-purple-500', 'bg-purple-400', 'bg-purple-300']
    },
    {
      id: 'green',
      name: 'Vert Nature',
      primary: '#10B981',
      primaryDark: '#059669',
      description: 'Fraîcheur et croissance',
      preview: ['bg-green-600', 'bg-green-500', 'bg-green-400', 'bg-green-300']
    },
    {
      id: 'orange',
      name: 'Orange Énergique',
      primary: '#F97316',
      primaryDark: '#EA580C',
      description: 'Énergique et dynamique',
      preview: ['bg-orange-600', 'bg-orange-500', 'bg-orange-400', 'bg-orange-300']
    },
    {
      id: 'pink',
      name: 'Rose Moderne',
      primary: '#EC4899',
      primaryDark: '#DB2777',
      description: 'Moderne et accueillant',
      preview: ['bg-pink-600', 'bg-pink-500', 'bg-pink-400', 'bg-pink-300']
    },
    {
      id: 'cyan',
      name: 'Cyan Frais',
      primary: '#06B6D4',
      primaryDark: '#0891B2',
      description: 'Frais et technologique',
      preview: ['bg-cyan-600', 'bg-cyan-500', 'bg-cyan-400', 'bg-cyan-300']
    }
  ]

  const { theme, setTheme } = useColorTheme()

  const openingHours = [
    { day: 'Lundi', open: '11:00', close: '23:00', closed: false },
    { day: 'Mardi', open: '11:00', close: '23:00', closed: false },
    { day: 'Mercredi', open: '11:00', close: '23:00', closed: false },
    { day: 'Jeudi', open: '11:00', close: '23:00', closed: false },
    { day: 'Vendredi', open: '11:00', close: '23:30', closed: false },
    { day: 'Samedi', open: '11:00', close: '23:30', closed: false },
    { day: 'Dimanche', open: 'Fermé', close: '', closed: true }
  ]

  const teamMembers = [
    { id: 1, name: 'John Dupont', role: 'Owner/Manager', email: 'john@example.com', permissions: 'Tous', status: 'active' },
    { id: 2, name: 'Sarah Martin', role: 'Assistant Manager', email: 'sarah@example.com', permissions: 'Modération', status: 'active' },
    { id: 3, name: 'Pierre Leclerc', role: 'Manager', email: 'pierre@example.com', permissions: 'Lecture', status: 'active' }
  ]

  return (
    <div className="space-y-8 relative z-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12 bg-slate-100 dark:bg-slate-900/30 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400"
          whileHover={{ rotate: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Settings size={20} />
        </motion.div>
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">
            Paramètres
          </h1>
          <p className="text-black/60 dark:text-white/60 mt-2">
            Gérez votre restaurant et vos préférences
          </p>
        </div>
      </div>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 border border-black/5 dark:border-white/5 space-y-2 shadow-sm">
            {sections.map((section) => (
              <motion.button
                key={section.key}
                onClick={() => setActiveSection(section.key as SettingsSection)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all text-sm ${
                  activeSection === section.key
                    ? 'theme-primary text-white'
                    : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span className="text-sm">{section.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Restaurant Info Section */}
          {activeSection === 'restaurant' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
                <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-6">
                  Informations du restaurant
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nom du restaurant</label>
                      <input type="text" defaultValue="Le Petit Bistro" className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Type de cuisine</label>
                      <input type="text" defaultValue="Française" className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Adresse</label>
                    <input type="text" defaultValue="123 Rue de Paris, 75001 Paris" className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Téléphone</label>
                      <input type="text" defaultValue="+33 1 23 45 67 89" className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                      <input type="email" defaultValue="contact@lepetitbistro.fr" className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all"
                    style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
                    >
                      Enregistrer les modifications
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Restaurant Parameters Section */}
          {activeSection === 'restaurant-params' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
                <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-6">
                  Paramètres du restaurant
                </h2>

                <div className="space-y-6">
                  {/* Budget RH */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Budget RH hebdomadaire (€)
                    </label>
                    <input 
                      type="number" 
                      defaultValue="3500" 
                      min="0"
                      step="50"
                      className="w-full px-4 py-2 bg-white dark:bg-slate-700 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500" 
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Budget maximum pour les coûts de personnel par semaine
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Seuil d'alerte budget (%)
                    </label>
                    <input 
                      type="number" 
                      defaultValue="90" 
                      min="0"
                      max="100"
                      className="w-full px-4 py-2 bg-white dark:bg-slate-700 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500" 
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Alerte lorsque le budget atteint ce pourcentage
                    </p>
                  </div>

                  {/* Durée des shifts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Durée shift minimum (heures)
                      </label>
                      <input 
                        type="number" 
                        defaultValue="4" 
                        min="2"
                        max="12"
                        step="0.5"
                        className="w-full px-4 py-2 bg-white dark:bg-slate-700 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500" 
                      />
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Durée shift maximum (heures)
                      </label>
                      <input 
                        type="number" 
                        defaultValue="10" 
                        min="4"
                        max="12"
                        step="0.5"
                        className="w-full px-4 py-2 bg-white dark:bg-slate-700 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500" 
                      />
                    </div>
                  </div>

                  {/* Pauses automatiques */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Pause automatique à 6h (minutes)
                      </label>
                      <input 
                        type="number" 
                        defaultValue="20" 
                        min="15"
                        max="60"
                        step="5"
                        className="w-full px-4 py-2 bg-white dark:bg-slate-700 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500" 
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Pause obligatoire pour un shift de 6h ou plus
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Pause automatique à 9h (minutes)
                      </label>
                      <input 
                        type="number" 
                        defaultValue="30" 
                        min="20"
                        max="90"
                        step="5"
                        className="w-full px-4 py-2 bg-white dark:bg-slate-700 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500" 
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Pause obligatoire pour un shift de 9h ou plus
                      </p>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications automatiques</h3>
                    
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Rappel publication planning</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Recevoir un rappel pour publier le planning avant la fin de la semaine
                          </p>
                        </div>
                      </label>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Notification d'absence</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Être alerté immédiatement lorsqu'un employé signale une absence
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all"
                    style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
                  >
                    Enregistrer les modifications
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Opening Hours Section */}
          {activeSection === 'hours' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
                <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-6">
                  Horaires d'ouverture
                </h2>

                <div className="space-y-4">
                  {openingHours.map((schedule, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-black/5 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5"
                    >
                      <span className="font-medium text-black dark:text-white w-24">{schedule.day}</span>
                      {!schedule.closed ? (
                        <div className="flex items-center gap-4">
                          <input type="time" defaultValue={schedule.open} className="px-3 py-2 bg-white dark:bg-[#1C1C1E] rounded-lg text-sm text-black dark:text-white border border-black/5 dark:border-white/5" />
                          <span className="text-black/40 dark:text-white/40">→</span>
                          <input type="time" defaultValue={schedule.close} className="px-3 py-2 bg-white dark:bg-[#1C1C1E] rounded-lg text-sm text-black dark:text-white border border-black/5 dark:border-white/5" />
                        </div>
                      ) : (
                        <span className="text-black/60 dark:text-white/60 font-medium">Fermé</span>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all"
                    style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
                  >
                    Enregistrer
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Legal Settings Section */}
          {activeSection === 'legal' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
                <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-6">
                  Paramètres légaux HCR
                </h2>

                <div className="space-y-6">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">Temps de repos minimum</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">11h entre deux services (obligatoire)</p>
                      </div>
                    </label>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">Heures maximum par semaine</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">48h maximum (durée légale)</p>
                      </div>
                    </label>
                    <input type="number" defaultValue="48" min="35" max="60" className="w-full px-4 py-2 bg-white dark:bg-slate-700 rounded-lg text-slate-900 dark:text-white border border-slate-200 dark:border-slate-600 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500" />
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <label className="flex items-center gap-3 cursor-pointer mb-3">
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">Repos hebdomadaire</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">24h consécutives par semaine</p>
                      </div>
                    </label>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="font-medium text-slate-900 dark:text-white mb-3">Temps de pause minimum</p>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-600 dark:text-slate-400">20 minutes</span>
                      <input type="range" min="15" max="60" defaultValue="20" className="flex-1" />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all"
                    style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
                  >
                    Enregistrer
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Billing Section */}
          {activeSection === 'billing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
                <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-6">
                  Facturation & Abonnement
                </h2>

                <div className="space-y-6">
                  {/* Current Plan */}
                  <div className="p-6 bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Plan Pro</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Déjà actif depuis le 15 novembre 2024</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold rounded-full">Actif</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Prochaine facturation</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">15/01/2026</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Montant mensuel</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">49€/mois</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white mb-3">Méthode de paiement</h3>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Carte bancaire</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Visa **** 4242</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium">
                        Modifier
                      </button>
                    </div>
                  </div>

                  {/* Invoices */}
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white mb-3">Factures récentes</h3>
                    <div className="space-y-2">
                      {[
                        { date: '15/12/2024', amount: '49.00€', status: 'Payée' },
                        { date: '15/11/2024', amount: '49.00€', status: 'Payée' },
                        { date: '15/10/2024', amount: '49.00€', status: 'Payée' }
                      ].map((invoice, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{invoice.date}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{invoice.amount}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                              {invoice.status}
                            </span>
                            <button className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white">
                              Télécharger
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
                <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-6">
                  Préférences de notifications
                </h2>

                <div className="space-y-4">
                  {[
                    { title: 'Demandes de congé', desc: 'Recevoir une notification quand un employé demande un congé' },
                    { title: 'Alertes de conformité', desc: 'Alertes sur les violations de règles légales' },
                    { title: 'Messages clients', desc: 'Nouveaux messages clients via PilotBot' },
                    { title: 'Rapports hebdomadaires', desc: 'Rapport récapitulatif du planning et coûts' },
                    { title: 'Avis Google', desc: 'Notifications des nouveaux avis Google' },
                    { title: 'Mise à jour IA', desc: 'Notifications de planning IA généré' }
                  ].map((notif, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-black/5 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium text-black dark:text-white">{notif.title}</p>
                          <p className="text-sm text-black/60 dark:text-white/60">{notif.desc}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-500" />
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Team Section */}
          {activeSection === 'team' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white">
                    Équipe & Permissions
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium text-sm shadow-lg shadow-blue-500/20 transition-all"
                  >
                    Inviter un membre
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-500 to-gray-500 flex items-center justify-center text-white text-lg font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-900 dark:text-white">{member.name}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{member.role}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-500">{member.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-slate-600 dark:text-slate-400">Permissions</p>
                          <p className="font-medium text-slate-900 dark:text-white text-sm">{member.permissions}</p>
                        </div>
                        <button className="px-3 py-1.5 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white text-sm">
                          Paramètres
                        </button>
                        {member.id !== 1 && (
                          <button className="px-3 py-1.5 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm">
                            Supprimer
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Colors Section */}
          {activeSection === 'colors' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400"
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Palette size={20} />
                  </motion.div>
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white">
                      Personnalisation des couleurs
                    </h2>
                    <p className="text-sm text-black/60 dark:text-white/60">
                      Choisissez une palette de couleurs pour personnaliser votre dashboard
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {colorPalettes.map((palette) => (
                    <motion.button
                      key={palette.id}
                      onClick={() => setTheme(palette.id as any)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        relative p-4 rounded-lg border-2 transition-all text-left
                        ${theme === palette.id
                          ? 'theme-border-primary theme-bg-light dark:theme-bg-dark'
                          : 'border-black/5 dark:border-white/5 bg-white dark:bg-[#1C1C1E] hover:theme-border-primary'
                        }
                      `}
                    >
                      {theme === palette.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 theme-primary rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}

                      <div className="mb-3">
                        <h3 className="font-semibold text-black dark:text-white mb-1">{palette.name}</h3>
                        <p className="text-xs text-black/60 dark:text-white/60">{palette.description}</p>
                      </div>

                      <div className="flex gap-1.5">
                        <div className="flex-1 h-8 rounded" style={{ backgroundColor: palette.primary }} />
                        <div className="flex-1 h-8 rounded" style={{ backgroundColor: palette.primaryDark }} />
                        <div className="flex-1 h-8 rounded" style={{ backgroundColor: palette.primaryLight }} />
                        <div className="flex-1 h-8 bg-gray-300 dark:bg-gray-700 rounded" />
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: palette.primary }}
                        />
                        <span className="text-xs text-black/60 dark:text-white/60 font-mono">
                          {palette.primary}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/5">
                  <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
                    <p className="text-sm font-medium text-black dark:text-white mb-2">Aperçu en temps réel</p>
                    <p className="text-xs text-black/60 dark:text-white/60">
                      La palette sélectionnée est appliquée automatiquement. Les changements sont visibles immédiatement dans tout le dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
