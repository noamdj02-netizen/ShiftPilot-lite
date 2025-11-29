'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { employeeService } from '@/lib/services'
import { toast } from 'sonner'

export default function EmployeesPage() {
  const { restaurant } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [employees, setEmployees] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!restaurant?.id) return

    const loadEmployees = async () => {
      try {
        const data = await employeeService.getEmployees(restaurant.id)
        setEmployees(data || [])
      } catch (error) {
        console.error('Error loading employees:', error)
        toast.error('Erreur lors du chargement des employés')
      } finally {
        setIsLoading(false)
      }
    }

    loadEmployees()
  }, [restaurant?.id])
  
  const filteredEmployees = employees.filter(emp => {
    const fullName = `${emp.first_name || ''} ${emp.last_name || ''}`.toLowerCase()
    return fullName.includes(searchQuery.toLowerCase()) || 
           emp.role?.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Collaborateurs
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Gérez vos équipes, contrats et accès
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-white border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">upload</span>
            Import CSV
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Nouveau
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-[#1C1C1E] p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input
            type="text"
            placeholder="Rechercher un employé par nom, rôle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <select className="px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer">
            <option>Tous les départements</option>
            <option>Salle</option>
            <option>Cuisine</option>
            <option>Bar</option>
          </select>
          <select className="px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer">
            <option>Tous les statuts</option>
            <option>Actif</option>
            <option>En congés</option>
            <option>Inactif</option>
          </select>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="bg-white dark:bg-[#1C1C1E] border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-200 dark:border-white/5">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Employé</th>
                <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Rôle</th>
                <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Contrat</th>
                <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs">Statut</th>
                <th className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    Chargement...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                 <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    Aucun employé trouvé.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp, i) => (
                <motion.tr 
                  key={emp.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-full ${emp.color || 'bg-blue-500'} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                        {emp.initials || (emp.first_name?.[0] || '') + (emp.last_name?.[0] || '')}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{emp.first_name} {emp.last_name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-slate-900 dark:text-white font-medium">{emp.role}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">--</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 border border-slate-200 dark:border-white/10 rounded text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/5">
                        CDI
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">35h</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Depuis le {new Date(emp.created_at).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      Actif
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination - Hide if not needed or implement later */}
        {!isLoading && filteredEmployees.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {filteredEmployees.length} employés
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
