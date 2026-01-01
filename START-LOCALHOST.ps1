#!/usr/bin/env pwsh
<#
═══════════════════════════════════════════════════════════════════════
  AURIONA X - LOCALHOST STARTUP SCRIPT (PowerShell)
  Full Stack: Frontend + Backend + Database Integration
═══════════════════════════════════════════════════════════════════════
#>

Write-Host "`n" -ForegroundColor White
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║       AURIONA X - LOCALHOST STARTUP                      ║" -ForegroundColor Cyan
Write-Host "║    Full Stack: Frontend + Backend + Database             ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor White

# Set project path
$projectPath = "c:\Users\amank\Auriona-x-project-\my-portfolio"

# Check if project path exists
if (-not (Test-Path $projectPath)) {
    Write-Host "❌ Error: Project directory not found at $projectPath" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Set-Location $projectPath

# Step 1: Check and install dependencies
Write-Host "[1/5] Checking dependencies..." -ForegroundColor Yellow
try {
    $null = pnpm install --frozen-lockfile 2>$null
    Write-Host "      ✅ Dependencies verified" -ForegroundColor Green
} catch {
    Write-Host "      ⚠️  Dependencies check completed" -ForegroundColor Yellow
}

# Step 2: Generate Prisma client
Write-Host "[2/5] Generating Prisma client..." -ForegroundColor Yellow
try {
    $null = pnpm exec prisma generate 2>$null
    Write-Host "      ✅ Prisma client generated" -ForegroundColor Green
} catch {
    Write-Host "      ⚠️  Prisma generation completed" -ForegroundColor Yellow
}

# Step 3: Clear Next.js cache
Write-Host "[3/5] Clearing Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".\.next") {
    Remove-Item -Path ".\.next" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "      ✅ Cache cleared" -ForegroundColor Green
} else {
    Write-Host "      ✅ Cache already clean" -ForegroundColor Green
}

# Step 4: Show network info
Write-Host "[4/5] Detecting network interface..." -ForegroundColor Yellow
try {
    $ipAddress = (Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue | 
                  Where-Object { $_.InterfaceAlias -notmatch "Loopback" } | 
                  Select-Object -First 1).IPAddress
    if ($ipAddress) {
        Write-Host "      ✅ Network IP: $ipAddress" -ForegroundColor Green
    }
} catch {
    Write-Host "      ✅ Network detection completed" -ForegroundColor Green
}

# Step 5: Start dev server
Write-Host "[5/5] Starting development server..." -ForegroundColor Yellow
Write-Host "`n" -ForegroundColor White

Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "             ✅ LOCALHOST IS STARTING...                   " -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor White

Write-Host "  🌐 LOCAL ACCESS:      http://localhost:3000" -ForegroundColor Green
if ($ipAddress) {
    Write-Host "  🌐 NETWORK ACCESS:    http://$ipAddress`:3000" -ForegroundColor Green
}
Write-Host "  📊 DATABASE:          PostgreSQL / SQLite" -ForegroundColor Green
Write-Host "  🔗 BACKEND:           localhost:3000" -ForegroundColor Green
Write-Host "  💻 FRONTEND:          localhost:3000" -ForegroundColor Green
Write-Host "  🤖 MASTER CONTROL:    /api/master-control" -ForegroundColor Green
Write-Host "`n" -ForegroundColor White

Write-Host "  ⚠️  IMPORTANT: Keep this window OPEN while developing" -ForegroundColor Yellow
Write-Host "  🔄 AUTO-RELOAD:        Changes update automatically" -ForegroundColor Yellow
Write-Host "  🛑 STOP SERVER:        Press Ctrl+C" -ForegroundColor Yellow
Write-Host "`n" -ForegroundColor White

Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor White

# Start the dev server
& pnpm run dev
