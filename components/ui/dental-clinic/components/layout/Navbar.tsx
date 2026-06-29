"use client"

// ═══════════════════════════════
// Navbar
// Purpose: Sticky navigation with blur backdrop, mobile menu, lang switcher
// Props: none (uses next-intl and next-themes)
// ═══════════════════════════════

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Menu, X, Tooth } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { useAuth } from "@/hooks/useAuth"

export function Navbar() {
  const t = useTranslations("nav")
  const pathname = usePathname()
  const locale = pathname.split("/")[1] || "en"
  const isRTL = locale === "ar"
  const { user, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // --- Handle scroll for backdrop blur ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // --- Navigation links ---
  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/booking`, label: t("book") },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Tooth className="w-6 h-6 text-primary" />
            </div>
            <span className="font-display font-bold text-lg hidden sm:block">
              Dr. Ahmed
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {link.label}
                {/* Underline animation */}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
            {user && (
              <Link
                href={`/${locale}/dashboard`}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
              >
                {t("dashboard")}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300",
                    isActive(`/${locale}/dashboard`) ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            )}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* Desktop auth buttons */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <Button variant="ghost" size="sm" onClick={logout}>
                  {t("logout")}
                </Button>
              ) : (
                <>
                  <Link href={`/${locale}/auth/login`}>
                    <Button variant="ghost" size="sm">{t("login")}</Button>
                  </Link>
                  <Link href={`/${locale}/auth/register`}>
                    <Button size="sm">{t("register")}</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? "right" : "left"} className="w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  {links.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-lg font-medium transition-colors",
                          isActive(link.href)
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  {user && (
                    <SheetClose asChild>
                      <Link
                        href={`/${locale}/dashboard`}
                        className={cn(
                          "text-lg font-medium transition-colors",
                          isActive(`/${locale}/dashboard`)
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                        )}
                      >
                        {t("dashboard")}
                      </Link>
                    </SheetClose>
                  )}
                  <div className="border-t border-border pt-4 flex flex-col gap-2">
                    {user ? (
                      <Button onClick={() => { logout(); setMobileOpen(false); }}>
                        {t("logout")}
                      </Button>
                    ) : (
                      <>
                        <SheetClose asChild>
                          <Link href={`/${locale}/auth/login`}>
                            <Button variant="outline" className="w-full">{t("login")}</Button>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href={`/${locale}/auth/register`}>
                            <Button className="w-full">{t("register")}</Button>
                          </Link>
                        </SheetClose>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
