'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Employee {
  id: string
  first_name: string
  last_name: string
  email: string
  role: string
  position?: string
  hourly_rate?: number
  is_active: boolean
  profile_id?: string
}

export function EmployeesList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    async function fetchEmployees() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single()

      if (!profile?.organization_id) return

      // Fetch from employees table
      const { data: employeesData, error } = await supabase
        .from('employees')
        .select('*')
        .eq('organization_id', profile.organization_id)
        .eq('is_active', true)
        .order('last_name', { ascending: true })

      if (error) {
        console.error('Error fetching employees:', error)
        // Fallback to profiles table
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('*')
          .eq('organization_id', profile.organization_id)
          .eq('is_active', true)

        setEmployees(profilesData || [])
      } else {
        setEmployees(employeesData || [])
      }

      setLoading(false)
    }

    fetchEmployees()
  }, [])

  const filteredEmployees = employees.filter((emp) => {
    const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase()
    const email = emp.email?.toLowerCase() || ''
    const searchLower = search.toLowerCase()
    return fullName.includes(searchLower) || email.includes(searchLower)
  })

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-white/5 rounded w-64 animate-pulse" />
        <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl p-8">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-white/5 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Employés</h1>
          <p className="text-slate-400 text-sm mt-1">
            {employees.length} employé{employees.length > 1 ? 's' : ''} actif{employees.length > 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#6C63FF] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#5a52d5] transition-colors w-full sm:w-auto"
        >
          + Ajouter un employé
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          search
        </span>
        <input
          type="text"
          placeholder="Rechercher un employé..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#1C1C1E] border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#6C63FF]/50"
        />
      </div>

      {/* Employees Table / List */}
      <div className="bg-[#1C1C1E] border border-white/5 rounded-2xl overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-white/5 text-white font-medium">
              <tr>
                <th className="p-4">Nom</th>
                <th className="p-4">Rôle</th>
                <th className="p-4">Position</th>
                <th className="p-4">Email</th>
                <th className="p-4">Taux horaire</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF] font-medium">
                        {emp.first_name?.[0]}{emp.last_name?.[0]}
                      </div>
                      {emp.first_name} {emp.last_name}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-500 text-xs">
                      {emp.role || 'EMPLOYEE'}
                    </span>
                  </td>
                  <td className="p-4">{emp.position || '-'}</td>
                  <td className="p-4">{emp.email}</td>
                  <td className="p-4">
                    {emp.hourly_rate ? `${emp.hourly_rate}€/h` : '-'}
                  </td>
                  <td className="p-4">
                    <button className="text-slate-500 hover:text-white transition-colors">
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    {search ? 'Aucun employé trouvé.' : "Aucun employé trouvé. Invitez votre équipe !"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile List */}
        <div className="md:hidden divide-y divide-white/5">
          {filteredEmployees.map((emp) => (
            <div key={emp.id} className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF] font-medium">
                  {emp.first_name?.[0]}{emp.last_name?.[0]}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    {emp.first_name} {emp.last_name}
                  </p>
                  <p className="text-slate-400 text-sm">{emp.email}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-500 text-xs">
                  {emp.role || 'EMPLOYEE'}
                </span>
                {emp.position && (
                  <span className="px-2 py-1 rounded bg-slate-700/50 text-slate-300 text-xs">
                    {emp.position}
                  </span>
                )}
                {emp.hourly_rate && (
                  <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs">
                    {emp.hourly_rate}€/h
                  </span>
                )}
              </div>
              <button className="text-[#6C63FF] hover:text-[#5a52d5] text-sm font-medium">
                Modifier
              </button>
            </div>
          ))}
          {filteredEmployees.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              {search ? 'Aucun employé trouvé.' : "Aucun employé trouvé. Invitez votre équipe !"}
            </div>
          )}
        </div>
      </div>

      {/* Add Employee Modal - Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1C1C1E] rounded-2xl p-6 max-w-md w-full border border-white/5">
            <h2 className="text-xl font-bold text-white mb-4">Ajouter un employé</h2>
            <p className="text-slate-400 text-sm mb-4">
              Fonctionnalité à implémenter : formulaire d'ajout d'employé
            </p>
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full bg-[#6C63FF] text-white py-2 rounded-xl font-medium hover:bg-[#5a52d5] transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

