'use client'

import React from 'react'
import { useCompliance } from '@/hooks/useCompliance'

export default function CompliancePage() {
  const {
    weekStart,
    complianceData,
    globalCompliance,
    isLoading
  } = useCompliance()

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Analyse en cours...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Conformité & Audit</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Analyse en temps réel de la conformité légale (Semaine du {weekStart.toLocaleDateString()})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Global Score */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-steel-dark/30 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-accent text-2xl">gavel</span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Conformité Légale</h2>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-4xl font-bold ${globalCompliance === 100 ? 'text-success' : globalCompliance > 80 ? 'text-warning' : 'text-error'}`}>
              {globalCompliance}%
            </span>
            <span className="text-sm text-slate-500">Score Global</span>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-steel-dark/30 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-error text-2xl">warning</span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Alertes Critiques</h2>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-error">
              {complianceData.filter(c => c.status === 'danger').length}
            </span>
            <span className="text-sm text-slate-500">Infractions</span>
          </div>
        </div>

        {/* Warnings */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-steel-dark/30 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-warning text-2xl">info</span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Points de Vigilance</h2>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-4xl font-bold text-warning">
              {complianceData.filter(c => c.status === 'warning').length}
            </span>
            <span className="text-sm text-slate-500">À surveiller</span>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-steel-dark/30 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-steel-dark/30">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Détails par Employé</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-surface-dark/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Employé</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Heures (Hebdo)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Jours Travaillés</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Repos 11h</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-steel-dark/30">
              {complianceData.map((item, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-surface-dark/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                    {item.employee.first_name} {item.employee.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                    <span className={item.totalHours > 48 ? 'text-error font-bold' : item.totalHours > 40 ? 'text-warning' : ''}>
                      {item.totalHours.toFixed(1)}h
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                    <span className={item.daysWorked > 6 ? 'text-error font-bold' : ''}>
                      {item.daysWorked}/7
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.restViolation ? (
                      <span className="text-error font-bold">Non respecté</span>
                    ) : (
                      <span className="text-success">OK</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'danger' ? 'bg-error/20 text-error' :
                      item.status === 'warning' ? 'bg-warning/20 text-warning' :
                      'bg-success/20 text-success'
                    }`}>
                      {item.status === 'danger' ? 'Non Conforme' : item.status === 'warning' ? 'Attention' : 'Conforme'}
                    </span>
                  </td>
                </tr>
              ))}
              {complianceData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Aucune donnée à analyser pour cette semaine.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
