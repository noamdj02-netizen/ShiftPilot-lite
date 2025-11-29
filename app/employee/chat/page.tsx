'use client'

import { useState } from 'react'

export default function EmployeeChatPage() {
  const [message, setMessage] = useState('')
  
  // Mock messages for UI
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Manager', content: 'Bonjour à tous, le planning de la semaine prochaine est en ligne !', time: '10:30', isMe: false },
    { id: 2, sender: 'Moi', content: 'Merci ! Je peux échanger mon shift de mardi ?', time: '10:32', isMe: true },
    { id: 3, sender: 'Sarah', content: 'Je peux le prendre si tu veux, j\'ai besoin d\'heures.', time: '10:35', isMe: false },
  ])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    
    setMessages([...messages, {
      id: messages.length + 1,
      sender: 'Moi',
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    }])
    setMessage('')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] md:h-full">
      <div className="p-4 border-b border-slate-200 dark:border-white/10">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Équipe</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Canal général</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
              msg.isMe 
                ? 'bg-accent text-white rounded-tr-sm' 
                : 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white rounded-tl-sm'
            }`}>
              {!msg.isMe && <p className="text-[10px] font-bold opacity-60 mb-0.5">{msg.sender}</p>}
              <p className="text-sm">{msg.content}</p>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
          </div>
        ))}
      </div>

      <div className="p-3 bg-white dark:bg-[#1C1C1E] border-t border-slate-200 dark:border-white/10">
        <form onSubmit={handleSend} className="flex gap-2">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre message..."
            className="flex-1 bg-slate-100 dark:bg-white/5 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
          />
          <button 
            type="submit"
            className="size-10 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent/90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      </div>
    </div>
  )
}

