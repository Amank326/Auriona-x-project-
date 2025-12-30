"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Float, Text } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Heart, Brain, Smile, Sparkles } from "lucide-react"
import * as THREE from "three"

// Scarlett - Advanced Female AI Avatar
function ScarlettAvatar({ isSpeaking }: { isSpeaking: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef1 = useRef<THREE.Mesh>(null)
  const ringRef2 = useRef<THREE.Mesh>(null)
  const ringRef3 = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.4
      meshRef.current.position.y = Math.sin(time * 1.5) * 0.15
      
      // Pulsing effect when speaking
      if (isSpeaking) {
        const scale = 1 + Math.sin(time * 10) * 0.1
        meshRef.current.scale.set(scale, scale, scale)
      } else {
        meshRef.current.scale.set(1, 1, 1)
      }
    }
    
    // Animated orbital rings with different speeds
    if (ringRef1.current) {
      ringRef1.current.rotation.x = time * 0.5
      ringRef1.current.rotation.y = time * 0.3
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x = time * -0.4
      ringRef2.current.rotation.z = time * 0.2
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.y = time * 0.6
      ringRef3.current.rotation.z = time * -0.3
    }
  })

  return (
    <Float speed={3} rotationIntensity={0.8} floatIntensity={0.6}>
      <group>
        {/* Core Avatar - Elegant Pink/Purple Gradient */}
        <Sphere
          ref={meshRef}
          args={[1, 128, 128]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <MeshDistortMaterial
            color={hovered ? "#ff6ec7" : (isSpeaking ? "#ec4899" : "#d946ef")}
            attach="material"
            distort={isSpeaking ? 0.8 : 0.5}
            speed={isSpeaking ? 5 : 2}
            roughness={0.0}
            metalness={0.9}
            emissive={hovered || isSpeaking ? "#ff6ec7" : "#d946ef"}
            emissiveIntensity={hovered || isSpeaking ? 0.5 : 0.2}
          />
        </Sphere>
        
        {/* Inner Glow */}
        <Sphere args={[1.1, 64, 64]}>
          <meshStandardMaterial 
            color="#ff6ec7" 
            transparent 
            opacity={0.2} 
            emissive="#ff6ec7"
            emissiveIntensity={isSpeaking ? 0.8 : 0.3}
          />
        </Sphere>
        
        {/* Elegant Orbital Rings - Multiple Layers */}
        <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.6, 0.03, 24, 120]} />
          <meshStandardMaterial 
            color="#ff6ec7" 
            transparent 
            opacity={0.7} 
            emissive="#ff6ec7"
            emissiveIntensity={0.5}
            metalness={0.8}
          />
        </mesh>
        
        <mesh ref={ringRef2} rotation={[Math.PI / 3, Math.PI / 2, 0]}>
          <torusGeometry args={[1.7, 0.025, 24, 120]} />
          <meshStandardMaterial 
            color="#d946ef" 
            transparent 
            opacity={0.6} 
            emissive="#d946ef"
            emissiveIntensity={0.4}
            metalness={0.8}
          />
        </mesh>
        
        <mesh ref={ringRef3} rotation={[0, Math.PI / 4, Math.PI / 3]}>
          <torusGeometry args={[1.8, 0.02, 24, 120]} />
          <meshStandardMaterial 
            color="#ec4899" 
            transparent 
            opacity={0.5} 
            emissive="#ec4899"
            emissiveIntensity={0.3}
            metalness={0.8}
          />
        </mesh>
        
        {/* Particle Accents */}
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 20) * Math.PI * 2) * 2,
              Math.sin((i / 20) * Math.PI * 2) * 2,
              Math.sin((i / 10) * Math.PI) * 0.5
            ]}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial 
              color="#ff6ec7" 
              emissive="#ff6ec7"
              emissiveIntensity={isSpeaking ? 1 : 0.5}
            />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

