@echo off
echo Starting development servers...
echo.
cd apps\web
start "Next.js Web Server" cmd /k "pnpm dev"
timeout /t 3 /nobreak >nul
cd ..\api
start "API Server" cmd /k "pnpm dev"
echo.
echo Servers are starting in separate windows.
echo Web server: http://localhost:3000
echo API server: http://localhost:8080
echo.
pause

