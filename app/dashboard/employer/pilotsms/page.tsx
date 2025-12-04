'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PilotSMSPage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)

  const stats = [
    { label: 'SMS envoyés ce mois', value: '342', icon: '📱', trend: '+24%' },
    { label: 'Taux de lecture', value: '94%', icon: '👀', trend: '+5%' },
    { label: 'Confirmations reçues', value: '89%', icon: '✅', trend: '+8%' },
    { label: 'Coût total', value: '68€', icon: '💰', trend: 'Ce mois' }
  ]

  const messageTemplates = [
    {
      id: 'planning',
      title: 'Planning de la semaine',
      icon: '📅',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Envoi automatique tous les lundis',
      active: true,
      template: 'Bonjour {prenom} ! Ton planning de la semaine est dispo. Consulte-le sur ShiftPilot 📱'
    },
    {
      id: 'reminder',
      title: 'Rappel avant service',
      icon: '⏰',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Envoi 2h avant chaque shift',
      active: true,
      template: 'Hey {prenom} ! N\'oublie pas ton shift de {heure_debut} à {heure_fin} aujourd\'hui 👋'
    },
    {
      id: 'modification',
      title: 'Modification de planning',
      icon: '🔄',
      gradient: 'from-orange-500 to-red-500',
      description: 'Envoi instantané',
      active: true,
      template: 'Attention {prenom}, ton planning a été modifié ! Vérifie sur l\'app 📲'
    },
    {
      id: 'absence',
      title: 'Absence détectée',
      icon: '⚠️',
      gradient: 'from-yellow-500 to-orange-500',
      description: 'Envoi automatique si absence',
      active: false,
      template: '{prenom}, nous remarquons que tu n\'es pas là. Tout va bien ? 🤔'
    }
  ]

  const recentSMS = [
    {
      recipient: 'Marie Dupont',
      message: 'Bonjour Marie ! Ton planning de la semaine est dispo...',
      status: 'delivered',
      read: true,
      time: 'Il y a 5 min',
      confirmed: true
    },
    {
      recipient: 'Jean Martin',
      message: 'Hey Jean ! N\'oublie pas ton shift de 12:00 à 18:00...',
      status: 'delivered',
      read: true,
      time: 'Il y a 23 min',
      confirmed: false
    },
    {
      recipient: 'Sophie Bernard',
      message: 'Attention Sophie, ton planning a été modifié...',
      status: 'delivered',
      read: false,
      time: 'Il y a 1h',
      confirmed: false
    },
    {
      recipient: 'Lucas Petit',
      message: 'Bonjour Lucas ! Ton planning de la semaine est dispo...',
      status: 'failed',
      read: false,
      time: 'Il y a 2h',
      confirmed: false
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-2xl">
            📱
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">PilotSMS</h1>
            <p className="text-slate-600 dark:text-slate-400">Notifications SMS automatiques pour votre équipe</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2">
          <span>✉️</span>
          Envoyer un SMS groupé
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{stat.icon}</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Templates */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>✨</span>
            Modèles de messages
          </h2>

          {messageTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => setSelectedMessage(template.id)}
              className={`
                cursor-pointer group relative overflow-hidden rounded-2xl p-6 transition-all
                ${selectedMessage === template.id
                  ? `bg-gradient-to-br ${template.gradient} text-white shadow-2xl scale-105`
                  : 'bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700'
                }
              `}
            >
              {selectedMessage === template.id && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              )}

              <div className="relative flex items-start gap-4">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0
                  ${selectedMessage === template.id
                    ? 'bg-white/20'
                    : `bg-gradient-to-br ${template.gradient}`
                  }
                `}>
                  {template.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`font-bold ${selectedMessage === template.id ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                        {template.title}
                      </h3>
                      <p className={`text-sm ${selectedMessage === template.id ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                        {template.description}
                      </p>
                    </div>
                    <div className={`
                      w-12 h-6 rounded-full flex items-center px-1 transition-all
                      ${template.active
                        ? selectedMessage === template.id ? 'bg-white/30 justify-end' : 'bg-green-500 justify-end'
                        : 'bg-slate-300 dark:bg-slate-700 justify-start'
                      }
                    `}>
                      <div className={`w-4 h-4 rounded-full ${template.active || selectedMessage === template.id ? 'bg-white' : 'bg-slate-500'}`} />
                    </div>
                  </div>

                  <div className={`
                    mt-3 p-3 rounded-lg text-sm
                    ${selectedMessage === template.id
                      ? 'bg-white/10 text-white/90'
                      : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                    }
                  `}>
                    {template.template}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent SMS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>📨</span>
              SMS récents
            </h2>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
              342 ce mois
            </span>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
            <div className="space-y-4">
              {recentSMS.map((sms, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{sms.recipient}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{sms.time}</p>
                    </div>
                    <div className="flex gap-2">
                      {sms.status === 'delivered' ? (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                          ✓ Envoyé
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-medium">
                          ✗ Échec
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 line-clamp-1">
                    {sms.message}
                  </p>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <span className={sms.read ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}>👀</span>
                      <span className={sms.read ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}>
                        {sms.read ? 'Lu' : 'Non lu'}
                      </span>
                    </div>
                    {sms.confirmed && (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <span>✅</span>
                        <span>Confirmé</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Insight Card */}
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">🚀</div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                +24% ce mois
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">94% de taux de lecture</h3>
            <p className="text-white/90">
              Votre équipe est parfaitement informée grâce à PilotSMS
            </p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <span>⚙️</span>
          Paramètres des alertes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Planning hebdomadaire</span>
              <span className="text-xs text-green-600 dark:text-green-400">Actif</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Envoi : Chaque lundi 9h00</p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium">
                Modifier
              </button>
              <button className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium">
                ✓
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Rappel avant shift</span>
              <span className="text-xs text-green-600 dark:text-green-400">Actif</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Envoi : 2h avant le shift</p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium">
                Modifier
              </button>
              <button className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium">
                ✓
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Demande confirmation</span>
              <span className="text-xs text-slate-400">Inactif</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Demander réponse employé</p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium">
                Activer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
