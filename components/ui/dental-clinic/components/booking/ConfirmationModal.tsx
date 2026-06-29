"use client"

// ═══════════════════════════════
// ConfirmationModal
// Purpose: Booking summary modal before payment
// Props: booking: BookingData, onConfirm: () => void, onEdit: () => void, locale: string
// ═══════════════════════════════

import { useTranslations } from "next-intl"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate, formatTime } from "@/lib/utils/formatDate"
import { getServiceById } from "@/lib/data/services"
import type { BookingData } from "@/hooks/useBooking"

interface ConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  booking: BookingData
  onConfirm: () => void
  onEdit: () => void
  locale: string
}

export function ConfirmationModal({
  open,
  onOpenChange,
  booking,
  onConfirm,
  onEdit,
  locale,
}: ConfirmationModalProps) {
  const t = useTranslations("booking")
  const service = getServiceById(booking.serviceId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("summary")}</DialogTitle>
          <DialogDescription>{t("confirm")}</DialogDescription>
        </DialogHeader>

        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("service")}</span>
              <span className="font-medium">
                {locale === "ar" ? service?.nameAr : service?.nameEn}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("date")}</span>
              <span className="font-medium">
                {booking.date ? formatDate(booking.date, locale) : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("time")}</span>
              <span className="font-medium">
                {booking.time ? formatTime(booking.time, locale) : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("price")}</span>
              <span className="font-medium">
                {service?.priceFrom} {t("common.currency")}
              </span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("fullName")}</span>
                <span className="font-medium">{booking.fullName}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onEdit} className="flex-1">
            {t("edit")}
          </Button>
          <Button onClick={onConfirm} className="flex-1">
            {t("confirmPay")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
