# Flappy Bird Game

A classic Flappy Bird game built with HTML5 Canvas and vanilla JavaScript.

## Features

- Smooth animations and physics
- Score tracking with local storage for best score
- Sound effects
- Responsive controls (click or spacebar)
- Collision detection
- Endless gameplay

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and visit `http://localhost:3000`

## Deployment on Render.com

1. Push this repository to GitHub

2. Go to [Render.com](https://render.com) and sign in

3. Click "New +" and select "Web Service"

4. Connect your GitHub repository

5. Configure the service:
   - **Name**: flappy-bird-game (or your preferred name)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

6. Click "Create Web Service"

Your game will be live in a few minutes!

## How to Play

- Click or press SPACE to make the bird flap
- Avoid the pipes
- Try to get the highest score possible

## Controls

- **Mouse Click**: Flap
- **Spacebar**: Flap
- **Click after Game Over**: Restart

## Assets

Game uses custom sprite assets for:
- Bird animations (3 frames)
- Background
- Pipes
- Ground
- UI elements
- Sound effects

Enjoy playing!
