"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface Card3DProps {
  children: ReactNode
  className?: string
  rotateOnHover?: boolean
}

export default function Card3D({ 
  children, 
  className = "",
  rotateOnHover = true 
}: Card3DProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 0, rotateY: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={rotateOnHover ? {
        rotateX: 5,
        rotateY: 5,
        scale: 1.05,
        transition: { duration: 0.3 }
      } : {}}
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className={`relative ${className}`}
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d"
        }}
        className="relative"
      >
        {children}
      </div>
      
      {/* Shadow layer */}
      <motion.div
        whileHover={rotateOnHover ? {
          scale: 0.95,
          opacity: 0.5,
        } : {}}
        className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 blur-xl -z-10 rounded-3xl"
        style={{
          transform: "translateZ(-50px)"
        }}
      />
    </motion.div>
  )
}
