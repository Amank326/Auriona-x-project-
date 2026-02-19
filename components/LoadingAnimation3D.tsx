"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"

function LoadingRing({ radius, speed }: { radius: number, speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.z = state.clock.elapsedTime * speed
  })
  
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, 0.05, 16, 100]} />
      <meshBasicMaterial 
        color="#a855f7" 
        transparent 
        opacity={0.6}
      />
    </mesh>
  )
}

function PulsingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    const scale = 0.5 + Math.sin(time * 2) * 0.2
    meshRef.current.scale.set(scale, scale, scale)
  })
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshBasicMaterial 
        color="#ec4899" 
        transparent 
        opacity={0.8}
      />
    </mesh>
  )
}

export default function LoadingAnimation3D() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md"
    >
      <div className="text-center">
        <div className="w-64 h-64 relative">
          <Canvas
            camera={{ position: [0, 0, 3], fov: 50 }}
            gl={{ 
              alpha: true, 
              antialias: true,
              powerPreference: "high-performance"
            }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            
            <LoadingRing radius={1} speed={1} />
            <LoadingRing radius={1.3} speed={-0.8} />
            <LoadingRing radius={1.6} speed={0.6} />
            <PulsingSphere />
          </Canvas>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Loading Auriona
          </h2>
          <p className="text-muted-foreground text-sm">
            Preparing your experience...
          </p>
        </motion.div>
        
        <motion.div
          className="mt-6 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-purple-600"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
