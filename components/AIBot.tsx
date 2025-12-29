"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Float, Text } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Heart, Brain, Smile, Sparkles } from "lucide-react"
import * as THREE from "three"

function BotAvatar() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {/* Main sphere */}
        <Sphere
          ref={meshRef}
          args={[1, 64, 64]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <MeshDistortMaterial
            color={hovered ? "#ec4899" : "#8b5cf6"}
            attach="material"
            distort={0.6}
            speed={3}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
        
        {/* Orbital rings */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#06b6d4" transparent opacity={0.6} />
        </mesh>
        
        <mesh rotation={[Math.PI / 3, Math.PI / 2, 0]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#10b981" transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  )
}

const mentalHealthResponses = {
  greetings: [
    "Hello! I'm Auriona, your mental health companion. How are you feeling today? 🌟",
    "Hi there! I'm here to support you. What's on your mind? 💙",
    "Welcome! I'm Auriona, ready to listen and help. How can I assist you today? 🌈"
  ],
  stress: [
    "I understand stress can be overwhelming. Let's try some deep breathing exercises together. Inhale for 4 counts, hold for 4, exhale for 4. 🧘‍♀️",
    "Stress is a common challenge. Have you tried breaking your tasks into smaller, manageable steps? I'm here to help you through this. 💪",
    "It's okay to feel stressed. Remember to take breaks and practice self-care. Would you like some relaxation techniques? 🌺"
  ],
  anxiety: [
    "Anxiety can feel intense, but you're not alone. Let's ground ourselves - name 5 things you can see, 4 you can touch, 3 you can hear. 🌿",
    "Your feelings are valid. Anxiety often tells us things that aren't true. Let's work through this together. What's worrying you most? 💚",
    "Take a moment to breathe. Anxiety is temporary, and we can work through this. I'm here with you. 🕊️"
  ],
  depression: [
    "I hear you, and I'm glad you're reaching out. Depression is real, but so is hope and recovery. Have you considered speaking with a professional? 🌻",
    "Your feelings matter. Even small steps count as progress. What's one small thing you could do for yourself today? 💜",
    "Thank you for trusting me with this. Please remember you're not alone, and there are people who care. Would you like some resources? 🌸"
  ],
  positive: [
    "That's wonderful to hear! Celebrating our wins, big or small, is important for mental wellbeing. What made you feel this way? ✨",
    "I'm so happy you're feeling good! Keep nurturing this positive energy. You deserve it! 🌟",
    "Your positive energy is contagious! Remember this feeling during tough times. What are you grateful for today? 💖"
  ],
  resources: [
    "Here are some resources: National Mental Health Hotline (available 24/7), meditation apps like Headspace or Calm, and professional therapy platforms. 🆘",
    "Professional help is valuable. Consider: therapy (in-person or online), support groups, crisis helplines. Remember, seeking help is a sign of strength. 💪",
    "I can share some helpful resources: mindfulness exercises, journaling prompts, connecting with support communities. What interests you most? 📚"
  ],
  emergency: [
    "⚠️ If you're in crisis, please contact emergency services immediately:\n• US: 988 (Suicide Prevention) or 911\n• UK: 116 123 (Samaritans) or 999\n• India: KIRAN 1800-599-0019\n• International: befrienders.org\nYour life matters. ❤️",
    "🚨 I'm concerned about your safety. Please reach out to:\n• US: 988 or Crisis Text Line (HOME to 741741)\n• UK: 116 123 (Samaritans)\n• Australia: 13 11 14 (Lifeline)\n• Canada: 1-833-456-4566\n• International resources: findahelpline.com\nYou don't have to face this alone. 💙"
  ],
  default: [
    "I'm here to listen and support you. Could you tell me more about what you're experiencing? 🤗",
    "Thank you for sharing with me. Your mental health journey is important. How can I best support you right now? 💙",
    "I appreciate you opening up. Everyone's experience is unique. What would be most helpful for you? 🌈"
  ]
}

export default function AIBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; timestamp: Date }>>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Enhanced emergency detection with more patterns
    const emergencyKeywords = [
      "suicide", "suicidal", "kill myself", "end it all", "hurt myself", 
      "self harm", "want to die", "better off dead", "no reason to live",
      "ending my life", "take my life"
    ]
    const hasEmergencyKeyword = emergencyKeywords.some(keyword => lowerMessage.includes(keyword))
    
    if (hasEmergencyKeyword) {
      return mentalHealthResponses.emergency[Math.floor(Math.random() * mentalHealthResponses.emergency.length)]
    }
    
    // Greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return mentalHealthResponses.greetings[Math.floor(Math.random() * mentalHealthResponses.greetings.length)]
    }
    
    // Stress
    if (lowerMessage.includes("stress") || lowerMessage.includes("overwhelm") || lowerMessage.includes("pressure")) {
      return mentalHealthResponses.stress[Math.floor(Math.random() * mentalHealthResponses.stress.length)]
    }
    
    // Anxiety
    if (lowerMessage.includes("anxiety") || lowerMessage.includes("anxious") || lowerMessage.includes("worried") || lowerMessage.includes("panic")) {
      return mentalHealthResponses.anxiety[Math.floor(Math.random() * mentalHealthResponses.anxiety.length)]
    }
    
    // Depression
    if (lowerMessage.includes("depress") || lowerMessage.includes("sad") || lowerMessage.includes("hopeless") || lowerMessage.includes("empty")) {
      return mentalHealthResponses.depression[Math.floor(Math.random() * mentalHealthResponses.depression.length)]
    }
    
    // Positive feelings
    if (lowerMessage.includes("happy") || lowerMessage.includes("good") || lowerMessage.includes("great") || lowerMessage.includes("better") || lowerMessage.includes("wonderful")) {
      return mentalHealthResponses.positive[Math.floor(Math.random() * mentalHealthResponses.positive.length)]
    }
    
    // Resources request
    if (lowerMessage.includes("help") || lowerMessage.includes("resource") || lowerMessage.includes("support") || lowerMessage.includes("hotline")) {
      return mentalHealthResponses.resources[Math.floor(Math.random() * mentalHealthResponses.resources.length)]
    }
    
    return mentalHealthResponses.default[Math.floor(Math.random() * mentalHealthResponses.default.length)]
  }

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true, timestamp: new Date() }
      setMessages([...messages, userMessage])
      setInput("")
      setIsTyping(true)
      
      // Simulate AI thinking
      setTimeout(() => {
        const response = getResponse(input)
        setMessages(prev => [...prev, { text: response, isUser: false, timestamp: new Date() }])
        setIsTyping(false)
      }, 1000 + Math.random() * 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Bot Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center group"
      >
        <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20">
                  <Canvas camera={{ position: [0, 0, 3] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <BotAvatar />
                  </Canvas>
                </div>
                <div>
                  <h3 className="text-white font-bold">Auriona AI</h3>
                  <p className="text-white/80 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online & Ready to Help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="p-3 bg-card/50 border-b border-border flex gap-2 overflow-x-auto">
              <button className="px-3 py-1.5 bg-purple-600/20 text-purple-600 rounded-full text-xs whitespace-nowrap flex items-center gap-1 hover:bg-purple-600/30 transition">
                <Heart className="w-3 h-3" />
                Self-Care Tips
              </button>
              <button className="px-3 py-1.5 bg-blue-600/20 text-blue-600 rounded-full text-xs whitespace-nowrap flex items-center gap-1 hover:bg-blue-600/30 transition">
                <Brain className="w-3 h-3" />
                Mindfulness
              </button>
              <button className="px-3 py-1.5 bg-green-600/20 text-green-600 rounded-full text-xs whitespace-nowrap flex items-center gap-1 hover:bg-green-600/30 transition">
                <Smile className="w-3 h-3" />
                Mood Tracker
              </button>
              <button className="px-3 py-1.5 bg-pink-600/20 text-pink-600 rounded-full text-xs whitespace-nowrap flex items-center gap-1 hover:bg-pink-600/30 transition">
                <Sparkles className="w-3 h-3" />
                Resources
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">Welcome to Auriona AI</h4>
                  <p className="text-sm">Your compassionate mental health companion</p>
                  <p className="text-xs mt-2">Share how you're feeling, and I'll be here to support you.</p>
                </div>
              )}
              
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isUser
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-card border border-border text-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-card border border-border p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-card/50 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your thoughts..."
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                🔒 Private & Secure • Not a replacement for professional help
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
