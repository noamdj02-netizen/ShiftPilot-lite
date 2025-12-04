'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Send, Users, Bot } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/dashboard/ui/SectionTitle'
import { KPICard } from '@/components/dashboard/ui/KPICard'
import { DashboardCard } from '@/components/dashboard/ui/DashboardCard'

export default function BotPage() {
  const [messages, setMessages] = useState([
    { role: 'user', text: 'Bonjour, avez-vous une table pour 4 ce soir ?', time: '14:23' },
  ])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (messages.length === 1) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          text: 'Bien sûr ! Nous avons une table disponible à 20h. Je vous réserve ?',
          time: '14:23'
        }])
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [messages.length])

  const handleSend = () => {
    if (!inputValue.trim()) return
    setMessages(prev => [...prev, {
      role: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }])
    setInputValue('')
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="PilotBot"
        subtitle="Chatbot IA pour répondre à vos clients 24/7"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard
          icon={Users}
          label="Conversations actives"
          value="12"
          color="blue"
        />
        <KPICard
          icon={MessageCircle}
          label="Messages aujourd'hui"
          value="48"
          color="green"
        />
        <KPICard
          icon={Bot}
          label="Taux de satisfaction"
          value="94%"
          color="purple"
        />
      </div>

      {/* Chat Interface */}
      <DashboardCard className="flex flex-col h-[600px]">
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] rounded-2xl p-4 ${
                msg.role === 'user'
                  ? 'bg-slate-200 dark:bg-slate-700 rounded-br-none'
                  : 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-bl-none'
              }`}>
                {msg.role === 'assistant' && (
                  <div className="text-xs text-blue-100 mb-1 font-medium">PilotBot</div>
                )}
                <div className={`text-sm ${msg.role === 'user' ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
                  {msg.text}
                </div>
                <div className={`text-xs mt-2 ${
                  msg.role === 'user' ? 'text-slate-500 dark:text-slate-400' : 'text-blue-100'
                }`}>
                  {msg.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tapez votre message..."
              className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              onClick={handleSend}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Envoyer
            </button>
          </div>
        </div>
      </DashboardCard>
    </div>
  )
}

