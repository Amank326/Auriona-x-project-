"use client"

import { motion } from "framer-motion"
import { Brain, BookOpen, Video, FileText, Headphones, Users, ExternalLink, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Resources", icon: Brain },
    { id: "articles", name: "Articles", icon: FileText },
    { id: "videos", name: "Videos", icon: Video },
    { id: "podcasts", name: "Podcasts", icon: Headphones },
    { id: "guides", name: "Guides", icon: BookOpen },
    { id: "community", name: "Community", icon: Users },
  ]

  const resources = [
    {
      id: 1,
      title: "Understanding Mental Health in High-Stress Environments",
      category: "articles",
      description: "A comprehensive guide for professionals in demanding fields like aerospace and research.",
      author: "Dr. Sarah Johnson",
      readTime: "12 min read",
      tags: ["stress", "workplace", "resilience"],
      featured: true,
    },
    {
      id: 2,
      title: "Mindfulness Techniques for Daily Practice",
      category: "videos",
      description: "Learn practical mindfulness exercises you can do anywhere, anytime.",
      author: "Michael Chen",
      duration: "24 min",
      tags: ["mindfulness", "meditation", "practice"],
      featured: true,
    },
    {
      id: 3,
      title: "The Science of Emotional Intelligence",
      category: "podcasts",
      description: "Exploring how EI impacts mental health and professional success.",
      author: "Dr. Emily Rodriguez",
      duration: "45 min",
      tags: ["emotional intelligence", "psychology", "leadership"],
      featured: false,
    },
    {
      id: 4,
      title: "Crisis Management: A Practical Guide",
      category: "guides",
      description: "Step-by-step protocols for handling mental health emergencies.",
      author: "Auriona Clinical Team",
      pages: "32 pages",
      tags: ["crisis", "emergency", "support"],
      featured: true,
    },
    {
      id: 5,
      title: "Building Resilient Teams",
      category: "articles",
      description: "Strategies for fostering mental wellness in organizational settings.",
      author: "Dr. James Miller",
      readTime: "18 min read",
      tags: ["teams", "leadership", "culture"],
      featured: false,
    },
    {
      id: 6,
      title: "Sleep Optimization for Mental Health",
      category: "videos",
      description: "Evidence-based techniques to improve sleep quality and mental wellness.",
      author: "Dr. Lisa Anderson",
      duration: "15 min",
      tags: ["sleep", "health", "recovery"],
      featured: false,
    },
  ]

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

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

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                Mental Health
              </span>
              <br />
              Resources
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Curated content from leading mental health professionals and researchers
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-card border border-border hover:border-purple-600"
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-6 bg-card border border-border rounded-2xl hover:border-purple-600/50 transition-all cursor-pointer"
              >
                {resource.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-medium rounded-full">
                    Featured
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  {resource.category === "articles" && <FileText className="w-6 h-6 text-purple-600" />}
                  {resource.category === "videos" && <Video className="w-6 h-6 text-cyan-600" />}
                  {resource.category === "podcasts" && <Headphones className="w-6 h-6 text-pink-600" />}
                  {resource.category === "guides" && <BookOpen className="w-6 h-6 text-green-600" />}
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {resource.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition">
                  {resource.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <span>{resource.author}</span>
                  <span>•</span>
                  <span>{resource.readTime || resource.duration || resource.pages}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-purple-600/10 text-purple-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-purple-600/30 transition">
                    View Resource
                  </button>
                  <button className="p-2 bg-card border border-border rounded-lg hover:border-purple-600 transition">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg">No resources found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-8 bg-gradient-to-b from-purple-600/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Need Personalized Support?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Talk to our AI companion for personalized mental health guidance
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-xl hover:shadow-purple-600/30 transition"
            >
              Talk to Auriona AI
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
