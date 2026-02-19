"use client"

import { motion } from "framer-motion"
import { ReactNode, useState } from "react"
import { LucideIcon } from "lucide-react"

interface FlipCard3DProps {
  icon: LucideIcon
  title: string
  description: string
  backContent: string
  color: string
  delay?: number
}

export default function FlipCard3D({
  icon: Icon,
  title,
  description,
  backContent,
  color,
  delay = 0
}: FlipCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="h-80 perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl p-8 cursor-pointer"
          style={{
            backfaceVisibility: "hidden",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            transformStyle: "preserve-3d"
          }}
        >
          <div className={`w-14 h-14 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center mb-6`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-8 cursor-pointer"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${color.includes('purple') ? 'rgba(168, 85, 247, 0.2)' : color.includes('pink') ? 'rgba(236, 72, 153, 0.2)' : 'rgba(6, 182, 212, 0.2)'}, rgba(255, 255, 255, 0.05))`,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="flex flex-col justify-center h-full">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Learn More
            </h3>
            <p className="text-foreground/90 leading-relaxed">{backContent}</p>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </motion.div>
  )
}
