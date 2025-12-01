'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function EmployeeMessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [organizationId, setOrganizationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

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
    
    if (!user) {
      router.push('/login')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*, organization_id')
      .eq('id', user.id)
      .single()

    setCurrentUser(profile)
    setOrganizationId(profile?.organization_id || null)
  }

  const loadMessages = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user || !organizationId) {
        setLoading(false)
        return
      }

      // Get default channel (general channel for organization)
      const { data: channels } = await supabase
        .from('message_channels')
        .select('id')
        .eq('organization_id', organizationId)
        .eq('type', 'TEAM')
        .limit(1)
        .single()

      if (!channels) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey(first_name, last_name, email, avatar_url)
        `)
        .eq('channel_id', channels.id)
        .order('created_at', { ascending: true })
        .limit(50)

      if (error) {
        console.log('Messages table may not exist:', error)
        setMessages([])
      } else {
        setMessages(data || [])
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const setupRealtime = () => {
    if (!organizationId) return

    const supabase = createClient()
    
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          loadMessages()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUser || !organizationId) return

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      // Get default channel
      const { data: channel } = await supabase
        .from('message_channels')
        .select('id')
        .eq('organization_id', organizationId)
        .eq('type', 'TEAM')
        .limit(1)
        .single()

      if (!channel) {
        toast.error('Canal de messagerie non trouvé')
        return
      }

      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          organization_id: organizationId,
          content: newMessage.trim(),
          channel_id: channel.id
        } as any)

      if (error) {
        if (error.code === '42P01') {
          toast.info('La messagerie sera disponible après la configuration de la base de données')
        } else {
          throw error
        }
      } else {
        setNewMessage('')
        loadMessages()
      }
    } catch (error: any) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="size-12 border-4 border-[#6C63FF]/30 border-t-[#6C63FF] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] pb-20 flex flex-col">
      {/* Header */}
      <div className="bg-[#1C1C1E] border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/employee"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h1 className="text-xl font-bold text-white">Messagerie</h1>
            <div className="w-10" />
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-4xl mx-auto w-full">
        {messages.length === 0 ? (
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
                  isOwn ? 'bg-[#6C63FF] text-white' : 'bg-slate-700 text-white'
                }`}>
                  {msg.sender?.first_name?.[0] || msg.sender?.email?.[0] || '?'}
                </div>
                <div className={`flex-1 max-w-[75%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
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
      <div className="bg-[#1C1C1E] border-t border-white/5 sticky bottom-20 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
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
              <span className="hidden sm:inline">Envoyer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1C1C1E] border-t border-white/5 z-50">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            <Link
              href="/dashboard/employee"
              className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined">home</span>
              <span className="text-xs">Accueil</span>
            </Link>
            <Link
              href="/dashboard/employee/schedule"
              className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              <span className="text-xs">Planning</span>
            </Link>
            <Link
              href="/dashboard/employee/timeoff"
              className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined">beach_access</span>
              <span className="text-xs">Congés</span>
            </Link>
            <Link
              href="/dashboard/employee/messages"
              className="flex flex-col items-center gap-1 p-2 text-[#6C63FF]"
            >
              <span className="material-symbols-outlined">chat</span>
              <span className="text-xs font-medium">Messages</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

