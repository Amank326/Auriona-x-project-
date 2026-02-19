"use client"

import { Canvas } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

function FloatingOrb({ position, color, scale }: { position: [number, number, number], color: string, scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
      floatingRange={[-0.5, 0.5]}
    >
      <Sphere args={[scale, 64, 64]} position={position} ref={meshRef}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  )
}

export default function FloatingElements3D() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={0.5} />
        
        {/* Multiple floating orbs with different colors */}
        <FloatingOrb position={[-3, 2, 0]} color="#a855f7" scale={0.5} />
        <FloatingOrb position={[3, -1, -1]} color="#ec4899" scale={0.4} />
        <FloatingOrb position={[2, 3, -2]} color="#06b6d4" scale={0.3} />
        <FloatingOrb position={[-2, -2, 1]} color="#8b5cf6" scale={0.45} />
        <FloatingOrb position={[1, 1, -1.5]} color="#d946ef" scale={0.35} />
      </Canvas>
    </div>
  )
}
