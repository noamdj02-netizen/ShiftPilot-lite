import { Navbar } from '@/components/marketing/Navbar'
import { HeroSection } from '@/components/sections/HeroSection'
import { LogosSection } from '@/components/sections/LogosSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { DashboardPreview } from '@/components/sections/DashboardPreview'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'
import { Footer } from '@/components/marketing/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <LogosSection />
      <FeaturesSection />
      <HowItWorks />
      <DashboardPreview />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}

