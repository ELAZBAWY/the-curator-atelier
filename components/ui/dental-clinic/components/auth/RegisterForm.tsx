"use client"

// ═══════════════════════════════
// RegisterForm
// Purpose: Registration form with full validation
// Props: onSuccess: (user: User) => void
// ═══════════════════════════════

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { UserPlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { registerSchema } from "@/lib/utils/validators"
import { useToast } from "@/hooks/use-toast"
import type { z } from "zod"
import type { User } from "@/hooks/useAuth"

interface RegisterFormProps {
  onSuccess: (user: User) => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const t = useTranslations("auth")
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  // --- Handle registration ---
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setIsLoading(true)

    // TODO: Replace with API call to POST /api/auth/register
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const user: User = {
      id: "user-" + Date.now(),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    }

    onSuccess(user)
    toast({ title: t("registerSuccess"), description: data.email })
    setIsLoading(false)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
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
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="you@example.com"
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t("phone")}</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          placeholder="+20 123 456 7890"
          className={errors.phone ? "border-destructive" : ""}
        />
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          className={errors.password ? "border-destructive" : ""}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className={errors.confirmPassword ? "border-destructive" : ""}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
        {t("signUp")}
      </Button>
    </motion.form>
  )
}
