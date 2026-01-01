#!/bin/bash
# Auriona Quick Start Script

set -e

echo "🚀 Auriona - AI Mental Health Companion"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"
echo "✓ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo ""
echo "✅ Dependencies installed!"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local..."
    cat > .env.local << 'EOF'
DATABASE_URL="postgresql://postgres:password@localhost:5432/auriona?schema=public"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_APP_NAME="Auriona"
EOF
    echo "✓ .env.local created"
else
    echo "✓ .env.local already exists"
fi

echo ""
echo "📝 Next steps:"
echo "1. Update .env.local with your database configuration"
echo "2. Run: npx prisma db push"
echo "3. Run: npm run dev"
echo "4. Open http://localhost:3000"
echo ""
echo "For detailed setup instructions, see SETUP.md and BACKEND_SETUP.md"
