'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Invoice, PaymentMethod } from '@/lib/types'

export function useBilling() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchBillingData()
  }, [])

  const fetchBillingData = async () => {
    try {
      // In a real app, this would call your backend which proxies to Stripe
      // For now, we'll fetch from our Supabase tables if we were syncing them,
      // or just return mock data since we don't have the Stripe sync set up yet.
      
      // Mock data for now as per instructions to make it "functional" for demo
      const mockInvoices: Invoice[] = [
        {
          id: 'inv_1',
          number: 'INV-001',
          amount_due: 2900,
          amount_paid: 2900,
          status: 'paid',
          created: Date.now() / 1000 - 86400 * 30,
          invoice_pdf: '#'
        },
        {
          id: 'inv_2',
          number: 'INV-002',
          amount_due: 2900,
          amount_paid: 2900,
          status: 'paid',
          created: Date.now() / 1000 - 86400 * 60,
          invoice_pdf: '#'
        }
      ]
      setInvoices(mockInvoices)

      const mockPaymentMethod: PaymentMethod = {
        id: 'pm_1',
        brand: 'visa',
        last4: '4242',
        exp_month: 12,
        exp_year: 2025
      }
      setPaymentMethod(mockPaymentMethod)

    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    invoices,
    paymentMethod,
    isLoading,
    refetch: fetchBillingData
  }
}

