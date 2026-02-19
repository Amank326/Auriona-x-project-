"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ReactNode, useRef } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
}

export default function ParallaxSection({ 
  children, 
  speed = 0.5,
  className = ""
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  
  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ y, opacity, scale }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </div>
  )
}
