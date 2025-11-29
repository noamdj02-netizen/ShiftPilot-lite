'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, BarChart3 } from 'lucide-react'

export function DetailedFeatures() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container-standard">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-bright mb-6">
            En savoir plus sur nos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary-purple">
              fonctionnalités clés
            </span>
          </h2>
          <p className="text-lg text-text-mid leading-relaxed">
            Des outils puissants pour optimiser votre gestion d'équipe et réduire vos coûts
          </p>
        </motion.div>

        {/* Two large cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Growth Analytics Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-3xl p-8 shadow-pastel hover:shadow-pastel-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-text-bright">Growth Analytics</h3>
            </div>
            
            {/* Chart */}
            <div className="h-64 bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <div className="h-full flex flex-col">
                <div className="flex-1 flex items-end justify-between gap-2 mb-4">
                  {[40, 55, 70, 65, 80, 75, 60].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-primary via-secondary-blue to-secondary-skyBlue rounded-t-lg"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-text-mid">
                  <span>Lun</span>
                  <span>Mar</span>
                  <span>Mer</span>
                  <span>Jeu</span>
                  <span>Ven</span>
                  <span>Sam</span>
                  <span>Dim</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-lg">
                <span className="text-text-mid">Heures économisées</span>
                <span className="text-xl font-bold text-primary">+12h/semaine</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-lg">
                <span className="text-text-mid">Coût réduit</span>
                <span className="text-xl font-bold text-state-success">-15%</span>
              </div>
            </div>
          </motion.div>

          {/* Employees Performance Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-sky-100/50 rounded-3xl p-8 shadow-pastel hover:shadow-pastel-lg transition-all duration-300 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-skyBlue/20 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary-blue/20 rounded-full blur-2xl" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary-blue" />
              </div>
              <h3 className="text-2xl font-bold text-text-bright">Weekly Planning</h3>
            </div>
            
            {/* Planning visualization */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 relative z-10">
              <div className="space-y-4">
                {/* Week days */}
                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((day, i) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-20 text-sm text-text-mid font-medium">{day}</div>
                    <div className="flex-1 flex gap-2">
                      {[1, 2, 3, 4].map((shift) => (
                        <div
                          key={shift}
                          className={`flex-1 h-8 rounded-lg ${
                            shift <= (i % 3) + 2
                              ? 'bg-gradient-to-r from-secondary-blue to-secondary-skyBlue'
                              : 'bg-gray-100'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-lg">
                <span className="text-text-mid">Employés actifs</span>
                <span className="text-xl font-bold text-secondary-blue">24/24</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-lg">
                <span className="text-text-mid">Shifts planifiés</span>
                <span className="text-xl font-bold text-state-success">98%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

