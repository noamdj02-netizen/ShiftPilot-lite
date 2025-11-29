import { Hero } from '@/components/landing/Hero'
import { SocialProof } from '@/components/landing/SocialProof'
import { Problem } from '@/components/landing/Problem'
import { Solution } from '@/components/landing/Solution'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { Features } from '@/components/landing/Features'
import { Testimonials } from '@/components/landing/Testimonials'
import { Pricing } from '@/components/landing/Pricing'
import { FAQ } from '@/components/landing/FAQ'
import { CTA } from '@/components/landing/CTA'

export const metadata = {
  title: 'ShiftPilot | Plannings restaurant en 10 secondes',
  description: 'Créez vos plannings restaurant automatiquement avec l\'IA. 100% conforme au code du travail. Essai gratuit 14 jours.',
  keywords: ['planning restaurant', 'gestion équipe resto', 'planning employés', 'logiciel planning', 'horaires restaurant'],
  openGraph: {
    title: 'ShiftPilot | Plannings restaurant en 10 secondes',
    description: 'Créez vos plannings restaurant automatiquement avec l\'IA. 100% conforme au code du travail.',
    url: 'https://shiftpilot.fr',
    siteName: 'ShiftPilot',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function LandingPage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  )
}

