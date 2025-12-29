"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial, Text3D, Center, useMatcapTexture } from "@react-three/drei"
import { useRef, useState } from "react"
import * as THREE from "three"

function FloatingBrain() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
      <Sphere
        ref={meshRef}
        args={[1, 128, 128]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <MeshDistortMaterial
          color={hovered ? "#ec4899" : "#8b5cf6"}
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
          metalness={0.8}
          emissive={hovered ? "#ec4899" : "#8b5cf6"}
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.6}
          emissive="#06b6d4"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      <mesh rotation={[Math.PI / 4, Math.PI / 2, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#10b981"
          transparent
          opacity={0.6}
          emissive="#10b981"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full h-[300px] md:h-[400px] pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
        <FloatingBrain />
      </Canvas>
    </div>
  )
}
