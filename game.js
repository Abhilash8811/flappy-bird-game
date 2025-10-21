const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const loadingDiv = document.getElementById('loading');

// Game constants
const CANVAS_WIDTH = 432;
const CANVAS_HEIGHT = 768;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// Game state
const gameState = {
    current: 'loading', // loading, ready, playing, gameover
    score: 0,
    bestScore: localStorage.getItem('bestScore') || 0
};

// Assets to load
const assets = {
    background: null,
    base: null,
    pipe: null,
    bird: [],
    message: null,
    gameover: null,
    numbers: [],
    sounds: {}
};

// Bird object
const bird = {
    x: 100,
    y: 300,
    width: 34,
    height: 24,
    velocity: 0,
    gravity: 0.25,
    jump: -4.6,
    rotation: 0,
    frame: 0,
    animationCounter: 0,
    
    update() {
        if (gameState.current === 'playing') {
            this.velocity += this.gravity;
            this.y += this.velocity;
            
            // Rotation based on velocity
            if (this.velocity >= 0) {
                this.rotation = Math.min(Math.PI / 2, this.velocity * 0.05);
            } else {
                this.rotation = Math.max(-Math.PI / 6, this.velocity * 0.1);
            }
            
            // Check collision with ground
            if (this.y + this.height >= CANVAS_HEIGHT - 112) {
                this.y = CANVAS_HEIGHT - 112 - this.height;
                gameOver();
            }
            
            // Check collision with ceiling
            if (this.y <= 0) {
                this.y = 0;
                this.velocity = 0;
            }
        } else if (gameState.current === 'ready') {
            // Floating animation
            this.y = 300 + Math.sin(Date.now() / 200) * 10;
        }
        
        // Animation
        this.animationCounter++;
        if (this.animationCounter % 5 === 0) {
            this.frame = (this.frame + 1) % 3;
        }
    },
    
    flap() {
        if (gameState.current === 'ready') {
            gameState.current = 'playing';
            gameState.score = 0;
        }
        
        if (gameState.current === 'playing') {
            this.velocity = this.jump;
            playSound('wing');
        }
    },
    
    reset() {
        this.y = 300;
        this.velocity = 0;
        this.rotation = 0;
    },
    
    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(assets.bird[this.frame], -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
};

// Pipes object
const pipes = {
    gap: 150,
    spacing: 200,
    speed: 2,
    list: [],
    
    reset() {
        this.list = [];
        this.list.push({
            x: CANVAS_WIDTH + 100,
            y: this.getRandomY(),
            scored: false
        });
    },
    
    getRandomY() {
        const minY = 100;
        const maxY = CANVAS_HEIGHT - 112 - this.gap - 100;
        return Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    },
    
    update() {
        if (gameState.current !== 'playing') return;
        
        for (let i = this.list.length - 1; i >= 0; i--) {
            const pipe = this.list[i];
            pipe.x -= this.speed;
            
            // Remove off-screen pipes
            if (pipe.x + 52 < 0) {
                this.list.splice(i, 1);
                continue;
            }
            
            // Add new pipe
            if (pipe.x === CANVAS_WIDTH - this.spacing && i === this.list.length - 1) {
                this.list.push({
                    x: CANVAS_WIDTH,
                    y: this.getRandomY(),
                    scored: false
                });
            }
            
            // Check collision
            if (this.checkCollision(pipe)) {
                gameOver();
            }
            
            // Score
            if (!pipe.scored && pipe.x + 52 < bird.x) {
                pipe.scored = true;
                gameState.score++;
                playSound('point');
            }
        }
    },
    
    checkCollision(pipe) {
        if (bird.x + bird.width > pipe.x && bird.x < pipe.x + 52) {
            if (bird.y < pipe.y || bird.y + bird.height > pipe.y + this.gap) {
                return true;
            }
        }
        return false;
    },
    
    draw() {
        this.list.forEach(pipe => {
            // Top pipe
            ctx.save();
            ctx.translate(pipe.x + 26, pipe.y);
            ctx.scale(1, -1);
            ctx.drawImage(assets.pipe, -26, 0, 52, pipe.y);
            ctx.restore();
            
            // Bottom pipe
            ctx.drawImage(assets.pipe, pipe.x, pipe.y + this.gap, 52, CANVAS_HEIGHT - pipe.y - this.gap);
        });
    }
};

// Ground object
const ground = {
    x: 0,
    y: CANVAS_HEIGHT - 112,
    speed: 2,
    
    update() {
        if (gameState.current === 'playing') {
            this.x -= this.speed;
            if (this.x <= -CANVAS_WIDTH) {
                this.x = 0;
            }
        }
    },
    
    draw() {
        ctx.drawImage(assets.base, this.x, this.y, CANVAS_WIDTH, 112);
        ctx.drawImage(assets.base, this.x + CANVAS_WIDTH, this.y, CANVAS_WIDTH, 112);
    }
};

// Load assets
function loadAssets() {
    let loadedCount = 0;
    const totalAssets = 17; // background, base, pipe, 3 birds, message, gameover, 10 numbers
    
    function assetLoaded() {
        loadedCount++;
        loadingDiv.textContent = `Loading... ${Math.floor((loadedCount / totalAssets) * 100)}%`;
        if (loadedCount === totalAssets) {
            loadingDiv.style.display = 'none';
            gameState.current = 'ready';
            pipes.reset();
            gameLoop();
        }
    }
    
    // Load images
    assets.background = new Image();
    assets.background.src = 'Game Objects/background-day.png';
    assets.background.onload = assetLoaded;
    
    assets.base = new Image();
    assets.base.src = 'Game Objects/base.png';
    assets.base.onload = assetLoaded;
    
    assets.pipe = new Image();
    assets.pipe.src = 'Game Objects/pipe-green.png';
    assets.pipe.onload = assetLoaded;
    
    const birdFrames = ['downflap', 'midflap', 'upflap'];
    birdFrames.forEach((frame, index) => {
        const img = new Image();
        img.src = `Game Objects/yellowbird-${frame}.png`;
        img.onload = assetLoaded;
        assets.bird[index] = img;
    });
    
    assets.message = new Image();
    assets.message.src = 'UI/message.png';
    assets.message.onload = assetLoaded;
    
    assets.gameover = new Image();
    assets.gameover.src = 'UI/gameover.png';
    assets.gameover.onload = assetLoaded;
    
    for (let i = 0; i < 10; i++) {
        const img = new Image();
        img.src = `UI/Numbers/${i}.png`;
        img.onload = assetLoaded;
        assets.numbers[i] = img;
    }
    
    // Load sounds
    assets.sounds.wing = new Audio('Sound Efects/wing.wav');
    assets.sounds.point = new Audio('Sound Efects/point.wav');
    assets.sounds.hit = new Audio('Sound Efects/hit.wav');
    assets.sounds.die = new Audio('Sound Efects/die.wav');
}

function playSound(name) {
    if (assets.sounds[name]) {
        assets.sounds[name].currentTime = 0;
        assets.sounds[name].play().catch(() => {});
    }
}

function gameOver() {
    if (gameState.current !== 'playing') return;
    
    gameState.current = 'gameover';
    playSound('hit');
    setTimeout(() => playSound('die'), 100);
    
    if (gameState.score > gameState.bestScore) {
        gameState.bestScore = gameState.score;
        localStorage.setItem('bestScore', gameState.bestScore);
    }
}

function drawScore(score, x, y, scale = 1) {
    const scoreStr = score.toString();
    const digitWidth = 24 * scale;
    const totalWidth = scoreStr.length * digitWidth;
    let startX = x - totalWidth / 2;
    
    for (let i = 0; i < scoreStr.length; i++) {
        const digit = parseInt(scoreStr[i]);
        ctx.drawImage(assets.numbers[digit], startX + i * digitWidth, y, digitWidth, 36 * scale);
    }
}

function draw() {
    // Background
    ctx.drawImage(assets.background, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Pipes
    pipes.draw();
    
    // Ground
    ground.draw();
    
    // Bird
    bird.draw();
    
    // UI
    if (gameState.current === 'ready') {
        ctx.drawImage(assets.message, CANVAS_WIDTH / 2 - 92, 200, 184, 267);
    } else if (gameState.current === 'playing') {
        drawScore(gameState.score, CANVAS_WIDTH / 2, 50, 1.5);
    } else if (gameState.current === 'gameover') {
        ctx.drawImage(assets.gameover, CANVAS_WIDTH / 2 - 96, 150, 192, 42);
        
        // Score panel
        ctx.fillStyle = 'rgba(222, 216, 149, 0.9)';
        ctx.fillRect(CANVAS_WIDTH / 2 - 113, 250, 226, 116);
        ctx.strokeStyle = '#8B6914';
        ctx.lineWidth = 3;
        ctx.strokeRect(CANVAS_WIDTH / 2 - 113, 250, 226, 116);
        
        // Score text
        ctx.fillStyle = '#000';
        ctx.font = 'bold 18px Arial';
        ctx.fillText('Score', CANVAS_WIDTH / 2 - 80, 285);
        ctx.fillText('Best', CANVAS_WIDTH / 2 - 80, 330);
        
        drawScore(gameState.score, CANVAS_WIDTH / 2 + 60, 268, 0.8);
        drawScore(gameState.bestScore, CANVAS_WIDTH / 2 + 60, 313, 0.8);
        
        // Restart hint
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Click to Restart', CANVAS_WIDTH / 2, 420);
        ctx.textAlign = 'left';
    }
}

function update() {
    bird.update();
    pipes.update();
    ground.update();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Input handling
canvas.addEventListener('click', () => {
    if (gameState.current === 'ready' || gameState.current === 'playing') {
        bird.flap();
    } else if (gameState.current === 'gameover') {
        gameState.current = 'ready';
        bird.reset();
        pipes.reset();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (gameState.current === 'ready' || gameState.current === 'playing') {
            bird.flap();
        } else if (gameState.current === 'gameover') {
            gameState.current = 'ready';
            bird.reset();
            pipes.reset();
        }
    }
});

// Start loading
loadAssets();
