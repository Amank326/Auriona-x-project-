"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Brain, Heart, Sparkles, Users, Globe, Shield, Activity, MessageCircle, ArrowRight, Menu, X } from "lucide-react"
import Link from "next/link"
import Scene3D from "@/components/Scene3D"
import Hero3D from "@/components/Hero3D"
import AIBot from "@/components/AIBot"

export default function AurionaHome() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      color: "from-purple-600 to-violet-600"
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Empathetic responses trained on mental health best practices",
      color: "from-pink-600 to-rose-600"
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Available worldwide, breaking barriers to mental health support",
      color: "from-cyan-600 to-blue-600"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "End-to-end encryption ensuring your conversations remain confidential",
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Track your mental wellness journey with advanced analytics",
      color: "from-orange-600 to-amber-600"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with others and share experiences in a safe environment",
      color: "from-indigo-600 to-purple-600"
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* 3D Background */}
      <Scene3D />
      
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "bg-card/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
              Auriona
            </h1>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="#features" className="text-sm hover:text-purple-600 transition">
              Features
            </Link>
            <Link href="#mission" className="text-sm hover:text-purple-600 transition">
              Mission
            </Link>
            <Link href="/resources" className="text-sm hover:text-purple-600 transition">
              Resources
            </Link>
            <Link href="/dashboard" className="text-sm hover:text-purple-600 transition">
              Dashboard
            </Link>
            <Link href="/about" className="text-sm hover:text-purple-600 transition">
              About
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border"
          >
            <div className="px-6 py-4 space-y-4">
              <Link href="#features" className="block text-sm hover:text-purple-600 transition">
                Features
              </Link>
              <Link href="#mission" className="block text-sm hover:text-purple-600 transition">
                Mission
              </Link>
              <Link href="#technology" className="block text-sm hover:text-purple-600 transition">
                Technology
              </Link>
              <Link href="#resources" className="block text-sm hover:text-purple-600 transition">
                Resources
              </Link>
              <button className="w-full px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-8 relative">
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
              <span className="px-6 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-600/30 rounded-full text-sm font-medium text-purple-600 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 inline mr-2" />
                Advanced AI Mental Health Platform
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                Mental Wellness
              </span>
              <br />
              <span className="text-foreground">Reimagined</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Auriona combines cutting-edge AI technology with compassionate care to provide world-class 
              mental health support. Trusted by leading organizations like NASA and ISRO for astronaut 
              psychological wellbeing.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 transition-all"
              >
                Talk to Auriona AI
                <MessageCircle className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: "rgb(168, 85, 247)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-card/50 backdrop-blur-sm hover:bg-card/80 text-foreground border-2 border-border rounded-full font-medium flex items-center justify-center gap-2 transition-all"
              >
                Explore Platform
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-2xl bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-sm border border-purple-600/20 hover:border-purple-600/40 transition-all cursor-pointer"
              >
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  24/7
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Available Support</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-2xl bg-gradient-to-br from-cyan-600/10 to-blue-600/10 backdrop-blur-sm border border-cyan-600/20 hover:border-cyan-600/40 transition-all cursor-pointer"
              >
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  99.9%
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">User Satisfaction</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-2xl bg-gradient-to-br from-green-600/10 to-emerald-600/10 backdrop-blur-sm border border-green-600/20 hover:border-green-600/40 transition-all cursor-pointer"
              >
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  150+
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Countries Served</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Interactive Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Hero3D />
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 60px rgba(168, 85, 247, 0.3)",
                  "0 0 100px rgba(236, 72, 153, 0.4)",
                  "0 0 60px rgba(168, 85, 247, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full blur-3xl -z-10"
            />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 px-6 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Advanced Features
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powered by state-of-the-art AI and designed for enterprise-grade reliability
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-8 bg-card/50 backdrop-blur-sm border border-border rounded-2xl hover:border-purple-600/50 transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                
                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 md:py-32 px-6 md:px-8 relative bg-gradient-to-b from-purple-600/5 to-transparent">
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
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Universally Accessible</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Auriona was created to address the global mental health crisis. We believe that everyone deserves 
                access to high-quality mental health support, regardless of their location, background, or circumstances.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our AI-powered platform combines the latest advances in natural language processing, empathy modeling, 
                and psychological best practices to provide immediate, compassionate support.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium"
              >
                Learn More About Our Mission
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-600/30 flex items-center justify-center relative overflow-hidden">
                <Globe className="w-32 h-32 text-purple-600/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                
                {/* Floating Stats */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute top-8 right-8 px-4 py-3 bg-card/90 backdrop-blur-sm border border-border rounded-xl"
                >
                  <p className="text-xs text-muted-foreground">Global Impact</p>
                  <p className="text-2xl font-bold text-green-600">+1M</p>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                  className="absolute bottom-8 left-8 px-4 py-3 bg-card/90 backdrop-blur-sm border border-border rounded-xl"
                >
                  <p className="text-xs text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-purple-600">500K+</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 md:py-32 px-6 md:px-8 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Technology</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Powered by
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Cutting-Edge AI</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto mb-12">
              Auriona leverages advanced neural networks, natural language processing, and empathy modeling 
              to provide human-like conversations and genuine emotional support.
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-gradient-to-br from-purple-600/10 to-transparent border border-purple-600/20 rounded-2xl"
              >
                <h3 className="text-2xl font-bold mb-4">Enterprise-Grade Security</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>End-to-end encryption for all conversations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>HIPAA compliant data storage and handling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Regular security audits and penetration testing</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 bg-gradient-to-br from-pink-600/10 to-transparent border border-pink-600/20 rounded-2xl"
              >
                <h3 className="text-2xl font-bold mb-4">Trusted by Leaders</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span>Deployed in NASA astronaut support programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span>Integrated with ISRO mental wellness initiatives</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                    <span>Used by Fortune 500 companies for employee wellbeing</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-6 md:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Mental Wellness?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join millions of users worldwide who trust Auriona for their mental health journey
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-medium inline-flex items-center gap-2"
              >
                Start Your Journey Today
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-8 border-t border-border">
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
                <li><Link href="#" className="hover:text-purple-600 transition">Crisis Support</Link></li>
                <li><Link href="#" className="hover:text-purple-600 transition">Self-Help Tools</Link></li>
                <li><Link href="#" className="hover:text-purple-600 transition">Research</Link></li>
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
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
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
