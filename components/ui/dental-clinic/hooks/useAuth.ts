// ═══════════════════════════════
// useAuth.ts
// Purpose: Authentication state management hook
// Exports: useAuth hook
// ═══════════════════════════════

"use client"

import { useState, useEffect, useCallback } from "react"

export interface User {
  id: string
  fullName: string
  email: string
  phone: string
}

const STORAGE_KEY = "dental_clinic_user"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // --- Load user from localStorage on mount ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          setUser(JSON.parse(stored))
        }
      } catch (e) {
        console.error("Failed to parse user from localStorage", e)
      }
      setIsLoading(false)
    }
  }, [])

  const login = useCallback((userData: User) => {
    setUser(userData)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  return { user, isLoading, isAuthenticated: !!user, login, logout }
}
