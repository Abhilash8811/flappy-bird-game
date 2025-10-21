# Complete Beginner's Guide to Deploy Flappy Bird

## 📋 What You Need

Before starting, make sure you have:
1. A computer with internet connection
2. Your game files (you already have these!)
3. That's it! We'll install everything else together.

---

## 🚀 PART 1: Test the Game Locally (On Your Computer)

### Step 1: Install Node.js

Node.js lets you run the game server on your computer.

1. Go to: https://nodejs.org/
2. Download the **LTS version** (the green button that says "Recommended for Most Users")
3. Run the installer
4. Click "Next" through all the steps (keep default settings)
5. Click "Finish"

**How to check if it worked:**
- Open Command Prompt (search "cmd" in Windows start menu)
- Type: `node --version`
- Press Enter
- You should see something like `v18.17.0` or similar

### Step 2: Install Game Dependencies

1. Open Command Prompt
2. Navigate to your game folder:
   ```
   cd path\to\your\game\folder
   ```
   **Example:** If your game is in `C:\Users\YourName\Desktop\flappy-bird`, type:
   ```
   cd C:\Users\YourName\Desktop\flappy-bird
   ```

3. Install the required packages:
   ```
   npm install
   ```
   Wait for it to finish (you'll see a progress bar)

### Step 3: Run the Game

1. In the same Command Prompt window, type:
   ```
   npm start
   ```

2. You should see:
   ```
   Flappy Bird game running on port 3000
   Visit http://localhost:3000 to play
   ```

3. Open your web browser (Chrome, Firefox, Edge, etc.)

4. Go to: `http://localhost:3000`

5. **Play your game!** 🎮
   - Click or press SPACE to flap
   - Avoid the pipes

6. To stop the server:
   - Go back to Command Prompt
   - Press `Ctrl + C`
   - Type `Y` and press Enter

---

## 🌐 PART 2: Put Your Game on GitHub

GitHub is like Google Drive for code. It stores your game files online.

### Step 1: Install Git

1. Go to: https://git-scm.com/download/win
2. Download will start automatically
3. Run the installer
4. Click "Next" through all steps (keep defaults)
5. Click "Finish"

**Check if it worked:**
- Open a NEW Command Prompt window
- Type: `git --version`
- You should see something like `git version 2.40.0`

### Step 2: Create a GitHub Account

1. Go to: https://github.com
2. Click "Sign up"
3. Enter your email, create a password, choose a username
4. Verify your email
5. Choose the free plan

### Step 3: Create a New Repository

1. Log into GitHub
2. Click the **"+"** button (top right corner)
3. Click **"New repository"**
4. Fill in:
   - **Repository name:** `flappy-bird-game` (or any name you like)
   - **Description:** "My Flappy Bird game"
   - Keep it **Public**
   - **DO NOT** check "Add a README file"
5. Click **"Create repository"**

### Step 4: Upload Your Game to GitHub

1. Open Command Prompt
2. Navigate to your game folder:
   ```
   cd C:\Users\YourName\Desktop\flappy-bird
   ```

3. Run these commands ONE BY ONE (press Enter after each):

   ```
   git init
   ```
   (This starts tracking your files)

   ```
   git add .
   ```
   (This prepares all files to upload)

   ```
   git commit -m "Initial commit - Flappy Bird game"
   ```
   (This saves a snapshot of your files)

   ```
   git branch -M main
   ```
   (This names your main branch)

4. Now connect to YOUR GitHub repository:
   - Go back to your GitHub repository page
   - You'll see a section that says "…or push an existing repository from the command line"
   - Copy the commands that look like:
     ```
     git remote add origin https://github.com/YOUR-USERNAME/flappy-bird-game.git
     git push -u origin main
     ```
   - Paste them into Command Prompt and press Enter

5. **First time?** Git will ask for your GitHub username and password:
   - Username: Your GitHub username
   - Password: You need a **Personal Access Token** (not your regular password)
   
   **To create a token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name like "Flappy Bird Deploy"
   - Check the "repo" checkbox
   - Click "Generate token" at the bottom
   - **COPY THE TOKEN** (you won't see it again!)
   - Paste it as your password in Command Prompt

6. Wait for upload to complete. You should see:
   ```
   Enumerating objects: done.
   Writing objects: 100% done.
   ```

7. **Refresh your GitHub repository page** - you should see all your files!

---

## 🚢 PART 3: Deploy to Render.com (Make it Live!)

Render.com will host your game so anyone can play it online.

### Step 1: Create a Render Account

1. Go to: https://render.com
2. Click **"Get Started"**
3. Sign up with your **GitHub account** (easiest way)
4. Authorize Render to access your GitHub

### Step 2: Deploy Your Game

1. On Render dashboard, click **"New +"** (top right)
2. Select **"Web Service"**
3. Click **"Connect account"** if needed to link GitHub
4. Find your `flappy-bird-game` repository
5. Click **"Connect"**

6. Fill in the settings:
   - **Name:** `flappy-bird-game` (or anything you want)
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** Leave blank
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Select **"Free"**

7. Click **"Create Web Service"**

8. Wait 2-5 minutes while Render builds your game
   - You'll see logs scrolling
   - Wait for "Your service is live 🎉"

9. **Your game is now online!**
   - You'll see a URL like: `https://flappy-bird-game-xxxx.onrender.com`
   - Click it to play
   - Share it with friends!

---

## 🎉 You're Done!

Your game is now live on the internet! Anyone can play it by visiting your Render URL.

### What You Accomplished:
✅ Tested the game locally  
✅ Created a GitHub account  
✅ Uploaded your code to GitHub  
✅ Deployed your game to the internet  
✅ Became a game developer!  

---

## 🆘 Troubleshooting

### "npm is not recognized"
- Node.js didn't install correctly
- Close and reopen Command Prompt
- Try installing Node.js again

### "git is not recognized"
- Git didn't install correctly
- Close and reopen Command Prompt
- Try installing Git again

### Game doesn't load on Render
- Check the logs on Render dashboard
- Make sure all files uploaded to GitHub
- Verify the Start Command is `npm start`

### Need help?
- Check the Render logs for error messages
- Make sure your GitHub repository has all the files
- Try running `npm install` and `npm start` locally first

---

## 📝 Making Changes Later

If you want to update your game:

1. Make changes to your files
2. Open Command Prompt in your game folder
3. Run:
   ```
   git add .
   git commit -m "Updated game"
   git push
   ```
4. Render will automatically redeploy your game!

---

**Congratulations! You're now a published game developer! 🎮🚀**
