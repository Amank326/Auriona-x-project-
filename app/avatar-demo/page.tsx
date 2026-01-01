"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AdvancedAIAvatar from "@/components/AdvancedAIAvatar"
import Link from "next/link"
import { ChevronRight, Sparkles, Zap, Eye } from "lucide-react"

export default function AvatarDemo() {
  const [selectedFeature, setSelectedFeature] = useState<"photorealistic" | "cinematic" | "interactive">(
    "photorealistic"
  )
  const [speaking, setSpeaking] = useState(false)

  const features = [
    {
      id: "photorealistic",
      title: "Photorealistic Avatar",
      description:
        "Advanced 3D character with high-resolution textures, realistic skin properties, and natural facial features. Every detail is optimized for maximum visual fidelity.",
      details: [
        "4K Quality Textures",
        "PBR Materials (Metalness, Roughness)",
        "Realistic Skin Shaders",
        "Hair Volumetrics",
        "Eye Reflections & Depth",
        "Natural Skin Tones",
      ],
    },
    {
      id: "cinematic",
      title: "Cinematic Lighting",
      description:
        "Hollywood-grade lighting setup with key lights, fill lights, rim lights, and back lights. Creates depth, dimension, and emotional atmosphere like Marvel movies.",
      details: [
        "Multi-Point Light Setup",
        "Dynamic Shadow Casting",
        "Ambient Occlusion",
        "Bloom Effects",
        "Color Grading",
        "Atmospheric Depth",
      ],
    },
    {
      id: "interactive",
      title: "Interactive Animation",
      description:
        "Real-time animation system that responds to user interaction. Smooth transitions, eye tracking, blinking, and natural idle movements.",
      details: [
        "Real-time Head Tracking",
        "Eye Contact & Gaze",
        "Natural Blinking",
        "Facial Expressions",
        "Speaking Animation",
        "Micro-expressions",
      ],
    },
  ]

  const currentFeature = features.find((f) => f.id === selectedFeature)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black bg-opacity-40 backdrop-blur-lg border-b border-cyan-500 border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <span className="text-white font-bold text-lg">Auriona</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/auriona"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Back to App
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-10">
        {/* Hero Section */}
        <motion.section
          className="text-center py-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Advanced AI Avatar
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Photorealistic virtual character powered by cutting-edge 3D technology.
            Experience cinematic quality interactions.
          </p>
        </motion.section>

        {/* Main Avatar Display */}
        <motion.section
          className="max-w-6xl mx-auto px-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="rounded-2xl overflow-hidden border border-cyan-500 border-opacity-30 shadow-2xl">
            <AdvancedAIAvatar speaking={speaking} interactive={true} />
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4 justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSpeaking(!speaking)}
              className={`px-6 py-3 rounded-lg font-medium transition-all border ${
                speaking
                  ? "bg-red-500 bg-opacity-40 border-red-500 text-red-300"
                  : "bg-cyan-500 bg-opacity-30 border-cyan-500 text-cyan-300 hover:bg-opacity-50"
              }`}
            >
              {speaking ? "Stop Speaking" : "Start Speaking"}
            </motion.button>

            <Link
              href="/avatar-ai"
              className="px-6 py-3 rounded-lg font-medium bg-purple-500 bg-opacity-30 border border-purple-500 text-purple-300 hover:bg-opacity-50 transition-all flex items-center gap-2"
            >
              Chat Now <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          className="max-w-6xl mx-auto px-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Advanced Features
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, idx) => (
              <motion.button
                key={feature.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFeature(feature.id as any)}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  selectedFeature === feature.id
                    ? "bg-cyan-500 bg-opacity-30 border-cyan-500"
                    : "bg-white bg-opacity-5 border-gray-600 hover:border-cyan-500"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-3 mb-2">
                  {feature.id === "photorealistic" && (
                    <Eye className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  )}
                  {feature.id === "cinematic" && (
                    <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0" />
                  )}
                  {feature.id === "interactive" && (
                    <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-300 line-clamp-2">{feature.description}</p>
              </motion.button>
            ))}
          </div>

          {/* Feature Details */}
          <AnimatePresence mode="wait">
            {currentFeature && (
              <motion.div
                key={selectedFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-br from-cyan-500 from-opacity-10 to-purple-500 to-opacity-10 border border-cyan-500 border-opacity-30 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{currentFeature.title}</h3>
                <p className="text-gray-300 mb-6">{currentFeature.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {currentFeature.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white bg-opacity-5"
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                      <span className="text-gray-200">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Technology Stack */}
        <motion.section
          className="max-w-6xl mx-auto px-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Powered by Cutting-Edge Technology
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Three.js", desc: "Advanced 3D Graphics Engine" },
              { name: "WebGL 2.0", desc: "High-Performance Rendering" },
              { name: "React Three Fiber", desc: "React 3D Library" },
              { name: "Framer Motion", desc: "Smooth Animations" },
              { name: "GLSL Shaders", desc: "Custom Materials & Effects" },
              { name: "PBR Pipeline", desc: "Physically-Based Rendering" },
              { name: "Real-time", desc: "60 FPS Performance" },
              { name: "4K Support", desc: "Ultra High Resolution" },
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-4 rounded-xl bg-gradient-to-br from-cyan-500 from-opacity-10 to-purple-500 to-opacity-10 border border-cyan-500 border-opacity-20 text-center"
              >
                <h4 className="font-bold text-white mb-1">{tech.name}</h4>
                <p className="text-xs text-gray-400">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Specifications */}
        <motion.section
          className="max-w-6xl mx-auto px-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Specifications
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Visual Quality
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                  Resolution: Up to 4K (3840x2160)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                  Frame Rate: 60+ FPS (smooth playback)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                  Anti-aliasing: MSAA 4x
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                  Lighting: Dynamic multi-point system
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                  Materials: High-resolution PBR
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                Animation System
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full" />
                  Facial Expressions: 8+ expressions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full" />
                  Eye Tracking: Real-time gaze direction
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full" />
                  Speech Sync: Mouth animation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full" />
                  Blinking: Natural timing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full" />
                  Idle Movements: Subtle natural motion
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="max-w-4xl mx-auto px-4 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Chat with Auriona?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Experience advanced AI companionship with our photorealistic avatar.
            </p>
            <Link
              href="/avatar-ai"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Start Conversation <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
