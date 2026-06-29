// ═══════════════════════════════
// formatDate.ts
// Purpose: Date formatting utilities with locale support
// Exports: formatDate, formatTime
// ═══════════════════════════════

export function formatDate(date: Date, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date)
}

export function formatTime(time: string, locale: string = "en"): string {
  const [hours, minutes] = time.split(":").map(Number)
  const date = new Date()
  date.setHours(hours, minutes)
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)
}
