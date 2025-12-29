"use client"

import { motion } from "framer-motion"
import { Brain, TrendingUp, Calendar, Activity, Heart, Smile, Frown, Meh, MessageCircle, Target, Award, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const moodData = [
    { day: "Mon", mood: 7, sessions: 2 },
    { day: "Tue", mood: 6, sessions: 1 },
    { day: "Wed", mood: 8, sessions: 3 },
    { day: "Thu", mood: 7, sessions: 2 },
    { day: "Fri", mood: 9, sessions: 2 },
    { day: "Sat", mood: 8, sessions: 1 },
    { day: "Sun", mood: 8, sessions: 2 },
  ]

  const stats = [
    { label: "Total Sessions", value: "47", change: "+12%", icon: MessageCircle, color: "purple" },
    { label: "Avg Mood Score", value: "7.8", change: "+0.5", icon: Smile, color: "cyan" },
    { label: "Active Days", value: "23", change: "+3", icon: Calendar, color: "green" },
    { label: "Wellness Score", value: "85", change: "+7", icon: Heart, color: "pink" },
  ]

  const recentActivities = [
    { id: 1, type: "session", title: "Mindfulness Exercise", time: "2 hours ago", mood: "positive" },
    { id: 2, type: "check-in", title: "Daily Mood Check", time: "5 hours ago", mood: "neutral" },
    { id: 3, type: "session", title: "Stress Management", time: "1 day ago", mood: "positive" },
    { id: 4, type: "resource", title: "Read: Sleep Optimization", time: "1 day ago", mood: "neutral" },
    { id: 5, type: "session", title: "Emotional Support", time: "2 days ago", mood: "negative" },
  ]

  const goals = [
    { id: 1, title: "Practice mindfulness daily", progress: 65, target: 100 },
    { id: 2, title: "Maintain mood score above 7", progress: 85, target: 100 },
    { id: 3, title: "Complete 50 sessions", progress: 94, target: 100 },
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

      {/* Dashboard Content */}
      <section className="pt-32 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's your mental wellness journey overview
            </p>
          </motion.div>

          {/* Period Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2"
          >
            {["day", "week", "month", "year"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition ${
                  selectedPeriod === period
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-card border border-border hover:border-purple-600"
                }`}
              >
                {period}
              </button>
            ))}
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`p-6 bg-gradient-to-br from-${stat.color}-600/10 to-transparent border border-${stat.color}-600/20 rounded-2xl`}
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                  <span className={`text-sm font-medium text-${stat.color}-600 flex items-center gap-1`}>
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Mood Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 p-6 bg-card border border-border rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Mood Tracking</h2>
                <Activity className="w-6 h-6 text-purple-600" />
              </div>

              <div className="flex items-end justify-between gap-2 h-64">
                {moodData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${data.mood * 10}%` }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg relative group cursor-pointer"
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition">
                        <div className="bg-card border border-border rounded-lg px-2 py-1 text-xs whitespace-nowrap">
                          Mood: {data.mood}/10
                        </div>
                      </div>
                    </motion.div>
                    <span className="text-xs text-muted-foreground">{data.day}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-card border border-border rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Goals</h2>
                <Target className="w-5 h-5 text-green-600" />
              </div>

              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{goal.title}</span>
                      <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.progress}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-green-600 to-emerald-600"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-green-600/30 transition">
                Set New Goal
              </button>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 bg-card border border-border rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Activity</h2>
              <Clock className="w-6 h-6 text-cyan-600" />
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.mood === "positive" ? "bg-green-600/20 text-green-600" :
                    activity.mood === "negative" ? "bg-red-600/20 text-red-600" :
                    "bg-yellow-600/20 text-yellow-600"
                  }`}>
                    {activity.mood === "positive" && <Smile className="w-5 h-5" />}
                    {activity.mood === "negative" && <Frown className="w-5 h-5" />}
                    {activity.mood === "neutral" && <Meh className="w-5 h-5" />}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{activity.title}</h3>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.type === "session" ? "bg-purple-600/20 text-purple-600" :
                    activity.type === "check-in" ? "bg-cyan-600/20 text-cyan-600" :
                    "bg-pink-600/20 text-pink-600"
                  }`}>
                    {activity.type}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-purple-600/20 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Achievements</h2>
              <Award className="w-6 h-6 text-yellow-600" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "7-Day Streak", desc: "Consistent check-ins", unlocked: true },
                { title: "Early Bird", desc: "10 morning sessions", unlocked: true },
                { title: "Mindful Month", desc: "30 days active", unlocked: false },
                { title: "Support Star", desc: "Help 5 community members", unlocked: false },
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 rounded-xl text-center ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-600/30"
                      : "bg-muted/20 border border-muted/30 opacity-50"
                  }`}
                >
                  <Award className={`w-8 h-8 mx-auto mb-2 ${achievement.unlocked ? "text-yellow-600" : "text-muted-foreground"}`} />
                  <h3 className="font-bold text-sm mb-1">{achievement.title}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
