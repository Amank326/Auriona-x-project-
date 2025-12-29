"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, Float, Sphere, MeshDistortMaterial, RoundedBox, Torus, MeshTransmissionMaterial, Sparkles as DreiSparkles } from "@react-three/drei"
import { useRef, useState } from "react"
import * as THREE from "three"

function FloatingOrb({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
      if (hovered) {
        meshRef.current.scale.setScalar(scale * 1.2)
      } else {
        meshRef.current.scale.setScalar(scale)
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={3}>
      <Sphere 
        ref={meshRef} 
        args={[1, 64, 64]} 
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <MeshDistortMaterial 
          color={color} 
          attach="material" 
          distort={0.6} 
          speed={3} 
          roughness={0.1}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 0.4 : 0.2}
        />
      </Sphere>
    </Float>
  )
}

function GlassMorphismSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={position}>
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
          transmission={0.95}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.5}
          chromaticAberration={0.5}
          anisotropy={1}
          distortion={0.3}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#a855f7"
        />
      </Sphere>
    </Float>
  )
}

function SpinningTorus({ position, color }: { position: [number, number, number]; color: string }) {
  const torusRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.getElapsedTime() * 0.4
      torusRef.current.rotation.z = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
      <Torus ref={torusRef} args={[1.2, 0.3, 32, 100]} position={position}>
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Torus>
    </Float>
  )
}

function RotatingCube({ position }: { position: [number, number, number] }) {
  const cubeRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
      cubeRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
      cubeRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.3
    }
  })

  return (
    <RoundedBox
      ref={cubeRef}
      args={[1.5, 1.5, 1.5]}
      position={position}
      radius={0.2}
      smoothness={4}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color="#ec4899"
        metalness={0.9}
        roughness={0.1}
        distort={0.4}
        speed={2}
        emissive="#ec4899"
        emissiveIntensity={hovered ? 0.5 : 0.2}
      />
    </RoundedBox>
  )
}

function InteractiveLights() {
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 5
      lightRef.current.position.y = Math.cos(state.clock.getElapsedTime() * 0.3) * 5
      lightRef.current.position.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 3
    }
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight ref={lightRef} intensity={1.5} color="#a855f7" distance={10} />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#06b6d4" />
      <pointLight position={[10, -10, 5]} intensity={0.8} color="#ec4899" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        color="#8b5cf6"
      />
    </>
  )
}

function AnimatedBackground() {
  return (
    <>
      <InteractiveLights />
      <Stars radius={300} depth={80} count={5000} factor={8} saturation={0} fade speed={1.5} />
      <DreiSparkles count={100} scale={10} size={2} speed={0.4} color="#a855f7" />
      
      {/* Central Glass Sphere */}
      <GlassMorphismSphere position={[0, 0, -5]} />
      
      {/* Floating orbs */}
      <FloatingOrb position={[-5, 3, -8]} color="#8b5cf6" scale={1.5} />
      <FloatingOrb position={[5, -2, -10]} color="#06b6d4" scale={1.8} />
      <FloatingOrb position={[0, 4, -7]} color="#ec4899" scale={1.2} />
      <FloatingOrb position={[-4, -4, -9]} color="#10b981" scale={1.4} />
      <FloatingOrb position={[6, 2, -6]} color="#f59e0b" scale={1.0} />
      
      {/* Spinning Toruses */}
      <SpinningTorus position={[-3, 1, -6]} color="#8b5cf6" />
      <SpinningTorus position={[4, -3, -7]} color="#06b6d4" />
      
      {/* Rotating Cubes */}
      <RotatingCube position={[2, 3, -8]} />
      <RotatingCube position={[-5, -2, -7]} />
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <AnimatedBackground />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
