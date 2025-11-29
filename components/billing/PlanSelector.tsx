'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    features: ['Jusqu\'à 5 employés', 'Planning basique', 'Support email']
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    popular: true,
    features: ['Jusqu\'à 20 employés', 'Planning avancé', 'Support prioritaire', 'Exports RH']
  },
  {
    id: 'business',
    name: 'Business',
    price: 149,
    features: ['Employés illimités', 'Multi-sites', 'API Access', 'Manager dédié']
  }
]

export function PlanSelector() {
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [isYearly, setIsYearly] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="bg-slate-100 dark:bg-white/5 p-1 rounded-xl flex items-center">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              !isYearly ? 'bg-white dark:bg-[#1C1C1E] shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              isYearly ? 'bg-white dark:bg-[#1C1C1E] shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Annuel
            <span className="text-[10px] bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded-full">-20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
              selectedPlan === plan.id
                ? 'border-accent bg-accent/5 dark:bg-accent/10'
                : 'border-slate-200 dark:border-white/5 bg-white dark:bg-[#1C1C1E] hover:border-accent/50'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full shadow-sm">
                POPULAIRE
              </div>
            )}
            <h4 className="font-bold text-slate-900 dark:text-white">{plan.name}</h4>
            <div className="mt-2 mb-4">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {isYearly ? Math.round(plan.price * 0.8) : plan.price}€
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-sm">/mois</span>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-green-500 text-[18px]">check</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className={`w-4 h-4 rounded-full border-2 ml-auto ${
              selectedPlan === plan.id ? 'border-accent bg-accent' : 'border-slate-300 dark:border-white/20'
            }`} />
          </div>
        ))}
      </div>
    </div>
  )
}

