"use client"

// ═══════════════════════════════
// Services Page
// Purpose: Full services listing page
// Route: /[locale]/services
// ═══════════════════════════════

import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles, Sun, Wrench, AlignCenter, Activity, Star, ArrowRight, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageTransition } from "@/components/ui/PageTransition"
import { SERVICES } from "@/lib/data/services"
import { fadeUp, stagger } from "@/lib/animations"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ElementType> = {
  Sparkles, Sun, Wrench, AlignCenter, Activity, Star,
}

export default function ServicesPage() {
  const t = useTranslations()
  const pathname = usePathname()
  const locale = pathname.split("/")[1] || "en"
  const isRTL = locale === "ar"

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              {t("services.title")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("services.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon] || Sparkles
              return (
                <motion.div key={service.id} variants={fadeUp}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-semibold text-xl mb-2">
                            {locale === "ar" ? service.nameAr : service.nameEn}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {locale === "ar" ? service.descriptionAr : service.descriptionEn}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {service.durationMinutes} min
                            </span>
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              {t("services.startingFrom")} {service.priceFrom} {t("common.currency")}
                            </span>
                          </div>
                          <Link href={`/${locale}/booking?service=${service.id}`}>
                            <Button>
                              {t("services.bookNow")}
                              <ArrowRight className={cn("w-4 h-4 ml-2", isRTL && "rotate-180 mr-2 ml-0")} />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
