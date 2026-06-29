"use client"

// ═══════════════════════════════
// CtaSection
// Purpose: Call-to-action section before footer
// Props: none
// ═══════════════════════════════

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CtaSection() {
  const t = useTranslations()
  const pathname = usePathname()
  const locale = pathname.split("/")[1] || "en"
  const isRTL = locale === "ar"

  return (
    <section className="py-20 bg-primary/5 dark:bg-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-8 sm:p-12 lg:p-16 text-center"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              {locale === "ar" ? "ابدأ رحلتك نحو ابتسامة مثالية" : "Start Your Journey to a Perfect Smile"}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              {locale === "ar"
                ? "احجز موعدك اليوم واكتشف الفرق الذي يمكن أن تحدثه رعاية الأسنان الاحترافية."
                : "Book your appointment today and discover the difference professional dental care can make."}
            </p>
            <Link href={`/${locale}/booking`}>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 shadow-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                {t("hero.ctaPrimary")}
                <ArrowRight className={cn("w-5 h-5 ml-2", isRTL && "rotate-180 mr-2 ml-0")} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
