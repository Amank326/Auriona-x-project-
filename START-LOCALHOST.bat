@echo off
REM ====================================================================
REM    AURIONA X - LOCALHOST STARTUP SCRIPT
REM    Starts dev server and keeps it running
REM ====================================================================

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║       AURIONA X - LOCALHOST STARTUP                        ║
echo ║    Full Stack: Frontend + Backend + Database              ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Navigate to project directory
cd /d c:\Users\amank\Auriona-x-project-\my-portfolio

if errorlevel 1 (
    echo ❌ Error: Cannot navigate to project directory
    pause
    exit /b 1
)

echo [1/4] Checking dependencies...
call pnpm install --frozen-lockfile >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Some dependencies may need updating
)

echo [2/4] Generating Prisma client...
call pnpm exec prisma generate >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Prisma generation completed with warnings
)

echo [3/4] Clearing Next.js cache...
if exist ".next" rmdir /s /q ".next" >nul 2>&1

echo [4/4] Starting development server...
echo.
echo ════════════════════════════════════════════════════════════
echo             ✅ LOCALHOST IS STARTING...
echo.
echo  🌐 Access at: http://localhost:3000
echo  📊 Database:  PostgreSQL (or SQLite for local dev)
echo  🔗 Backend:   Running on localhost:3000
echo  💻 Frontend:  Running on localhost:3000
echo.
echo  ⚠️  IMPORTANT: Keep this window OPEN
echo  🔄 Auto-reload enabled - changes update automatically
echo  🛑 Close window with Ctrl+C when done
echo.
echo ════════════════════════════════════════════════════════════
echo.

REM Start the dev server
call pnpm run dev

pause
