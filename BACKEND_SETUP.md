# Auriona Backend Setup Guide

## Overview
This guide will help you set up the complete backend infrastructure for the Auriona mental health platform, including database, authentication, and APIs.

## Prerequisites
- Node.js 18+ installed
- PostgreSQL 14+ installed
- npm or pnpm package manager

## Quick Start

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Set Up Database

#### Option A: Local PostgreSQL
1. Install PostgreSQL: https://www.postgresql.org/download/
2. Create a new database:
```sql
CREATE DATABASE auriona;
```

3. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

4. Update DATABASE_URL in `.env`:
```
DATABASE_URL="postgresql://username:password@localhost:5432/auriona?schema=public"
```

#### Option B: Cloud Database (Recommended for Production)
Use a managed PostgreSQL service:
- **Vercel Postgres**: https://vercel.com/storage/postgres
- **Supabase**: https://supabase.com
- **Railway**: https://railway.app
- **Neon**: https://neon.tech

Example for Vercel Postgres:
```
DATABASE_URL="postgres://username:password@host.vercel-postgres.com:5432/database"
```

### 3. Generate NextAuth Secret
```bash
openssl rand -base64 32
```
Add the output to `.env` as `NEXTAUTH_SECRET`

### 4. Run Database Migrations
```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma db push

# (Optional) Seed database with sample data
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```

Server will run at http://localhost:3000

## Database Schema

### Models
- **User**: User accounts and profiles
- **Session**: Authentication sessions
- **Conversation**: Chat conversations with Scarlett AI
- **Message**: Individual chat messages
- **MoodEntry**: Daily mood tracking entries
- **Goal**: Wellness goals and progress
- **Achievement**: Unlocked achievements
- **Resource**: Mental health resources (optional)

### Relationships
```
User (1) ─── (N) Conversation
Conversation (1) ─── (N) Message
User (1) ─── (N) MoodEntry
User (1) ─── (N) Goal
User (1) ─── (N) Achievement
```

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out

### Chat
- `GET /api/chat` - Get all conversations
- `POST /api/chat` - Create new conversation
- `GET /api/chat/[id]/messages` - Get messages
- `POST /api/chat/[id]/messages` - Send message

### Mood Tracking
- `GET /api/mood?days=30` - Get mood entries
- `POST /api/mood` - Create mood entry

### Goals
- `GET /api/goals` - Get all goals
- `POST /api/goals` - Create goal
- `PATCH /api/goals` - Update goal progress
- `DELETE /api/goals?id=xxx` - Delete goal

### Achievements
- `GET /api/achievements` - Get user achievements

## Database Management

### View Database
```bash
npx prisma studio
```
Opens Prisma Studio at http://localhost:5555

### Reset Database
```bash
npx prisma migrate reset
```

### Generate TypeScript Types
```bash
npx prisma generate
```

### Update Schema
1. Edit `prisma/schema.prisma`
2. Run migrations:
```bash
npx prisma db push
# or
npx prisma migrate dev --name your_migration_name
```

## Security Best Practices

1. **Never commit .env files**
2. Use strong passwords for database
3. Keep NEXTAUTH_SECRET secure and random
4. Enable SSL for production database connections
5. Implement rate limiting on API routes
6. Validate all user inputs
7. Use HTTPS in production

## Production Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)
3. Deploy!

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://yourapp.vercel.app"
NEXTAUTH_SECRET="your-production-secret"
```

## Monitoring & Maintenance

### Check Database Status
```bash
npx prisma migrate status
```

### Backup Database
```bash
pg_dump -U username -d auriona > backup.sql
```

### Restore Database
```bash
psql -U username -d auriona < backup.sql
```

## Troubleshooting

### Connection Errors
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Ensure database exists
- Check firewall/network settings

### Migration Errors
```bash
# Reset and recreate
npx prisma migrate reset
npx prisma db push
```

### Type Errors
```bash
# Regenerate Prisma Client
npx prisma generate
```

## Feature Roadmap

### Current Features ✅
- User authentication with NextAuth
- Chat history persistence
- Mood tracking with analytics
- Goal setting and progress tracking
- Achievement system
- Secure API endpoints

### Future Enhancements 🚀
- OpenAI integration for smarter responses
- Real-time WebSocket chat
- Email notifications
- Data export functionality
- Admin dashboard
- Advanced analytics and insights
- Multi-language support
- Voice chat integration

## Support

For issues or questions:
1. Check the documentation above
2. Review Prisma docs: https://www.prisma.io/docs
3. NextAuth docs: https://next-auth.js.org
4. Open an issue on GitHub

## License
See LICENSE file for details.
