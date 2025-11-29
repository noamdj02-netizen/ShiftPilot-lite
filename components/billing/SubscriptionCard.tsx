'use client'

import { Subscription } from '@/lib/types'
import { motion } from 'framer-motion'

interface SubscriptionCardProps {
  subscription: Subscription | null
  isLoading: boolean
}

export function SubscriptionCard({ subscription, isLoading }: SubscriptionCardProps) {
  if (isLoading) {
    return <div className="h-48 bg-white dark:bg-[#1C1C1E] rounded-2xl animate-pulse" />
  }

  const planName = subscription?.plan ? 
    subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1) 
    : 'Free'

  const statusColor = subscription?.status === 'active' ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30' : 'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-white/10'

  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Votre Abonnement</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Gérez votre plan et votre facturation</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>
          {subscription?.status?.toUpperCase() || 'GRATUIT'}
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-bold text-slate-900 dark:text-white">{planName}</span>
        <span className="text-slate-500 dark:text-slate-400">/ mois</span>
      </div>

      <div className="space-y-4 mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Prochain renouvellement</span>
          <span className="font-medium text-slate-900 dark:text-white">
            {subscription?.current_period_end 
              ? new Date(subscription.current_period_end).toLocaleDateString() 
              : '-'}
          </span>
        </div>
        
        <div className="w-full h-px bg-slate-200 dark:bg-white/5" />
        
        <div className="flex gap-3">
          <button className="flex-1 py-2 bg-slate-900 dark:bg-white text-white dark:text-black font-medium rounded-xl text-sm hover:opacity-90 transition-opacity">
            Changer de plan
          </button>
          <button className="py-2 px-4 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-medium rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}

