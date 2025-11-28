"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Users, DollarSign } from "lucide-react";

export function Hero() {
  return (
    <section className="relative py-20 lg:py-32 bg-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-6"
        >
          <span className="bg-peach text-navy px-4 py-1.5 rounded-full text-sm font-medium">
            PLANIFICATION INTELLIGENTE
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-semibold text-text-main mb-6 leading-tight tracking-tight"
        >
          Vos plannings resto en 2 clics.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Fini les heures perdues sur Excel. ShiftPilot génère vos plannings automatiquement en respectant le code du travail. Simple, rapide, efficace.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/register"
            className="bg-navy text-white px-8 py-4 rounded-full font-medium text-base hover:bg-opacity-90 transition-all hover:scale-105 shadow-landing-card"
          >
            Essayer gratuitement
          </Link>
          <Link
            href="#demo"
            className="bg-bg border-2 border-border text-navy px-8 py-4 rounded-full font-medium text-base hover:bg-bg-soft transition-all"
          >
            Voir la démo
          </Link>
        </motion.div>

        {/* Dashboard Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#FFEFEF] rounded-3xl p-8 md:p-12 shadow-landing-card border border-border"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Fake UI Dashboard */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                <div className="h-4 bg-navy/10 rounded w-3/4"></div>
                <div className="h-4 bg-navy/5 rounded w-1/2"></div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 bg-peach rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-navy/10 rounded w-full"></div>
                      <div className="h-3 bg-navy/5 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 bg-lilac rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-navy/10 rounded w-full"></div>
                      <div className="h-3 bg-navy/5 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
                {/* Mini Bar Chart */}
                <div className="mt-6 flex items-end gap-2 h-20">
                  <div className="flex-1 bg-purple/20 rounded-t"></div>
                  <div className="flex-1 bg-purple/40 rounded-t" style={{ height: "60%" }}></div>
                  <div className="flex-1 bg-purple/60 rounded-t" style={{ height: "80%" }}></div>
                  <div className="flex-1 bg-purple rounded-t"></div>
                  <div className="flex-1 bg-purple/60 rounded-t" style={{ height: "70%" }}></div>
                </div>
              </div>
            </div>

            {/* Right: Stats */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white rounded-2xl shadow-md">
                  <DollarSign className="h-8 w-8 text-success" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-text-main">3h</p>
                  <p className="text-sm text-text-muted">économisées par semaine</p>
                  <div className="mt-2 h-2 bg-success/20 rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-4 bg-white rounded-2xl shadow-md">
                  <Users className="h-8 w-8 text-purple" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-text-main">98%</p>
                  <p className="text-sm text-text-muted">de satisfaction</p>
                </div>
              </div>

              {/* Avatars */}
              <div className="flex items-center gap-2 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple to-peach border-2 border-white"
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-text-muted ml-2">Rejoignez 500+ restaurants</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

