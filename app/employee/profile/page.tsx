'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface ProfileStats {
  hoursThisMonth: number
  totalShifts: number
  attendanceRate: number
}

export default function EmployeeProfilePage() {
  const { user, signOut } = useAuth()
  const [photoUrl, setPhotoUrl] = useState<string>('')
  const [isEditingPhoto, setIsEditingPhoto] = useState(false)
  const [settings, setSettings] = useState({
    notifications: true,
    language: 'fr',
    theme: 'auto'
  })

  const [stats] = useState<ProfileStats>({
    hoursThisMonth: 152,
    totalShifts: 18,
    attendanceRate: 98
  })

  const profileData = {
    name: `${user?.user_metadata?.first_name || 'Employé'} ${user?.user_metadata?.last_name || ''}`,
    email: user?.email || 'email@exemple.com',
    phone: '+33 6 12 34 56 78',
    role: 'Serveur',
    contractType: 'CDI Temps partiel',
    hoursPerWeek: 30
  }

  const handlePhotoUpload = () => {
    toast.success('Photo mise à jour')
    setIsEditingPhoto(false)
  }

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }))
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Mon Profil</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Gérez vos informations personnelles</p>
      </div>

      {/* Profile Photo Section */}
      <div className="flex flex-col items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative mb-4 cursor-pointer"
          onClick={() => setIsEditingPhoto(!isEditingPhoto)}
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-blue-500/30">
            {user?.email?.substring(0, 2).toUpperCase()}
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer"
          >
            📷
          </motion.div>
        </motion.div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {profileData.name}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{profileData.email}</p>

        {isEditingPhoto && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePhotoUpload}
              className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg text-sm"
            >
              Charger
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditingPhoto(false)}
              className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-lg text-sm"
            >
              Annuler
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl text-center"
        >
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.hoursThisMonth}</div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 font-medium">Heures</p>
          <p className="text-[10px] text-blue-600 dark:text-blue-400">ce mois</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl text-center"
        >
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalShifts}</div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 font-medium">Shifts</p>
          <p className="text-[10px] text-blue-600 dark:text-blue-400">total</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl text-center"
        >
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.attendanceRate}%</div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 font-medium">Présence</p>
          <p className="text-[10px] text-blue-600 dark:text-blue-400">taux</p>
        </motion.div>
      </div>

      {/* Personal Info */}
      <div>
        <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">Informations personnelles</h3>
        <div className="space-y-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl"
          >
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Email</p>
            <p className="text-slate-900 dark:text-white font-medium">{profileData.email}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl"
          >
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Téléphone</p>
            <p className="text-slate-900 dark:text-white font-medium">{profileData.phone}</p>
          </motion.div>
        </div>
      </div>

      {/* Contract Info */}
      <div>
        <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">Informations contrat</h3>
        <div className="space-y-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl"
          >
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Fonction</p>
            <p className="text-slate-900 dark:text-white font-medium">{profileData.role}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl"
          >
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Type de contrat</p>
            <p className="text-slate-900 dark:text-white font-medium">{profileData.contractType}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl"
          >
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Heures/semaine</p>
            <p className="text-slate-900 dark:text-white font-medium">{profileData.hoursPerWeek}h</p>
          </motion.div>
        </div>
      </div>

      {/* Settings */}
      <div>
        <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white">Paramètres</h3>
        <div className="space-y-2">
          {/* Notifications Toggle */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🔔</span>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Notifications</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Recevoir les alertes</p>
              </div>
            </div>
            <button
              onClick={() => toggleSetting('notifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications ? 'bg-blue-500' : 'bg-slate-300'
              }`}
            >
              <motion.span
                animate={{ x: settings.notifications ? 20 : 2 }}
                className="inline-block h-4 w-4 transform rounded-full bg-white"
              />
            </button>
          </motion.div>

          {/* Language Select */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🌐</span>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Langue</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Français</p>
              </div>
            </div>
            <span className="text-slate-400">▶</span>
          </motion.div>

          {/* Theme Select */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🎨</span>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Thème</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Automatique</p>
              </div>
            </div>
            <span className="text-slate-400">▶</span>
          </motion.div>
        </div>
      </div>

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => signOut()}
        className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 active:scale-[0.98] transition-transform text-lg"
      >
        Déconnexion
      </motion.button>

      {/* Version Info */}
      <p className="text-center text-[10px] text-slate-300 dark:text-slate-600 pb-4">
        ShiftPilot v1.0.0 • PWA Edition
      </p>
    </div>
  )
}
