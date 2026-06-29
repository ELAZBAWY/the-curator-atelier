"use client"

// ═══════════════════════════════
// ServicesPreview
// Purpose: 6 service cards grid with scroll-triggered animations
// Props: none
// ═══════════════════════════════

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Sparkles, Sun, Wrench, AlignCenter, Activity, Star, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { SERVICES } from "@/lib/data/services"
import { fadeUp, stagger } from "@/lib/animations"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Sun,
  Wrench,
  AlignCenter,
  Activity,
  Star,
}

export function ServicesPreview() {
  const t = useTranslations()
  const pathname = usePathname()
  const locale = pathname.split("/")[1] || "en"
  const isRTL = locale === "ar"

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            {t("services.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Sparkles
            return (
              <motion.div key={service.id} variants={fadeUp}>
                <Card className="group h-full hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Icon */}
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-lg mb-2">
                      {locale === "ar" ? service.nameAr : service.nameEn}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                      {locale === "ar" ? service.descriptionAr : service.descriptionEn}
                    </p>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm text-muted-foreground">
                        {t("services.startingFrom")} {service.priceFrom} {t("common.currency")}
                      </span>
                      <Link
                        href={`/${locale}/booking?service=${service.id}`}
                        className={cn(
                          "inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline",
                          isRTL && "flex-row-reverse"
                        )}
                      >
                        {t("services.bookNow")}
                        <ArrowRight className={cn("w-4 h-4", isRTL && "rotate-180")} />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
