@echo off
REM Auriona Quick Start Script for Windows
setlocal enabledelayedexpansion

echo.
echo 🚀 Auriona - AI Mental Health Companion
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js 18+
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✓ Node.js found: %NODE_VERSION%
echo ✓ npm found: %NPM_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install --legacy-peer-deps

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed!
echo.

REM Check if .env.local exists
if not exist .env.local (
    echo 📝 Creating .env.local...
    (
        echo # Auriona Environment Configuration
        echo DATABASE_URL=postgresql://postgres:password@localhost:5432/auriona?schema=public
        echo NEXTAUTH_SECRET=your-secret-key-here
        echo NEXTAUTH_URL=http://localhost:3000
        echo NEXT_PUBLIC_API_URL=http://localhost:3000/api
        echo NEXT_PUBLIC_APP_NAME=Auriona
    ) > .env.local
    echo ✓ .env.local created
) else (
    echo ✓ .env.local already exists
)

echo.
echo 📝 Next steps:
echo 1. Update .env.local with your database configuration
echo 2. Run: npx prisma db push
echo 3. Run: npm run dev
echo 4. Open http://localhost:3000
echo.
echo For detailed setup instructions, see SETUP.md and BACKEND_SETUP.md
echo.

pause
