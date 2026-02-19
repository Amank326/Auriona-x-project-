"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"

function HeroSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    meshRef.current.rotation.x = time * 0.15
    meshRef.current.rotation.y = time * 0.2
  })
  
  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.8}
      floatingRange={[-0.3, 0.3]}
    >
      <Sphere args={[1.5, 128, 128]} ref={meshRef}>
        <MeshDistortMaterial
          color="#a855f7"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          emissive="#a855f7"
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (!particlesRef.current) return
    const time = state.clock.elapsedTime
    particlesRef.current.rotation.y = time * 0.05
    particlesRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
  })
  
  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    
    const colorIndex = Math.random()
    if (colorIndex < 0.33) {
      colors[i * 3] = 0.659
      colors[i * 3 + 1] = 0.333
      colors[i * 3 + 2] = 0.969
    } else if (colorIndex < 0.66) {
      colors[i * 3] = 0.925
      colors[i * 3 + 1] = 0.282
      colors[i * 3 + 2] = 0.580
    } else {
      colors[i * 3] = 0.024
      colors[i * 3 + 1] = 0.714
      colors[i * 3 + 2] = 0.831
    }
  }
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function EnhancedHero3D() {
  return (
    <div className="relative w-full h-full min-h-[500px]">
      {/* Gradient background */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 40%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 60%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
        className="rounded-3xl"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ec4899" />
        <pointLight position={[0, 10, -10]} intensity={0.8} color="#06b6d4" />
        
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        
        <HeroSphere />
        <ParticleField />
      </Canvas>
      
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        animate={{
          boxShadow: [
            "0 0 60px rgba(168, 85, 247, 0.3)",
            "0 0 80px rgba(236, 72, 153, 0.4)",
            "0 0 60px rgba(6, 182, 212, 0.3)",
            "0 0 60px rgba(168, 85, 247, 0.3)"
          ]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ pointerEvents: "none" }}
      />
    </div>
  )
}
