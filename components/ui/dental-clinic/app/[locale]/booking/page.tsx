"use client"

// ═══════════════════════════════
// Booking Page
// Purpose: Multi-step appointment booking flow
// Route: /[locale]/booking
// ═══════════════════════════════

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { PageTransition } from "@/components/ui/PageTransition"
import { BookingCalendar } from "@/components/booking/BookingCalendar"
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker"
import { BookingForm } from "@/components/booking/BookingForm"
import { ConfirmationModal } from "@/components/booking/ConfirmationModal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBooking } from "@/hooks/useBooking"
import { SERVICES } from "@/lib/data/services"
import { slideInRight, slideInLeft } from "@/lib/animations"
import { cn } from "@/lib/utils"

function BookingContent() {
  const t = useTranslations("booking")
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const locale = pathname.split("/")[1] || "en"
  const isRTL = locale === "ar"

  const { booking, step, updateBooking, nextStep, prevStep, resetBooking } = useBooking()
  const [showConfirm, setShowConfirm] = useState(false)

  // --- Pre-select service from URL ---
  useEffect(() => {
    const serviceId = searchParams.get("service")
    if (serviceId) {
      updateBooking({ serviceId })
    }
  }, [searchParams, updateBooking])

  // --- Progress calculation ---
  const progress = (step / 4) * 100

  // --- Step labels ---
  const steps = [t("step1"), t("step2"), t("step3"), t("step4")]

  // --- Handle step navigation ---
  const canProceed = () => {
    switch (step) {
      case 1: return !!booking.serviceId
      case 2: return !!booking.date
      case 3: return !!booking.time
      case 4: return !!booking.fullName && !!booking.phone && !!booking.email
      default: return false
    }
  }

  // --- Handle booking confirmation ---
  const handleConfirm = () => {
    // TODO: Replace localStorage with API call to POST /api/bookings
    try {
      const bookings = JSON.parse(localStorage.getItem("dental_bookings") || "[]")
      bookings.push({
        ...booking,
        id: "booking-" + Date.now(),
        createdAt: new Date().toISOString(),
        status: "confirmed",
      })
      localStorage.setItem("dental_bookings", JSON.stringify(bookings))
    } catch (e) {
      console.error("Failed to save booking", e)
    }

    setShowConfirm(false)
    router.push(`/${locale}/payment?service=${booking.serviceId}&date=${booking.date?.toISOString()}&time=${booking.time}`)
  }

  // --- Animation variants based on direction ---
  const variants = isRTL ? slideInLeft : slideInRight

  return (
    <PageTransition>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              {t("title")}
            </h1>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <Progress value={progress} className="mb-4" />
            <div className="flex justify-between text-sm">
              {steps.map((label, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-2",
                    step > index + 1 ? "text-primary" : step === index + 1 ? "text-foreground font-medium" : "text-muted-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                      step > index + 1
                        ? "bg-primary text-primary-foreground"
                        : step === index + 1
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {step > index + 1 ? <Check className="w-3 h-3" /> : index + 1}
                  </div>
                  <span className="hidden sm:inline">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card>
            <CardContent className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" {...variants}>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">{t("selectService")}</h3>
                      <Select
                        value={booking.serviceId}
                        onValueChange={(value) => updateBooking({ serviceId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectService")} />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICES.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {locale === "ar" ? service.nameAr : service.nameEn} - {service.priceFrom} {t("common.currency")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" {...variants}>
                    <BookingCalendar
                      selectedDate={booking.date || undefined}
                      onSelect={(date) => updateBooking({ date })}
                      locale={locale}
                    />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" {...variants}>
                    {booking.date ? (
                      <TimeSlotPicker
                        selectedDate={booking.date}
                        selectedTime={booking.time}
                        onSelect={(time) => updateBooking({ time })}
                      />
                    ) : (
                      <p className="text-muted-foreground">{t("selectDate")}</p>
                    )}
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" {...variants}>
                    <BookingForm
                      defaultValues={{
                        fullName: booking.fullName,
                        phone: booking.phone,
                        email: booking.email,
                        notes: booking.notes,
                      }}
                      onSubmit={(data) => {
                        updateBooking(data)
                        setShowConfirm(true)
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
              className={cn(isRTL && "flex-row-reverse")}
            >
              <ChevronLeft className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
              {t("back")}
            </Button>
            {step < 4 && (
              <Button onClick={nextStep} disabled={!canProceed()} className={cn(isRTL && "flex-row-reverse")}>
                {t("next")}
                <ChevronRight className={cn("w-4 h-4", isRTL ? "mr-2" : "ml-2")} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={showConfirm}
        onOpenChange={setShowConfirm}
        booking={booking}
        onConfirm={handleConfirm}
        onEdit={() => setShowConfirm(false)}
        locale={locale}
      />
    </PageTransition>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center">Loading...</div>}>
      <BookingContent />
    </Suspense>
  )
}
