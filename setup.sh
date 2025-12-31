#!/bin/bash
# Setup script for Auriona development environment

echo "🚀 Setting up Auriona development environment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual database credentials and secrets!"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npx prisma generate

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your database URL and NextAuth secret"
echo "2. Run 'npm run db:push' to sync the database schema"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "For production:"
echo "1. Ensure DATABASE_URL and NEXTAUTH_SECRET are set in environment"
echo "2. Run 'npm run build' to build the application"
echo "3. Run 'npm start' to start the production server"
