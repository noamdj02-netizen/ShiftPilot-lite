'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

export function BentoFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="fonctionnalites" className="py-32 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-black dark:text-white tracking-tight mb-6">
            Tout est là. <br />
            <span className="text-black/40 dark:text-white/40">Pour que vous n'ayez rien à faire.</span>
          </h2>
          <p className="text-lg text-black/60 dark:text-white/60">
            Une suite d'outils interconnectés qui transforment la complexité administrative en avantage compétitif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 bg-white dark:bg-[#000000] rounded-3xl p-10 shadow-sm border border-black/5 dark:border-white/5 flex flex-col justify-between min-h-[400px] overflow-hidden group"
          >
            <div>
              <span className="inline-block p-3 rounded-xl bg-blue-500/10 text-blue-600 mb-4">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </span>
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-2">Intelligence Artificielle</h3>
              <p className="text-black/60 dark:text-white/60 text-lg">
                ShiftPilot anticipe vos besoins de staffing en analysant vos données historiques et la météo.
              </p>
            </div>
            <div className="mt-8 relative h-40 w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl overflow-hidden border border-black/5 dark:border-white/5">
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
            className="bg-white dark:bg-[#000000] rounded-3xl p-10 shadow-sm border border-black/5 dark:border-white/5 flex flex-col min-h-[400px]"
          >
            <span className="inline-block p-3 rounded-xl bg-green-500/10 text-green-600 mb-4 w-fit">
              <span className="material-symbols-outlined text-3xl">verified_user</span>
            </span>
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-2">100% Conforme</h3>
            <p className="text-black/60 dark:text-white/60 mb-8">Les règles CCN HCR sont codées en dur. Risque zéro.</p>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative size-32">
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
                <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-black dark:text-white">
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
            className="bg-white dark:bg-[#000000] rounded-3xl p-10 shadow-sm border border-black/5 dark:border-white/5 flex flex-col"
          >
            <span className="inline-block p-3 rounded-xl bg-purple-500/10 text-purple-600 mb-4 w-fit">
              <span className="material-symbols-outlined text-3xl">hub</span>
            </span>
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-2">Multi-sites</h3>
            <p className="text-black/60 dark:text-white/60">
              Vue unifiée pour les sièges sociaux. Comparez les performances en temps réel.
            </p>
          </motion.div>

          {/* Card 4 - Large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 bg-white dark:bg-[#000000] rounded-3xl p-10 shadow-sm border border-black/5 dark:border-white/5 flex flex-col justify-center"
          >
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <span className="inline-block p-3 rounded-xl bg-orange-500/10 text-orange-600 mb-4">
                  <span className="material-symbols-outlined text-3xl">savings</span>
                </span>
                <h3 className="text-2xl font-semibold text-black dark:text-white mb-2">Pilotage Financier</h3>
                <p className="text-black/60 dark:text-white/60 text-lg">
                  Suivez la masse salariale en temps réel. Ajustez avant qu'il ne soit trop tard.
                </p>
                <button className="mt-6 text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="flex-1 w-full bg-[#F5F5F7] dark:bg-[#1C1C1E] rounded-xl p-6 border border-black/5 dark:border-white/5">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-black/40 dark:text-white/40">Coût Salarial</p>
                    <p className="text-2xl font-bold text-black dark:text-white">24 500 €</p>
                  </div>
                  <div className="text-green-500 font-medium text-sm">-2.4%</div>
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

