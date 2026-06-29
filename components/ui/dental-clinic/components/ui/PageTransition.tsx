"use client"

// ═══════════════════════════════
// PageTransition
// Purpose: Wrap pages with Framer Motion transitions
// Props: children: ReactNode, className?: string
// ═══════════════════════════════

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
