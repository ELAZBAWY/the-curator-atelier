// ═══════════════════════════════
// useLocale.ts
// Purpose: Locale helper hook for RTL detection
// Exports: useLocale hook
// ═══════════════════════════════

"use client"

import { useParams } from "next/navigation"

export function useLocale(): string {
  const params = useParams()
  return (params?.locale as string) || "en"
}

export function useIsRTL(): boolean {
  const locale = useLocale()
  return locale === "ar"
}
