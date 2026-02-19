"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Brain, Heart, Sparkles, Users, Globe, Shield, Activity, MessageCircle, ArrowRight, Zap, Target, Award } from "lucide-react"
import Link from "next/link"
import Scene3D from "@/components/Scene3D"
import AIBot from "@/components/AIBot"
import Navigation3D from "@/components/Navigation3D"
import EnhancedHero3D from "@/components/EnhancedHero3D"
import FloatingElements3D from "@/components/FloatingElements3D"
import GlassmorphicCard from "@/components/GlassmorphicCard"
import FlipCard3D from "@/components/FlipCard3D"
import ParallaxSection from "@/components/ParallaxSection"
import AnimatedBackground from "@/components/AnimatedBackground"
import MorphingShape3D from "@/components/MorphingShape3D"
import LiquidAnimation from "@/components/LiquidAnimation"

export default function AdvancedAurionaHome() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced neural networks providing personalized mental health support 24/7",
      backContent: "Our AI uses state-of-the-art transformer models trained on mental health research to provide empathetic, evidence-based support.",
      color: "from-purple-600 to-violet-600"
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Empathetic responses trained on mental health best practices",
      backContent: "Every interaction is designed with empathy, using cognitive behavioral therapy principles and positive psychology frameworks.",
      color: "from-pink-600 to-rose-600"
    },
    {
      icon: Sparkles,
      title: "Advanced 3D Avatar",
      description: "Photorealistic AI character with cinematic quality animations",
      backContent: "Experience lifelike interactions with our advanced 3D avatar featuring facial expressions, lip-sync, and emotional responses.",
      color: "from-cyan-600 to-blue-600",
      link: "/avatar-demo"
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Available worldwide, breaking barriers to mental health support",
      backContent: "Supporting 50+ languages, accessible 24/7 from anywhere in the world, making mental health care truly universal.",
      color: "from-cyan-600 to-blue-600"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "End-to-end encryption ensuring your conversations remain confidential",
      backContent: "Bank-level encryption, HIPAA compliance, and zero-knowledge architecture ensure your data is always private and secure.",
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Track your mental wellness journey with advanced analytics",
      backContent: "Visualize your progress with detailed analytics, mood tracking, and personalized insights powered by machine learning.",
      color: "from-orange-600 to-amber-600"
    }
  ]

  const stats = [
    { value: "1M+", label: "Active Users", icon: Users, color: "purple" },
    { value: "99.9%", label: "Uptime", icon: Zap, color: "cyan" },
    { value: "150+", label: "Countries", icon: Globe, color: "pink" },
    { value: "24/7", label: "Support", icon: Shield, color: "green" }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Enhanced Animated Background */}
      <AnimatedBackground />
      
      {/* 3D Background */}
      <Scene3D />
      
      {/* Floating Elements */}
      <FloatingElements3D />
      
      {/* Navigation */}
      <Navigation3D scrolled={scrolled} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-8 relative pt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <span className="px-6 py-3 glass-effect rounded-full text-sm font-medium bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-600/30">
                <Sparkles className="w-4 h-4 inline mr-2" />
                Advanced AI Mental Health Platform
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="block bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent animate-gradient"
              >
                Mental Wellness
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="block text-foreground mt-2"
              >
                Reimagined
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              Auriona combines cutting-edge AI technology with compassionate care to provide world-class 
              mental health support. Trusted by leading organizations like NASA and ISRO for astronaut 
              psychological wellbeing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all group"
              >
                Talk to Auriona AI
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  borderColor: "rgb(168, 85, 247)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass-effect hover:bg-card/80 text-foreground border-2 border-border rounded-full font-medium flex items-center justify-center gap-2 transition-all group"
              >
                Explore Platform
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {[
                { value: "24/7", label: "Available", color: "from-purple-600 to-pink-600" },
                { value: "99.9%", label: "Satisfaction", color: "from-cyan-600 to-blue-600" },
                { value: "150+", label: "Countries", color: "from-green-600 to-emerald-600" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-4 rounded-2xl glass-effect hover:border-purple-600/40 transition-all cursor-pointer"
                >
                  <h3 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Enhanced 3D Interactive Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative min-h-[500px]"
          >
            <EnhancedHero3D />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-purple-600/50 rounded-full flex justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section with Flip Cards */}
      <ParallaxSection>
        <section id="features" className="py-20 md:py-32 px-6 md:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block px-6 py-2 glass-effect rounded-full text-sm font-medium text-purple-600 mb-4"
              >
                ✨ Powerful Features
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Advanced Capabilities
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Powered by state-of-the-art AI and designed for enterprise-grade reliability
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FlipCard3D
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  backContent={feature.backContent}
                  color={feature.color}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Mission Section with Glassmorphic Cards */}
      <ParallaxSection speed={0.3}>
        <section id="mission" className="py-20 md:py-32 px-6 md:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Our Mission</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                  Making Mental Health Care
                  <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
                    Universally Accessible
                  </span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                  Auriona was created to address the global mental health crisis. We believe that everyone deserves 
                  access to high-quality mental health support, regardless of their location, background, or circumstances.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                  Our AI-powered platform combines the latest advances in natural language processing, empathy modeling, 
                  and psychological best practices to provide immediate, compassionate support.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium shadow-xl shadow-purple-600/30"
                >
                  Learn More About Our Mission
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative min-h-[400px]"
              >
                <LiquidAnimation />
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by <span className="text-gradient-purple-pink">Millions Worldwide</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <GlassmorphicCard key={index} delay={index * 0.1}>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-${stat.color}-600 to-${stat.color}-400 flex items-center justify-center glow-${stat.color}`}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-4xl font-bold text-gradient-purple-pink mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              </GlassmorphicCard>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <ParallaxSection>
        <section id="technology" className="py-20 md:py-32 px-6 md:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Technology</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Powered by
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent mt-2">
                  Cutting-Edge AI
                </span>
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto mb-12 text-lg">
                Auriona leverages advanced neural networks, natural language processing, and empathy modeling 
                to provide human-like conversations and genuine emotional support.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <GlassmorphicCard>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2" />
                        <span>End-to-end encryption for all conversations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2" />
                        <span>HIPAA compliant data storage and handling</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2" />
                        <span>Regular security audits and penetration testing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </GlassmorphicCard>

              <GlassmorphicCard delay={0.1}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Trusted by Leaders</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2" />
                        <span>Deployed in NASA astronaut support programs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2" />
                        <span>Integrated with ISRO mental wellness initiatives</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-2" />
                        <span>Used by Fortune 500 companies for employee wellbeing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <GlassmorphicCard className="!p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20" />
            <div className="absolute top-0 right-0 w-64 h-64">
              <MorphingShape3D />
            </div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gradient-purple-pink mb-6">
                  Ready to Transform Your Mental Wellness?
                </h2>
                <p className="text-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
                  Join millions of users worldwide who trust Auriona for their mental health journey
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium inline-flex items-center gap-2 shadow-xl shadow-purple-600/30"
                >
                  Start Your Journey Today
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>
          </GlassmorphicCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8 border-t border-border/50 glass-effect">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Auriona</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Your AI companion for mental wellness, available 24/7
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-purple-600 transition">Features</Link></li>
                <li><Link href="#mission" className="hover:text-purple-600 transition">Mission</Link></li>
                <li><Link href="#technology" className="hover:text-purple-600 transition">Technology</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/resources" className="hover:text-purple-600 transition">Crisis Support</Link></li>
                <li><Link href="/resources" className="hover:text-purple-600 transition">Self-Help Tools</Link></li>
                <li><Link href="/about" className="hover:text-purple-600 transition">Research</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-purple-600 transition">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-purple-600 transition">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-purple-600 transition">HIPAA Compliance</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 Auriona. All rights reserved.</p>
            <p className="text-xs text-center">
              🚨 Crisis Support: US-988 | UK-116 123 | India-1800-599-0019 | International-befrienders.org
            </p>
          </div>
        </div>
      </footer>

      {/* AI Bot Component */}
      <AIBot />
    </div>
  )
}
