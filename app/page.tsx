import { Hero } from "@/components/marketing/Hero";
import { StatsStrip } from "@/components/marketing/StatsStrip";
import { TemplateShowcase } from "@/components/marketing/TemplateShowcase";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { FAQSection } from "@/components/marketing/FAQSection";
import { TestimonialsStrip } from "@/components/marketing/TestimonialsStrip";
import { CoverageCTA } from "@/components/marketing/CoverageCTA";
import { PricingSection } from "@/components/marketing/PricingSection";
import { CaseStudiesSection } from "@/components/marketing/CaseStudiesSection";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsStrip />
      <TemplateShowcase />
      <HowItWorks />
      <FAQSection />
      <TestimonialsStrip />
      <CoverageCTA />
      <PricingSection />
      <CaseStudiesSection />
      <Footer />
    </>
  );
}
