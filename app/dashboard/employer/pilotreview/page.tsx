'use client'

import { motion } from 'framer-motion'

export default function PilotReviewPage() {
  const stats = [
    { label: 'Avis ce mois-ci', value: '+18', icon: '⭐', trend: '+5 vs mois dernier' },
    { label: 'Note moyenne', value: '4.7/5', icon: '📊', trend: '+0.3 depuis 3 mois' },
    { label: 'Taux de réponse', value: '72%', icon: '📈', trend: '+12% ce mois' },
    { label: 'Demandes envoyées', value: '124', icon: '📱', trend: 'Ce mois' }
  ]

  const recentReviews = [
    { name: 'Marie L.', rating: 5, comment: 'Excellent service et cuisine délicieuse !', date: 'Il y a 2h', platform: 'Google' },
    { name: 'Jean D.', rating: 4, comment: 'Très bon restaurant, ambiance sympa', date: 'Il y a 5h', platform: 'Google' },
    { name: 'Sophie M.', rating: 5, comment: 'Je recommande vivement !', date: 'Hier', platform: 'Google' }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl">⭐</div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">PilotReview</h1>
            <p className="text-slate-600 dark:text-slate-400">Boostez vos avis Google automatiquement</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
          📤 Envoyer une demande
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
            <span className="text-3xl mb-3 block">{stat.icon}</span>
            <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white my-1">{stat.value}</p>
            <p className="text-sm text-green-600 dark:text-green-400">{stat.trend}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span>🌟</span> Avis récents
          </h2>
          <div className="space-y-4">
            {recentReviews.map((review, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{review.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{review.date} • {review.platform}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => <span key={i} className="text-yellow-500">★</span>)}
                  </div>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-8 text-white">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-2">+18 avis ce mois</h3>
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

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span>⚙️</span> Paramètres d'envoi
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <span className="text-sm text-slate-700 dark:text-slate-300">Envoi automatique après service</span>
                <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <span className="text-sm text-slate-700 dark:text-slate-300">Délai d'envoi</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">2 heures</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <span className="text-sm text-slate-700 dark:text-slate-300">Max par client/mois</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">1 fois</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
