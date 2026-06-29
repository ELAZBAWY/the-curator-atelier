// ═══════════════════════════════
// Home Page
// Purpose: Landing page with all home sections
// Route: /[locale]
// ═══════════════════════════════

import { HeroSection } from "@/components/home/HeroSection"
import { ServicesPreview } from "@/components/home/ServicesPreview"
import { StatsSection } from "@/components/home/StatsSection"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { CtaSection } from "@/components/home/CtaSection"
import { PageTransition } from "@/components/ui/PageTransition"

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <ServicesPreview />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
    </PageTransition>
  )
}
