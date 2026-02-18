"use client"

import { motion } from "framer-motion"

interface LoadingAnimation3DProps {
  size?: number
  color?: string
}

export default function LoadingAnimation3D({ 
  size = 60, 
  color = "#a855f7" 
}: LoadingAnimation3DProps) {
  return (
    <div className="flex items-center justify-center" style={{ perspective: "1000px" }}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-t-transparent"
          style={{ 
            borderColor: color,
            borderTopColor: "transparent",
            transformStyle: "preserve-3d"
          }}
          animate={{ 
            rotateZ: 360,
            rotateX: [0, 360],
          }}
          transition={{ 
            rotateZ: { duration: 1, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 2, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Middle ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-4 border-t-transparent"
          style={{ 
            borderColor: "#ec4899",
            borderTopColor: "transparent",
            transformStyle: "preserve-3d"
          }}
          animate={{ 
            rotateZ: -360,
            rotateY: [0, 360],
          }}
          transition={{ 
            rotateZ: { duration: 1.5, repeat: Infinity, ease: "linear" },
            rotateY: { duration: 2.5, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-t-transparent"
          style={{ 
            borderColor: "#06b6d4",
            borderTopColor: "transparent",
            transformStyle: "preserve-3d"
          }}
          animate={{ 
            rotateZ: 360,
            rotateX: [0, -360],
          }}
          transition={{ 
            rotateZ: { duration: 2, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 3, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
