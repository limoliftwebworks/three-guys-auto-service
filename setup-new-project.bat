@echo off
echo.
echo ================================================
echo    🚀 PROJECT SETUP AUTOMATION (Windows)
echo ================================================
echo.
echo This will run the project setup automation script.
echo Make sure you have Git Bash installed!
echo.
pause
echo.

REM Check if Git Bash is available
where bash >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ ERROR: Git Bash not found!
    echo Please install Git for Windows first: https://git-scm.com/
    pause
    exit /b 1
)

REM Run the bash script
bash setup-new-project.sh

echo.
echo Script completed. Press any key to close...
pause >nul 