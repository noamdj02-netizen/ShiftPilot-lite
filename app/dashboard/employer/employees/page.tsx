'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

type FilterType = 'all' | 'active' | 'inactive'

export default function EmployeesPage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    {
      label: 'Employés total',
      value: '15',
      change: '+2',
      trend: 'up',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      label: 'Actifs',
      value: '12',
      change: '+1',
      trend: 'up',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      label: 'En congé',
      value: '2',
      change: '-1',
      trend: 'down',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Nouveaux ce mois',
      value: '2',
      change: '+2',
      trend: 'up',
      gradient: 'from-purple-500 to-pink-500'
    }
  ]

  const employees = [
    {
      id: 1,
      name: 'Marie Dupont',
      role: 'Serveur',
      contractType: 'CDI',
      hoursPerWeek: 35,
      email: 'marie.dupont@example.com',
      phone: '+33 6 12 34 56 78',
      status: 'active'
    },
    {
      id: 2,
      name: 'Jean Martin',
      role: 'Chef Cuisine',
      contractType: 'CDI',
      hoursPerWeek: 40,
      email: 'jean.martin@example.com',
      phone: '+33 6 23 45 67 89',
      status: 'active'
    },
    {
      id: 3,
      name: 'Sophie Bernard',
      role: 'Serveur',
      contractType: 'CDD',
      hoursPerWeek: 20,
      email: 'sophie.bernard@example.com',
      phone: '+33 6 34 56 78 90',
      status: 'active'
    },
    {
      id: 4,
      name: 'Lucas Petit',
      role: 'Cuisinier',
      contractType: 'CDI',
      hoursPerWeek: 38,
      email: 'lucas.petit@example.com',
      phone: '+33 6 45 67 89 01',
      status: 'inactive'
    },
    {
      id: 5,
      name: 'Emma Dubois',
      role: 'Serveur',
      contractType: 'Stage',
      hoursPerWeek: 15,
      email: 'emma.dubois@example.com',
      phone: '+33 6 56 78 90 12',
      status: 'active'
    },
    {
      id: 6,
      name: 'Thomas Leclerc',
      role: 'Manager Restaurant',
      contractType: 'CDI',
      hoursPerWeek: 45,
      email: 'thomas.leclerc@example.com',
      phone: '+33 6 67 89 01 23',
      status: 'active'
    }
  ]

  const filterOptions = [
    { key: 'all', label: 'Tous' },
    { key: 'active', label: 'Actifs' },
    { key: 'inactive', label: 'Inactifs' }
  ]

  const filteredEmployees = employees.filter(emp => {
    const matchesFilter = filter === 'all' || emp.status === filter
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-8 relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-black dark:text-white">
            Employés
          </h1>
          <p className="text-black/60 dark:text-white/60 mt-2">
            Gérez votre équipe et leurs contrats
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium shadow-lg shadow-blue-500/20 transition-all text-sm md:text-base"
        >
          Ajouter employé
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10"
              style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
            />
            <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${
                  stat.label.includes('total') ? 'bg-orange-100 dark:bg-orange-900/30' :
                  stat.label.includes('Actifs') ? 'bg-green-100 dark:bg-green-900/30' :
                  stat.label.includes('congé') ? 'bg-blue-100 dark:bg-blue-900/30' :
                  'bg-purple-100 dark:bg-purple-900/30'
                } flex items-center justify-center`}>
                </div>
                <span className={`
                  px-2 py-1 rounded-full text-[10px] md:text-xs font-semibold
                  ${stat.trend === 'up' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'}
                `}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-black/60 dark:text-white/60 text-xs md:text-sm font-medium">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-semibold text-black dark:text-white mt-1">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher par nom, rôle ou email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 bg-white dark:bg-[#1C1C1E] rounded-lg border border-black/5 dark:border-white/5 text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 bg-white dark:bg-[#1C1C1E] rounded-full p-1 border border-black/5 dark:border-white/5 w-fit">
          {filterOptions.map((option) => (
            <motion.button
              key={option.key}
              onClick={() => setFilter(option.key as FilterType)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-full font-medium transition-all text-sm ${
                filter === option.key
                  ? 'bg-blue-600 text-white'
                  : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-blue-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
            <div className="bg-white dark:bg-[#1C1C1E] rounded-lg p-4 md:p-6 border border-black/5 dark:border-white/5 hover:border-blue-600/30 dark:hover:border-blue-400/30 transition-all h-full flex flex-col shadow-sm hover:shadow-md">
              {/* Employee Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm md:text-base">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-black dark:text-white">{employee.name}</h3>
                    <p className="text-xs md:text-sm text-black/60 dark:text-white/60">{employee.role}</p>
                    <span className={`inline-block mt-1 px-2 py-1 rounded-full text-[10px] md:text-xs font-semibold ${
                      employee.status === 'active'
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60'
                    }`}>
                      {employee.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Employee Details */}
              <div className="space-y-3 mb-4 flex-1">
                <div className="text-sm">
                  <p className="text-black/60 dark:text-white/60 text-xs">Type contrat</p>
                  <p className="font-medium text-black dark:text-white text-sm">{employee.contractType}</p>
                </div>
                <div className="text-sm">
                  <p className="text-black/60 dark:text-white/60 text-xs">Heures/semaine</p>
                  <p className="font-medium text-black dark:text-white text-sm">{employee.hoursPerWeek}h</p>
                </div>
                <div className="text-sm">
                  <p className="text-black/60 dark:text-white/60 text-xs">Email</p>
                  <p className="font-medium text-black dark:text-white truncate text-xs">{employee.email}</p>
                </div>
                <div className="text-sm">
                  <p className="text-black/60 dark:text-white/60 text-xs">Téléphone</p>
                  <p className="font-medium text-black dark:text-white text-xs">{employee.phone}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-black/5 dark:border-white/5">
                <button className="flex-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg font-medium text-xs md:text-sm transition-colors">
                  Modifier
                </button>
                <button className="flex-1 px-3 py-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white rounded-lg font-medium text-xs md:text-sm transition-colors">
                  Détails
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <h3 className="text-xl font-semibold text-black dark:text-white mb-2">Aucun employé trouvé</h3>
          <p className="text-black/60 dark:text-white/60">Essayez une autre recherche ou un autre filtre</p>
        </motion.div>
      )}
    </div>
  )
}
