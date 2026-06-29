"use client"

// ═══════════════════════════════
// Login Page
// Purpose: User authentication with animated background
// Route: /[locale]/auth/login
// ═══════════════════════════════

import { useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Tooth } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LoginForm } from "@/components/auth/LoginForm"
import { AnimatedBackground } from "@/components/ui/AnimatedBackground"
import { useAuth } from "@/hooks/useAuth"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

export default function LoginPage() {
  const t = useTranslations("auth")
  const pathname = usePathname()
  const router = useRouter()
  const locale = pathname.split("/")[1] || "en"
  const { user, isLoading, login } = useAuth()

  // --- Redirect if already authenticated ---
  useEffect(() => {
    if (user) {
      router.push(`/${locale}/dashboard`)
    }
  }, [user, router, locale])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (user) return null

  return (
    <div className="min-h-screen flex items-center justify-center relative animated-bg">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Tooth className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">{t("loginTitle")}</CardTitle>
            <CardDescription>{t("loginSubtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm onSuccess={login} />

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">{t("noAccount")} </span>
              <Link
                href={`/${locale}/auth/register`}
                className="text-primary hover:underline font-medium"
              >
                {t("createOne")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
