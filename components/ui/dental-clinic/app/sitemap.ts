import { MetadataRoute } from "next"
import { locales } from "@/i18n"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/booking", "/auth/login", "/auth/register", "/dashboard", "/payment"]

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `https://drahmed-dental.com/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
      })
    }
  }

  return entries
}
