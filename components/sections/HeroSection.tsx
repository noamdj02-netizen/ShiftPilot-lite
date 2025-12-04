'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, Sparkles, Gift, Zap, Star } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-200/30 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-pink-200/30 via-transparent to-transparent blur-3xl" />
      
      <div className="container-wide relative z-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT - Content */}
          <div className="text-center lg:text-left">
            {/* Badge "Nouveau : Plannings générés par IA" */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200/50 mb-8"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                Nouveau : Plannings générés par IA ✨
              </span>
            </motion.div>
            
            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
            >
              Vos plannings resto en{' '}
              <span className="relative inline-block text-purple-600">
                <span>10 secondes</span>
                <svg
                  className="absolute -bottom-2 left-0 right-0 h-4"
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 15 Q50 5, 100 10 T200 8"
                    stroke="#FCD34D"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl lg:text-2xl text-foreground-muted mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              L'intelligence artificielle crée vos plannings automatiquement. 100% conforme au code du travail. Fini les heures perdues sur Excel! 🚀
            </motion.p>
            
            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Link 
                href="/register" 
                className="btn-primary group"
              >
                Essayer gratuitement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="btn-secondary group">
                <Play className="w-5 h-5" />
                Voir comment ça marche 🎬
              </button>
            </motion.div>
            
            {/* Social proof / Trust elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 justify-center lg:justify-start mb-8"
            >
              {/* Pastilles clients */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-white font-bold text-sm"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">
                  +500 restos nous font confiance
                </span>
              </div>
              
              {/* Rating Capterra */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">
                  4.9/5 sur Capterra
                </span>
              </div>
            </motion.div>
            
            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full border border-yellow-200">
                <Gift className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">🎁 14 jours gratuits</span>
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full border border-green-200">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">⚡ Sans carte bancaire</span>
              </div>
            </motion.div>
          </div>
          
          {/* RIGHT - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Illustration cartoon - Planning/Scheduling scene */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
              {/* Placeholder illustration - sera remplacé par une vraie illustration */}
              <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 aspect-[4/3] flex items-center justify-center">
              {/* Illustration cartoon style - Planning scene */}
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background */}
                <rect width="800" height="600" fill="#F9FAFB" />
                
                {/* Dark table */}
                <rect x="100" y="380" width="600" height="140" rx="25" fill="#1F2937" />
                
                {/* Large monitor/screen with Gantt chart planning */}
                <rect x="150" y="80" width="500" height="280" rx="20" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="4" />
                {/* Monitor base */}
                <rect x="350" y="360" width="100" height="20" fill="#9CA3AF" />
                
                {/* Gantt chart grid on monitor */}
                {/* Vertical lines */}
                <line x1="180" y1="120" x2="180" y2="340" stroke="#E5E7EB" strokeWidth="1" />
                <line x1="280" y1="120" x2="280" y2="340" stroke="#E5E7EB" strokeWidth="1" />
                <line x1="380" y1="120" x2="380" y2="340" stroke="#E5E7EB" strokeWidth="1" />
                <line x1="480" y1="120" x2="480" y2="340" stroke="#E5E7EB" strokeWidth="1" />
                <line x1="580" y1="120" x2="580" y2="340" stroke="#E5E7EB" strokeWidth="1" />
                
                {/* Horizontal lines */}
                <line x1="180" y1="120" x2="620" y2="120" stroke="#E5E7EB" strokeWidth="1" />
                <line x1="180" y1="180" x2="620" y2="180" stroke="#E5E7EB" strokeWidth="1" />
                <line x1="180" y1="240" x2="620" y2="240" stroke="#E5E7EB" strokeWidth="1" />
                <line x1="180" y1="300" x2="620" y2="300" stroke="#E5E7EB" strokeWidth="1" />
                
                {/* Gantt bars */}
                <rect x="190" y="130" width="80" height="40" rx="6" fill="#7C3AED" />
                <rect x="290" y="130" width="80" height="40" rx="6" fill="#EC4899" />
                <rect x="390" y="130" width="70" height="40" rx="6" fill="#8B5CF6" />
                
                <rect x="190" y="190" width="90" height="40" rx="6" fill="#EC4899" />
                <rect x="300" y="190" width="70" height="40" rx="6" fill="#7C3AED" />
                
                <rect x="190" y="250" width="60" height="40" rx="6" fill="#8B5CF6" />
                <rect x="270" y="250" width="100" height="40" rx="6" fill="#7C3AED" />
                <rect x="390" y="250" width="80" height="40" rx="6" fill="#EC4899" />
                
                {/* Day labels */}
                <text x="210" y="115" fill="#6B7280" fontSize="14" fontWeight="600">Lun</text>
                <text x="310" y="115" fill="#6B7280" fontSize="14" fontWeight="600">Mar</text>
                <text x="410" y="115" fill="#6B7280" fontSize="14" fontWeight="600">Mer</text>
                <text x="510" y="115" fill="#6B7280" fontSize="14" fontWeight="600">Jeu</text>
                <text x="580" y="115" fill="#6B7280" fontSize="14" fontWeight="600">Ven</text>
                
                {/* Clock showing 10:10 */}
                <circle cx="700" cy="220" r="50" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="4" />
                <circle cx="700" cy="220" r="3" fill="#374151" />
                {/* Hour hand (10) */}
                <line x1="700" y1="220" x2="700" y2="195" stroke="#374151" strokeWidth="4" strokeLinecap="round" transform="rotate(-30 700 220)" />
                {/* Minute hand (10 minutes = 60 degrees) */}
                <line x1="700" y1="220" x2="700" y2="180" stroke="#374151" strokeWidth="3" strokeLinecap="round" transform="rotate(60 700 220)" />
                
                {/* People around table */}
                {/* Person 1 (left) - Woman */}
                <circle cx="220" cy="340" r="40" fill="#FBB6CE" />
                <circle cx="215" cy="335" r="5" fill="#1F2937" />
                <circle cx="225" cy="335" r="5" fill="#1F2937" />
                <path d="M 210 345 Q 220 350 230 345" stroke="#1F2937" strokeWidth="2" fill="none" />
                <rect x="200" y="380" width="40" height="70" rx="12" fill="#6366F1" />
                {/* Laptop */}
                <rect x="205" y="360" width="30" height="20" rx="3" fill="#E5E7EB" />
                <rect x="207" y="362" width="26" height="16" rx="2" fill="#FFFFFF" />
                
                {/* Person 2 (left-center) - Man */}
                <circle cx="330" cy="340" r="40" fill="#FDE68A" />
                <circle cx="325" cy="335" r="5" fill="#1F2937" />
                <circle cx="335" cy="335" r="5" fill="#1F2937" />
                <path d="M 320 345 Q 330 350 340 345" stroke="#1F2937" strokeWidth="2" fill="none" />
                <rect x="310" y="380" width="40" height="70" rx="12" fill="#8B5CF6" />
                {/* Tablet */}
                <rect x="325" y="355" width="20" height="30" rx="3" fill="#E5E7EB" />
                
                {/* Person 3 (right-center) - Woman */}
                <circle cx="470" cy="340" r="40" fill="#A5B4FC" />
                <circle cx="465" cy="335" r="5" fill="#1F2937" />
                <circle cx="475" cy="335" r="5" fill="#1F2937" />
                <path d="M 460 345 Q 470 350 480 345" stroke="#1F2937" strokeWidth="2" fill="none" />
                <rect x="450" y="380" width="40" height="70" rx="12" fill="#EC4899" />
                {/* Phone */}
                <rect x="478" y="360" width="10" height="18" rx="2" fill="#E5E7EB" />
                
                {/* Person 4 (right) - Man */}
                <circle cx="580" cy="340" r="40" fill="#86EFAC" />
                <circle cx="575" cy="335" r="5" fill="#1F2937" />
                <circle cx="585" cy="335" r="5" fill="#1F2937" />
                <path d="M 570 345 Q 580 350 590 345" stroke="#1F2937" strokeWidth="2" fill="none" />
                <rect x="560" y="380" width="40" height="70" rx="12" fill="#7C3AED" />
                {/* Laptop */}
                <rect x="565" y="360" width="30" height="20" rx="3" fill="#E5E7EB" />
                <rect x="567" y="362" width="26" height="16" rx="2" fill="#FFFFFF" />
                
                {/* Plants on sides */}
                {/* Left plant */}
                <ellipse cx="80" cy="450" rx="30" ry="25" fill="#86EFAC" />
                <rect x="75" y="470" width="10" height="50" fill="#65A30D" />
                <rect x="77" y="480" width="6" height="40" fill="#4D7C0F" />
                
                {/* Right plant */}
                <ellipse cx="720" cy="450" rx="30" ry="25" fill="#86EFAC" />
                <rect x="715" y="470" width="10" height="50" fill="#65A30D" />
                <rect x="717" y="480" width="6" height="40" fill="#4D7C0F" />
              </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