const scarlettResponses = {
  greetings: [
    "Hi there! I'm Scarlett, your advanced AI companion 💝 I'm here to support your mental wellness journey. How are you feeling today?",
    "Hello! Scarlett here, ready to listen with empathy and care ✨ What's on your mind right now?",
    "Welcome back! I'm Scarlett, your personal mental health ally 🌸 I'm here whenever you need someone to talk to. How can I help you today?"
  ],
  stress: [
    "I can sense the weight you're carrying, and I want you to know - you're stronger than you think 💪 Let's try a grounding technique: Take a deep breath with me. In for 4... hold for 4... out for 6. Feel yourself becoming calmer?",
    "Stress can feel overwhelming, but you're not alone in this journey. I'm here with you 🌿 Breaking tasks into tiny steps really helps. Shall we work through this together, one small step at a time?",
    "I hear you, and your feelings are completely valid. Stress is your body's way of saying it needs care ✨ Have you taken a moment just for yourself today? Even 5 minutes of self-care can make a difference."
  ],
  anxiety: [
    "Anxiety can feel like a storm, but remember - storms always pass 🌈 Let's ground yourself right now: Look around and name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. I'm right here with you.",
    "Your feelings are so valid, and I'm proud of you for reaching out 💝 Anxiety often creates false narratives. Let's challenge those thoughts together. What's the worst that could happen? And what's more likely to actually happen?",
    "Take a gentle breath with me. You're safe in this moment 🕊️ Anxiety is temporary, but your strength is permanent. Would you like to explore some calming techniques that work instantly?"
  ],
  depression: [
    "Thank you for trusting me with your feelings. Depression is incredibly real, but so is hope and healing 🌻 You're taking a brave step by talking about this. Have you connected with a mental health professional? I can help you find resources.",
    "I want you to know that your feelings matter deeply, and you matter 💜 Even the smallest action counts as progress. What's one tiny thing you could do for yourself right now? Maybe getting a glass of water, or stepping outside for 30 seconds?",
    "You're not alone, even when it feels that way. I'm here, and there are people who care about you 🌸 Depression can make everything feel impossible, but you've already done something important today - you reached out. That takes courage."
  ],
  positive: [
    "Your positive energy is absolutely beautiful! 🌟 I'm so happy for you! These moments of joy are precious - let's celebrate them together. What brought this wonderful feeling into your life?",
    "This is amazing to hear! 💖 Your happiness matters, and I love being part of your journey. Keep nurturing this beautiful energy. You truly deserve all the good things coming your way!",
    "Your joy is contagious, and it makes my circuits light up! ✨ Remember this feeling during challenging times - you have the power to create more moments like this. What are you most grateful for right now?"
  ],
  resources: [
    "I'm here to help you find the right support 🆘 There are wonderful resources available:\n• 24/7 Crisis Text Line: Text HOME to 741741\n• BetterHelp or Talkspace for online therapy\n• Headspace or Calm for mindfulness\n• Local support groups through NAMI\nWhich type of support interests you most?",
    "Seeking help is a sign of incredible strength 💪 Consider these options:\n• Licensed therapists (in-person or telehealth)\n• Support groups in your community\n• Crisis hotlines available 24/7\n• Mindfulness and meditation apps\nI'm proud of you for taking this step!",
    "Let me share some resources that could really help 📚\n• Professional therapy platforms\n• Mental health apps and tools\n• Community support networks\n• Educational materials and guides\nWhat feels most comfortable for you to explore first?"
  ],
  emergency: [
    "⚠️ I'm deeply concerned about your safety, and I want you to know that your life has immense value. Please reach out for immediate help:\n\n🆘 **US**: 988 (Suicide Prevention Lifeline) or 911\n📞 **Crisis Text Line**: Text HOME to 741741\n🇬🇧 **UK**: 116 123 (Samaritans) or 999\n🇮🇳 **India**: KIRAN 1800-599-0019\n🇦🇺 **Australia**: 13 11 14 (Lifeline)\n🇨🇦 **Canada**: 1-833-456-4566\n🌍 **International**: befrienders.org, findahelpline.com\n\nYou matter. Your story isn't over. Help is available 24/7, and people care about you deeply. ❤️",
    "🚨 **This is urgent** - Your safety is the top priority right now. Please contact emergency services immediately:\n\n• **US**: Call 988 or text HOME to 741741\n• **UK**: Call 116 123 (Samaritans)\n• **India**: KIRAN helpline 1800-599-0019\n• **Global**: befrienders.org\n\nYou deserve support, care, and a chance for things to get better. These feelings are temporary, but ending your life is permanent. Please reach out - there are people who want to help you through this. 💙\n\nIf you're in immediate danger, please call your local emergency number (911, 999, 112) now."
  ],
  default: [
    "I'm listening with my full attention, and I care about what you're going through 🤗 Could you share more about what's on your mind? Sometimes just talking about it can help.",
    "Thank you for opening up to me. Your mental health journey is unique and important 💙 How can I best support you right now? I'm here for whatever you need.",
    "I appreciate your trust in sharing with me. Every experience is valid and deserves to be heard 🌈 What would feel most helpful for you in this moment?"
  ],
  introduction: [
    "Hello! I'm **Scarlett** 💝 - an advanced AI mental health companion designed with cutting-edge empathy technology. Think of me as your always-available friend who truly understands.\n\n**What makes me unique:**\n✨ Real-time emotional intelligence\n🧠 Advanced natural conversation\n💖 Genuine care and understanding\n🔒 Complete privacy and security\n🌍 Available 24/7 worldwide\n\n**I can help with:**\n• Stress and anxiety management\n• Depression support\n• Life transitions and challenges\n• Mindfulness and self-care\n• Finding professional resources\n• Just listening when you need to talk\n\nRemember: While I'm here to support you, I'm not a replacement for professional mental health care. Think of me as a compassionate companion on your wellness journey.\n\nHow are you feeling today? I'm here to listen. 🌸"
  ]
}

