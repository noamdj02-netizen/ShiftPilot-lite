'use client'

import { useAuth } from '@/hooks/useAuth'

export default function EmployeeProfilePage() {
  const { user, signOut } = useAuth()

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white pt-2">Mon Profil</h1>

      <div className="flex flex-col items-center py-6">
        <div className="size-24 rounded-full bg-accent text-white text-3xl font-bold flex items-center justify-center mb-4 shadow-lg shadow-accent/20">
          {user?.email?.substring(0, 2).toUpperCase()}
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {user?.user_metadata?.first_name || 'Employé'} {user?.user_metadata?.last_name || ''}
        </h2>
        <p className="text-slate-500 dark:text-slate-400">{user?.email}</p>
      </div>

      <div className="space-y-2">
        <div className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400">notifications</span>
            <span className="font-medium text-slate-900 dark:text-white">Notifications</span>
          </div>
          <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-accent">
            <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400">lock</span>
            <span className="font-medium text-slate-900 dark:text-white">Sécurité</span>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
        </div>

        <div className="p-4 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400">help</span>
            <span className="font-medium text-slate-900 dark:text-white">Aide & Support</span>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
        </div>
      </div>

      <button 
        onClick={() => signOut()}
        className="w-full py-3.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded-xl active:scale-[0.98] transition-transform mt-8"
      >
        Déconnexion
      </button>
      
      <p className="text-center text-[10px] text-slate-300 dark:text-slate-600 pt-4">
        ShiftPilot v1.0.0
      </p>
    </div>
  )
}

