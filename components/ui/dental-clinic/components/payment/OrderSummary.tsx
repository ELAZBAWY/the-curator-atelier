"use client"

// ═══════════════════════════════
// OrderSummary
// Purpose: Display booking details and price breakdown
// Props: serviceId: string, date: Date, time: string, locale: string
// ═══════════════════════════════

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getServiceById } from "@/lib/data/services"
import { formatDate, formatTime } from "@/lib/utils/formatDate"

interface OrderSummaryProps {
  serviceId: string
  date: Date
  time: string
  locale: string
}

export function OrderSummary({ serviceId, date, time, locale }: OrderSummaryProps) {
  const t = useTranslations("payment")
  const service = getServiceById(serviceId)

  if (!service) return null

  const serviceFee = service.priceFrom
  const vat = Math.round(serviceFee * 0.14)
  const total = serviceFee + vat

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-semibold text-lg">{t("orderSummary")}</h3>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("service")}</span>
              <span className="font-medium">
                {locale === "ar" ? service.nameAr : service.nameEn}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("date")}</span>
              <span>{formatDate(date, locale)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("time")}</span>
              <span>{formatTime(time, locale)}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("serviceFee")}</span>
              <span>{serviceFee} {t("common.currency")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("vat")}</span>
              <span>{vat} {t("common.currency")}</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between font-bold text-lg">
            <span>{t("total")}</span>
            <span className="text-primary">{total} {t("common.currency")}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
