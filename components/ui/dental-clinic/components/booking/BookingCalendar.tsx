"use client"

// ═══════════════════════════════
// BookingCalendar
// Purpose: Date picker with availability logic (Fridays disabled, past dates disabled)
// Props: selectedDate?: Date, onSelect: (date: Date) => void, locale: string
// ═══════════════════════════════

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Calendar } from "@/components/ui/calendar"
import { isClinicClosed } from "@/lib/data/timeslots"
import { cn } from "@/lib/utils"

interface BookingCalendarProps {
  selectedDate?: Date
  onSelect: (date: Date) => void
  locale: string
}

export function BookingCalendar({ selectedDate, onSelect, locale }: BookingCalendarProps) {
  const t = useTranslations("booking")
  const [month, setMonth] = useState(new Date())

  // --- Disable past dates and Fridays ---
  const disabledDays = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today || isClinicClosed(date)
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{t("selectDate")}</h3>
      <div className="border rounded-lg p-4 bg-card">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && onSelect(date)}
          disabled={disabledDays}
          month={month}
          onMonthChange={setMonth}
          className={cn("mx-auto", locale === "ar" && "rtl")}
        />
        <p className="text-xs text-muted-foreground mt-4 text-center">
          {t("closedFriday")}
        </p>
      </div>
    </div>
  )
}
