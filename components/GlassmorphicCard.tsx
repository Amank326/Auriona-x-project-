"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export default function GlassmorphicCard({ 
  children, 
  className = "", 
  delay = 0,
  hover = true 
}: GlassmorphicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { 
        y: -5,
        boxShadow: "0 20px 60px rgba(168, 85, 247, 0.3)"
      } : {}}
      className={`
        glass-effect group relative
        ${className}
      `}
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "24px",
        padding: "32px",
        position: "relative",
        overflow: "hidden",
        transform: "translateZ(0)",
        ...(hover ? { willChange: "transform" } : {})
      }}
    >
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
          pointerEvents: "none"
        }}
      />
      
      {/* Shimmer effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
          transform: "translateX(-100%)",
          animation: "shimmer 2s infinite"
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </motion.div>
  )
}
