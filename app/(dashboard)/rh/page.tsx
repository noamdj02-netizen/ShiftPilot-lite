'use client'

import React, { useState } from 'react'
import { useEmployees } from '@/hooks/useEmployees'
import { toast } from 'sonner'

export default function RHPage() {
  const { employees, isLoading } = useEmployees()
  const [uploading, setUploading] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState('')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !selectedEmployee) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('employeeId', selectedEmployee)

    try {
      const response = await fetch('/api/rh/upload-cv', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Upload failed')
      
      toast.success('Document uploadé avec succès')
    } catch (error) {
      console.error(error)
      toast.error("Erreur lors de l'upload")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Espace RH</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Gestion administrative et documentaire
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Card */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-steel-dark/30 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Upload Documents / CV</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Employé concerné
              </label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-black/20"
                disabled={isLoading}
              >
                <option value="">Sélectionner un employé</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.first_name} {emp.last_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Document (PDF, Image)
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                disabled={!selectedEmployee || uploading}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-accent/10 file:text-accent
                  hover:file:bg-accent/20
                "
              />
            </div>
            
            {uploading && <p className="text-sm text-accent animate-pulse">Upload en cours...</p>}
          </div>
        </div>

        {/* Contract Info (Placeholder) */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-steel-dark/30 shadow-sm opacity-50 cursor-not-allowed">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Génération de Contrats</h2>
          <p className="text-sm text-slate-500">Fonctionnalité bientôt disponible.</p>
        </div>
      </div>
    </div>
  )
}

