'use client'

import { useSubscription } from '@/hooks/useSubscription'
import { useBilling } from '@/hooks/useBilling'
import { SubscriptionCard } from '@/components/billing/SubscriptionCard'
import { PlanSelector } from '@/components/billing/PlanSelector'
import { PaymentMethodForm } from '@/components/billing/PaymentMethodForm'
import { InvoicesList } from '@/components/billing/InvoicesList'

export default function BillingPage() {
  const { subscription, isLoading: subLoading } = useSubscription()
  const { invoices, paymentMethod, isLoading: billingLoading } = useBilling()

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Facturation</h1>
        <p className="text-slate-500 dark:text-slate-400">Gérez votre abonnement et vos informations de paiement</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Subscription & Payment */}
        <div className="space-y-8">
          <SubscriptionCard subscription={subscription} isLoading={subLoading} />
          <PaymentMethodForm paymentMethod={paymentMethod} />
        </div>

        {/* Right Column - Plans & Invoices */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Plans disponibles</h3>
            <PlanSelector />
          </div>
          
          <InvoicesList invoices={invoices} />
        </div>
      </div>
    </div>
  )
}

