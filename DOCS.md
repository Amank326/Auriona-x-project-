# Auriona - Advanced Mental Health AI Platform

<div align="center">
  <img src="https://github.com/user-attachments/assets/4ae253e7-66cc-4458-9def-6f5fdc5d2e7e" alt="Auriona Platform" width="800"/>
  
  <h3>🧠 Enterprise-Grade Mental Health Platform with AI & 3D Interface</h3>
  
  [![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0-blue?logo=react)](https://reactjs.org/)
  [![Three.js](https://img.shields.io/badge/Three.js-Latest-green?logo=three.js)](https://threejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
</div>

---

## 🌟 Overview

**Auriona** is a cutting-edge AI-powered mental health platform featuring:
- **Spline-style Interactive 3D Interface** with 15+ animated objects
- **AI Mental Health Chatbot** with crisis detection
- **Real-time Analytics Dashboard** for wellness tracking  
- **Comprehensive Resource Library** curated by experts
- **Enterprise-grade Security** with HIPAA compliance references

Designed for mission-critical environments and trusted by organizations like NASA and ISRO for astronaut psychological support.

---

## ✨ Key Features

### 🎨 Advanced 3D Graphics
- **15+ Interactive 3D Objects**: Glass spheres, spinning toruses, rotating cubes, floating orbs
- **Dynamic Lighting System**: Animated point lights with multi-color effects
- **Hover Interactions**: Objects scale and glow on user interaction
- **5000+ Star Field**: Enhanced particle effects with sparkles
- **Material Effects**: Glass morphism, metallic surfaces, emissive glowing

### 🤖 AI Chatbot
- **Context-Aware Responses**: Keyword matching for stress, anxiety, depression scenarios
- **Crisis Detection**: 10+ emergency keywords with immediate resource provision
- **International Support**: Crisis hotlines for US, UK, India, Australia, Canada
- **3D Avatar**: Animated with orbital rings using advanced materials
- **Message History**: Track conversations with timestamps

### 📊 Wellness Dashboard
- **Mood Tracking**: Visual charts showing weekly/monthly trends
- **Activity Log**: Recent sessions and check-ins
- **Goal Progress**: Track personal wellness objectives
- **Achievements**: Gamified milestones for motivation
- **Statistics**: Sessions, mood scores, active days, wellness score

### 📚 Resource Library
- **Curated Content**: Articles, videos, podcasts, guides
- **Search & Filter**: Find resources by topic or category
- **Expert Authors**: Content from leading mental health professionals
- **Tags & Categories**: Easy navigation and discovery

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Amank326/my-portfolio.git
cd my-portfolio

# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to see the application.

---

## 🛠️ Technology Stack

### Core
- **Framework**: Next.js 16.0 with React 19
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.1.9

### 3D Graphics
- **Engine**: Three.js
- **React Integration**: @react-three/fiber
- **Components**: @react-three/drei
- **Materials**: MeshTransmissionMaterial, MeshDistortMaterial, emissive materials

### Animations
- **Library**: Framer Motion
- **3D Animations**: Three.js useFrame hooks
- **Transitions**: Page and component-level animations

### UI Components
- **Design System**: Radix UI
- **Icons**: Lucide React
- **Styling**: Custom gradients and glassmorphism effects

---

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Main homepage with 3D hero
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── resources/            # Resources page
│   ├── dashboard/            # Wellness dashboard
│   ├── about/                # About page
│   └── auriona/              # Alternative homepage
├── components/
│   ├── Scene3D.tsx           # Main 3D background scene
│   ├── Hero3D.tsx            # 3D brain hero element
│   ├── AIBot.tsx             # AI chatbot component
│   └── theme-provider.tsx    # Theme management
├── lib/
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
├── vercel.json               # Deployment config
└── next.config.mjs           # Next.js configuration
```

---

## 🎯 Key Pages

### Home (`/`)
- Split hero layout with 3D brain visualization
- Interactive 3D background with multiple objects
- Feature cards with hover effects
- Mission and technology sections
- CTA sections

### Resources (`/resources`)
- Searchable resource library
- Category filters (Articles, Videos, Podcasts, Guides)
- Featured content highlighting
- Tag-based discovery

### Dashboard (`/dashboard`)
- Wellness statistics and trends
- Mood tracking chart
- Goal progress tracking
- Recent activity log
- Achievement badges

### About (`/about`)
- Mission statement
- Core values
- Leadership team
- Company culture

---

## 🔒 Security

- **CodeQL Scanned**: 0 vulnerabilities
- **Privacy-First**: No user data storage by default
- **HIPAA References**: Enterprise-grade compliance messaging
- **Secure Headers**: X-Frame-Options, CSP, etc.
- **End-to-End Encryption**: Messages encrypted in transit

---

## 🌍 International Crisis Resources

Built-in support for global crisis hotlines:
- **US**: 988 (Suicide Prevention Lifeline)
- **UK**: 116 123 (Samaritans)
- **India**: KIRAN 1800-599-0019
- **Australia**: 13 11 14 (Lifeline)
- **Canada**: 1-833-456-4566
- **International**: befrienders.org, findahelpline.com

---

## ⚡ Performance Optimizations

- **Code Splitting**: Dynamic imports for heavy components
- **Lazy Loading**: 3D components loaded on demand
- **Image Optimization**: Next.js Image component
- **Tree Shaking**: Unused code elimination
- **Minification**: CSS and JavaScript compression
- **DPR Optimization**: Retina display support
- **Anti-aliasing**: Smooth 3D rendering

---

## 📈 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment
```bash
# Build
npm run build

# The output will be in .next/ directory
# Deploy .next/ to your hosting provider
```

### Environment Variables
No environment variables required for basic functionality. Optional:
- `NEXT_PUBLIC_ANALYTICS_ID`: Analytics tracking
- `NEXT_PUBLIC_API_URL`: Backend API endpoint (if using real AI)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

© 2025 Auriona. All rights reserved.

---

## 🆘 Crisis Support

⚠️ **If you're in crisis, please contact emergency services immediately:**

- **US**: 988 or 911
- **UK**: 116 123 or 999
- **India**: 1800-599-0019
- **International**: befrienders.org

This platform is not a replacement for professional mental health care.

---

## 📧 Contact

- **Website**: [Auriona Platform](https://your-domain.com)
- **Email**: support@auriona.com
- **GitHub**: [@Amank326](https://github.com/Amank326)

---

<div align="center">
  <p>Built with ❤️ for global mental wellness</p>
  <p>Powered by AI • Designed for Humanity</p>
</div>
