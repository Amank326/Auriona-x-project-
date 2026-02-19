"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface Card3DProps {
  children: ReactNode
  className?: string
}

export default function Card3D({ children, className = "" }: Card3DProps) {
  return (
    <motion.div
      className={`relative group ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      whileHover={{
        rotateX: -5,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <motion.div
        className="relative p-8 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transformStyle: "preserve-3d",
          transform: "translateZ(50px)"
        }}
      >
        {/* Gradient overlay that follows cursor */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168, 85, 247, 0.15), transparent 50%)",
            pointerEvents: "none"
          }}
        />
        
        {/* Border glow */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5))",
            filter: "blur(20px)",
            transform: "translateZ(-10px)",
            zIndex: -1
          }}
        />
        
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}
