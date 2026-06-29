"use client"

// ═══════════════════════════════
// LoginForm
// Purpose: Login form with validation, Google sign-in mock, remember me
// Props: onSuccess: (user: User) => void
// ═══════════════════════════════

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { LogIn } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { loginSchema } from "@/lib/utils/validators"
import { useToast } from "@/hooks/use-toast"
import type { z } from "zod"
import type { User } from "@/hooks/useAuth"

interface LoginFormProps {
  onSuccess: (user: User) => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const t = useTranslations("auth")
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  // --- Handle login submission ---
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true)

    // TODO: Replace with API call to POST /api/auth/login
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user: User = {
      id: "user-" + Date.now(),
      fullName: "Demo User",
      email: data.email,
      phone: "+20 123 456 7890",
    }

    onSuccess(user)
    toast({ title: t("loginSuccess"), description: data.email })
    setIsLoading(false)
  }

  // --- Mock Google sign-in ---
  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user: User = {
      id: "google-" + Date.now(),
      fullName: "Google User",
      email: "user@gmail.com",
      phone: "+20 123 456 7890",
    }

    onSuccess(user)
    toast({ title: t("loginSuccess"), description: "Google Sign In" })
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="rememberMe" {...register("rememberMe")} />
          <Label htmlFor="rememberMe" className="text-sm font-normal cursor-pointer">
            {t("rememberMe")}
          </Label>
        </div>
        <button
          type="button"
          onClick={() => toast({ title: "Coming soon", description: "Password reset feature" })}
          className="text-sm text-primary hover:underline"
        >
          {t("forgotPassword")}
        </button>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
        {t("signIn")}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {t("googleSignIn")}
      </Button>
    </motion.form>
  )
}
