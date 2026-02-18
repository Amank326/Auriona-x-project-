"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial, OrbitControls, Sparkles as DreiSparkles } from "@react-three/drei"
import { useRef, useState } from "react"
import * as THREE from "three"
import { motion } from "framer-motion"

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere
        ref={meshRef}
        args={[2, 128, 128]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.15 : 1}
      >
        <MeshDistortMaterial
          color={hovered ? "#ec4899" : "#a855f7"}
          attach="material"
          distort={0.6}
          speed={3}
          roughness={0}
          metalness={0.9}
          emissive={hovered ? "#ec4899" : "#a855f7"}
          emissiveIntensity={hovered ? 0.8 : 0.5}
        />
      </Sphere>

      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.08, 32, 100]} />
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.7}
          emissive="#06b6d4"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh rotation={[Math.PI / 3, Math.PI / 2, 0]}>
        <torusGeometry args={[2.5, 0.08, 32, 100]} />
        <meshStandardMaterial
          color="#10b981"
          transparent
          opacity={0.7}
          emissive="#10b981"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh rotation={[0, Math.PI / 4, Math.PI / 3]}>
        <torusGeometry args={[2.5, 0.08, 32, 100]} />
        <meshStandardMaterial
          color="#f59e0b"
          transparent
          opacity={0.7}
          emissive="#f59e0b"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  )
}

function ParticleSphere() {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.03
    }
  })

  return (
    <DreiSparkles
      count={200}
      scale={8}
      size={3}
      speed={0.3}
      opacity={0.8}
      color="#a855f7"
    />
  )
}

export default function EnhancedHero3D() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-[400px] md:h-[500px] lg:h-[600px] pointer-events-auto relative"
    >
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["transparent"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#a855f7" />
        <pointLight position={[10, 5, 5]} intensity={0.8} color="#06b6d4" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.5}
          penumbra={1}
          intensity={1.5}
          color="#ec4899"
          castShadow
        />

        {/* 3D Elements */}
        <AnimatedSphere />
        <ParticleSphere />
        
        {/* Interactive controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Glow effect overlay */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 80px rgba(168, 85, 247, 0.4)",
            "0 0 120px rgba(236, 72, 153, 0.5)",
            "0 0 80px rgba(6, 182, 212, 0.4)",
            "0 0 80px rgba(168, 85, 247, 0.4)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none"
        style={{ filter: "blur(100px)" }}
      />
    </motion.div>
  )
}
