"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ReactNode, useRef } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
}

export default function ParallaxSection({ 
  children, 
  className = "",
  speed = 0.5 
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
