"use client"

import { motion } from "framer-motion"
import { Brain, Users, Globe, Shield, Zap, Heart, Award, Target } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const team = [
    { name: "Dr. Sarah Chen", role: "Chief Clinical Officer", image: "👩‍⚕️" },
    { name: "Dr. Michael Rodriguez", role: "Head of AI Research", image: "👨‍💻" },
    { name: "Dr. Emily Watson", role: "Director of Product", image: "👩‍💼" },
    { name: "Dr. James Kim", role: "Chief Technology Officer", image: "👨‍🔬" },
  ]

  const values = [
    { icon: Heart, title: "Compassion First", desc: "Every interaction is guided by empathy and understanding" },
    { icon: Shield, title: "Privacy & Security", desc: "Your mental health data is protected with enterprise-grade encryption" },
    { icon: Globe, title: "Universal Access", desc: "Mental health support should be available to everyone, everywhere" },
    { icon: Zap, title: "Innovation", desc: "Leveraging cutting-edge AI to provide the best care possible" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-40 bg-card/80 backdrop-blur-xl border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
              Auriona
            </h1>
          </Link>
          <Link href="/" className="text-sm hover:text-purple-600 transition">
            ← Back to Home
          </Link>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                Our Mission
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Auriona is revolutionizing mental health care through advanced AI technology, 
              making compassionate support accessible to everyone, everywhere, 24/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Our Values
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-card border border-border rounded-2xl hover:border-purple-600/50 transition"
              >
                <value.icon className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Leadership Team
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center text-6xl">
                  {member.image}
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-4">Join Us in Our Mission</h2>
            <p className="text-lg mb-8 opacity-90">
              Together, we can make mental health support accessible to everyone
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-full font-medium hover:shadow-xl transition"
            >
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
