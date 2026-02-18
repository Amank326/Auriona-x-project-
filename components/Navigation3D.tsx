"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ReactNode } from "react"

interface NavItem3DProps {
  href: string
  children: ReactNode
  icon?: ReactNode
  active?: boolean
}

export function NavItem3D({ href, children, icon, active = false }: NavItem3DProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ 
          scale: 1.1, 
          rotateX: 5,
          rotateY: 5,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
        className={`
          relative px-6 py-3 rounded-full
          ${active 
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" 
            : "text-foreground hover:text-purple-600"
          }
          transition-colors duration-300
        `}
      >
        <div 
          style={{ transform: "translateZ(20px)" }}
          className="flex items-center gap-2"
        >
          {icon && <span>{icon}</span>}
          <span className="font-medium">{children}</span>
        </div>
        
        {/* 3D Shadow layer */}
        <motion.div
          whileHover={{ scale: 1.2, opacity: 0.8 }}
          className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-lg rounded-full -z-10"
          style={{ transform: "translateZ(-10px)" }}
        />
      </motion.div>
    </Link>
  )
}

interface Navigation3DProps {
  items: Array<{
    href: string
    label: string
    icon?: ReactNode
    active?: boolean
  }>
  className?: string
}

export default function Navigation3D({ items, className = "" }: Navigation3DProps) {
  return (
    <nav className={`flex items-center gap-4 ${className}`}>
      {items.map((item, index) => (
        <NavItem3D
          key={item.href}
          href={item.href}
          icon={item.icon}
          active={item.active}
        >
          {item.label}
        </NavItem3D>
      ))}
    </nav>
  )
}
