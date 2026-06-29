"use client"

// ═══════════════════════════════
// Footer
// Purpose: Site-wide footer with links, contact, social icons
// Props: none
// ═══════════════════════════════

import Link from "next/link"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { Tooth, Instagram, Facebook, Phone } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const t = useTranslations()
  const pathname = usePathname()
  const locale = pathname.split("/")[1] || "en"

  const quickLinks = [
    { href: `/${locale}`, label: t("nav.home") },
    { href: `/${locale}/services`, label: t("nav.services") },
    { href: `/${locale}/booking`, label: t("nav.book") },
  ]

  const serviceLinks = [
    { href: `/${locale}/services`, label: t("services.services.cleaning.name") },
    { href: `/${locale}/services`, label: t("services.services.whitening.name") },
    { href: `/${locale}/services`, label: t("services.services.implants.name") },
    { href: `/${locale}/services`, label: t("services.services.orthodontics.name") },
  ]

  return (
    <footer className="bg-muted/50 dark:bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Tooth className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold">Dr. Ahmed</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.services")}</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground">
                {t("footer.address")}
              </li>
              <li className="text-sm text-muted-foreground">
                {t("footer.phone")}
              </li>
              <li className="text-sm text-muted-foreground">
                {t("footer.email")}
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                className="p-2 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {t("footer.copyright")}
        </div>
      </div>
    </footer>
  )
}
