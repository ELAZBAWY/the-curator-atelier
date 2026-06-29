"use client"

// ═══════════════════════════════
// BookingForm
// Purpose: Patient details form with react-hook-form + zod validation
// Props: defaultValues?, onSubmit: (data) => void
// ═══════════════════════════════

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { bookingSchema } from "@/lib/utils/validators"
import type { z } from "zod"

interface BookingFormProps {
  defaultValues?: {
    fullName: string
    phone: string
    email: string
    notes: string
  }
  onSubmit: (data: { fullName: string; phone: string; email: string; notes: string }) => void
}

export function BookingForm({ defaultValues, onSubmit }: BookingFormProps) {
  const t = useTranslations("booking")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema.pick({ fullName: true, phone: true, email: true, notes: true })),
    defaultValues: defaultValues || {
      fullName: "",
      phone: "",
      email: "",
      notes: "",
    },
  })

  // --- Handle form submission ---
  const handleFormSubmit = (data: z.infer<typeof bookingSchema>) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <h3 className="font-semibold text-lg">{t("patientDetails")}</h3>

      <div className="space-y-2">
        <Label htmlFor="fullName">{t("fullName")}</Label>
        <Input
          id="fullName"
          {...register("fullName")}
          placeholder={t("fullName")}
          className={errors.fullName ? "border-destructive" : ""}
        />
        {errors.fullName && (
          <p className="text-xs text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t("phone")}</Label>
        <Input
          id="phone"
          {...register("phone")}
          placeholder={t("phone")}
          className={errors.phone ? "border-destructive" : ""}
        />
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder={t("email")}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">{t("notes")}</Label>
        <Input
          id="notes"
          {...register("notes")}
          placeholder={t("notes")}
        />
      </div>

      <Button type="submit" className="w-full">
        {t("confirm")}
      </Button>
    </form>
  )
}
