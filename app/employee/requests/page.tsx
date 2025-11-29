'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import { timeOffService, employeeService } from '@/lib/services'
import { motion } from 'framer-motion'

export default function EmployeeRequestsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new')
  const [requests, setRequests] = useState<any[]>([])
  const [employeeId, setEmployeeId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form state
  const [type, setType] = useState('Congés payés')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState('')

  useEffect(() => {
    if (!user?.id) return

    const loadData = async () => {
      try {
        // 1. Get Employee ID linked to this user
        const employee: any = await employeeService.getEmployeeByProfileId(user.id)
        if (!employee) {
          setIsLoading(false)
          return
        }
        setEmployeeId(employee.id)

        // 2. Get Requests
        const data = await timeOffService.getEmployeeRequests(employee.id)
        setRequests(data || [])
      } catch (error) {
        console.error('Error loading requests:', error)
        toast.error('Impossible de charger vos demandes')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [user?.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!employeeId || !startDate || !endDate) {
      toast.error('Veuillez remplir les dates')
      return
    }

    setIsSubmitting(true)
    try {
      const newRequest = {
        employee_id: employeeId,
        type,
        start_date: startDate,
        end_date: endDate,
        reason,
        status: 'pending',
        restaurant_id: requests.length > 0 ? requests[0].restaurant_id : undefined // Fallback/Hack if we don't have restaurant_id handy, ideally from employee record
      }
      
      // Actually we need restaurant_id. 
      // It should be available from the employee record if we fetched it fully or from useAuth context
      // Assuming fetching employee returned restaurant_id
       const employee: any = await employeeService.getEmployeeByProfileId(user!.id)
       if (employee) {
         newRequest.restaurant_id = employee.restaurant_id
       }

      await timeOffService.createRequest(newRequest)
      toast.success('Demande envoyée')
      
      // Refresh list
      const data = await timeOffService.getEmployeeRequests(employeeId)
      setRequests(data || [])
      setActiveTab('history')
      
      // Reset form
      setStartDate('')
      setEndDate('')
      setReason('')
    } catch (error) {
      console.error('Error creating request:', error)
      toast.error('Erreur lors de l\'envoi')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white pt-2">Demandes</h1>
      
      <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl">
        <button 
          onClick={() => setActiveTab('new')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'new' 
              ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm' 
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          Nouvelle demande
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
            activeTab === 'history' 
              ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm' 
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          Historique
        </button>
      </div>

      {activeTab === 'new' ? (
        <motion.form 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Type d'absence</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option>Congés payés</option>
              <option>Absence injustifiée</option>
              <option>Arrêt maladie</option>
              <option>Récupération</option>
              <option>Autre</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Début</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Fin</label>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Motif (optionnel)</label>
            <textarea 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Précisez votre demande..."
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-accent text-white font-bold rounded-xl shadow-lg shadow-accent/25 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
          </button>
        </motion.form>
      ) : (
        <div className="space-y-3">
          {isLoading ? (
             <p className="text-center text-slate-500">Chargement...</p>
          ) : requests.length === 0 ? (
             <p className="text-center text-slate-500">Aucune demande.</p>
          ) : (
            requests.map((req) => (
              <motion.div 
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white">{req.type}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                       {new Date(req.start_date).toLocaleDateString()} - {new Date(req.end_date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    req.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    req.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {req.status === 'approved' ? 'Approuvé' : req.status === 'rejected' ? 'Refusé' : 'En attente'}
                  </span>
                </div>
                {req.response_note && (
                   <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100 dark:border-white/5">
                     Note: {req.response_note}
                   </p>
                )}
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
