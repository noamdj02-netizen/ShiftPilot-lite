'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Notification {
  id: string
  icon: string
  title: string
  message: string
  timestamp: Date
  read: boolean
  type: 'planning' | 'message' | 'alert'
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      icon: '📅',
      title: 'Nouveau shift disponible',
      message: 'Un shift de lundi 18h-22h a été ajouté',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
      read: false,
      type: 'planning'
    },
    {
      id: '2',
      icon: '💬',
      title: 'Message du manager',
      message: 'Peux-tu me confirmer ta présence?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      read: false,
      type: 'message'
    },
    {
      id: '3',
      icon: '⚠️',
      title: 'Absence non confirmée',
      message: 'Le shift du 25/12 est en attente de confirmation',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
      type: 'alert'
    },
    {
      id: '4',
      icon: '✅',
      title: 'Planning validé',
      message: 'Votre planning pour la semaine a été validé',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      type: 'planning'
    },
    {
      id: '5',
      icon: '📢',
      title: 'Annonce importante',
      message: 'Mise à jour des horaires de fermeture',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
      type: 'alert'
    }
  ])

  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'planning' | 'message'>('all')

  const tabs = [
    { id: 'all', label: 'Tous', count: notifications.length },
    { id: 'unread', label: 'Non lus', count: notifications.filter(n => !n.read).length },
    { id: 'planning', label: 'Planning', count: notifications.filter(n => n.type === 'planning').length },
    { id: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length }
  ]

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'all') return true
    if (activeTab === 'unread') return !n.read
    if (activeTab === 'planning') return n.type === 'planning'
    if (activeTab === 'message') return n.type === 'message'
    return true
  })

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const handleClearAll = () => {
    setNotifications(notifications.filter(n => n.read))
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 1000 / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return 'À l\'instant'
    if (minutes < 60) return `il y a ${minutes}m`
    if (hours < 24) return `il y a ${hours}h`
    if (days < 7) return `il y a ${days}j`
    return date.toLocaleDateString('fr-FR')
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Notifications</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Restez informé de vos shifts</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-2 inline-block px-2 py-0.5 text-xs rounded-full ${
                activeTab === tab.id
                  ? 'bg-white/30'
                  : 'bg-slate-200 dark:bg-white/10'
              }`}>
                {tab.count}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Clear Button */}
      {notifications.filter(n => n.read).length > 0 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClearAll}
          className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:underline"
        >
          Effacer les lues
        </motion.button>
      )}

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, idx) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleMarkAsRead(notification.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                notification.read
                  ? 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/5'
                  : 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800/50'
              }`}
            >
              <div className="flex gap-3">
                {/* Icon */}
                <div className="text-2xl flex-shrink-0 pt-1">{notification.icon}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-semibold ${
                      notification.read
                        ? 'text-slate-900 dark:text-white'
                        : 'text-purple-900 dark:text-purple-200'
                    }`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className={`text-sm line-clamp-2 ${
                    notification.read
                      ? 'text-slate-600 dark:text-slate-400'
                      : 'text-purple-700 dark:text-purple-300'
                  }`}>
                    {notification.message}
                  </p>
                  <p className="text-xs mt-2 text-slate-400 dark:text-slate-500">
                    {formatTime(notification.timestamp)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-slate-500 dark:text-slate-400">
              {activeTab === 'all' ? 'Aucune notification' : 'Aucune notification dans cette catégorie'}
            </p>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800/50 rounded-xl p-4 mt-6">
        <p className="text-sm text-purple-900 dark:text-purple-300">
          <span className="font-bold">🔔 Note:</span> Cliquez sur une notification pour la marquer comme lue.
        </p>
      </div>
    </div>
  )
}
