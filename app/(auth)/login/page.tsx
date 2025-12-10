'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LoginForm } from '@/components/auth/LoginForm'
import { Building2, Users } from 'lucide-react'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'employer' | 'employee'>('employer')

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Content de vous revoir 👋
        </h1>
        <p className="text-sm sm:text-base text-foreground-secondary mb-4 sm:mb-6">
          Connectez-vous pour accéder à votre espace
        </p>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-slate-100 dark:bg-white/5 rounded-xl mb-4 sm:mb-6">
          <button
            onClick={() => setActiveTab('employer')}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-2.5 px-3 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all min-h-[44px] ${
              activeTab === 'employer'
                ? 'bg-white dark:bg-[#1C1C1E] text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Employeur</span>
          </button>
          <button
            onClick={() => setActiveTab('employee')}
            className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-2.5 px-3 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all min-h-[44px] ${
              activeTab === 'employee'
                ? 'bg-white dark:bg-[#1C1C1E] text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Employé</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'employer' ? (
          <motion.div
            key="employer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 rounded-lg">
              <div className="flex items-start gap-2 sm:gap-3">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Espace Employeur
                  </h3>
                  <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                    Accédez à votre dashboard pour gérer vos plannings, vos employés et vos paramètres.
                  </p>
                </div>
              </div>
            </div>
            <LoginForm userType="employer" />
          </motion.div>
        ) : (
          <motion.div
            key="employee"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg">
              <div className="flex items-start gap-2 sm:gap-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-green-900 dark:text-green-100 mb-1">
                    Espace Employé
                  </h3>
                  <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                    Consultez vos plannings, demandez des congés et échangez vos shifts.
                  </p>
                </div>
              </div>
            </div>
            <LoginForm userType="employee" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
