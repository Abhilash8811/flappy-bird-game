@echo off
echo ========================================
echo   Flappy Bird - GitHub Push Helper
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b
)

echo Git is installed! ✓
echo.

REM Check if this is a git repository
if not exist .git (
    echo This is not a git repository yet.
    echo Initializing git repository...
    git init
    echo ✓ Git repository initialized!
    echo.
)

echo Adding all files...
git add .
echo ✓ Files added!
echo.

REM Get commit message from user
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update Flappy Bird game

echo Committing changes...
git commit -m "%commit_msg%"
echo ✓ Changes committed!
echo.

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo.
    echo ========================================
    echo   FIRST TIME SETUP
    echo ========================================
    echo.
    echo You need to connect to your GitHub repository.
    echo.
    echo Steps:
    echo 1. Go to your GitHub repository page
    echo 2. Click the green "Code" button
    echo 3. Copy the HTTPS URL
    echo 4. Paste it below
    echo.
    echo Example: https://github.com/username/flappy-bird-game.git
    echo.
    set /p repo_url="Paste your GitHub repository URL: "
    
    if "%repo_url%"=="" (
        echo ERROR: No URL provided!
        pause
        exit /b
    )
    
    git remote add origin %repo_url%
    git branch -M main
    echo ✓ Connected to GitHub repository!
    echo.
)

echo Pushing to GitHub...
echo.
echo NOTE: You'll need to enter your GitHub credentials:
echo - Username: Your GitHub username
echo - Password: Your Personal Access Token (NOT your password!)
echo.
echo Don't have a token? Create one at:
echo https://github.com/settings/tokens
echo.

git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo   PUSH FAILED
    echo ========================================
    echo.
    echo Common solutions:
    echo 1. Make sure you used a Personal Access Token, not your password
    echo 2. Check your internet connection
    echo 3. Verify the repository URL is correct
    echo.
    echo Need help? Check push-to-github.md for detailed instructions.
    echo.
) else (
    echo.
    echo ========================================
    echo   SUCCESS! 🎉
    echo ========================================
    echo.
    echo Your game has been pushed to GitHub!
    echo Go to your repository page to see it.
    echo.
)

pause
