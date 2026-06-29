"use client"

// ═══════════════════════════════
// AnimatedBackground
// Purpose: CSS-only animated background with floating orbs and patterns
// Props: className?: string
// ═══════════════════════════════

import { cn } from "@/lib/utils"

export function AnimatedBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Dot grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230EA5E9' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Radial gradient at top */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 dark:opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Dental silhouette decorations */}
      <svg 
        className="dental-silhouette absolute top-[20%] right-[10%] w-24 h-24 animate-float-slow"
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M12 2C8.5 2 6 4.5 6 7c0 1.5.5 2.5 1 3.5.5 1 1 2 1 3.5 0 2.5-1 4-1 5.5 0 1.5 1 2.5 2 2.5s2-1 2-2.5c0-1.5-1-3-1-5.5 0-1.5.5-2.5 1-3.5.5-1 1-2 1-3.5 0-2.5-2.5-5-6-5z"/>
      </svg>

      <svg 
        className="dental-silhouette absolute bottom-[30%] left-[15%] w-16 h-16 animate-float-slower"
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M12 2C9 2 7 4 7 6.5c0 1.2.4 2 1 2.8.6.8 1 1.5 1 2.7 0 2-1 3.5-1 5 0 1.5 1 2.5 2 2.5s2-1 2-2.5c0-1.5-1-3-1-5 0-1.2.4-2 1-2.8.6-.8 1-1.6 1-2.8C13 4 11 2 12 2z"/>
      </svg>
    </div>
  )
}
