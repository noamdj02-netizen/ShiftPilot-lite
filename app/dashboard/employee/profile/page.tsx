'use client'

import { motion } from 'framer-motion'
import { User, Phone, Mail, MapPin } from 'lucide-react'
import { SectionTitle } from '@/components/dashboard/ui/SectionTitle'
import { DashboardCard } from '@/components/dashboard/ui/DashboardCard'

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <SectionTitle
        title="Mon profil"
        subtitle="Informations personnelles"
      />

      <DashboardCard>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            JD
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Jean Dupont</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Serveur</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Téléphone</div>
              <div className="text-sm font-medium text-slate-900 dark:text-white">+33 6 12 34 56 78</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Email</div>
              <div className="text-sm font-medium text-slate-900 dark:text-white">jean.dupont@example.com</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-slate-400" />
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Adresse</div>
              <div className="text-sm font-medium text-slate-900 dark:text-white">123 Rue de la Paix, Paris</div>
            </div>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Disponibilités</h3>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Vos disponibilités seront affichées ici
        </div>
      </DashboardCard>
    </div>
  )
}

