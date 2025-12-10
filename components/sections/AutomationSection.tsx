'use client'

import React, { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CalendarCheck2, Star, MessageCircle, Bell, Sparkles, Zap, TrendingUp, Clock, Play, CheckCircle2, Send, Users } from 'lucide-react'

// Video Thumbnail Components
function PlanningVideoThumbnail() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
      <div className="text-center text-white">
        <CalendarCheck2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <div className="text-sm font-semibold">Planning IA en action</div>
      </div>
    </div>
  )
}

function ReviewVideoThumbnail() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
      <div className="text-center text-white">
        <Star className="w-16 h-16 mx-auto mb-4 opacity-50 fill-white" />
        <div className="text-sm font-semibold">Avis Google automatiques</div>
      </div>
    </div>
  )
}

function ChatbotVideoThumbnail() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
      <div className="text-center text-white">
        <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <div className="text-sm font-semibold">Chatbot IA clients</div>
      </div>
    </div>
  )
}

function SMSVideoThumbnail() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
      <div className="text-center text-white">
        <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <div className="text-sm font-semibold">Notifications SMS</div>
      </div>
    </div>
  )
}

// Video Demo Components
function PlanningVideoDemo() {
  const [generating, setGenerating] = useState(true)
  
  React.useEffect(() => {
    const timer = setTimeout(() => setGenerating(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-full bg-white dark:bg-[#0D1B2A] p-3">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <CalendarCheck2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Génération Planning IA</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Semaine 15 - 3 sites</div>
            </div>
          </div>
          <div className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full text-xs font-semibold">
            {generating ? 'Génération...' : '✓ Prêt'}
          </div>
        </div>

        {/* Planning Grid */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 overflow-auto">
          <div className="grid grid-cols-[100px_repeat(7,1fr)] gap-1 text-[10px]">
            {/* Header */}
            <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-slate-600 dark:text-slate-400 text-left">Employé</div>
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, idx) => (
              <div key={day} className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded text-center font-semibold text-slate-600 dark:text-slate-400">
                <div className="text-[10px]">{day}</div>
                <div className="text-[9px] text-slate-500">{[52, 64, 58, 68, 62, 72, 66][idx]}h</div>
              </div>
            ))}

            {/* Employee Rows */}
            {[
              { name: 'Marie D.', role: 'Serveuse', shifts: [{ day: 0, time: '9h-17h' }, { day: 2, time: '14h-22h' }, { day: 4, time: '10h-18h' }] },
              { name: 'Jean P.', role: 'Cuisinier', shifts: [{ day: 0, time: '10h-18h' }, { day: 1, time: '10h-18h' }, { day: 3, time: '10h-18h' }, { day: 5, time: '12h-20h' }] },
              { name: 'Sophie M.', role: 'Manager', shifts: [{ day: 1, time: '11h-19h' }, { day: 3, time: '11h-19h' }, { day: 5, time: '12h-22h' }] },
            ].map((emp, i) => (
              <React.Fragment key={i}>
                <div className="p-1.5 flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[7px] font-bold text-violet-600 dark:text-violet-400">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 dark:text-white text-[10px] truncate">{emp.name.split(' ')[0]}</div>
                    <div className="text-[9px] text-slate-500 dark:text-slate-400 truncate">{emp.role}</div>
                  </div>
                </div>
                {Array.from({ length: 7 }).map((_, dayIdx) => {
                  const shift = emp.shifts.find(s => s.day === dayIdx)
                  return (
                    <div key={dayIdx} className="p-1 min-h-[40px]">
                      {shift ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 + dayIdx * 0.05 }}
                          className="h-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 dark:from-violet-500/30 dark:to-purple-500/30 rounded border border-violet-500/50 dark:border-violet-500/50 p-1.5 flex items-center justify-center"
                        >
                          <div className="text-[9px] font-bold text-violet-700 dark:text-violet-300 leading-tight">{shift.time}</div>
                        </motion.div>
                      ) : (
                        <div className="h-full w-full"></div>
                      )}
                    </div>
                  )
                })}
              </React.Fragment>
            ))}

            {/* Totals */}
            <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[10px] font-semibold text-slate-600 dark:text-slate-400 text-right">TOTAL</div>
            {[52, 64, 58, 68, 62, 72, 66].map((hours, idx) => (
              <div key={idx} className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded font-mono text-[10px] text-center text-slate-600 dark:text-slate-400">
                <div className="font-semibold">{hours}h</div>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="mt-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Clock className="w-4 h-4" />
            <span>{generating ? 'Génération en cours...' : 'Planning généré en 5 secondes'}</span>
          </div>
          {!generating && (
            <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-[10px] font-semibold">
              ✓ Conforme
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ReviewVideoDemo() {
  const [stats, setStats] = useState({ sent: 0, received: 0 })
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        sent: Math.min(prev.sent + 1, 45),
        received: Math.min(prev.received + 1, 18)
      }))
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full bg-white dark:bg-[#0D1B2A] p-3">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">PilotReview</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Avis Google automatiques</div>
            </div>
          </div>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">Demandes envoyées</div>
            <motion.div 
              className="text-xl font-bold text-amber-600 dark:text-amber-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {stats.sent}
            </motion.div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">Avis reçus</div>
            <motion.div 
              className="text-xl font-bold text-green-600 dark:text-green-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              +{stats.received}
            </motion.div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-800 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-900 dark:text-white mb-2">Activité récente</div>
          {[
            { name: 'Sophie M.', status: 'sent', time: 'Il y a 2h' },
            { name: 'Pierre L.', status: 'reviewed', time: 'Il y a 3h', rating: 5 },
            { name: 'Marie D.', status: 'sent', time: 'Il y a 5h' },
            { name: 'Jean P.', status: 'reviewed', time: 'Il y a 6h', rating: 4 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-2 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-amber-600 dark:text-amber-400">
                    {item.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-[10px] font-medium text-slate-900 dark:text-white">{item.name}</div>
                  <div className="text-[9px] text-slate-500 dark:text-slate-400">{item.time}</div>
                </div>
              </div>
              {item.status === 'sent' ? (
                <Send className="w-4 h-4 text-blue-500" />
              ) : (
                <div className="flex items-center gap-1">
                  {Array.from({ length: item.rating || 5 }).map((_, j) => (
                    <Star key={j} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-600 dark:text-slate-400">Taux de réponse</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">40%</span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
              initial={{ width: 0 }}
              animate={{ width: '40%' }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatbotVideoDemo() {
  const [messages, setMessages] = useState([
    { role: 'user', text: 'Bonjour, avez-vous une table pour 4 ce soir ?', time: '14:23' },
  ])
  
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Bien sûr ! Nous avons une table disponible à 20h. Je vous réserve ?', time: '14:23' }])
    }, 1500)
    
    const timer2 = setTimeout(() => {
      setMessages(prev => [...prev, { role: 'user', text: 'Parfait, merci !', time: '14:24' }])
    }, 3000)
    
    const timer3 = setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Réservation confirmée pour 4 personnes à 20h. À bientôt ! 🍽️', time: '14:24' }])
    }, 4500)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <div className="w-full h-full bg-white dark:bg-[#0D1B2A] p-3">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">PilotBot</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Instagram • En ligne</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Actif</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 space-y-3 overflow-y-auto">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl p-3 ${
                msg.role === 'user'
                  ? 'bg-slate-200 dark:bg-slate-700 rounded-br-none'
                  : 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-bl-none'
              }`}>
                {msg.role === 'assistant' && (
                  <div className="text-[10px] text-blue-100 mb-1 font-medium">PilotBot</div>
                )}
                <div className={`text-xs ${msg.role === 'user' ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
                  {msg.text}
                </div>
                <div className={`text-[9px] mt-1 ${
                  msg.role === 'user' ? 'text-slate-500 dark:text-slate-400' : 'text-blue-100'
                }`}>
                  {msg.time}
                </div>
              </div>
            </motion.div>
          ))}
          
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex justify-start"
            >
              <div className="flex gap-1 px-3 py-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-slate-600 dark:text-slate-400">12 conversations actives</span>
            </div>
          </div>
          <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-[10px] font-semibold">
            ✓ 24/7
          </div>
        </div>
      </div>
    </div>
  )
}

function SMSVideoDemo() {
  const [sentCount, setSentCount] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSentCount(prev => Math.min(prev + 1, 8))
    }, 300)
    return () => clearInterval(interval)
  }, [])

  const employees = ['Marie D.', 'Jean P.', 'Sophie M.', 'Pierre L.', 'Thomas B.', 'Emma D.', 'Lucas M.', 'Chloé R.']

  return (
    <div className="w-full h-full bg-white dark:bg-[#0D1B2A] p-3">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">PilotSMS</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Notifications équipe</div>
            </div>
          </div>
          <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-semibold">
            {sentCount}/8 envoyés
          </div>
        </div>

        {/* Message Preview */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-3 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2">
            <Send className="w-4 h-4 text-green-600 dark:text-green-400" />
            <div className="text-xs font-semibold text-green-700 dark:text-green-400">Planning publié</div>
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded p-2 border border-slate-200 dark:border-slate-700">
            📅 Planning semaine 15 publié ! Votre shift : Lun 9h-17h, Mer 14h-22h, Ven 10h-18h
          </div>
        </div>

        {/* Recipients List */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3 border border-slate-200 dark:border-slate-800 space-y-1.5 overflow-y-auto">
          {employees.slice(0, 6).map((name, i) => {
            const isSent = i < sentCount
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-lg p-2 flex items-center justify-between border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-green-600 dark:text-green-400">
                      {name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] font-medium text-slate-900 dark:text-white">{name}</div>
                    <div className="text-[9px] text-slate-500 dark:text-slate-400">+33 6 XX XX XX XX</div>
                  </div>
                </div>
                {isSent ? (
                  <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[10px] font-semibold">Envoyé</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px]">En attente...</span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-green-600 dark:text-green-400">{sentCount}</span> SMS envoyés sur {employees.length}
          </div>
          <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-semibold">
            Twilio
          </div>
        </div>
      </div>
    </div>
  )
}

export function AutomationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: CalendarCheck2,
      title: "Planning IA",
      subtitle: "Le planning qui se fait… tout seul",
      description: "Génération automatique en 5 secondes, prise en compte des disponibilités & contrats, optimisation heures / repos / postes.",
      highlights: [
        "Génération automatique en 5 secondes",
        "Prise en compte disponibilités & contrats",
        "Optimisation heures / repos / postes",
        "3 versions : Standard, Éco, Staff-friendly",
        "Suggestions intelligentes pour chaque conflit",
      ],
      punchline: "Vous ne construisez plus le planning. ShiftPilot le propose, vous validez.",
      gradient: "from-violet-500/20 to-purple-600/20",
      borderColor: "border-violet-500/30",
      iconColor: "text-violet-400",
      iconBg: "bg-violet-500/20",
    },
    {
      icon: Star,
      title: "PilotReview",
      subtitle: "La machine à booster ta note Google ⭐⭐⭐⭐⭐",
      description: "Envoi automatique des demandes après chaque service, messages optimisés pour convertir, +10 à +20 avis Google par mois.",
      highlights: [
        "Envoi automatique après chaque service",
        "Messages optimisés pour convertir",
        "+10 à +20 avis Google par mois",
        "Tableau de bord clair : taux, avis reçus, évolution",
        "Filtrage anti-bad reviews (optionnel)",
      ],
      punchline: "Votre Google passe de 4.1 → 4.6 en quelques semaines.",
      gradient: "from-amber-500/20 to-yellow-500/20",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/20",
    },
    {
      icon: MessageCircle,
      title: "PilotBot",
      subtitle: "Votre assistant digital sur Insta / Facebook / Site",
      description: "Répond 24/7 sans délai, donne menus, allergènes, horaires, accès, peut prendre des réservations.",
      highlights: [
        "Répond 24/7 sans délai",
        "Donne menus, allergènes, horaires, accès",
        "Peut prendre des réservations",
        "Adapte le ton de votre établissement",
        "Évite 40+ questions répétitives chaque semaine",
      ],
      punchline: "Plus jamais un message laissé sans réponse.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/20",
    },
    {
      icon: Bell,
      title: "PilotSMS",
      subtitle: "Votre messagerie interne automatisée",
      description: "Envoi des shifts par SMS, alertes en cas de modification, messages auto si absence détectée, rappels avant service.",
      highlights: [
        "Envoi des shifts par SMS",
        "Alertes en cas de modification",
        "Messages auto si absence détectée",
        "Rappels avant service",
        "Statut \"lu / non lu\"",
      ],
      punchline: "Tout le monde est toujours aligné, sans discussions.",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      iconColor: "text-green-400",
      iconBg: "bg-green-500/20",
    },
  ]

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-white dark:bg-[#000000] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-white/5 rounded-full text-xs font-semibold tracking-wider uppercase text-black/60 dark:text-white/60 mb-6 border border-black/5 dark:border-white/10">
            <Sparkles className="w-4 h-4" />
            Automatisation complète
          </span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black dark:text-white tracking-tight mb-4">
            ShiftPilot s'occupe de l'opérationnel.{' '}
            <span className="text-black/40 dark:text-white/40">Pendant que vous bossez.</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-black/60 dark:text-white/60 max-w-3xl mx-auto mb-2 leading-relaxed">
            Une solution unique, quatre moteurs qui tournent pour vous.
          </p>
          <p className="text-base sm:text-lg text-black/70 dark:text-white/70 max-w-3xl mx-auto mb-4 leading-relaxed">
            Pendant que vous gérez votre service, ShiftPilot automatise : les plannings, les remplacements, les avis Google, et même les messages clients.
          </p>
          <p className="text-sm sm:text-base font-semibold text-black/80 dark:text-white/80">
            Résultat : <span className="text-accent">moins de charge mentale, plus de clients, plus d'avis, zéro galère.</span>
          </p>
        </motion.div>

        {/* Features Grid avec espacement responsive */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ 
  feature, 
  index, 
  isInView 
}: { 
  feature: {
    icon: any
    title: string
    subtitle: string
    description: string
    highlights: string[]
    punchline: string
    gradient: string
    borderColor: string
    iconColor: string
    iconBg: string
    videoDemo?: string
  }
  index: number
  isInView: boolean
}) {
  const Icon = feature.icon
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // Auto-play video when section is in view
  React.useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsVideoPlaying(true)
      }, 500 + index * 200) // Stagger the start for each card
      return () => clearTimeout(timer)
    }
  }, [isInView, index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative bg-white dark:bg-[#000000] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border-2 ${feature.borderColor} hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:items-center gap-6 sm:gap-8 md:gap-12`}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative z-10 flex-1 md:w-1/2">
        {/* Icon & Title */}
        <div className="flex items-start gap-3 sm:gap-4 mb-4">
          <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-7 h-7 ${feature.iconColor}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-1 group-hover:text-accent transition-colors">
              {feature.title}
            </h3>
            <p className="text-sm text-black/60 dark:text-white/60 italic">
              {feature.subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-base text-black/70 dark:text-white/70 mb-6 leading-relaxed">
          {feature.description}
        </p>

        {/* Video Demo - Auto-playing avec layout vertical mobile */}
        <div className="mb-6 md:mb-0 md:w-1/2 rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 relative group/video">
          <div className="aspect-video relative max-h-[250px] sm:max-h-[350px] md:max-h-none w-full max-w-full h-auto">
            <motion.div 
              className="absolute inset-0 bg-slate-900 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={isVideoPlaying ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Video content - plays automatically */}
              <div className="w-full h-full flex items-center justify-center">
                {index === 0 && <PlanningVideoDemo />}
                {index === 1 && <ReviewVideoDemo />}
                {index === 2 && <ChatbotVideoDemo />}
                {index === 3 && <SMSVideoDemo />}
              </div>
            </motion.div>
            
            {/* Loading state */}
            {!isVideoPlaying && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center"
                initial={{ opacity: 1 }}
                animate={{ opacity: isVideoPlaying ? 0 : 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Thumbnail preview */}
                <div className="absolute inset-0 opacity-30">
                  {index === 0 && <PlanningVideoThumbnail />}
                  {index === 1 && <ReviewVideoThumbnail />}
                  {index === 2 && <ChatbotVideoThumbnail />}
                  {index === 3 && <SMSVideoThumbnail />}
                </div>
                
                {/* Loading spinner */}
                <motion.div 
                  className="w-16 h-16 rounded-full bg-white/95 dark:bg-black/80 flex items-center justify-center shadow-2xl z-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <div 
                    className="w-8 h-8 border-4 border-t-transparent rounded-full"
                    style={{ borderColor: index === 0 ? '#8b5cf6' : index === 1 ? '#f59e0b' : index === 2 ? '#3b82f6' : '#10b981' }}
                  ></div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-2 mb-6">
          {feature.highlights.map((highlight, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 + i * 0.05 }}
              className="flex items-start gap-2 text-sm text-black/60 dark:text-white/60"
            >
              <span className={`${feature.iconColor} mt-0.5 flex-shrink-0`}>
                <Zap className="w-4 h-4" />
              </span>
              <span>{highlight}</span>
            </motion.li>
          ))}
        </ul>

        {/* Punchline */}
        <div className="pt-4 border-t border-black/5 dark:border-white/10">
          <p className={`text-sm font-semibold ${feature.iconColor}`}>
            {feature.punchline}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

