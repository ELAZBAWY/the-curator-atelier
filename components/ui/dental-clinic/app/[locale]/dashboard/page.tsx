"use client"

// ═══════════════════════════════
// Dashboard Page
// Purpose: Protected patient dashboard with appointments
// Route: /[locale]/dashboard
// ═══════════════════════════════

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Calendar, Clock, User, LogOut, Stethoscope, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageTransition } from "@/components/ui/PageTransition"
import { useAuth } from "@/hooks/useAuth"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { getServiceById } from "@/lib/data/services"
import { formatDate, formatTime } from "@/lib/utils/formatDate"
import { cn } from "@/lib/utils"

interface StoredBooking {
  id: string
  serviceId: string
  date: string
  time: string
  fullName: string
  status: "confirmed" | "completed" | "cancelled"
  createdAt: string
}

export default function DashboardPage() {
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()
  const locale = pathname.split("/")[1] || "en"
  const isRTL = locale === "ar"
  const { user, isLoading, logout } = useAuth()
  const [bookings, setBookings] = useState<StoredBooking[]>([])

  // --- Redirect if not authenticated ---
  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/${locale}/auth/login`)
    }
  }, [isLoading, user, router, locale])

  // --- Load bookings from localStorage ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("dental_bookings")
        if (stored) {
          setBookings(JSON.parse(stored))
        }
      } catch (e) {
        console.error("Failed to load bookings", e)
      }
    }
  }, [])

  if (isLoading) {
    return (
      <div className="pt-32 flex justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) return null

  // --- Filter bookings ---
  const upcoming = bookings.filter((b) => b.status === "confirmed")
  const past = bookings.filter((b) => b.status !== "confirmed")

  // --- Get initials for avatar ---
  const initials = user.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <PageTransition>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{initials}</span>
                </div>
                <div>
                  <h1 className="font-display text-2xl sm:text-3xl font-bold">
                    {t("dashboard.welcome", { name: user.fullName })}
                  </h1>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button variant="outline" onClick={logout} className={cn(isRTL && "flex-row-reverse")}>
                <LogOut className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
                {t("dashboard.signOut")}
              </Button>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          >
            <Link href={`/${locale}/booking`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{t("dashboard.bookNew")}</h3>
                    <p className="text-sm text-muted-foreground">{t("booking.subtitle")}</p>
                  </div>
                  <ChevronRight className={cn("w-5 h-5 text-muted-foreground", isRTL && "rotate-180")} />
                </CardContent>
              </Card>
            </Link>
            <Link href={`/${locale}/services`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{t("dashboard.viewServices")}</h3>
                    <p className="text-sm text-muted-foreground">{t("services.subtitle")}</p>
                  </div>
                  <ChevronRight className={cn("w-5 h-5 text-muted-foreground", isRTL && "rotate-180")} />
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Upcoming Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  {t("dashboard.upcoming")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcoming.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>{t("dashboard.noAppointments")}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcoming.map((booking) => {
                      const service = getServiceById(booking.serviceId)
                      return (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 rounded-lg border bg-card"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Clock className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {locale === "ar" ? service?.nameAr : service?.nameEn}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(new Date(booking.date), locale)} • {formatTime(booking.time, locale)}
                              </p>
                            </div>
                          </div>
                          <Badge variant="default">{t("dashboard.confirmed")}</Badge>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Past Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  {t("dashboard.past")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {past.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">{t("dashboard.noAppointments")}</p>
                ) : (
                  <div className="space-y-4">
                    {past.map((booking) => {
                      const service = getServiceById(booking.serviceId)
                      return (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 rounded-lg border bg-muted/50"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <Stethoscope className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {locale === "ar" ? service?.nameAr : service?.nameEn}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(new Date(booking.date), locale)} • {formatTime(booking.time, locale)}
                              </p>
                            </div>
                          </div>
                          <Badge variant={booking.status === "completed" ? "secondary" : "destructive"}>
                            {t(`dashboard.${booking.status}`)}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
