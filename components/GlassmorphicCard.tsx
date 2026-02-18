"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hoverEffect?: boolean
}

export default function GlassmorphicCard({ 
  children, 
  className = "", 
  delay = 0,
  hoverEffect = true 
}: GlassmorphicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={hoverEffect ? { 
        y: -10, 
        scale: 1.02,
        boxShadow: "0 20px 60px rgba(168, 85, 247, 0.3)"
      } : {}}
      className={`
        relative overflow-hidden rounded-3xl
        bg-gradient-to-br from-white/5 via-white/10 to-white/5
        backdrop-blur-2xl border border-white/20
        shadow-xl shadow-purple-500/10
        transition-all duration-300
        ${className}
      `}
    >
      {/* Glassmorphic shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Content */}
      <div className="relative z-10 group">
        {children}
      </div>
    </motion.div>
  )
}
