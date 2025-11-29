'use client'

import React from 'react'

export default function CompliancePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Conformité & Audit</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Gestion de la conformité légale et des audits
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-steel-dark/30 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-accent text-2xl">gavel</span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Conformité Légale</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
            Vérification de la conformité aux réglementations du travail
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">98%</span>
            <span className="text-sm text-success">✓ Conforme</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-steel-dark/30 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-warning text-2xl">assignment</span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Audits en Cours</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
            Audits programmés et en cours de traitement
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">3</span>
            <span className="text-sm text-warning">En attente</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-steel-dark/30 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-info text-2xl">description</span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Documents</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
            Documents légaux et contrats à jour
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">127</span>
            <span className="text-sm text-info">À jour</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-steel-dark/30 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-steel-dark/30">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Derniers Audits</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-surface-dark/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Résultat
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-steel-dark/30">
              <tr className="hover:bg-slate-50 dark:hover:bg-surface-dark/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                  15 Jan 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                  Audit RH
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-success/20 text-success">
                    Terminé
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                  Conforme
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-surface-dark/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                  10 Jan 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                  Contrôle Horaires
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning/20 text-warning">
                    En cours
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                  En attente
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-surface-dark/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                  5 Jan 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                  Vérification Contrats
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-success/20 text-success">
                    Terminé
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                  Conforme
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

