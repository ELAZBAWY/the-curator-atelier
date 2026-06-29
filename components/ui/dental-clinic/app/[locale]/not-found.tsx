"use client"

// ═══════════════════════════════
// Locale Not Found Page
// Purpose: 404 within locale context
// ═══════════════════════════════

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LocaleNotFound() {
  const pathname = usePathname()
  const locale = pathname.split("/")[1] || "en"

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <h1 className="font-display text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">
          {locale === "ar" ? "الصفحة غير موجودة" : "Page Not Found"}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          {locale === "ar"
            ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها."
            : "The page you are looking for does not exist or has been moved."}
        </p>
        <Link href={`/${locale}`}>
          <Button>
            <Home className="w-4 h-4 mr-2" />
            {locale === "ar" ? "العودة للرئيسية" : "Back to Home"}
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
