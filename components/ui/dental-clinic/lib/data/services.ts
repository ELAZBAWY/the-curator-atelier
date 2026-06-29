// ═══════════════════════════════
// services.ts
// Purpose: Static dental services data with pricing and metadata
// Exports: Service interface, SERVICES array
// ═══════════════════════════════

export interface Service {
  id: string
  slug: string
  nameEn: string
  nameAr: string
  descriptionEn: string
  descriptionAr: string
  icon: string
  priceFrom: number
  durationMinutes: number
}

export const SERVICES: Service[] = [
  {
    id: "cleaning",
    slug: "teeth-cleaning",
    nameEn: "Teeth Cleaning",
    nameAr: "تنظيف الأسنان",
    descriptionEn: "Professional deep cleaning to remove plaque and tartar for a healthier smile.",
    descriptionAr: "تنظيف احترافي عميق لإزالة الجير والبلاك لابتسامة أكثر صحة.",
    icon: "Sparkles",
    priceFrom: 500,
    durationMinutes: 45,
  },
  {
    id: "whitening",
    slug: "teeth-whitening",
    nameEn: "Teeth Whitening",
    nameAr: "تبييض الأسنان",
    descriptionEn: "Advanced whitening treatments to brighten your smile safely and effectively.",
    descriptionAr: "علاجات تبييض متقدمة لتفتيح ابتسامتك بأمان وفعالية.",
    icon: "Sun",
    priceFrom: 1500,
    durationMinutes: 60,
  },
  {
    id: "implants",
    slug: "dental-implants",
    nameEn: "Dental Implants",
    nameAr: "زراعة الأسنان",
    descriptionEn: "Permanent tooth replacement solutions that look and feel completely natural.",
    descriptionAr: "حلول دائمة لاستبدال الأسنان تبدو طبيعية تماماً.",
    icon: "Wrench",
    priceFrom: 8000,
    durationMinutes: 120,
  },
  {
    id: "orthodontics",
    slug: "orthodontics",
    nameEn: "Orthodontics (Braces)",
    nameAr: "تقويم الأسنان",
    descriptionEn: "Straighten your teeth with modern braces and clear aligner options.",
    descriptionAr: "قوّس أسنانك مع تقنيات التقويم الحديثة والأجهزة الشفافة.",
    icon: "AlignCenter",
    priceFrom: 5000,
    durationMinutes: 45,
  },
  {
    id: "rootCanal",
    slug: "root-canal",
    nameEn: "Root Canal Treatment",
    nameAr: "علاج العصب",
    descriptionEn: "Pain-free root canal therapy to save damaged teeth and relieve discomfort.",
    descriptionAr: "علاج العصب بدون ألم لإنقاذ الأسنان التالفة وتخفيف الانزعاج.",
    icon: "Activity",
    priceFrom: 2000,
    durationMinutes: 90,
  },
  {
    id: "cosmetic",
    slug: "cosmetic-dentistry",
    nameEn: "Cosmetic Dentistry",
    nameAr: "تجميل الأسنان",
    descriptionEn: "Transform your smile with veneers, bonding, and aesthetic enhancements.",
    descriptionAr: "حوّل ابتسامتك مع القشور والتقويمات التجميلية الحديثة.",
    icon: "Star",
    priceFrom: 3000,
    durationMinutes: 60,
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id)
}
