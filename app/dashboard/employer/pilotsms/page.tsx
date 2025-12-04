'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Smartphone } from 'lucide-react'

export default function PilotSMSPage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)

  const stats = [
    { label: 'SMS envoyés ce mois', value: '342', trend: '+24%' },
    { label: 'Taux de lecture', value: '94%', trend: '+5%' },
    { label: 'Confirmations reçues', value: '89%', trend: '+8%' },
    { label: 'Coût total', value: '68€', trend: 'Ce mois' }
  ]

  const messageTemplates = [
    {
      id: 'planning',
      title: 'Planning de la semaine',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Envoi automatique tous les lundis',
      active: true,
      template: 'Bonjour {prenom} ! Ton planning de la semaine est dispo. Consulte-le sur ShiftPilot'
    },
    {
      id: 'reminder',
      title: 'Rappel avant service',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Envoi 2h avant chaque shift',
      active: true,
      template: 'Hey {prenom} ! N\'oublie pas ton shift de {heure_debut} à {heure_fin} aujourd\'hui'
    },
    {
      id: 'modification',
      title: 'Modification de planning',
      gradient: 'from-orange-500 to-red-500',
      description: 'Envoi instantané',
      active: true,
      template: 'Attention {prenom}, ton planning a été modifié ! Vérifie sur l\'app'
    },
    {
      id: 'absence',
      title: 'Absence détectée',
      gradient: 'from-yellow-500 to-orange-500',
      description: 'Envoi automatique si absence',
      active: false,
      template: '{prenom}, nous remarquons que tu n\'es pas là. Tout va bien ?'
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
    <div className="space-y-8 relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center text-pink-600 dark:text-pink-400"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Smartphone size={20} />
          </motion.div>
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">PilotSMS</h1>
            <p className="text-black/60 dark:text-white/60">Notifications SMS automatiques pour votre équipe</p>
          </div>
        </div>
        <button 
          className="px-4 md:px-6 py-2 md:py-3 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all text-sm md:text-base"
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
        >
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
            className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-[10px] md:text-xs font-semibold">
                {stat.trend}
              </span>
            </div>
            <p className="text-black/60 dark:text-white/60 text-xs md:text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-2xl md:text-3xl font-semibold text-black dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Templates */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white">
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
                cursor-pointer group relative overflow-hidden rounded-lg p-4 md:p-6 transition-all
                ${selectedMessage === template.id
                  ? 'theme-primary text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-[#1C1C1E] border border-black/5 dark:border-white/5 hover:theme-border-primary'
                }
              `}
            >
              <div className="relative flex items-start gap-4">

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`font-semibold ${selectedMessage === template.id ? 'text-white' : 'text-black dark:text-white'}`}>
                        {template.title}
                      </h3>
                      <p className={`text-xs md:text-sm ${selectedMessage === template.id ? 'text-white/80' : 'text-black/60 dark:text-white/60'}`}>
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
                    mt-3 p-3 rounded-lg text-xs md:text-sm
                    ${selectedMessage === template.id
                      ? 'bg-white/10 text-white/90'
                      : 'bg-black/5 dark:bg-white/5 text-black dark:text-white'
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
            <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white">
              SMS récents
            </h2>
            <span className="px-3 py-1 theme-bg-light dark:theme-bg-dark theme-text-primary dark:theme-text-primary-light rounded-full text-sm font-medium">
              342 ce mois
            </span>
          </div>

          <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
            <div className="space-y-4">
              {recentSMS.map((sms, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-black dark:text-white">{sms.recipient}</p>
                      <p className="text-xs text-black/60 dark:text-white/60">{sms.time}</p>
                    </div>
                    <div className="flex gap-2">
                      {sms.status === 'delivered' ? (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-[10px] md:text-xs font-semibold">
                          Envoyé
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-[10px] md:text-xs font-semibold">
                          Échec
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-black dark:text-white mb-3 line-clamp-1">
                    {sms.message}
                  </p>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <span className={sms.read ? 'theme-text-primary dark:theme-text-primary-light' : 'text-black/40 dark:text-white/40'}>
                        {sms.read ? 'Lu' : 'Non lu'}
                      </span>
                    </div>
                    {sms.confirmed && (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <span>Confirmé</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Insight Card */}
          <div className="theme-primary rounded-lg p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs md:text-sm font-medium">
                +24% ce mois
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">94% de taux de lecture</h3>
            <p className="text-white/90">
              Votre équipe est parfaitement informée grâce à PilotSMS
            </p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
        <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-6">
          Paramètres des alertes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-black dark:text-white">Planning hebdomadaire</span>
              <span className="text-xs text-green-600 dark:text-green-400">Actif</span>
            </div>
            <p className="text-xs text-black/60 dark:text-white/60 mb-2">Envoi : Chaque lundi 9h00</p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-1.5 theme-primary hover:theme-primary text-white rounded-lg text-xs font-medium transition-colors">
                Modifier
              </button>
              <button className="px-3 py-1.5 bg-black/5 dark:bg-white/5 text-black dark:text-white rounded-lg text-xs font-medium">
                Actif
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-black dark:text-white">Rappel avant shift</span>
              <span className="text-xs text-green-600 dark:text-green-400">Actif</span>
            </div>
            <p className="text-xs text-black/60 dark:text-white/60 mb-2">Envoi : 2h avant le shift</p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-1.5 theme-primary hover:theme-primary text-white rounded-lg text-xs font-medium transition-colors">
                Modifier
              </button>
              <button className="px-3 py-1.5 bg-black/5 dark:bg-white/5 text-black dark:text-white rounded-lg text-xs font-medium">
                Actif
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-black dark:text-white">Demande confirmation</span>
              <span className="text-xs text-black/60 dark:text-white/60">Inactif</span>
            </div>
            <p className="text-xs text-black/60 dark:text-white/60 mb-2">Demander réponse employé</p>
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-1.5 bg-black/5 dark:bg-white/5 text-black dark:text-white rounded-lg text-xs font-medium">
                Activer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
