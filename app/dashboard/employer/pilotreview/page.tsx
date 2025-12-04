'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

export default function PilotReviewPage() {
  const { profile } = useAuth()
  const [stats, setStats] = useState([
    { label: 'Avis ce mois-ci', value: '+18', trend: '+5 vs mois dernier' },
    { label: 'Note moyenne', value: '4.7/5', trend: '+0.3 depuis 3 mois' },
    { label: 'Taux de réponse', value: '72%', trend: '+12% ce mois' },
    { label: 'Demandes envoyées', value: '124', trend: 'Ce mois' }
  ])
  const [recentReviews, setRecentReviews] = useState<any[]>([])
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [requestData, setRequestData] = useState({ email: '', name: '', phone: '' })
  useEffect(() => {
    if (profile?.organization_id) {
      loadStats()
      loadReviews()
    }
  }, [profile])

  const loadStats = async () => {
    try {
      const response = await fetch('/api/reviews/stats')
      if (response.ok) {
        const data = await response.json()
        setStats([
          { label: 'Avis ce mois-ci', value: `+${data.thisMonth}`, trend: `+${data.thisMonth} ce mois` },
          { label: 'Note moyenne', value: `${data.average}/5`, trend: `Moyenne` },
          { label: 'Taux de réponse', value: `${data.responseRate}%`, trend: 'Taux' },
          { label: 'Demandes envoyées', value: `${data.requestsThisMonth}`, trend: 'Ce mois' }
        ])
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const loadReviews = async () => {
    try {
      const response = await fetch('/api/reviews/list?limit=10')
      if (response.ok) {
        const data = await response.json()
        setRecentReviews(data.map((review: any) => ({
          name: review.reviewer_name || 'Anonyme',
          rating: review.rating,
          comment: review.comment,
          date: new Date(review.created_at).toLocaleString('fr-FR'),
          platform: 'Google'
        })))
      }
    } catch (error) {
      console.error('Error loading reviews:', error)
    }
  }

  const handleSendRequest = async () => {
    if (!requestData.email) {
      toast.error('Email requis')
      return
    }

    try {
      const response = await fetch('/api/reviews/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      })

      if (!response.ok) throw new Error('Erreur lors de l\'envoi')

      toast.success('Demande d\'avis envoyée avec succès !')
      setShowRequestModal(false)
      setRequestData({ email: '', name: '', phone: '' })
      loadStats()
    } catch (error) {
      console.error('Error sending request:', error)
      toast.error('Erreur lors de l\'envoi de la demande')
    }
  }

  return (
    <div className="space-y-8 relative z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center text-yellow-600 dark:text-yellow-400"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Star size={20} />
          </motion.div>
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">PilotReview</h1>
            <p className="text-black/60 dark:text-white/60">Boostez vos avis Google automatiquement</p>
          </div>
        </div>
        <button 
          onClick={() => setShowRequestModal(true)}
          className="px-4 md:px-6 py-2 md:py-3 theme-primary hover:theme-primary text-white rounded-full font-medium shadow-lg transition-all text-sm md:text-base"
          style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px var(--theme-primary)40' }}
        >
          Envoyer une demande
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
            <p className="text-black/60 dark:text-white/60 text-xs md:text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-2xl md:text-3xl font-semibold text-black dark:text-white my-1">{stat.value}</p>
            <p className="text-xs md:text-sm text-green-600 dark:text-green-400">{stat.trend}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-4">
            Avis récents
          </h2>
          <div className="space-y-4">
            {recentReviews.map((review, i) => (
              <div key={i} className="p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-black dark:text-white">{review.name}</p>
                    <p className="text-xs text-black/60 dark:text-white/60">{review.date} • {review.platform}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => <span key={i} className="text-yellow-500">★</span>)}
                  </div>
                </div>
                <p className="text-sm text-black dark:text-white">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="theme-primary rounded-lg p-6 md:p-8 text-white">
            <h3 className="text-xl md:text-2xl font-semibold mb-2">+18 avis ce mois</h3>
            <p className="text-white/90 mb-6">Vous avez augmenté vos avis de 45% grâce à PilotReview</p>
            <div className="flex gap-2">
              <div className="flex-1 bg-white/20 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">4.7</p>
                <p className="text-xs text-white/80">Note moy.</p>
              </div>
              <div className="flex-1 bg-white/20 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">72%</p>
                <p className="text-xs text-white/80">Réponse</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm">
            <h3 className="font-semibold text-black dark:text-white mb-4">
              Paramètres d'envoi
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/5 dark:bg-white/5">
                <span className="text-sm text-black dark:text-white">Envoi automatique après service</span>
                <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/5 dark:bg-white/5">
                <span className="text-sm text-black dark:text-white">Délai d'envoi</span>
                <span className="text-sm font-medium text-black dark:text-white">2 heures</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/5 dark:bg-white/5">
                <span className="text-sm text-black dark:text-white">Max par client/mois</span>
                <span className="text-sm font-medium text-black dark:text-white">1 fois</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Envoyer Demande */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#1C1C1E] rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-black dark:text-white mb-4">Envoyer une demande d'avis</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Email du client *</label>
                <input
                  type="email"
                  value={requestData.email}
                  onChange={(e) => setRequestData({ ...requestData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-black dark:text-white"
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Nom (optionnel)</label>
                <input
                  type="text"
                  value={requestData.name}
                  onChange={(e) => setRequestData({ ...requestData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-black dark:text-white"
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Téléphone (optionnel)</label>
                <input
                  type="tel"
                  value={requestData.phone}
                  onChange={(e) => setRequestData({ ...requestData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-black dark:text-white"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSendRequest}
                className="flex-1 px-4 py-2 theme-primary text-white rounded-lg font-medium"
              >
                Envoyer
              </button>
              <button
                onClick={() => {
                  setShowRequestModal(false)
                  setRequestData({ email: '', name: '', phone: '' })
                }}
                className="flex-1 px-4 py-2 bg-slate-100 dark:bg-white/5 text-black dark:text-white rounded-lg font-medium"
              >
                Annuler
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
