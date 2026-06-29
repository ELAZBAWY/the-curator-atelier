"use client"

// ═══════════════════════════════
// StatsSection
// Purpose: Animated counter stats triggered on scroll
// Props: none
// ═══════════════════════════════

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { motion, useInView } from "framer-motion"
import { Users, Clock, ThumbsUp, Trophy } from "lucide-react"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
}

function Counter({ end, duration = 2000, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(easeOut * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function StatsSection() {
  const t = useTranslations("stats")

  const stats = [
    { icon: Users, value: 2500, suffix: "+", label: t("patients") },
    { icon: Clock, value: 15, suffix: "", label: t("experience") },
    { icon: ThumbsUp, value: 98, suffix: "%", label: t("satisfaction") },
    { icon: Trophy, value: 25, suffix: "+", label: t("awards") },
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-background shadow-sm mb-4">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold mb-1">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
