'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type SettingsSection = 'restaurant' | 'hours' | 'legal' | 'billing' | 'notifications' | 'team'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('restaurant')

  const sections = [
    { key: 'restaurant', label: 'Informations restaurant' },
    { key: 'hours', label: 'Horaires d\'ouverture' },
    { key: 'legal', label: 'Paramètres légaux' },
    { key: 'billing', label: 'Facturation & Abonnement' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'team', label: 'Équipe & Permissions' }
  ]

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
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">
          Paramètres
        </h1>
        <p className="text-black/60 dark:text-white/60 mt-2">
          Gérez votre restaurant et vos préférences
        </p>
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
                    ? 'bg-blue-600 text-white'
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
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium shadow-lg shadow-blue-500/20 transition-all"
                    >
                      Enregistrer les modifications
                    </motion.button>
                  </div>
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
                    className="px-6 py-2 bg-gradient-to-r from-slate-500 to-gray-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    💾 Enregistrer
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
                    className="px-6 py-2 bg-gradient-to-r from-slate-500 to-gray-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    💾 Enregistrer
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
        </div>
      </div>
    </div>
  )
}
