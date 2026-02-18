"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Sphere } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

function LiquidBlob() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3
    }
    
    if (materialRef.current) {
      materialRef.current.distort = 0.4 + Math.sin(state.clock.getElapsedTime()) * 0.2
    }
  })

  return (
    <Sphere ref={meshRef} args={[1.5, 128, 128]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#a855f7"
        attach="material"
        distort={0.4}
        speed={4}
        roughness={0}
        metalness={1}
        emissive="#a855f7"
        emissiveIntensity={0.6}
        toneMapped={false}
      />
    </Sphere>
  )
}

export default function LiquidAnimation() {
  return (
    <div className="w-full h-64 md:h-80">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#ec4899" />
        <LiquidBlob />
      </Canvas>
    </div>
  )
}
