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
      icon: '👥',
      label: 'Employés total',
      value: '15',
      change: '+2',
      trend: 'up',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: '✅',
      label: 'Actifs',
      value: '12',
      change: '+1',
      trend: 'up',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🏖️',
      label: 'En congé',
      value: '2',
      change: '-1',
      trend: 'down',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🆕',
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
      status: 'active',
      photo: '👩‍💼'
    },
    {
      id: 2,
      name: 'Jean Martin',
      role: 'Chef Cuisine',
      contractType: 'CDI',
      hoursPerWeek: 40,
      email: 'jean.martin@example.com',
      phone: '+33 6 23 45 67 89',
      status: 'active',
      photo: '👨‍💼'
    },
    {
      id: 3,
      name: 'Sophie Bernard',
      role: 'Serveur',
      contractType: 'CDD',
      hoursPerWeek: 20,
      email: 'sophie.bernard@example.com',
      phone: '+33 6 34 56 78 90',
      status: 'active',
      photo: '👩‍💼'
    },
    {
      id: 4,
      name: 'Lucas Petit',
      role: 'Cuisinier',
      contractType: 'CDI',
      hoursPerWeek: 38,
      email: 'lucas.petit@example.com',
      phone: '+33 6 45 67 89 01',
      status: 'inactive',
      photo: '👨‍💼'
    },
    {
      id: 5,
      name: 'Emma Dubois',
      role: 'Serveur',
      contractType: 'Stage',
      hoursPerWeek: 15,
      email: 'emma.dubois@example.com',
      phone: '+33 6 56 78 90 12',
      status: 'active',
      photo: '👩‍💼'
    },
    {
      id: 6,
      name: 'Thomas Leclerc',
      role: 'Manager Restaurant',
      contractType: 'CDI',
      hoursPerWeek: 45,
      email: 'thomas.leclerc@example.com',
      phone: '+33 6 67 89 01 23',
      status: 'active',
      photo: '👨‍💼'
    }
  ]

  const filterOptions = [
    { key: 'all', label: 'Tous', icon: '👥' },
    { key: 'active', label: 'Actifs', icon: '✅' },
    { key: 'inactive', label: 'Inactifs', icon: '❌' }
  ]

  const filteredEmployees = employees.filter(emp => {
    const matchesFilter = filter === 'all' || emp.status === filter
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-red-600 bg-clip-text text-transparent">
            Employés
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Gérez votre équipe et leurs contrats
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center gap-2"
        >
          <span className="text-xl">➕</span>
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
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                  {stat.icon}
                </div>
                <span className={`
                  px-3 py-1 rounded-full text-xs font-bold
                  ${stat.trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}
                `}>
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-slate-600 dark:text-slate-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
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
            className="w-full px-6 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-slate-800/50 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors"
          />
          <span className="absolute right-6 top-3.5 text-2xl">🔍</span>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 bg-white/80 dark:bg-slate-900/80 rounded-xl p-1 border border-slate-200/50 dark:border-slate-800/50 w-fit">
          {filterOptions.map((option) => (
            <motion.button
              key={option.key}
              onClick={() => setFilter(option.key as FilterType)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                filter === option.key
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{option.icon}</span>
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
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800/50 hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all h-full flex flex-col">
              {/* Employee Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-4xl">
                    {employee.photo}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 dark:text-white">{employee.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{employee.role}</p>
                    <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                      employee.status === 'active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {employee.status === 'active' ? '✅ Actif' : '❌ Inactif'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Employee Details */}
              <div className="space-y-3 mb-4 flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-lg">📋</span>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Type contrat</p>
                    <p className="font-medium text-slate-900 dark:text-white">{employee.contractType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-lg">⏰</span>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Heures/semaine</p>
                    <p className="font-medium text-slate-900 dark:text-white">{employee.hoursPerWeek}h</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-lg">📧</span>
                  <div className="flex-1 truncate">
                    <p className="text-slate-600 dark:text-slate-400">Email</p>
                    <p className="font-medium text-slate-900 dark:text-white truncate text-xs">{employee.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-lg">📱</span>
                  <div className="flex-1 truncate">
                    <p className="text-slate-600 dark:text-slate-400">Téléphone</p>
                    <p className="font-medium text-slate-900 dark:text-white text-xs">{employee.phone}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                <button className="flex-1 px-3 py-2 bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-lg font-medium text-sm transition-colors">
                  ✏️ Modifier
                </button>
                <button className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium text-sm transition-colors">
                  👁️ Détails
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
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Aucun employé trouvé</h3>
          <p className="text-slate-600 dark:text-slate-400">Essayez une autre recherche ou un autre filtre</p>
        </motion.div>
      )}
    </div>
  )
}
