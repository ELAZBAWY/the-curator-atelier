// ═══════════════════════════════
// validators.ts
// Purpose: Zod schemas for form validation
// Exports: loginSchema, registerSchema, bookingSchema, paymentSchema
// ═══════════════════════════════

import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
})

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is too short"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const bookingSchema = z.object({
  serviceId: z.string().min(1, "Please select a service"),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string().min(1, "Please select a time slot"),
  fullName: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email"),
  notes: z.string().optional(),
})

export const paymentSchema = z.object({
  cardholderName: z.string().min(2, "Cardholder name is required"),
  cardNumber: z
    .string()
    .min(16, "Invalid card number")
    .max(19, "Invalid card number")
    .regex(/^[0-9\s]+$/, "Invalid card number"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry format (MM/YY)"),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
  payAtClinic: z.boolean().optional(),
})
