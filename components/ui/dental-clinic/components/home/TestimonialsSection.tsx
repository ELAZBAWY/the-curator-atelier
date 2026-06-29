"use client"

// ═══════════════════════════════
// TestimonialsSection
// Purpose: Auto-scroll carousel with patient reviews
// Props: none
// ═══════════════════════════════

import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"

interface Testimonial {
  name: string
  nameAr: string
  review: string
  reviewAr: string
  rating: number
  date: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Johnson",
    nameAr: "سارة جونسون",
    review: "The best dental experience I've ever had. Dr. Ahmed was incredibly gentle and professional. My teeth have never looked better!",
    reviewAr: "أفضل تجربة أسنان مررت بها على الإطلاق. كان د. أحمد لطيفاً للغاية ومحترفاً. لم تبدو أسناني بهذا الشكل الرائع من قبل!",
    rating: 5,
    date: "2024-03-15",
  },
  {
    name: "Mohamed Ali",
    nameAr: "محمد علي",
    review: "I was nervous about my root canal, but the team made me feel completely at ease. Highly recommend this clinic!",
    reviewAr: "كنت قلقاً بشأن علاج العصب، لكن الفريق جعلني أشعر بالراحة التامة. أوصي بشدة بهذه العيادة!",
    rating: 5,
    date: "2024-02-28",
  },
  {
    name: "Emily Chen",
    nameAr: "إميلي تشن",
    review: "The whitening treatment exceeded my expectations. The results are amazing and the staff is so friendly.",
    reviewAr: "تجاوز علاج التبييض توقعاتي. النتائج مذهلة والموظفون ودودون للغاية.",
    rating: 5,
    date: "2024-01-20",
  },
  {
    name: "Omar Hassan",
    nameAr: "عمر حسن",
    review: "Professional service, modern equipment, and a very clean environment. My implants look completely natural.",
    reviewAr: "خدمة احترافية، معدات حديثة، وبيئة نظيفة للغاية. زراعة أسناني تبدو طبيعية تماماً.",
    rating: 4,
    date: "2024-03-01",
  },
]

export function TestimonialsSection() {
  const t = useTranslations()
  const pathname = usePathname()
  const locale = pathname.split("/")[1] || "en"
  const isRTL = locale === "ar"
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Carousel
            opts={{
              align: "start",
              direction: isRTL ? "rtl" : "ltr",
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <Quote className="w-8 h-8 text-primary/20 mb-4" />
                      <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                        {locale === "ar" ? testimonial.reviewAr : testimonial.review}
                      </p>
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">
                          {locale === "ar" ? testimonial.nameAr : testimonial.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {testimonial.date}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  )
}
