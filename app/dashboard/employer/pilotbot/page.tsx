'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'

export default function PilotBotPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'facebook' | 'website'>('instagram')

  const platforms = [
    { id: 'instagram' as const, name: 'Instagram', color: 'from-pink-500 to-purple-500', connected: true },
    { id: 'facebook' as const, name: 'Facebook', color: 'from-blue-500 to-cyan-500', connected: true },
    { id: 'website' as const, name: 'Site Web', color: 'from-green-500 to-emerald-500', connected: false }
  ]

  const stats = [
    { label: 'Messages gérés aujourd\'hui', value: '34', change: '+12' },
    { label: 'Taux de résolution auto', value: '87%', change: '+5%' },
    { label: 'Temps de réponse moyen', value: '< 30s', change: '-15s' },
    { label: 'Satisfaction client', value: '4.8/5', change: '+0.2' }
  ]

  const recentMessages = [
    {
      platform: 'instagram',
      customer: 'Marie D.',
      message: 'Vous êtes ouverts ce soir ?',
      response: 'Oui, nous sommes ouverts de 19h à 23h !',
      time: 'Il y a 5 min',
      auto: true
    },
    {
      platform: 'facebook',
      customer: 'Jean M.',
      message: 'Le menu est dispo où ?',
      response: 'Voici notre menu : [lien]. Bon appétit !',
      time: 'Il y a 12 min',
      auto: true
    },
    {
      platform: 'instagram',
      customer: 'Sophie B.',
      message: 'Je voudrais réserver pour 6 personnes samedi',
      response: 'Demande transférée au gérant',
      time: 'Il y a 23 min',
      auto: false
    }
  ]

  const faqs = [
    { question: 'Horaires d\'ouverture', answer: 'Lun-Ven: 12h-14h, 19h-23h' },
    { question: 'Menu du jour', answer: 'Lien vers le menu PDF' },
    { question: 'Réservation', answer: 'Lien vers le système de réservation' },
    { question: 'Adresse', answer: '123 Rue de la Paix, 75001 Paris' },
    { question: 'Livraison', answer: 'Oui, via Uber Eats et Deliveroo' }
  ]

  return (
    <div className="space-y-8 relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center text-cyan-600 dark:text-cyan-400"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <MessageSquare size={20} />
          </motion.div>
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">PilotBot</h1>
            <p className="text-black/60 dark:text-white/60">Chatbot IA qui répond à vos clients 24/7</p>
          </div>
        </div>
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
                {stat.change}
              </span>
            </div>
            <p className="text-black/60 dark:text-white/60 text-xs md:text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-2xl md:text-3xl font-semibold text-black dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platforms */}
        <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-4">
            Plateformes
          </h2>

          <div className="space-y-3">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`
                  w-full flex items-center justify-between p-4 rounded-xl transition-all
                  ${selectedPlatform === platform.id
                    ? `bg-gradient-to-r ${platform.color} text-white`
                    : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="text-left">
                    <p className={`font-medium ${selectedPlatform === platform.id ? 'text-white' : 'text-black dark:text-white'}`}>
                      {platform.name}
                    </p>
                    <p className={`text-xs ${selectedPlatform === platform.id ? 'text-white/80' : 'text-black/60 dark:text-white/60'}`}>
                      {platform.connected ? 'Connecté' : 'Non connecté'}
                    </p>
                  </div>
                </div>
                <div className={`
                  w-3 h-3 rounded-full
                  ${platform.connected ? 'bg-green-400' : 'bg-slate-300 dark:bg-slate-600'}
                `} />
              </button>
            ))}
          </div>

          <button 
            className="w-full mt-4 px-4 py-3 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all"
            style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
          >
            Connecter une plateforme
          </button>
        </div>

        {/* Recent Messages */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white">
              Messages récents
            </h2>
            <span className="px-3 py-1 theme-bg-light dark:theme-bg-dark theme-text-primary dark:theme-text-primary-light rounded-full text-sm font-medium">
              12 nouveaux
            </span>
          </div>

          <div className="space-y-4">
            {recentMessages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-black dark:text-white">{msg.customer}</p>
                      <p className="text-xs text-black/60 dark:text-white/60">{msg.time}</p>
                    </div>
                  </div>
                  <span className={`
                    px-2 py-1 rounded-full text-[10px] md:text-xs font-semibold
                    ${msg.auto
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                    }
                  `}>
                    {msg.auto ? 'Auto' : 'Manuel'}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="bg-white dark:bg-[#1C1C1E] p-3 rounded-lg border border-black/5 dark:border-white/5">
                    <p className="text-sm text-black dark:text-white">{msg.message}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${msg.auto ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-orange-100 dark:bg-orange-900/30'} border ${msg.auto ? 'border-purple-200 dark:border-purple-800' : 'border-orange-200 dark:border-orange-800'}`}>
                    <p className="text-sm text-black dark:text-white">{msg.response}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Configuration */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white">
            FAQ Personnalisée
          </h2>
          <button 
            className="px-4 py-2 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all"
            style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
          >
            Ajouter une question
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="font-medium text-black dark:text-white mb-1">{faq.question}</p>
                  <p className="text-sm text-black/60 dark:text-white/60 line-clamp-2">{faq.answer}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-opacity text-sm">
                  Modifier
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Analytics */}
      <div className="theme-primary rounded-lg p-6 md:p-8 text-white">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-2">87% de vos messages sont gérés automatiquement</h3>
          <p className="text-white/80">Économisez 3h par jour sur la gestion des messages clients</p>
        </div>
      </div>
    </div>
  )
}
