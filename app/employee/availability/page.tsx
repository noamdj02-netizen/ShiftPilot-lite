'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface Availability {
  id: string
  day: string
  startTime: string
  endTime: string
  recurring: boolean
  createdAt: Date
}

interface RecurringPattern {
  name: string
  days: string[]
  startTime: string
  endTime: string
}

export default function AvailabilityPage() {
  const [availabilities, setAvailabilities] = useState<Availability[]>([
    {
      id: '1',
      day: 'Lundi',
      startTime: '12:00',
      endTime: '18:00',
      recurring: true,
      createdAt: new Date()
    },
    {
      id: '2',
      day: '2024-12-15',
      startTime: '09:00',
      endTime: '17:00',
      recurring: false,
      createdAt: new Date()
    }
  ])

  const [selectedDay, setSelectedDay] = useState<string>('')
  const [startTime, setStartTime] = useState<string>('09:00')
  const [endTime, setEndTime] = useState<string>('17:00')
  const [isRecurring, setIsRecurring] = useState<boolean>(false)

  const recurringPatterns: RecurringPattern[] = [
    { name: 'Matin (9h-13h)', days: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'], startTime: '09:00', endTime: '13:00' },
    { name: 'Après-midi (13h-18h)', days: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'], startTime: '13:00', endTime: '18:00' },
    { name: 'Soirée (18h-22h)', days: ['Jeu', 'Ven', 'Sam', 'Dim'], startTime: '18:00', endTime: '22:00' },
    { name: 'Week-end (10h-18h)', days: ['Sam', 'Dim'], startTime: '10:00', endTime: '18:00' }
  ]

  const handleAddAvailability = () => {
    if (!selectedDay || !startTime || !endTime) {
      toast.error('Veuillez remplir tous les champs')
      return
    }

    const newAvailability: Availability = {
      id: Math.random().toString(),
      day: selectedDay,
      startTime,
      endTime,
      recurring: isRecurring,
      createdAt: new Date()
    }

    setAvailabilities([...availabilities, newAvailability])
    setSelectedDay('')
    setStartTime('09:00')
    setEndTime('17:00')
    setIsRecurring(false)
    toast.success('Disponibilité ajoutée')
  }

  const handleDeleteAvailability = (id: string) => {
    setAvailabilities(availabilities.filter(a => a.id !== id))
    toast.success('Disponibilité supprimée')
  }

  const handleQuickPattern = (pattern: RecurringPattern) => {
    const newAvailabilities = pattern.days.map((day) => ({
      id: Math.random().toString(),
      day,
      startTime: pattern.startTime,
      endTime: pattern.endTime,
      recurring: true,
      createdAt: new Date()
    }))

    setAvailabilities([...availabilities, ...newAvailabilities])
    toast.success(`Disponibilité ${pattern.name} ajoutée`)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Vos Disponibilités</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Déclarez quand vous êtes disponible</p>
      </div>

      {/* Quick Patterns */}
      <div>
        <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">Modèles rapides</h3>
        <div className="grid grid-cols-2 gap-2">
          {recurringPatterns.map((pattern, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickPattern(pattern)}
              className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/50 rounded-xl text-left"
            >
              <p className="font-semibold text-green-900 dark:text-green-300 text-sm">{pattern.name}</p>
              <p className="text-xs text-green-700 dark:text-green-400 mt-1">{pattern.days.join(', ')}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Add Availability Card */}
      <div className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl p-4">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Ajouter une disponibilité</h3>

        {/* Day Selection */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Jour</label>
          <input
            type="date"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
          />
        </div>

        {/* Time Range */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Début</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Fin</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Recurring Toggle */}
        <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <label className="text-sm font-medium text-slate-900 dark:text-white">Disponibilité récurrente</label>
          <button
            onClick={() => setIsRecurring(!isRecurring)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isRecurring ? 'bg-green-500' : 'bg-slate-300'
            }`}
          >
            <motion.span
              animate={{ x: isRecurring ? 20 : 2 }}
              className="inline-block h-4 w-4 transform rounded-full bg-white"
            />
          </button>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddAvailability}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 active:scale-[0.98] transition-transform"
        >
          Ajouter
        </motion.button>
      </div>

      {/* Availabilities List */}
      <div>
        <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">Vos disponibilités ({availabilities.length})</h3>
        <div className="space-y-2">
          {availabilities.length > 0 ? (
            availabilities.map((avail, idx) => (
              <motion.div
                key={avail.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl"
              >
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {avail.day}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {avail.startTime} - {avail.endTime}
                    {avail.recurring && <span className="ml-2 inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">Récurrent</span>}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteAvailability(avail.id)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <span className="text-lg">✕</span>
                </motion.button>
              </motion.div>
            ))
          ) : (
            <div className="text-center p-8 text-slate-500 dark:text-slate-400">
              <p className="text-sm">Aucune disponibilité déclarée</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/50 rounded-xl p-4">
        <p className="text-sm text-green-900 dark:text-green-300">
          <span className="font-bold">💡 Conseil:</span> Ajoutez vos disponibilités régulières pour aider la planification. Vous pourrez les modifier à tout moment.
        </p>
      </div>
    </div>
  )
}
