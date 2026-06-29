"use client"

import { cn } from "@/lib/utils"

// ═══════════════════════════════
// PaymentForm
// Purpose: Card payment form with live formatting, validation, card type detection
// Props: amount: number, onSuccess: () => void
// ═══════════════════════════════

import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { CreditCard, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { paymentSchema } from "@/lib/utils/validators"
import { useToast } from "@/hooks/use-toast"
import type { z } from "zod"

interface PaymentFormProps {
  amount: number
  onSuccess: () => void
}

// --- Detect card type from number ---
function detectCardType(number: string): "visa" | "mastercard" | "unknown" {
  const clean = number.replace(/\s/g, "")
  if (/^4/.test(clean)) return "visa"
  if (/^5[1-5]/.test(clean)) return "mastercard"
  return "unknown"
}

// --- Format card number with spaces ---
function formatCardNumber(value: string): string {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
  const matches = v.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ""
  const parts = []
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }
  return parts.length ? parts.join(" ") : value
}

// --- Format expiry as MM/YY ---
function formatExpiry(value: string): string {
  const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
  if (v.length >= 2) {
    return v.substring(0, 2) + "/" + v.substring(2, 4)
  }
  return v
}

export function PaymentForm({ amount, onSuccess }: PaymentFormProps) {
  const t = useTranslations("payment")
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardType, setCardType] = useState<"visa" | "mastercard" | "unknown">("unknown")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      payAtClinic: false,
    },
  })

  const payAtClinic = watch("payAtClinic")

  // --- Handle card number input with formatting ---
  const handleCardNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatCardNumber(e.target.value)
      setValue("cardNumber", formatted)
      setCardType(detectCardType(formatted))
    },
    [setValue]
  )

  // --- Handle expiry input with formatting ---
  const handleExpiryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatExpiry(e.target.value)
      setValue("expiry", formatted)
    },
    [setValue]
  )

  // --- Process payment ---
  const onSubmit = async (data: z.infer<typeof paymentSchema>) => {
    if (data.payAtClinic) {
      toast({ title: t("success") })
      onSuccess()
      return
    }

    setIsProcessing(true)

    // TODO: Replace with API call to POST /api/payments
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({ title: t("success") })
    setIsProcessing(false)
    onSuccess()
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 mb-6">
        <Lock className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">{t("securePayment")}</span>
      </div>

      {/* Cardholder Name */}
      <div className="space-y-2">
        <Label htmlFor="cardholderName">{t("cardholderName")}</Label>
        <Input
          id="cardholderName"
          {...register("cardholderName")}
          placeholder="John Doe"
          disabled={payAtClinic}
          className={errors.cardholderName ? "border-destructive" : ""}
        />
        {errors.cardholderName && (
          <p className="text-xs text-destructive">{errors.cardholderName.message}</p>
        )}
      </div>

      {/* Card Number */}
      <div className="space-y-2">
        <Label htmlFor="cardNumber">{t("cardNumber")}</Label>
        <div className="relative">
          <Input
            id="cardNumber"
            {...register("cardNumber")}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            disabled={payAtClinic}
            className={cn(
              "pr-10",
              errors.cardNumber ? "border-destructive" : ""
            )}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {cardType === "visa" && (
              <span className="text-xs font-bold text-blue-600">VISA</span>
            )}
            {cardType === "mastercard" && (
              <span className="text-xs font-bold text-red-600">MC</span>
            )}
            {cardType === "unknown" && (
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
        </div>
        {errors.cardNumber && (
          <p className="text-xs text-destructive">{errors.cardNumber.message}</p>
        )}
      </div>

      {/* Expiry & CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">{t("expiry")}</Label>
          <Input
            id="expiry"
            {...register("expiry")}
            onChange={handleExpiryChange}
            placeholder="MM/YY"
            maxLength={5}
            disabled={payAtClinic}
            className={errors.expiry ? "border-destructive" : ""}
          />
          {errors.expiry && (
            <p className="text-xs text-destructive">{errors.expiry.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">{t("cvv")}</Label>
          <Input
            id="cvv"
            type="password"
            {...register("cvv")}
            placeholder="123"
            maxLength={4}
            disabled={payAtClinic}
            className={errors.cvv ? "border-destructive" : ""}
          />
          {errors.cvv && (
            <p className="text-xs text-destructive">{errors.cvv.message}</p>
          )}
        </div>
      </div>

      {/* Pay at clinic option */}
      <div className="flex items-center gap-2 pt-2">
        <Checkbox
          id="payAtClinic"
          {...register("payAtClinic")}
          onCheckedChange={(checked) => setValue("payAtClinic", checked as boolean)}
        />
        <Label htmlFor="payAtClinic" className="text-sm font-normal cursor-pointer">
          {t("payAtClinic")}
        </Label>
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={isProcessing}>
        {isProcessing ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            {t("processing")}
          </>
        ) : (
          t("payNow", { amount })
        )}
      </Button>
    </motion.form>
  )
}
