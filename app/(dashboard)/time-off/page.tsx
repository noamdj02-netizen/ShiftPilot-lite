'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { timeOffService } from '@/lib/services'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function TimeOffPage() {
  const { restaurant } = useAuth()
  const [requests, setRequests] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!restaurant?.id) return
    loadRequests()
  }, [restaurant?.id])

  const loadRequests = async () => {
    try {
      const data = await timeOffService.getRequests(restaurant.id)
      setRequests(data || [])
    } catch (error) {
      console.error('Error loading requests:', error)
      toast.error('Impossible de charger les demandes')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await timeOffService.updateStatus(id, status)
      toast.success(`Demande ${status === 'approved' ? 'approuvée' : 'refusée'}`)
      loadRequests() // Reload to reflect changes
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Erreur lors de la mise à jour')
    }
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Congés & Absences
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Validez les demandes de vos collaborateurs
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Employé</th>
                <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Type</th>
                <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Dates</th>
                <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Motif</th>
                <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Statut</th>
                <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    Chargement...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    Aucune demande en attente.
                  </td>
                </tr>
              ) : (
                requests.map((req, i) => (
                  <motion.tr 
                    key={req.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {req.employee?.first_name} {req.employee?.last_name}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {req.type}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {new Date(req.start_date).toLocaleDateString()} - {new Date(req.end_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 italic">
                      {req.reason || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        req.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                        req.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {req.status === 'approved' ? 'Approuvé' : req.status === 'rejected' ? 'Refusé' : 'En attente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {req.status === 'pending' && (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleStatusUpdate(req.id, 'approved')}
                            className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                            title="Approuver"
                          >
                            <span className="material-symbols-outlined">check_circle</span>
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(req.id, 'rejected')}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Refuser"
                          >
                            <span className="material-symbols-outlined">cancel</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

