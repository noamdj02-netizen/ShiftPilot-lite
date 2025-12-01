'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadUser()
    loadMessages()
    setupRealtime()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadUser = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setCurrentUser(profile)
    }
  }

  const loadMessages = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single()

      if (!profile?.organization_id) {
        setIsLoading(false)
        return
      }

      // Fetch messages from channels table (if exists) or use a simple approach
      // For now, we'll create a simple messaging interface
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(first_name, last_name, email, avatar_url)
        `)
        .eq('organization_id', profile.organization_id)
        .order('created_at', { ascending: true })
        .limit(50)

      if (error) {
        // If messages table doesn't exist, just show empty state
        console.log('Messages table may not exist:', error)
        setMessages([])
      } else {
        setMessages(data || [])
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const setupRealtime = () => {
    const supabase = createClient()
    
    // Subscribe to new messages
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          loadMessages() // Reload messages when new one is added
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single()

      if (!profile?.organization_id) {
        toast.error('Organisation non trouvée')
        return
      }

      // Try to insert message
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          organization_id: profile.organization_id,
          content: newMessage.trim(),
          channel_id: profile.organization_id // Use org as default channel
        })

      if (error) {
        // If table doesn't exist, show a helpful message
        if (error.code === '42P01') {
          toast.info('La messagerie sera disponible après la configuration de la base de données')
        } else {
          throw error
        }
      } else {
        setNewMessage('')
        loadMessages()
      }
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Erreur lors de l\'envoi')
    }
  }

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Messagerie</h1>
        <p className="text-slate-400 mt-1">Communiquez avec votre équipe</p>
      </div>

      <div className="flex-1 bg-[#1C1C1E] rounded-2xl border border-white/5 flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="size-10 border-4 border-[#6C63FF]/30 border-t-[#6C63FF] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-500">Chargement des messages...</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <span className="material-symbols-outlined text-6xl text-slate-500 mb-4">chat_bubble_outline</span>
                <p className="text-slate-400 mb-2">Aucun message</p>
                <p className="text-sm text-slate-500">Commencez la conversation !</p>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => {
              const isOwn = msg.sender_id === currentUser?.id
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isOwn ? 'bg-[#6C63FF]' : 'bg-slate-700'
                  }`}>
                    {msg.sender?.first_name?.[0] || msg.sender?.email?.[0] || '?'}
                  </div>
                  <div className={`flex-1 max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className={`rounded-2xl px-4 py-2 ${
                      isOwn 
                        ? 'bg-[#6C63FF] text-white' 
                        : 'bg-white/5 text-slate-300'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 px-2">
                      {msg.sender?.first_name} {msg.sender?.last_name} • {formatTime(msg.created_at)}
                    </p>
                  </div>
                </motion.div>
              )
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-white/5 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Tapez votre message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="bg-[#6C63FF] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#5a52d5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span className="material-symbols-outlined">send</span>
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

