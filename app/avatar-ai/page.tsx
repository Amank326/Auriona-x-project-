"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Mic, Send, Settings, Volume2, Eye } from "lucide-react"
import AdvancedAIAvatar from "@/components/AdvancedAIAvatar"

export default function AvatarCommunication() {
  const [speaking, setSpeaking] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "avatar" }>>([
    { text: "Hello! I'm your AI Mental Health Companion", sender: "avatar" },
  ])
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [settings, setSettings] = useState({
    quality: "high",
    animation: true,
    soundEnabled: true,
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    // Add user message
    const userMsg = message
    setMessages((prev) => [...prev, { text: userMsg, sender: "user" }])
    setMessage("")

    // Avatar speaking animation
    setSpeaking(true)

    try {
      // Call AI API for compassionate response
      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages((prev) => [...prev, { text: data.response, sender: "avatar" }])
      } else {
        throw new Error("Failed to get response")
      }
    } catch (error) {
      console.error("Error:", error)
      // Fallback response
      const fallbackResponses = [
        "I'm here for you. Can you tell me more?",
        "Thank you for sharing. What would help?",
        "I understand. Let's work through this together.",
      ]
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
      setMessages((prev) => [...prev, { text: randomResponse, sender: "avatar" }])
    }

    setSpeaking(false)
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    if (!isListening) {
      setSpeaking(true)
      // Simulate voice input
      setTimeout(() => {
        setSpeaking(false)
        setIsListening(false)
      }, 3000)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-screen overflow-hidden">
        {/* Avatar Display - 3D Character */}
        <div className="lg:col-span-2 relative">
          <AdvancedAIAvatar speaking={speaking} interactive={true} />

          {/* Avatar Status Card */}
          <motion.div
            className="absolute top-4 right-4 bg-white bg-opacity-10 backdrop-blur-lg border border-cyan-500 border-opacity-30 rounded-xl p-4 text-white"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">AI Status: Online</span>
            </div>
            <div className="text-xs text-gray-300 space-y-1">
              <p>Resolution: 4K 60fps</p>
              <p>Animation: Real-time</p>
              <p>Latency: &lt;100ms</p>
            </div>
          </motion.div>

          {/* Cinematic Mode Indicator */}
          <motion.div
            className="absolute bottom-4 left-4 flex items-center gap-2 bg-cyan-500 bg-opacity-20 backdrop-blur-lg border border-cyan-500 rounded-lg px-4 py-2"
            animate={{ borderColor: ["#00ffff", "#00ccff", "#00ffff"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium">Cinematic Mode</span>
          </motion.div>
        </div>

        {/* Chat Interface */}
        <div className="flex flex-col h-screen bg-black bg-opacity-40 border-l border-cyan-500 border-opacity-20 backdrop-blur-md">
          {/* Header */}
          <motion.div
            className="p-4 border-b border-cyan-500 border-opacity-20 bg-gradient-to-r from-cyan-900 to-purple-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-1">Auriona</h2>
            <p className="text-xs text-cyan-300 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Active Now
            </p>
          </motion.div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm backdrop-blur-md border ${
                      msg.sender === "user"
                        ? "bg-cyan-600 bg-opacity-40 border-cyan-500 border-opacity-40 text-white"
                        : "bg-purple-600 bg-opacity-40 border-purple-500 border-opacity-40 text-gray-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 space-y-3 border-t border-cyan-500 border-opacity-20 bg-gradient-to-t from-black to-transparent">
            {/* Quick responses */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              {[
                "I need help",
                "How are you?",
                "Tell me more",
                "Thank you",
              ].map((quick, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setMessage(quick)
                    setTimeout(() => handleSendMessage(), 100)
                  }}
                  className="text-xs px-3 py-2 rounded bg-cyan-500 bg-opacity-20 text-cyan-300 border border-cyan-500 border-opacity-30 hover:bg-opacity-40 transition-all"
                >
                  {quick}
                </motion.button>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSendMessage()
                }}
                className="flex-1 bg-white bg-opacity-10 border border-cyan-500 border-opacity-20 rounded px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:bg-opacity-20 focus:border-opacity-40 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="p-2 bg-cyan-500 bg-opacity-30 border border-cyan-500 rounded hover:bg-opacity-50 transition-all"
              >
                <Send className="w-4 h-4 text-cyan-300" />
              </motion.button>
            </div>

            {/* Voice and Settings */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVoiceInput}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded border transition-all ${
                  isListening
                    ? "bg-red-500 bg-opacity-40 border-red-500 text-red-300"
                    : "bg-purple-500 bg-opacity-20 border-purple-500 border-opacity-30 text-purple-300 hover:bg-opacity-40"
                }`}
              >
                <Mic className="w-4 h-4" />
                <span className="text-xs font-medium">
                  {isListening ? "Listening..." : "Voice"}
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-500 bg-opacity-20 border border-gray-500 border-opacity-30 rounded hover:bg-opacity-40 transition-all"
              >
                <Settings className="w-4 h-4 text-gray-300" />
              </motion.button>
            </div>

            {/* Audio Control */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded bg-blue-500 bg-opacity-20 border border-blue-500 border-opacity-30 text-blue-300 hover:bg-opacity-40 transition-all text-sm font-medium"
            >
              <Volume2 className="w-4 h-4" />
              Master Volume
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

// AnimatePresence for messages
import { AnimatePresence } from "framer-motion"
