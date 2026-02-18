"use client"

import { motion } from "framer-motion"
import { ReactNode, useState } from "react"

interface FlipCard3DProps {
  frontContent: ReactNode
  backContent: ReactNode
  className?: string
}

export default function FlipCard3D({ 
  frontContent, 
  backContent, 
  className = "" 
}: FlipCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className={`relative w-full h-full ${className}`}
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* Front Face */}
        <motion.div
          className="absolute inset-0 backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <div className="w-full h-full rounded-3xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl border border-white/20 p-8 shadow-xl shadow-purple-500/10">
            {frontContent}
          </div>
        </motion.div>

        {/* Back Face */}
        <motion.div
          className="absolute inset-0 backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="w-full h-full rounded-3xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-2xl border border-white/20 p-8 shadow-xl shadow-cyan-500/10">
            {backContent}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
