"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, RoundedBox, Torus, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

function FloatingShape1() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={[-4, 2, 0]}>
        <MeshDistortMaterial
          color="#a855f7"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.8}
          emissive="#a855f7"
          emissiveIntensity={0.4}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  )
}

function FloatingShape2() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2.5}>
      <RoundedBox ref={meshRef} args={[1.5, 1.5, 1.5]} radius={0.2} position={[4, -2, -2]}>
        <MeshDistortMaterial
          color="#ec4899"
          metalness={0.9}
          roughness={0.1}
          distort={0.3}
          speed={1.5}
          emissive="#ec4899"
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </RoundedBox>
    </Float>
  )
}

function FloatingShape3() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={2} floatIntensity={1.8}>
      <Torus ref={meshRef} args={[1, 0.4, 32, 100]} position={[0, 3, -3]}>
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.9}
          roughness={0.1}
          emissive="#06b6d4"
          emissiveIntensity={0.4}
          transparent
          opacity={0.8}
        />
      </Torus>
    </Float>
  )
}

function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1.2, 64, 64]} position={[-3, -3, -1]}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={3}
          thickness={1.5}
          transmission={0.98}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.5}
          chromaticAberration={0.6}
          anisotropy={1}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.05}
          color="#8b5cf6"
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  )
}

export default function FloatingElements3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#a855f7" />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#06b6d4" />
        
        <FloatingShape1 />
        <FloatingShape2 />
        <FloatingShape3 />
        <GlassSphere />
      </Canvas>
    </div>
  )
}
