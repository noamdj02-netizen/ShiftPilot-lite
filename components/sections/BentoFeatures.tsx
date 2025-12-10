'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function BentoFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="fonctionnalites" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black dark:text-white tracking-tight mb-4">
            Tout est là. <br />
            <span className="text-black/40 dark:text-white/40">Pour que vous n'ayez rien à faire.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto leading-relaxed">
            Une suite d'outils interconnectés qui transforment la complexité administrative en avantage compétitif.
          </p>
        </div>

        {/* Grid responsive optimisé : mobile=1, tablet=2, desktop=3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {/* Card 1 - Large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 bg-white dark:bg-[#000000] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm border border-black/5 dark:border-white/5 flex flex-col justify-between min-h-[250px] sm:min-h-[300px] md:min-h-[350px] overflow-hidden group"
          >
            <div>
              <span className="inline-block p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-blue-500/10 text-blue-600 mb-4">
                <span className="material-symbols-outlined text-2xl sm:text-3xl">psychology</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mb-2">Intelligence Artificielle</h3>
              <p className="text-sm sm:text-base md:text-lg text-black/60 dark:text-white/60">
                ShiftPilot anticipe vos besoins de staffing en analysant vos données historiques et la météo.
              </p>
            </div>
            {/* Visual optimisé pour mobile */}
            <div className="mt-6 sm:mt-8 relative h-24 sm:h-32 md:h-40 w-full max-w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-lg sm:rounded-xl overflow-hidden border border-black/5 dark:border-white/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex gap-2 items-end h-24">
                  {[20, 45, 30, 60, 85, 50, 70, 40].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: '20%' }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="w-4 bg-blue-500 rounded-t-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-[#000000] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm border border-black/5 dark:border-white/5 flex flex-col min-h-[250px] sm:min-h-[300px] md:min-h-[350px]"
          >
            <span className="inline-block p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-green-500/10 text-green-600 mb-4 w-fit">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">verified_user</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mb-2">100% Conforme</h3>
            <p className="text-sm sm:text-base text-black/60 dark:text-white/60 mb-6 sm:mb-8">Les règles CCN HCR sont codées en dur. Risque zéro.</p>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative size-24 sm:size-28 md:size-32">
                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-black/5 dark:text-white/10"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    className="text-green-500"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="100, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-bold text-black dark:text-white">
                  100%
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-[#000000] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm border border-black/5 dark:border-white/5 flex flex-col min-h-[250px] sm:min-h-[300px] md:min-h-[350px]"
          >
            <span className="inline-block p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-purple-500/10 text-purple-600 mb-4 w-fit">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">hub</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mb-2">Multi-sites</h3>
            <p className="text-sm sm:text-base text-black/60 dark:text-white/60">
              Vue unifiée pour les sièges sociaux. Comparez les performances en temps réel.
            </p>
          </motion.div>

          {/* Card 4 - Large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 bg-white dark:bg-[#000000] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm border border-black/5 dark:border-white/5 flex flex-col justify-center"
          >
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10">
              <div className="flex-1 w-full">
                <span className="inline-block p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-orange-500/10 text-orange-600 mb-4">
                  <span className="material-symbols-outlined text-2xl sm:text-3xl">savings</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mb-2">Pilotage Financier</h3>
                <p className="text-sm sm:text-base md:text-lg text-black/60 dark:text-white/60">
                  Suivez la masse salariale en temps réel. Ajustez avant qu'il ne soit trop tard.
                </p>
                <button className="mt-4 sm:mt-6 text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 active:gap-2 transition-all text-base sm:text-lg min-h-[44px] touch-manipulation">
                  En savoir plus <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
              <div className="flex-1 w-full bg-[#F5F5F7] dark:bg-[#1C1C1E] rounded-lg sm:rounded-xl p-4 sm:p-6 border border-black/5 dark:border-white/5">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-[10px] sm:text-xs font-semibold uppercase text-black/40 dark:text-white/40">Coût Salarial</p>
                    <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">24 500 €</p>
                  </div>
                  <div className="text-green-500 font-medium text-xs sm:text-sm">-2.4%</div>
                </div>
                <div className="h-2 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[70%] bg-orange-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

