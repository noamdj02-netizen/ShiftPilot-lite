import { HeroSection } from "@/components/sections/HeroSection";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PricingSection } from "@/components/sections/PricingSection";
import { StatsStrip } from "@/components/marketing/StatsStrip";
import { FAQSection } from "@/components/marketing/FAQSection";
import { TestimonialsStrip } from "@/components/marketing/TestimonialsStrip";
import { CoverageCTA } from "@/components/marketing/CoverageCTA";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StatsStrip />
      <DashboardPreview />
      <HowItWorks />
      <FAQSection />
      <TestimonialsStrip />
      <CoverageCTA />
      <PricingSection />
      <Footer />
    </>
  );
}
