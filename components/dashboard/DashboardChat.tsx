'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { messageService } from '@/lib/services'
import { toast } from 'sonner'

export default function DashboardChat() {
  const { restaurant, user } = useAuth()
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!restaurant?.id) return

    // 1. Load initial messages
    const loadMessages = async () => {
      try {
        const data = await messageService.getMessages(restaurant.id)
        setMessages(data)
      } catch (error) {
        console.error('Error loading messages:', error)
        toast.error('Impossible de charger le chat')
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()

    // 2. Subscribe to new messages
    const subscription = messageService.subscribeToMessages(restaurant.id, (payload) => {
      // Fetch the sender profile to display name/avatar correctly
      // For now we just optimistically add, in real app we might want to fetch the full row with join
      setMessages((prev) => [...prev, payload.new])
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [restaurant?.id])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !user || !restaurant) return

    try {
      await messageService.sendMessage({
        restaurant_id: restaurant.id,
        sender_id: user.id,
        content: newMessage,
        // channel: 'general' // Removed as it's not in the type definition
      })
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Erreur lors de l\'envoi')
    }
  }

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-[#1C1C1E] rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-900 dark:text-white">Discussion d'équipe</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Canal Général</p>
        </div>
        <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 ring-4 ring-green-500/20"></span>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-black/20">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="size-6 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-slate-400 dark:text-slate-600 py-8 text-sm">
            Aucun message. Dites bonjour à l'équipe ! 👋
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender_id === user?.id
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${isMe ? 'bg-accent text-white' : 'bg-white dark:bg-white/10 text-slate-900 dark:text-white'} rounded-2xl px-4 py-2 shadow-sm`}>
                  {!isMe && msg.sender && (
                    <p className="text-[10px] font-bold opacity-70 mb-1">{msg.sender.first_name}</p>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-white/70' : 'text-slate-400'}`}>
                    {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-[#1C1C1E] border-t border-slate-200 dark:border-white/5 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Écrivez un message..."
          className="flex-1 bg-slate-100 dark:bg-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
        />
        <button 
          type="submit" 
          disabled={!newMessage.trim()}
          className="size-11 flex items-center justify-center bg-accent text-white rounded-xl hover:bg-accent/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-accent/20"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
        </button>
      </form>
    </div>
  )
}

