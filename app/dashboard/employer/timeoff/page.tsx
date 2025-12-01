'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export default function TimeOffPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single()

      if (!profile?.organization_id) {
        setIsLoading(false)
        return
      }

      // Fetch time off requests for the organization
      const { data, error } = await supabase
        .from('time_off_requests')
        .select(`
          *,
          profile:profiles!time_off_requests_profile_id_fkey(first_name, last_name, email)
        `)
        .eq('organization_id', profile.organization_id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading requests:', error)
        toast.error('Erreur lors du chargement')
      } else {
        setRequests(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Erreur lors du chargement')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected', comment?: string) => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      const { error } = await supabase
        .from('time_off_requests')
        .update({
          status,
          approved_by: user.id,
          approved_at: new Date().toISOString(),
          comment
        })
        .eq('id', id)

      if (error) {
        throw error
      }

      toast.success(`Demande ${status === 'approved' ? 'approuvée' : 'refusée'}`)
      loadRequests()
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Erreur lors de la mise à jour')
    }
  }

  const pendingRequests = requests.filter(r => r.status === 'PENDING')
  const approvedRequests = requests.filter(r => r.status === 'approved')
  const rejectedRequests = requests.filter(r => r.status === 'rejected')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Demandes de congés</h1>
        <p className="text-slate-400 mt-1">Gérez les demandes de congés de vos employés</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#1C1C1E] rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">En attente</span>
            <span className="material-symbols-outlined text-yellow-500">schedule</span>
          </div>
          <p className="text-3xl font-bold text-white">{pendingRequests.length}</p>
        </div>
        <div className="bg-[#1C1C1E] rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Approuvées</span>
            <span className="material-symbols-outlined text-green-500">check_circle</span>
          </div>
          <p className="text-3xl font-bold text-white">{approvedRequests.length}</p>
        </div>
        <div className="bg-[#1C1C1E] rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Refusées</span>
            <span className="material-symbols-outlined text-red-500">cancel</span>
          </div>
          <p className="text-3xl font-bold text-white">{rejectedRequests.length}</p>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-[#1C1C1E] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Employé</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Motif</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Chargement...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <span className="material-symbols-outlined mb-2 text-4xl">beach_access</span>
                    <p className="mt-2">Aucune demande de congé</p>
                  </td>
                </tr>
              ) : (
                requests.map((req, i) => (
                  <motion.tr
                    key={req.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#6C63FF]/20 flex items-center justify-center text-xs font-bold text-[#6C63FF]">
                          {req.profile?.first_name?.[0]}{req.profile?.last_name?.[0]}
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {req.profile?.first_name} {req.profile?.last_name}
                          </p>
                          <p className="text-xs text-slate-500">{req.profile?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{req.type || 'Congé'}</td>
                    <td className="px-6 py-4 text-slate-300">
                      {new Date(req.start_date).toLocaleDateString('fr-FR')} - {new Date(req.end_date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-slate-400 italic text-sm">
                      {req.reason || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        req.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                        req.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {req.status === 'approved' ? 'Approuvé' : req.status === 'rejected' ? 'Refusé' : 'En attente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {req.status === 'PENDING' && (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStatusUpdate(req.id, 'approved')}
                            className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                            title="Approuver"
                          >
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(req.id, 'rejected')}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Refuser"
                          >
                            <span className="material-symbols-outlined text-lg">cancel</span>
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

