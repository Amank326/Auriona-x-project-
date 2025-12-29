"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Float, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

function FloatingOrb({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[scale, 64, 64]} position={position}>
        <MeshDistortMaterial color={color} attach="material" distort={0.4} speed={2} roughness={0.2} />
      </Sphere>
    </Float>
  )
}

function AnimatedBackground() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#7c3aed" />
      <Stars radius={300} depth={60} count={3000} factor={7} saturation={0} fade speed={1} />
      
      {/* Floating orbs */}
      <FloatingOrb position={[-4, 2, -5]} color="#8b5cf6" scale={1.2} />
      <FloatingOrb position={[4, -2, -8]} color="#06b6d4" scale={1.5} />
      <FloatingOrb position={[0, 3, -6]} color="#ec4899" scale={0.8} />
      <FloatingOrb position={[-3, -3, -7]} color="#10b981" scale={1} />
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <AnimatedBackground />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
