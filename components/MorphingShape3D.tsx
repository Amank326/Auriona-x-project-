"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return
    
    const time = state.clock.elapsedTime
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.3
    materialRef.current.uniforms.u_time.value = time
  })

  const vertexShader = `
    uniform float u_time;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      float distortion = sin(pos.x * 2.0 + u_time) * 0.1 +
                        sin(pos.y * 2.0 + u_time * 0.8) * 0.1 +
                        sin(pos.z * 2.0 + u_time * 1.2) * 0.1;
      pos += normal * distortion;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = `
    uniform float u_time;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec3 color1 = vec3(0.659, 0.333, 0.969); // Purple
      vec3 color2 = vec3(0.925, 0.282, 0.580); // Pink
      vec3 color3 = vec3(0.024, 0.714, 0.831); // Cyan
      
      float mixValue = sin(vPosition.x * 2.0 + u_time) * 0.5 + 0.5;
      vec3 color = mix(color1, color2, mixValue);
      color = mix(color, color3, sin(vPosition.y * 2.0 + u_time * 0.7) * 0.5 + 0.5);
      
      float alpha = 0.7 + sin(u_time + vPosition.z * 3.0) * 0.3;
      
      gl_FragColor = vec4(color, alpha);
    }
  `

  return (
    <mesh ref={meshRef} scale={2}>
      <icosahedronGeometry args={[1, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          u_time: { value: 0 }
        }}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function MorphingShape3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <MorphingSphere />
      </Canvas>
    </div>
  )
}
