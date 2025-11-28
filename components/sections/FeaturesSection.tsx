'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  MessageSquare, 
  RefreshCw, 
  BarChart3, 
  Clock,
  Globe,
  Users,
  ArrowRight
} from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Génération IA',
    description: "L'algorithme crée un planning optimisé en analysant les contraintes, disponibilités et compétences de votre équipe.",
    color: 'accent',
    size: 'large',
    visual: 'ai-generation',
  },
  {
    icon: Shield,
    title: 'Conformité légale',
    description: 'Respect automatique du code du travail français et de la convention HCR.',
    color: 'cyan',
    size: 'small',
    visual: 'compliance',
  },
  {
    icon: MessageSquare,
    title: 'Notifications instantanées',
    description: 'SMS, WhatsApp, email. Votre équipe reçoit son planning en temps réel.',
    color: 'violet',
    size: 'small',
    visual: 'notifications',
  },
  {
    icon: RefreshCw,
    title: 'Échanges de shifts',
    description: 'Vos employés gèrent leurs échanges. Vous validez en un clic.',
    color: 'success',
    size: 'medium',
    visual: 'swaps',
  },
  {
    icon: BarChart3,
    title: 'Analytics avancés',
    description: 'Suivez les heures, coûts et tendances. Optimisez votre masse salariale.',
    color: 'warning',
    size: 'medium',
    visual: 'analytics',
  },
  {
    icon: Clock,
    title: 'Pointage GPS',
    description: 'Pointage depuis le téléphone avec vérification de localisation.',
    color: 'cyan',
    size: 'small',
    visual: 'time-tracking',
  },
  {
    icon: Globe,
    title: 'Multi-établissements',
    description: 'Gérez tous vos restaurants depuis une seule interface.',
    color: 'violet',
    size: 'small',
    visual: 'multi-site',
  },
  {
    icon: Users,
    title: 'Gestion des compétences',
    description: 'Assignez automatiquement les bonnes personnes aux bons postes.',
    color: 'accent',
    size: 'large',
    visual: 'skills',
  },
]

const colorMap = {
  accent: {
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    text: 'text-accent',
    glow: 'shadow-glow-sm hover:shadow-glow',
    gradient: 'from-accent to-cyan',
  },
  cyan: {
    bg: 'bg-cyan/10',
    border: 'border-cyan/20',
    text: 'text-cyan',
    glow: 'shadow-glow-cyan/30 hover:shadow-glow-cyan',
    gradient: 'from-cyan to-accent',
  },
  violet: {
    bg: 'bg-violet/10',
    border: 'border-violet/20',
    text: 'text-violet',
    glow: 'shadow-glow-violet/30 hover:shadow-glow-violet',
    gradient: 'from-violet to-accent',
  },
  success: {
    bg: 'bg-success/10',
    border: 'border-success/20',
    text: 'text-success',
    glow: 'shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)]',
    gradient: 'from-success to-cyan',
  },
  warning: {
    bg: 'bg-warning/10',
    border: 'border-warning/20',
    text: 'text-warning',
    glow: 'shadow-[0_0_40px_-10px_rgba(245,158,11,0.4)]',
    gradient: 'from-warning to-accent',
  },
}

// AI Generation Visual
function AIGenerationVisual() {
  return (
    <div className="absolute bottom-4 right-4 w-48 h-32">
      <motion.div
        animate={{ 
          boxShadow: [
            '0 0 20px rgba(59, 130, 246, 0.3)',
            '0 0 40px rgba(59, 130, 246, 0.5)',
            '0 0 20px rgba(59, 130, 246, 0.3)',
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-full h-full rounded-xl bg-background-elevated/80 border border-accent/30 p-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-accent" />
          <span className="text-xs text-foreground-secondary">Génération...</span>
        </div>
        <div className="space-y-1.5">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity, repeatDelay: 1 }}
              className="h-2 bg-accent/30 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// Feature Card Component
function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)
  
  const colors = colorMap[feature.color as keyof typeof colorMap]
  
  // 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 300, damping: 30 })
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`group relative glass rounded-2xl p-6 lg:p-8 overflow-hidden transition-all duration-500 ${colors.glow} ${
        feature.size === 'large' ? 'lg:col-span-2 lg:row-span-2' :
        feature.size === 'medium' ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Gradient border on hover */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] bg-gradient-to-br ${colors.gradient}`}>
        <div className="w-full h-full rounded-2xl bg-background-elevated" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-4`}
        >
          <feature.icon className={`w-6 h-6 lg:w-7 lg:h-7 ${colors.text}`} />
        </motion.div>
        
        {/* Title */}
        <h3 className={`text-lg lg:text-xl font-bold text-foreground mb-2 ${feature.size === 'large' ? 'lg:text-2xl' : ''}`}>
          {feature.title}
        </h3>
        
        {/* Description */}
        <p className={`text-foreground-secondary leading-relaxed ${feature.size === 'large' ? 'lg:text-lg' : 'text-sm lg:text-base'}`}>
          {feature.description}
        </p>
        
        {/* Tags for large cards */}
        {feature.size === 'large' && (
          <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-2">
            {['Drag & drop', 'Templates', 'Import CSV', 'Export PDF'].map((tag) => (
              <span key={tag} className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Visual element for AI generation */}
      {feature.visual === 'ai-generation' && <AIGenerationVisual />}
      
      {/* Hover arrow */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        className="absolute bottom-6 right-6"
      >
        <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center`}>
          <ArrowRight className={`w-4 h-4 ${colors.text}`} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function FeaturesSection() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden" id="features">
      {/* Background */}
      <div className="absolute inset-0 bg-glow-gradient" />
      <div className="absolute inset-0 grid-pattern" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-accent/20 text-sm font-medium text-accent mb-6"
          >
            <Zap className="w-4 h-4" />
            Fonctionnalités
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tout pour gérer vos équipes,{' '}
            <span className="gradient-text">rien de superflu</span>
          </h2>
          
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
            Des outils puissants dans une interface simple. 
            Concentrez-vous sur votre restaurant, on s'occupe du reste.
          </p>
        </motion.div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 px-6 py-3 glass glass-hover rounded-xl font-medium text-foreground"
          >
            Voir toutes les fonctionnalités
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

