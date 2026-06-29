"use client"

// ═══════════════════════════════
// Payment Page
// Purpose: Protected payment flow with order summary
// Route: /[locale]/payment
// ═══════════════════════════════

import { useEffect, Suspense } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import { PageTransition } from "@/components/ui/PageTransition"
import { PaymentForm } from "@/components/payment/PaymentForm"
import { OrderSummary } from "@/components/payment/OrderSummary"
import { useAuth } from "@/hooks/useAuth"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

function PaymentContent() {
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const locale = pathname.split("/")[1] || "en"
  const { user, isLoading } = useAuth()

  const serviceId = searchParams.get("service") || ""
  const dateStr = searchParams.get("date") || ""
  const time = searchParams.get("time") || ""
  const date = dateStr ? new Date(dateStr) : new Date()

  // --- Redirect if not authenticated ---
  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/${locale}/auth/login?redirect=/payment`)
    }
  }, [isLoading, user, router, locale])

  if (isLoading) {
    return (
      <div className="pt-32 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleSuccess = () => {
    router.push(`/${locale}/dashboard`)
  }

  return (
    <PageTransition>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              {t("payment.title")}
            </h1>
            <p className="text-muted-foreground">{t("payment.subtitle")}</p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <OrderSummary
              serviceId={serviceId}
              date={date}
              time={time}
              locale={locale}
            />

            {/* Payment Form */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{t("payment.securePayment")}</span>
              </div>
              <PaymentForm
                amount={0} // Calculated in OrderSummary
                onSuccess={handleSuccess}
              />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center">Loading...</div>}>
      <PaymentContent />
    </Suspense>
  )
}
