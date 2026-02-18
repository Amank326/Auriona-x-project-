"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

interface MorphingShapeProps {
  color?: string
  speed?: number
}

function MorphingSphere({ color = "#a855f7", speed = 1 }: MorphingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 * speed
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speed
    }
    
    if (materialRef.current) {
      // Morphing effect - performance optimized with smoother calculations
      const time = state.clock.getElapsedTime() * speed
      materialRef.current.distort = 0.3 + Math.sin(time) * 0.3
      materialRef.current.speed = 2 + Math.sin(time * 0.5) * 1
    }
  })

  return (
    <Sphere ref={meshRef} args={[1.5, 128, 128]}>
      <MeshDistortMaterial
        ref={materialRef}
        color={color}
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0}
        metalness={0.95}
        emissive={color}
        emissiveIntensity={0.5}
        toneMapped={false}
      />
    </Sphere>
  )
}

interface MorphingShape3DProps {
  className?: string
  color?: string
  speed?: number
}

export default function MorphingShape3D({ 
  className = "", 
  color = "#a855f7",
  speed = 1 
}: MorphingShape3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} intensity={1} color={color} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#ec4899" />
        <MorphingSphere color={color} speed={speed} />
      </Canvas>
    </div>
  )
}
