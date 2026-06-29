"use client"

// ═══════════════════════════════
// TimeSlotPicker
// Purpose: Grid of available time slots with selection state
// Props: selectedDate: Date, selectedTime?: string, onSelect: (time: string) => void
// ═══════════════════════════════

import { useMemo } from "react"
import { useTranslations } from "next-intl"
import { getAvailableSlots, TimeSlot } from "@/lib/data/timeslots"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TimeSlotPickerProps {
  selectedDate: Date
  selectedTime?: string
  onSelect: (time: string) => void
}

export function TimeSlotPicker({ selectedDate, selectedTime, onSelect }: TimeSlotPickerProps) {
  const t = useTranslations("booking")

  // --- Generate slots for selected date ---
  const slots = useMemo(() => getAvailableSlots(selectedDate), [selectedDate])

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{t("selectTime")}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {slots.map((slot) => (
          <Button
            key={slot.time}
            variant={selectedTime === slot.time ? "default" : "outline"}
            size="sm"
            disabled={!slot.available}
            onClick={() => onSelect(slot.time)}
            className={cn(
              "text-xs sm:text-sm",
              !slot.available && "opacity-50 cursor-not-allowed"
            )}
          >
            {slot.display}
          </Button>
        ))}
      </div>
      {slots.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          {t("noSlots")}
        </p>
      )}
    </div>
  )
}
