"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Lights } from "@react-three/drei"
import { motion } from "framer-motion"

// Advanced Character Head Component with Realistic Features
const CharacterHead = ({ speaking = false }) => {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const eyeLeftRef = useRef<THREE.Mesh>(null)
  const eyeRightRef = useRef<THREE.Mesh>(null)
  const mouthRef = useRef<THREE.Mesh>(null)
  const hairRef = useRef<THREE.Mesh>(null)
  const skinMaterialRef = useRef<THREE.MeshStandardMaterial>(null)

  const [mouthOpen, setMouthOpen] = useState(0)
  const [eyeContact, setEyeContact] = useState({ x: 0, y: 0 })

  useFrame((state) => {
    if (!groupRef.current) return

    // Gentle head rotation for natural movement
    groupRef.current.rotation.y += Math.sin(state.clock.elapsedTime * 0.5) * 0.001
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05

    // Speaking animation - mouth movement
    if (speaking) {
      const speechWave = Math.sin(state.clock.elapsedTime * 5) * 0.5 + 0.5
      setMouthOpen(speechWave)
      if (mouthRef.current) {
        mouthRef.current.scale.y = 1 + speechWave * 0.3
      }
    }

    // Eye glow effect
    if (skinMaterialRef.current) {
      skinMaterialRef.current.emissiveIntensity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  // Create realistic character head geometry
  const createHeadGeometry = () => {
    const headGroup = new THREE.Group()

    // Main head - higher quality sphere
    const headGeometry = new THREE.IcosahedronGeometry(1, 8)
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#f4d4c8"), // Realistic skin tone
      metalness: 0.1,
      roughness: 0.4,
      emissive: new THREE.Color("#ffccbb"),
      emissiveIntensity: 0.05,
      side: THREE.FrontSide,
      flatShading: false,
    })
    skinMaterialRef.current = skinMaterial

    const headMesh = new THREE.Mesh(headGeometry, skinMaterial)
    headMesh.scale.set(1, 1.2, 0.95)
    headMesh.position.set(0, 0.3, 0)
    headGroup.add(headMesh)
    meshRef.current = headMesh

    // Hair - volumetric and flowing
    const hairGeometry = new THREE.IcosahedronGeometry(1.05, 6)
    const hairMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2d1810"), // Dark brown
      metalness: 0.15,
      roughness: 0.3,
      map: createHairTexture(),
    })
    const hairMesh = new THREE.Mesh(hairGeometry, hairMaterial)
    hairMesh.scale.set(1.1, 1.3, 1.05)
    hairMesh.position.set(0, 0.35, 0)
    hairMesh.userData.originalPosition = hairMesh.position.clone()
    hairRef.current = hairMesh
    headGroup.add(hairMesh)

    // Left Eye
    const eyeGeometry = new THREE.SphereGeometry(0.25, 16, 16)
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#4a90e2"),
      metalness: 0.9,
      roughness: 0.1,
      emissive: new THREE.Color("#2a5ff0"),
      emissiveIntensity: 0.3,
    })
    const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial)
    eyeLeft.position.set(-0.35, 0.5, 0.7)
    eyeLeft.scale.set(1, 1.1, 0.5)
    eyeLeftRef.current = eyeLeft
    headGroup.add(eyeLeft)

    // Right Eye
    const eyeRight = eyeLeft.clone()
    eyeRight.position.set(0.35, 0.5, 0.7)
    eyeRightRef.current = eyeRight
    headGroup.add(eyeRight)

    // Eye pupils with depth
    const pupilGeometry = new THREE.SphereGeometry(0.12, 16, 16)
    const pupilMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1a1a1a"),
      metalness: 0.95,
      roughness: 0.05,
      emissive: new THREE.Color("#0a0a0a"),
    })

    const pupilLeft = new THREE.Mesh(pupilGeometry, pupilMaterial)
    pupilLeft.position.set(-0.35, 0.5, 0.95)
    headGroup.add(pupilLeft)

    const pupilRight = pupilLeft.clone()
    pupilRight.position.set(0.35, 0.5, 0.95)
    headGroup.add(pupilRight)

    // Eye glow reflection (realistic eye light)
    const reflectionGeometry = new THREE.SphereGeometry(0.08, 8, 8)
    const reflectionMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ffffff"),
      transparent: true,
      opacity: 0.8,
    })

    const reflectionLeft = new THREE.Mesh(reflectionGeometry, reflectionMaterial)
    reflectionLeft.position.set(-0.3, 0.55, 1.0)
    headGroup.add(reflectionLeft)

    const reflectionRight = reflectionLeft.clone()
    reflectionRight.position.set(0.4, 0.55, 1.0)
    headGroup.add(reflectionRight)

    // Nose
    const noseGeometry = new THREE.ConeGeometry(0.1, 0.4, 8)
    const noseMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#e6c4b8"),
      metalness: 0.05,
      roughness: 0.3,
    })
    const nose = new THREE.Mesh(noseGeometry, noseMaterial)
    nose.position.set(0, 0.2, 0.8)
    headGroup.add(nose)

    // Mouth - parametric for speaking
    const mouthGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.1)
    const mouthMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#c85a54"),
      metalness: 0.3,
      roughness: 0.2,
    })
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial)
    mouth.position.set(0, -0.1, 0.85)
    mouthRef.current = mouth
    headGroup.add(mouth)

    // Teeth
    const teethGeometry = new THREE.BoxGeometry(0.28, 0.05, 0.08)
    const teethMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#fffbf0"),
      metalness: 0.2,
      roughness: 0.3,
    })
    const teeth = new THREE.Mesh(teethGeometry, teethMaterial)
    teeth.position.set(0, -0.08, 0.9)
    teeth.visible = false
    headGroup.add(teeth)

    // Cheeks blush
    const cheekGeometry = new THREE.SphereGeometry(0.18, 16, 16)
    const cheekMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#f5a9a0"),
      metalness: 0,
      roughness: 0.5,
      transparent: true,
      opacity: 0.4,
    })

    const cheekLeft = new THREE.Mesh(cheekGeometry, cheekMaterial)
    cheekLeft.position.set(-0.45, 0.15, 0.5)
    cheekLeft.scale.set(0.6, 0.5, 0.4)
    headGroup.add(cheekLeft)

    const cheekRight = cheekLeft.clone()
    cheekRight.position.set(0.45, 0.15, 0.5)
    headGroup.add(cheekRight)

    return headGroup
  }

  // Create hair texture with noise
  const createHairTexture = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext("2d")!

    // Create base texture
    ctx.fillStyle = "#2d1810"
    ctx.fillRect(0, 0, 512, 512)

    // Add highlights and texture
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`
      ctx.fillRect(
        Math.random() * 512,
        Math.random() * 512,
        Math.random() * 50,
        Math.random() * 20
      )
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.magFilter = THREE.LinearFilter
    return texture
  }

  useEffect(() => {
    if (groupRef.current) {
      const head = createHeadGeometry()
      groupRef.current.add(head)
    }
  }, [])

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} />
    </group>
  )
}

// Neck and shoulders
const NeckAndShoulders = () => {
  const neckRef = useRef<THREE.Mesh>(null)
  const shouldersRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (shouldersRef.current) {
      shouldersRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.02
      shouldersRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.03
    }
  })

  // Neck cylinder
  const neckGeometry = new THREE.CylinderGeometry(0.35, 0.4, 0.8, 16)
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#f4d4c8"),
    metalness: 0.1,
    roughness: 0.4,
  })

  // Shoulders
  const shoulderGeometry = new THREE.BoxGeometry(2, 0.4, 0.6)
  const shoulderMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#3a5a8a"),
    metalness: 0.3,
    roughness: 0.5,
  })

  return (
    <group ref={shouldersRef}>
      <mesh ref={neckRef} geometry={neckGeometry} material={skinMaterial} position={[0, -0.8, 0]} />
      <mesh geometry={shoulderGeometry} material={shoulderMaterial} position={[0, -1.2, 0]} />
    </group>
  )
}

// Advanced lighting for cinematic feel
const AdvancedLighting = () => {
  return (
    <>
      {/* Key light - main dramatic light */}
      <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow color="#ffffff" />

      {/* Fill light - soften shadows */}
      <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#d4e6ff" />

      {/* Back light - cinematic depth */}
      <directionalLight position={[0, 4, -8]} intensity={1} color="#ffd4a3" />

      {/* Rim light - edge enhancement */}
      <directionalLight position={[8, 2, 3]} intensity={0.6} color="#00ffff" />

      {/* Ambient light - overall fill */}
      <ambientLight intensity={0.6} color="#ffffff" />

      {/* Point light - eye enhancement */}
      <pointLight position={[0, 0, 3]} intensity={1} color="#00ccff" distance={10} />
    </>
  )
}

// Main scene component
const AvatarScene = ({ speaking = false }) => {
  const controlsRef = useRef(null)

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 3]}
        fov={50}
        near={0.1}
        far={1000}
      />

      <AdvancedLighting />

      {/* Environment background - cinematic gradient */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial
          color="#0a0e27"
          fog={false}
        />
      </mesh>

      {/* Cinematic depth blur effect with particles */}
      <Particles />

      {/* Main character */}
      <group>
        <CharacterHead speaking={speaking} />
        <NeckAndShoulders />
      </group>

      {/* Optional orbit controls for interaction */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={2}
        maxPolarAngle={Math.PI * 0.7}
        minPolarAngle={Math.PI * 0.3}
      />
    </>
  )
}

// Particle system for cinematic effect
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0001
      particlesRef.current.rotation.y += 0.0002
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.001
        positions[i + 1] += Math.cos(state.clock.elapsedTime + i) * 0.001
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const particlesGeometry = new THREE.BufferGeometry()
  const particleCount = 200
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 8
    positions[i + 1] = (Math.random() - 0.5) * 8
    positions[i + 2] = (Math.random() - 0.5) * 8
  }

  particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: "#00ffff",
    transparent: true,
    opacity: 0.4,
    sizeAttenuation: true,
  })

  return <points ref={particlesRef} geometry={particlesGeometry} material={particlesMaterial} />
}

// Main component wrapper
interface AdvancedAIAvatarProps {
  speaking?: boolean
  interactive?: boolean
  className?: string
}

export default function AdvancedAIAvatar({
  speaking = false,
  interactive = true,
  className = "",
}: AdvancedAIAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-full h-screen bg-gray-900 animate-pulse" />
  }

  return (
    <motion.div
      ref={containerRef}
      className={`w-full h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-black ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Cinematic background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 pointer-events-none" />

      {/* 3D Canvas */}
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
          pixelRatio: Math.min(window.devicePixelRatio, 2),
          preserveDrawingBuffer: true,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <AvatarScene speaking={speaking} />
      </Canvas>

      {/* Info overlay */}
      <div className="absolute bottom-8 left-8 text-white z-10 bg-black bg-opacity-50 p-6 rounded-lg backdrop-blur-md border border-cyan-500 border-opacity-30">
        <h3 className="text-xl font-bold mb-2 text-cyan-400">Auriona AI</h3>
        <p className="text-sm text-gray-300 max-w-xs">
          Advanced Virtual AI Character - Photorealistic Avatar with Real-time Animation
        </p>
      </div>

      {/* Status indicator */}
      {speaking && (
        <motion.div
          className="absolute top-8 right-8 flex items-center gap-2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-white text-sm font-medium">Speaking...</span>
        </motion.div>
      )}
    </motion.div>
  )
}
