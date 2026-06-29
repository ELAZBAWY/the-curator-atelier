// ═══════════════════════════════
// timeslots.ts
// Purpose: Generate available appointment time slots
// Exports: TimeSlot interface, getAvailableSlots function
// ═══════════════════════════════

export interface TimeSlot {
  time: string
  display: string
  available: boolean
}

const START_HOUR = 9
const END_HOUR = 16
const INTERVAL_MINUTES = 30

// Mock booked slots stored in memory (replace with API)
const bookedSlots: Record<string, string[]> = {}

// --- Generate all possible slots for a day ---
function generateAllSlots(): Omit<TimeSlot, "available">[] {
  const slots: Omit<TimeSlot, "available">[] = []
  let currentHour = START_HOUR
  let currentMinute = 0

  while (currentHour < END_HOUR || (currentHour === END_HOUR && currentMinute === 0)) {
    const hour = currentHour.toString().padStart(2, "0")
    const minute = currentMinute.toString().padStart(2, "0")
    const time = `${hour}:${minute}`
    const display = `${hour}:${minute}`
    slots.push({ time, display })

    currentMinute += INTERVAL_MINUTES
    if (currentMinute >= 60) {
      currentMinute = 0
      currentHour += 1
    }
  }

  return slots
}

// --- Return available slots for a given date ---
export function getAvailableSlots(date: Date): TimeSlot[] {
  const dateKey = date.toISOString().split("T")[0]
  const allSlots = generateAllSlots()
  const booked = bookedSlots[dateKey] || []

  return allSlots.map((slot) => ({
    ...slot,
    available: !booked.includes(slot.time),
  }))
}

// --- Check if clinic is closed on a date (Fridays) ---
export function isClinicClosed(date: Date): boolean {
  return date.getDay() === 5 // Friday
}

// --- Book a slot (mock) ---
export function bookSlot(date: Date, time: string): void {
  const dateKey = date.toISOString().split("T")[0]
  if (!bookedSlots[dateKey]) {
    bookedSlots[dateKey] = []
  }
  bookedSlots[dateKey].push(time)
}
