'use client'

import { PaymentMethod } from '@/lib/types'

interface PaymentMethodFormProps {
  paymentMethod: PaymentMethod | null
}

export function PaymentMethodForm({ paymentMethod }: PaymentMethodFormProps) {
  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Moyen de paiement</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Gérez vos cartes bancaires</p>
        </div>
        <button className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
          + Ajouter
        </button>
      </div>

      {paymentMethod ? (
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-white dark:bg-white/10 rounded border border-slate-200 dark:border-white/10 flex items-center justify-center">
              {/* Simple Visa/MC Icon Placeholder */}
              <div className="flex gap-0.5">
                <div className="size-3 rounded-full bg-red-500/80" />
                <div className="size-3 rounded-full bg-orange-500/80 -ml-1.5" />
              </div>
            </div>
            <div>
              <p className="font-medium text-slate-900 dark:text-white capitalize">
                {paymentMethod.brand} •••• {paymentMethod.last4}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Expire le {paymentMethod.exp_month}/{paymentMethod.exp_year}
              </p>
            </div>
          </div>
          <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      ) : (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 rounded-xl border border-dashed border-slate-300 dark:border-white/10">
          Aucun moyen de paiement enregistré
        </div>
      )}
    </div>
  )
}

