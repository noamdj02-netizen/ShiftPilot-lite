import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/sections/Hero'
import { TrustSection } from '@/components/sections/TrustSection'
import { BentoFeatures } from '@/components/sections/BentoFeatures'
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection'
import { InteractiveDemoSection } from '@/components/sections/InteractiveDemoSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { Footer } from '@/components/landing/Footer'

export const metadata = {
  title: 'ShiftPilot Enterprise | Planifiez. Unifiez. Simplifiez.',
  description: 'Une orchestration parfaite pour les entreprises multi-sites. La puissance sans la complexité.',
  keywords: ['planning restaurant', 'gestion équipe resto', 'planning employés', 'logiciel planning', 'horaires restaurant'],
  openGraph: {
    title: 'ShiftPilot Enterprise | Planifiez. Unifiez. Simplifiez.',
    description: 'Une orchestration parfaite pour les entreprises multi-sites.',
    url: 'https://shiftpilot.fr',
    siteName: 'ShiftPilot',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function LandingPage() {
  return (
    <main className="relative w-full overflow-x-hidden font-sans text-slate-900 dark:text-slate-100 bg-[#F5F5F7] dark:bg-[#000000]">
      <Navbar />
      <Hero />
      <TrustSection />
      <BentoFeatures />
      <BeforeAfterSection />
      <InteractiveDemoSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