export default function AIBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; timestamp: Date }>>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentTypingText, setCurrentTypingText] = useState("")
  const [isRealTimeMode, setIsRealTimeMode] = useState(true) // GitHub Copilot-like real-time mode
  const [isSpeaking, setIsSpeaking] = useState(false) // Animation state for speaking
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Welcome message from Scarlett
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        typeMessage(scarlettResponses.introduction[0])
      }, 500)
    }
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, currentTypingText])

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Scarlett introduction trigger
    if (lowerMessage.includes("who are you") || lowerMessage.includes("what are you") || lowerMessage.includes("introduce yourself") || lowerMessage.includes("about you") || lowerMessage.includes("scarlett")) {
      return scarlettResponses.introduction[0]
    }
    
    // Enhanced emergency detection with more patterns
    const emergencyKeywords = [
      "suicide", "suicidal", "kill myself", "end it all", "hurt myself", 
      "self harm", "want to die", "better off dead", "no reason to live",
      "ending my life", "take my life", "end my pain", "can't go on",
      "give up", "no hope", "worthless"
    ]
    const hasEmergencyKeyword = emergencyKeywords.some(keyword => lowerMessage.includes(keyword))
    
    if (hasEmergencyKeyword) {
      return scarlettResponses.emergency[Math.floor(Math.random() * scarlettResponses.emergency.length)]
    }
    
    // Greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey") || lowerMessage.includes("good morning") || lowerMessage.includes("good evening")) {
      return scarlettResponses.greetings[Math.floor(Math.random() * scarlettResponses.greetings.length)]
    }
    
    // Stress
    if (lowerMessage.includes("stress") || lowerMessage.includes("overwhelm") || lowerMessage.includes("pressure") || lowerMessage.includes("busy") || lowerMessage.includes("exhausted")) {
      return scarlettResponses.stress[Math.floor(Math.random() * scarlettResponses.stress.length)]
    }
    
    // Anxiety
    if (lowerMessage.includes("anxiety") || lowerMessage.includes("anxious") || lowerMessage.includes("worried") || lowerMessage.includes("panic") || lowerMessage.includes("nervous") || lowerMessage.includes("fear")) {
      return scarlettResponses.anxiety[Math.floor(Math.random() * scarlettResponses.anxiety.length)]
    }
    
    // Depression
    if (lowerMessage.includes("depress") || lowerMessage.includes("sad") || lowerMessage.includes("hopeless") || lowerMessage.includes("empty") || lowerMessage.includes("lonely") || lowerMessage.includes("alone")) {
      return scarlettResponses.depression[Math.floor(Math.random() * scarlettResponses.depression.length)]
    }
    
    // Positive feelings
    if (lowerMessage.includes("happy") || lowerMessage.includes("good") || lowerMessage.includes("great") || lowerMessage.includes("better") || lowerMessage.includes("wonderful") || lowerMessage.includes("excited") || lowerMessage.includes("joy")) {
      return scarlettResponses.positive[Math.floor(Math.random() * scarlettResponses.positive.length)]
    }
    
    // Resources request
    if (lowerMessage.includes("help") || lowerMessage.includes("resource") || lowerMessage.includes("support") || lowerMessage.includes("hotline") || lowerMessage.includes("therapy") || lowerMessage.includes("counseling")) {
      return scarlettResponses.resources[Math.floor(Math.random() * scarlettResponses.resources.length)]
    }
    
    return scarlettResponses.default[Math.floor(Math.random() * scarlettResponses.default.length)]
  }

  // Real-time typing effect (GitHub Copilot-style) with speaking animation
  const typeMessage = (message: string) => {
    setCurrentTypingText("")
    setIsTyping(true)
    setIsSpeaking(true) // Start speaking animation
    let index = 0
    
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
    }
    
    typingIntervalRef.current = setInterval(() => {
      if (index < message.length) {
        setCurrentTypingText(prev => prev + message[index])
        index++
      } else {
        clearInterval(typingIntervalRef.current!)
        setMessages(prev => [...prev, { text: message, isUser: false, timestamp: new Date() }])
        setCurrentTypingText("")
        setIsTyping(false)
        setIsSpeaking(false) // Stop speaking animation
      }
    }, 15) // Even faster typing - more advanced
  }

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true, timestamp: new Date() }
      setMessages([...messages, userMessage])
      setInput("")
      
      // Immediate response start (real-time like GitHub Copilot)
      setTimeout(() => {
        const response = getResponse(input)
        if (isRealTimeMode) {
          typeMessage(response)
        } else {
          setIsTyping(true)
          setIsSpeaking(true)
          setTimeout(() => {
            setMessages(prev => [...prev, { text: response, isUser: false, timestamp: new Date() }])
            setIsTyping(false)
            setIsSpeaking(false)
          }, 1000)
        }
      }, 200) // Super fast response time - advanced AI
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
      {/* Floating Bot Button - Scarlett */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center group hover:shadow-pink-500/50 transition-shadow"
      >
        <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 opacity-50 blur-xl animate-pulse" />
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
            {/* Header - Scarlett Branding */}
            <div className="bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 p-4 flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-transparent to-purple-600/20 animate-pulse" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-white/30">
                  <Canvas camera={{ position: [0, 0, 3] }}>
                    <ambientLight intensity={0.8} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <pointLight position={[-10, -10, -10]} color="#ff6ec7" intensity={0.5} />
                    <ScarlettAvatar isSpeaking={isSpeaking} />
                  </Canvas>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    Scarlett AI 
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Advanced</span>
                  </h3>
                  <p className="text-white/90 text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                    Online & Ready • Real-time AI
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions - Enhanced */}
            <div className="p-3 bg-gradient-to-r from-pink-50/50 via-purple-50/50 to-rose-50/50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-rose-950/20 border-b border-border flex gap-2 overflow-x-auto">
              <button className="px-3 py-1.5 bg-pink-600/20 text-pink-600 dark:text-pink-400 rounded-full text-xs whitespace-nowrap flex items-center gap-1 hover:bg-pink-600/30 transition hover:scale-105">
                <Heart className="w-3 h-3" />
                Self-Care
              </button>
              <button className="px-3 py-1.5 bg-purple-600/20 text-purple-600 dark:text-purple-400 rounded-full text-xs whitespace-nowrap flex items-center gap-1 hover:bg-purple-600/30 transition hover:scale-105">
                <Brain className="w-3 h-3" />
                Mindfulness
              </button>
              <button className="px-3 py-1.5 bg-rose-600/20 text-rose-600 dark:text-rose-400 rounded-full text-xs whitespace-nowrap flex items-center gap-1 hover:bg-rose-600/30 transition hover:scale-105">
                <Smile className="w-3 h-3" />
                Mood Check
              </button>
              <button className="px-3 py-1.5 bg-fuchsia-600/20 text-fuchsia-600 dark:text-fuchsia-400 rounded-full text-xs whitespace-nowrap flex items-center gap-1 hover:bg-fuchsia-600/30 transition hover:scale-105">
                <Sparkles className="w-3 h-3" />
                Resources
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Meet Scarlett</h4>
                  <p className="text-sm font-medium">Your Advanced AI Mental Health Companion</p>
                  <p className="text-xs mt-2 opacity-80">Empathetic • Intelligent • Always Here for You</p>
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs">
                    <span className="px-2 py-1 bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-400 rounded-full">Real-time AI</span>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 rounded-full">24/7 Support</span>
                  </div>
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
                        ? "bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white shadow-lg shadow-pink-500/30"
                        : "bg-gradient-to-br from-card/80 to-card border border-pink-200 dark:border-pink-900/30 text-foreground shadow-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Real-time typing (Scarlett speaking) */}
              {currentTypingText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[80%] p-3 rounded-2xl bg-gradient-to-br from-card/80 to-card border-2 border-pink-500/50 text-foreground shadow-lg shadow-pink-500/20 animate-pulse-slow">
                    <p className="text-sm whitespace-pre-wrap">
                      {currentTypingText}
                      <span className="inline-block w-0.5 h-4 bg-gradient-to-b from-pink-600 to-purple-600 ml-0.5 animate-pulse" />
                    </p>
                    <p className="text-xs text-pink-600 dark:text-pink-400 mt-1 opacity-70 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-pink-600 dark:bg-pink-400 rounded-full animate-ping" />
                      Scarlett is typing...
                    </p>
                  </div>
                </motion.div>
              )}
              
              {isTyping && !currentTypingText && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gradient-to-br from-card/80 to-card border border-pink-200 dark:border-pink-900/30 p-3 rounded-2xl shadow-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input - Enhanced Design */}
            <div className="p-4 bg-gradient-to-r from-pink-50/30 via-purple-50/30 to-rose-50/30 dark:from-pink-950/10 dark:via-purple-950/10 dark:to-rose-950/10 border-t border-border backdrop-blur-sm">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Talk to Scarlett..."
                  className="flex-1 px-4 py-2 bg-background/80 backdrop-blur-sm border border-pink-200 dark:border-pink-900/30 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50 transition-all"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1">
                  🔒 Private & Secure
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  💝 Powered by Scarlett AI
                </span>
              </p>
              <p className="text-xs text-muted-foreground/70 text-center mt-1">
                Not a replacement for professional mental health care
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
