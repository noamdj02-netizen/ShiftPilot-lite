'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function EmployeeTimeOffPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    reason: ''
  })
  const router = useRouter()

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Get employee record
      const { data: employee } = await supabase
        .from('employees')
        .select('id, organization_id')
        .eq('profile_id', user.id)
        .single()

      if (!employee) {
        setLoading(false)
        return
      }

      const { data: requestsData } = await supabase
        .from('time_off_requests')
        .select('*')
        .eq('employee_id', employee.id)
        .order('created_at', { ascending: false })

      setRequests(requestsData || [])
    } catch (error) {
      console.error('Error loading requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      // Get employee record
      const { data: employee } = await supabase
        .from('employees')
        .select('id, organization_id, location_id')
        .eq('profile_id', user.id)
        .single()

      if (!employee) {
        toast.error('Profil employé non trouvé')
        return
      }

      const { error } = await supabase
        .from('time_off_requests')
        .insert({
          employee_id: employee.id,
          organization_id: employee.organization_id,
          location_id: employee.location_id,
          start_date: formData.start_date,
          end_date: formData.end_date,
          reason: formData.reason,
          status: 'PENDING'
        } as any)

      if (error) throw error

      toast.success('Demande de congé envoyée')
      setShowForm(false)
      setFormData({ start_date: '', end_date: '', reason: '' })
      loadRequests()
    } catch (error: any) {
      console.error('Error submitting request:', error)
      toast.error('Erreur lors de l\'envoi de la demande')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-500/20 text-green-400'
      case 'REJECTED':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-yellow-500/20 text-yellow-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'Approuvé'
      case 'REJECTED':
        return 'Refusé'
      default:
        return 'En attente'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="size-12 border-4 border-[#6C63FF]/30 border-t-[#6C63FF] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] pb-20">
      {/* Header */}
      <div className="bg-[#1C1C1E] border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/employee"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <h1 className="text-xl font-bold text-white">Mes Congés</h1>
            <button
              onClick={() => setShowForm(true)}
              className="w-10 h-10 rounded-full bg-[#6C63FF] flex items-center justify-center text-white hover:bg-[#5a52d5] transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Request Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#1C1C1E] rounded-2xl p-6 max-w-md w-full border border-white/5"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Nouvelle demande</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    required
                    min={formData.start_date}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Motif (optionnel)
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 resize-none"
                    placeholder="Raison de votre demande..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-white/5 text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#6C63FF] text-white py-3 rounded-xl font-medium hover:bg-[#5a52d5] transition-colors"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Requests List */}
        {requests.length === 0 ? (
          <div className="bg-[#1C1C1E] rounded-2xl p-8 text-center border border-white/5">
            <span className="material-symbols-outlined text-5xl text-slate-500 mb-3">beach_access</span>
            <p className="text-slate-400 mb-2">Aucune demande de congé</p>
            <p className="text-sm text-slate-500 mb-4">Créez votre première demande</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#6C63FF] text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-[#5a52d5] transition-colors"
            >
              Nouvelle demande
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((request, i) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#1C1C1E] rounded-2xl p-4 border border-white/5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-white font-medium">
                      {new Date(request.start_date).toLocaleDateString('fr-FR')} - {new Date(request.end_date).toLocaleDateString('fr-FR')}
                    </p>
                    {request.reason && (
                      <p className="text-sm text-slate-400 mt-1">{request.reason}</p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>Demandé le {new Date(request.created_at).toLocaleDateString('fr-FR')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1C1C1E] border-t border-white/5 z-50">
        <div className="max-w-4xl mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            <Link
              href="/dashboard/employee"
              className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined">home</span>
              <span className="text-xs">Accueil</span>
            </Link>
            <Link
              href="/dashboard/employee/schedule"
              className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              <span className="text-xs">Planning</span>
            </Link>
            <Link
              href="/dashboard/employee/timeoff"
              className="flex flex-col items-center gap-1 p-2 text-[#6C63FF]"
            >
              <span className="material-symbols-outlined">beach_access</span>
              <span className="text-xs font-medium">Congés</span>
            </Link>
            <Link
              href="/dashboard/employee/messages"
              className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined">chat</span>
              <span className="text-xs">Messages</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

