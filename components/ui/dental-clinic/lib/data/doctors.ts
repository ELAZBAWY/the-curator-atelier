// ═══════════════════════════════
// doctors.ts
// Purpose: Doctor information for the clinic
// Exports: Doctor interface, DOCTORS array
// ═══════════════════════════════

export interface Doctor {
  id: string
  nameEn: string
  nameAr: string
  titleEn: string
  titleAr: string
  specialties: string[]
  experienceYears: number
}

export const DOCTORS: Doctor[] = [
  {
    id: "dr-ahmed",
    nameEn: "Dr. Ahmed Hassan",
    nameAr: "د. أحمد حسن",
    titleEn: "Chief Dental Surgeon",
    titleAr: "جراح الأسنان الرئيسي",
    specialties: ["Implants", "Cosmetic Dentistry", "Oral Surgery"],
    experienceYears: 15,
  },
  {
    id: "dr-sarah",
    nameEn: "Dr. Sarah Kamal",
    nameAr: "د. سارة كمال",
    titleEn: "Orthodontist",
    titleAr: "أخصائية تقويم الأسنان",
    specialties: ["Braces", "Invisalign", "Pediatric Orthodontics"],
    experienceYears: 10,
  },
]
