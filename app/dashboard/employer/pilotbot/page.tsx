'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PilotBotPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'facebook' | 'website'>('instagram')

  const platforms = [
    { id: 'instagram' as const, name: 'Instagram', icon: '📸', color: 'from-pink-500 to-purple-500', connected: true },
    { id: 'facebook' as const, name: 'Facebook', icon: '👥', color: 'from-blue-500 to-cyan-500', connected: true },
    { id: 'website' as const, name: 'Site Web', icon: '🌐', color: 'from-green-500 to-emerald-500', connected: false }
  ]

  const stats = [
    { label: 'Messages gérés aujourd\'hui', value: '34', icon: '💬', change: '+12' },
    { label: 'Taux de résolution auto', value: '87%', icon: '✅', change: '+5%' },
    { label: 'Temps de réponse moyen', value: '< 30s', icon: '⚡', change: '-15s' },
    { label: 'Satisfaction client', value: '4.8/5', icon: '⭐', change: '+0.2' }
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
      response: 'Voici notre menu : [lien]. Bon appétit ! 😊',
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
    { question: 'Horaires d\'ouverture', answer: 'Lun-Ven: 12h-14h, 19h-23h', emoji: '🕐' },
    { question: 'Menu du jour', answer: 'Lien vers le menu PDF', emoji: '📋' },
    { question: 'Réservation', answer: 'Lien vers le système de réservation', emoji: '📅' },
    { question: 'Adresse', answer: '123 Rue de la Paix, 75001 Paris', emoji: '📍' },
    { question: 'Livraison', answer: 'Oui, via Uber Eats et Deliveroo', emoji: '🛵' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl">
            💬
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">PilotBot</h1>
            <p className="text-slate-600 dark:text-slate-400">Chatbot IA qui répond à vos clients 24/7</p>
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
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{stat.icon}</span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">
                {stat.change}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platforms */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span>🔌</span>
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
                  <span className="text-2xl">{platform.icon}</span>
                  <div className="text-left">
                    <p className={`font-medium ${selectedPlatform === platform.id ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                      {platform.name}
                    </p>
                    <p className={`text-xs ${selectedPlatform === platform.id ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
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

          <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
            + Connecter une plateforme
          </button>
        </div>

        {/* Recent Messages */}
        <div className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>📨</span>
              Messages récents
            </h2>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
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
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {msg.platform === 'instagram' ? '📸' : msg.platform === 'facebook' ? '👥' : '🌐'}
                    </span>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{msg.customer}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{msg.time}</p>
                    </div>
                  </div>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${msg.auto
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                    }
                  `}>
                    {msg.auto ? '🤖 Auto' : '👤 Manuel'}
                  </span>
                </div>

                <div className="space-y-2 pl-11">
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-700 dark:text-slate-300">{msg.message}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${msg.auto ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10' : 'bg-orange-500/10'} border ${msg.auto ? 'border-purple-200 dark:border-purple-800' : 'border-orange-200 dark:border-orange-800'}`}>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{msg.response}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Configuration */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>💡</span>
            FAQ Personnalisée
          </h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            + Ajouter une question
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{faq.emoji}</span>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 dark:text-white mb-1">{faq.question}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{faq.answer}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-opacity">
                  ✏️
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Analytics */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">87% de vos messages sont gérés automatiquement</h3>
            <p className="text-white/80">Économisez 3h par jour sur la gestion des messages clients</p>
          </div>
          <div className="text-6xl">🎯</div>
        </div>
      </div>
    </div>
  )
}
