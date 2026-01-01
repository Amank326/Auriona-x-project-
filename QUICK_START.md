# 🚀 Auriona Quick Reference Guide

## ⚡ Quick Start (5 minutes)

```bash
# 1. Dependencies should be installed via pnpm
# Check when installation finishes

# 2. Set up environment variables
# Edit .env.local with your database connection

# 3. Initialize database
npx prisma db push

# 4. Start development server
pnpm dev

# 5. Open browser
# http://localhost:3000
```

---

## 📁 Key Files & Their Purpose

| File | Purpose |
|------|---------|
| `.env.local` | Environment variables (database, API keys) |
| `prisma/schema.prisma` | Database schema definition |
| `app/page.tsx` | Home page |
| `app/auriona/page.tsx` | Main app interface |
| `app/dashboard/page.tsx` | User dashboard |
| `components/AIBot.tsx` | AI chatbot component |
| `components/Scene3D.tsx` | 3D background animation |

---

## 🔧 Common Tasks

### Add a New Page
```bash
# Create new route in app/yourpage/page.tsx
mkdir app/yourpage
cat > app/yourpage/page.tsx << 'EOF'
export default function Page() {
  return <h1>Your Page</h1>
}
EOF
```

### Add a New Component
```bash
# Create in components/YourComponent.tsx
cat > components/YourComponent.tsx << 'EOF'
export default function YourComponent() {
  return <div>Your Component</div>
}
EOF
```

### Add Database Model
```bash
# Edit prisma/schema.prisma
# Add your model, then run:
npx prisma db push
npx prisma generate
```

### Create API Route
```bash
# Create app/api/yourroute/route.ts
mkdir -p app/api/yourroute
cat > app/api/yourroute/route.ts << 'EOF'
export async function GET() {
  return Response.json({ message: "Hello" })
}
EOF
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
pnpm dev -- -p 3001
```

### Clear Cache
```bash
rm -r .next
pnpm dev
```

### Reset Database
```bash
npx prisma db push --force-reset
# ⚠️ WARNING: This deletes all data!
```

### Check Database
```bash
npx prisma studio
# Opens database UI at http://localhost:5555
```

### Re-generate Prisma Client
```bash
npx prisma generate
```

---

## 📊 Project Commands

```bash
# Development
pnpm dev              # Start development server (port 3000)
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:push          # Sync database schema
pnpm db:migrate       # Run database migrations
pnpm db:studio        # Open database UI
pnpm db:reset         # Reset database (! DATA LOSS !)

# Code Quality
pnpm lint             # Run ESLint
pnpm type-check       # Check TypeScript types
```

---

## 🌐 Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/auriona"

# Authentication
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# App Info
NEXT_PUBLIC_APP_NAME="Auriona"
NEXT_PUBLIC_APP_DESCRIPTION="AI Mental Health Companion"
```

---

## 🔗 Important Links

| Resource | Link |
|----------|------|
| Next.js Docs | https://nextjs.org/docs |
| React Docs | https://react.dev |
| TypeScript | https://www.typescriptlang.org |
| Prisma ORM | https://www.prisma.io/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| Three.js | https://threejs.org/docs |
| NextAuth.js | https://next-auth.js.org |
| Framer Motion | https://www.framer.com/motion |
| Radix UI | https://www.radix-ui.com/docs |

---

## 💻 System Requirements

- **Node.js**: 18.0 or higher
- **npm/pnpm**: Latest version
- **PostgreSQL**: 14+ (or use cloud database)
- **RAM**: 4GB minimum
- **Disk Space**: 2GB for dependencies

---

## 🚀 Deployment Commands

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t auriona .
docker run -p 3000:3000 auriona
```

### Manual Deploy
```bash
pnpm build
pnpm start
```

---

## 📚 File Structure Quick Reference

```
my-portfolio/
├── app/                          # App routes
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── api/                     # API routes
│   ├── auriona/                 # Main app
│   ├── dashboard/               # Dashboard
│   ├── resources/               # Resources page
│   └── about/                   # About page
├── components/                   # React components
├── lib/                         # Utilities
├── prisma/                      # Database
├── public/                      # Static files
├── styles/                      # Style files
├── .env.local                   # Environment (DON'T COMMIT)
├── tsconfig.json               # TypeScript config
├── next.config.mjs             # Next.js config
└── package.json                # Dependencies
```

---

## 🎨 Styling with Tailwind

```tsx
// Example component with Tailwind
export default function Card() {
  return (
    <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-2">
        Mental Health Support
      </h2>
      <p className="text-gray-100">
        24/7 AI-powered compassionate care
      </p>
    </div>
  )
}
```

---

## 🔐 Security Checklist

- [ ] Never commit `.env.local`
- [ ] Use strong NEXTAUTH_SECRET
- [ ] Enable HTTPS in production
- [ ] Validate all user inputs
- [ ] Use parameterized queries (Prisma does this)
- [ ] Implement rate limiting
- [ ] Add CORS headers
- [ ] Regular security updates

---

## 📞 Getting Help

1. **Check Docs**: See `DOCS.md`, `SETUP.md`, `BACKEND_SETUP.md`
2. **Search Issues**: GitHub issues for similar problems
3. **Check Logs**: `pnpm dev` output for error messages
4. **Database UI**: Run `npx prisma studio` for database inspection
5. **Community**: Next.js Discord, Reddit communities

---

## 🎯 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Module not found" | Run `pnpm install` |
| "Port 3000 in use" | Run on different port: `pnpm dev -- -p 3001` |
| "Database connection error" | Check DATABASE_URL in `.env.local` |
| "Prisma Client error" | Run `npx prisma generate` |
| "Build fails" | Delete `.next`, run `pnpm dev` |
| "Types not working" | Run `pnpm type-check` |

---

**Last Updated**: December 31, 2025
**Status**: ✅ Ready for Development
