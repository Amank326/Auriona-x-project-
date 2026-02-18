"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedBackgroundProps {
  children: ReactNode
  variant?: "mesh" | "dots" | "grid"
}

export default function AnimatedBackground({ 
  children, 
  variant = "mesh" 
}: AnimatedBackgroundProps) {
  return (
    <div className="relative w-full h-full">
      {/* Animated mesh gradient background */}
      {variant === "mesh" && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 40%)",
                "radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 40%)",
                "radial-gradient(circle at 50% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 40%), radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 40%)",
                "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 40%)",
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 blur-3xl"
          />
        </div>
      )}

      {/* Animated dots pattern */}
      {variant === "dots" && (
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(168, 85, 247, 0.3) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      )}

      {/* Animated grid pattern */}
      {variant === "grid" && (
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
