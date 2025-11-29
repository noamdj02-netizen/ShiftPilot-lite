'use client'

import { Invoice } from '@/lib/types'

interface InvoicesListProps {
  invoices: Invoice[]
}

export function InvoicesList({ invoices }: InvoicesListProps) {
  return (
    <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-white/5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Historique des factures</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400">
            <tr>
              <th className="px-6 py-3 font-medium">Numéro</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Montant</th>
              <th className="px-6 py-3 font-medium">Statut</th>
              <th className="px-6 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-white/5">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                  {invoice.number}
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                  {new Date(invoice.created * 1000).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-slate-900 dark:text-white">
                  {(invoice.amount_due / 100).toFixed(2)}€
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    invoice.status === 'paid' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {invoice.status === 'paid' ? 'Payée' : invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <a 
                    href={invoice.invoice_pdf} 
                    className="text-accent hover:text-accent/80 font-medium inline-flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    PDF
                  </a>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                  Aucune facture disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

