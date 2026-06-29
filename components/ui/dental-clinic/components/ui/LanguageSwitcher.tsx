"use client"

// ═══════════════════════════════
// LanguageSwitcher
// Purpose: Toggle between EN and AR locales
// Props: className?: string
// ═══════════════════════════════

import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname()
  const router = useRouter()

  // --- Extract current locale from pathname ---
  const currentLocale = pathname.split("/")[1] || "en"
  const targetLocale = currentLocale === "en" ? "ar" : "en"

  // --- Switch locale by replacing URL prefix ---
  const handleSwitch = () => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${targetLocale}`)
    router.push(newPath)
  }

  return (
    <div className={cn("flex items-center gap-1 rounded-full border border-border bg-card p-1", className)}>
      <button
        onClick={handleSwitch}
        className={cn(
          "px-3 py-1 text-sm font-medium rounded-full transition-all duration-200",
          currentLocale === "en" 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={handleSwitch}
        className={cn(
          "px-3 py-1 text-sm font-medium rounded-full transition-all duration-200",
          currentLocale === "ar" 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="التبديل إلى العربية"
      >
        ع
      </button>
    </div>
  )
}
