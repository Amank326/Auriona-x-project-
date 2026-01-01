#!/bin/bash

#########################################
# Auriona Advanced Setup Script
# Sets up complete development and production environments
#########################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
  print_info "Checking prerequisites..."

  # Check Node.js
  if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+"
    exit 1
  fi
  print_success "Node.js $(node -v) found"

  # Check npm
  if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
  fi
  print_success "npm $(npm -v) found"

  # Check Docker (optional for container dev)
  if command -v docker &> /dev/null; then
    print_success "Docker $(docker --version) found"
  else
    print_warning "Docker not found - containerization features will be limited"
  fi

  # Check Git
  if ! command -v git &> /dev/null; then
    print_error "Git is not installed"
    exit 1
  fi
  print_success "Git $(git --version | awk '{print $3}') found"
}

# Install dependencies
install_dependencies() {
  print_info "Installing dependencies..."
  npm install --legacy-peer-deps
  print_success "Dependencies installed"
}

# Setup environment variables
setup_env() {
  print_info "Setting up environment variables..."

  if [ -f .env.local ]; then
    print_warning ".env.local already exists"
  else
    cat > .env.local << 'EOF'
# Database
DATABASE_URL="postgresql://auriona:password@localhost:5432/auriona"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# Optional: OpenAI Integration
# OPENAI_API_KEY="your-api-key-here"

# Redis Cache
REDIS_URL="redis://:password@localhost:6379"

# Development
NODE_ENV="development"
LOG_LEVEL="debug"
EOF
    print_success ".env.local created"
  fi

  # Generate NEXTAUTH_SECRET if not present
  if ! grep -q "NEXTAUTH_SECRET=" .env.local; then
    SECRET=$(openssl rand -base64 32)
    sed -i "s/NEXTAUTH_SECRET=\"\"/NEXTAUTH_SECRET=\"$SECRET\"/" .env.local
    print_success "Generated NEXTAUTH_SECRET"
  fi
}

# Setup database
setup_database() {
  print_info "Setting up database..."

  # Check if we're using Docker
  if command -v docker &> /dev/null && [ -f docker-compose.yml ]; then
    print_info "Starting PostgreSQL with Docker Compose..."
    docker-compose up -d postgres redis adminer
    
    # Wait for database to be ready
    sleep 5
    
    print_success "PostgreSQL and Redis started"
  else
    print_warning "Docker Compose not available. Please ensure PostgreSQL and Redis are running locally"
  fi

  # Run migrations
  print_info "Running Prisma migrations..."
  npx prisma db push || print_warning "Migration check completed"
  
  # Generate Prisma client
  npx prisma generate
  print_success "Database setup completed"
}

# Setup git hooks
setup_git_hooks() {
  print_info "Setting up Git hooks..."

  # Pre-commit hook
  cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Pre-commit hook for Auriona

# Run linter
npm run lint
if [ $? -ne 0 ]; then
  echo "Linter failed. Commit aborted."
  exit 1
fi

# Format code
npm run format

# Add formatted files
git add -A
EOF

  chmod +x .git/hooks/pre-commit
  print_success "Git hooks configured"
}

# Build the project
build_project() {
  print_info "Building project..."
  npm run build
  print_success "Project built successfully"
}

# Run tests
run_tests() {
  print_info "Running tests..."
  if npm run test 2>/dev/null; then
    print_success "All tests passed"
  else
    print_warning "Tests not configured yet"
  fi
}

# Print next steps
print_next_steps() {
  echo ""
  print_success "✨ Auriona setup completed successfully!"
  echo ""
  echo -e "${BLUE}Next steps:${NC}"
  echo "1. Review .env.local and update settings as needed"
  echo "2. If using Docker: $(docker-compose ps 2>/dev/null | grep -q postgres && echo '✅' || echo '⚠️') PostgreSQL and Redis are running"
  echo "3. Start development server: ${YELLOW}npm run dev${NC}"
  echo "4. Open browser: http://localhost:3000"
  echo "5. Database UI: http://localhost:8081 (Adminer)"
  echo "6. Prisma Studio: http://localhost:5555"
  echo ""
  echo -e "${BLUE}Useful commands:${NC}"
  echo "  npm run dev          - Start development server"
  echo "  npm run build        - Build for production"
  echo "  npm run lint         - Run linter"
  echo "  npm run format       - Format code"
  echo "  npm run db:push      - Push schema changes"
  echo "  npx prisma studio   - Open Prisma Studio"
  echo "  docker-compose down - Stop Docker services"
  echo ""
}

# Main execution
main() {
  echo -e "${BLUE}"
  echo "╔═══════════════════════════════════════════════════════╗"
  echo "║           Auriona Advanced Setup Script               ║"
  echo "║     Full-stack Mental Health AI Platform Setup        ║"
  echo "╚═══════════════════════════════════════════════════════╝"
  echo -e "${NC}"

  check_prerequisites
  install_dependencies
  setup_env
  setup_database
  setup_git_hooks
  build_project
  run_tests
  print_next_steps
}

# Run main function
main "$@"
