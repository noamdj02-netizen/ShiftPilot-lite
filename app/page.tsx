import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { TrustSection } from '@/components/sections/TrustSection'
import { BentoFeatures } from '@/components/sections/BentoFeatures'
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection'
import { AutomationSection } from '@/components/sections/AutomationSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { FAQSection } from '@/components/sections/FAQSection'

export const metadata = {
  title: "ShiftPilot Enterprise | Planifiez. Unifiez. Simplifiez.",
  description: "Une orchestration parfaite pour les entreprises multi-sites.",
  keywords: [
    "planning restaurant",
    "gestion équipe resto",
    "planning employés",
    "logiciel planning",
    "horaires restaurant",
  ],
  openGraph: {
    title: "ShiftPilot Enterprise | Planifiez. Unifiez. Simplifiez.",
    description: "Une orchestration parfaite pour les entreprises multi-sites.",
    url: "https://shiftpilot.fr",
    siteName: "ShiftPilot",
    locale: "fr_FR",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <main className="relative w-full overflow-x-hidden font-sans text-slate-900 dark:text-slate-100 bg-background-light dark:bg-background-dark">
      <Navbar />
      <Hero />
      <TrustSection />
      <BentoFeatures />
      <BeforeAfterSection />
      <AutomationSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
