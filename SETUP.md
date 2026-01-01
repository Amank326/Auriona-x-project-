# 🚀 Auriona Project - Complete Setup Guide

## Project Overview
**Auriona** is an advanced AI-powered mental health platform featuring:
- 🎨 Advanced 3D animations with Three.js and React Three Fiber
- 🤖 AI Mental Health Chatbot with crisis detection
- 📊 Real-time wellness analytics dashboard
- 💜 Compassionate support 24/7
- 🔒 Enterprise-grade security and privacy

## 📋 Setup Checklist

### ✅ Step 1: Dependencies Installation
```bash
npm install --legacy-peer-deps
```
Status: **In Progress**

### ✅ Step 2: Environment Configuration
Create `.env.local` file with database and API configurations.
Status: **Completed** ✓

### 📝 Step 3: Database Setup (Choose One Option)

#### Option A: Local PostgreSQL
1. Install PostgreSQL from https://www.postgresql.org/download/
2. Create database:
```sql
CREATE DATABASE auriona;
```
3. Update `.env.local`:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/auriona?schema=public"
```

#### Option B: Cloud Database (Recommended)
Use one of:
- **Supabase** (PostgreSQL) - https://supabase.com
- **Railway** - https://railway.app
- **Neon** - https://neon.tech
- **Vercel Postgres** - https://vercel.com/storage/postgres

Get connection string and add to `.env.local`

### 📝 Step 4: Generate NextAuth Secret
```bash
# Generate a secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Add to `.env.local`:
```
NEXTAUTH_SECRET="your-generated-secret"
```

### 📝 Step 5: Initialize Database
```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma db push

# Optional: Seed database with sample data
npx prisma db seed
```

### 🚀 Step 6: Start Development Server
```bash
npm run dev
```
Visit: **http://localhost:3000**

## 📦 Project Structure

```
my-portfolio/
├── app/                      # Next.js app router
│   ├── api/                  # API routes
│   ├── auriona/              # Main app pages
│   ├── dashboard/            # User dashboard
│   ├── resources/            # Resource library
│   ├── about/                # About page
│   └── layout.tsx            # Root layout
├── components/               # React components
│   ├── Scene3D.tsx          # 3D background animation
│   ├── Hero3D.tsx           # 3D hero section
│   ├── AIBot.tsx            # AI chatbot interface
│   └── ...other components
├── lib/                      # Utility functions
├── prisma/                   # Database schema
│   └── schema.prisma        # Prisma ORM schema
├── public/                   # Static assets
├── styles/                   # Global styles
├── .env.local               # Environment variables
└── package.json             # Dependencies
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16.0
- **UI Library**: React 19
- **3D Graphics**: Three.js, @react-three/fiber
- **Styling**: Tailwind CSS 4.1
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Forms**: React Hook Form

### Backend
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **API**: RESTful API (Next.js API routes)

## 📊 Database Models

### User
- id, email, name, password, image
- Relations: conversations, moodEntries, goals, achievements

### Conversation
- id, userId, title
- Relations: messages (chat history)

### Message
- id, conversationId, role, content, timestamp
- Stores individual chat messages

### MoodEntry
- id, userId, mood (1-10), note, createdAt
- Tracks daily mood entries

### Goal
- id, userId, title, description, progress (0-100)
- Wellness goals tracking

### Achievement
- id, userId, title, description, unlockedAt
- Gamified achievements system

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `POST /api/auth/register` - New user registration
- `GET /api/auth/session` - Get current session

### Chat/Conversations
- `POST /api/chat` - Send message to AI
- `GET /api/conversations` - List user conversations
- `GET /api/conversations/:id` - Get conversation details
- `DELETE /api/conversations/:id` - Delete conversation

### Wellness Data
- `POST /api/mood` - Record mood entry
- `GET /api/mood` - Get mood history
- `POST /api/goals` - Create wellness goal
- `GET /api/goals` - List goals
- `PATCH /api/goals/:id` - Update goal progress

## 🚀 Available Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build           # Build for production
npm start               # Start production server

# Database
npm run db:generate    # Generate Prisma Client
npm run db:push        # Push schema to database
npm run db:migrate     # Run migrations
npm run db:studio      # Open Prisma Studio
npm run db:reset       # Reset database (dangerous!)

# Linting
npm run lint           # Run ESLint
```

## 🔐 Security Considerations

1. **Environment Variables**: Never commit `.env.local` to git
2. **Authentication**: Uses NextAuth.js with secure session handling
3. **Database**: End-to-end encryption references in code
4. **CORS**: Configured for localhost development
5. **API Routes**: Protected with authentication middleware

## 🐛 Troubleshooting

### npm Install Issues
```bash
# Clear cache and reinstall
rm -r node_modules
npm cache clean --force
npm install --legacy-peer-deps
```

### Prisma Generation Error
```bash
# Regenerate Prisma Client
npx prisma generate
```

### Database Connection Error
- Check DATABASE_URL in `.env.local`
- Verify PostgreSQL is running
- Test connection with: `npx prisma db execute --stdin`

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

## 📚 Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **React Three Fiber**: https://docs.pmnd.rs/react-three-fiber
- **Tailwind CSS**: https://tailwindcss.com/docs
- **NextAuth.js**: https://next-auth.js.org

## 🎯 Next Steps

1. ✅ Complete npm installation
2. ✅ Create `.env.local` file (done)
3. 📝 Set up database (PostgreSQL or cloud)
4. 📝 Generate NextAuth secret
5. 📝 Run Prisma migrations
6. 🚀 Start development server
7. 🎨 Customize branding and content
8. 📦 Deploy to Vercel or your hosting platform

## 📞 Support

For issues or questions:
- Check DOCS.md for detailed documentation
- Review BACKEND_SETUP.md for backend configuration
- Open an issue on GitHub

---

**Happy coding! 🎉**
