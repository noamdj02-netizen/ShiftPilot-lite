'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function PilotReviewPage() {
  const stats = [
    { label: 'Avis ce mois-ci', value: '+18', trend: '+5 vs mois dernier' },
    { label: 'Note moyenne', value: '4.7/5', trend: '+0.3 depuis 3 mois' },
    { label: 'Taux de réponse', value: '72%', trend: '+12% ce mois' },
    { label: 'Demandes envoyées', value: '124', trend: 'Ce mois' }
  ]

  const recentReviews = [
    { name: 'Marie L.', rating: 5, comment: 'Excellent service et cuisine délicieuse !', date: 'Il y a 2h', platform: 'Google' },
    { name: 'Jean D.', rating: 4, comment: 'Très bon restaurant, ambiance sympa', date: 'Il y a 5h', platform: 'Google' },
    { name: 'Sophie M.', rating: 5, comment: 'Je recommande vivement !', date: 'Hier', platform: 'Google' }
  ]

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
    </div>
  )
}
