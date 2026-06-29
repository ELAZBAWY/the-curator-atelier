"use client"

// ═══════════════════════════════
// HeroSection
// Purpose: Main landing hero with animated background, stats, CTAs
// Props: none (uses next-intl for translations)
// ═══════════════════════════════

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Sparkles, Users, Award, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { fadeUp, stagger } from "@/lib/animations"

export function HeroSection() {
  const t = useTranslations()
  const pathname = usePathname()
  const locale = pathname.split("/")[1] || "en"

  // --- Stats data ---
  const stats = [
    { icon: Users, value: "500+", label: t("hero.statPatients") },
    { icon: Clock, value: "15", label: t("hero.statExperience") },
    { icon: Star, value: "4.9", label: t("hero.statRating") },
    { icon: Award, value: "12", label: t("hero.statAwards") },
  ]

  return (
    <section className="relative min-h-[100dvh] flex items-center animated-bg overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 shimmer-badge mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {t("hero.badge")}
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            {t("hero.title")}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-16">
            <Link href={`/${locale}/booking`}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
              >
                {t("hero.ctaPrimary")}
              </Button>
            </Link>
            <Link href={`/${locale}/services`}>
              <Button variant="outline" size="lg">
                {t("hero.ctaSecondary")}
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero illustration - animated tooth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block w-[400px] h-[400px]"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full opacity-20 dark:opacity-10">
            <defs>
              <linearGradient id="toothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
            <path
              d="M100 20 C70 20, 50 40, 50 70 C50 90, 60 110, 60 130 C60 160, 70 180, 80 180 C90 180, 95 160, 100 140 C105 160, 110 180, 120 180 C130 180, 140 160, 140 130 C140 110, 150 90, 150 70 C150 40, 130 20, 100 20Z"
              fill="url(#toothGrad)"
              className="animate-pulse-glow"
            />
            <circle cx="160" cy="40" r="8" fill="hsl(var(--accent))" opacity="0.6">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="40" cy="60" r="5" fill="hsl(var(--primary))" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
            </circle>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
