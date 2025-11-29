'use client'

import React from 'react'

export default function AvailabilitiesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Validations</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Gestion des disponibilités et validations des collaborateurs
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-steel-dark/30 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-accent text-2xl">fact_check</span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">En Attente</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
            Validations en attente de traitement
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">12</span>
            <span className="text-sm text-warning">À valider</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-steel-dark/30 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-success text-2xl">check_circle</span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Validées</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
            Validations approuvées ce mois
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">48</span>
            <span className="text-sm text-success">✓ Validé</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-surface-dark rounded-xl p-6 border border-slate-200 dark:border-steel-dark/30 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-info text-2xl">schedule</span>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Disponibilités</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
            Disponibilités soumises cette semaine
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">23</span>
            <span className="text-sm text-info">Nouveaux</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-steel-dark/30 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-steel-dark/30">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Validations Récentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-surface-dark/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Collaborateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-steel-dark/30">
              <tr className="hover:bg-slate-50 dark:hover:bg-surface-dark/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-semibold text-sm">
                      JD
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Jean Dupont</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                  Disponibilité
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                  20 Jan 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning/20 text-warning">
                    En attente
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-sm text-accent hover:text-accent/80 font-medium">
                    Valider
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-surface-dark/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-success/20 flex items-center justify-center text-success font-semibold text-sm">
                      ML
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Marie Leclerc</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                  Congé
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                  18 Jan 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-success/20 text-success">
                    Validé
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-sm text-slate-400 dark:text-slate-500 font-medium">
                    Voir
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-surface-dark/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-info/20 flex items-center justify-center text-info font-semibold text-sm">
                      PM
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Pierre Martin</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                  Disponibilité
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                  17 Jan 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning/20 text-warning">
                    En attente
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-sm text-accent hover:text-accent/80 font-medium">
                    Valider
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

