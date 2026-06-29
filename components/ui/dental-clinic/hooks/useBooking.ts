// ═══════════════════════════════
// useBooking.ts
// Purpose: Custom hook for booking state management
// Exports: useBooking hook
// ═══════════════════════════════

"use client"

import { useState, useCallback } from "react"

export interface BookingData {
  serviceId: string
  date: Date | null
  time: string
  fullName: string
  phone: string
  email: string
  notes: string
}

const initialBooking: BookingData = {
  serviceId: "",
  date: null,
  time: "",
  fullName: "",
  phone: "",
  email: "",
  notes: "",
}

export function useBooking() {
  const [booking, setBooking] = useState<BookingData>(initialBooking)
  const [step, setStep] = useState(1)

  const updateBooking = useCallback(
    (data: Partial<BookingData>) => {
      setBooking((prev) => ({ ...prev, ...data }))
    },
    []
  )

  const nextStep = useCallback(() => setStep((prev) => Math.min(prev + 1, 4)), [])
  const prevStep = useCallback(() => setStep((prev) => Math.max(prev - 1, 1)), [])
  const resetBooking = useCallback(() => {
    setBooking(initialBooking)
    setStep(1)
  }, [])

  return { booking, step, updateBooking, nextStep, prevStep, resetBooking }
}
