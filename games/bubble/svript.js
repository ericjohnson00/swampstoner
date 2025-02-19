// Game Objects
let player = document.getElementById("player");
let bubblesContainer = document.getElementById("bubbles");
let scoreDisplay = document.getElementById("score-value");
let score = 0;

// Player Mechanics
let playerPosition = { x: 400, y: 500 };
let playerSpeed = 5;
let bullets = [];

// Bubble Mechanics
let bubbles = [];

// Game State
let gameLoop;

function movePlayer(event) {
  switch (event.key) {
    case "ArrowLeft":
      playerPosition.x -= playerSpeed;
      break;
    case "ArrowRight":
      playerPosition.x += playerSpeed;
      break;
    case "ArrowUp":
      // Jump would go here if implemented
      break;
    case " ":
      shootBullet();
      break;
  }
  player.style.left = playerPosition.x + "px";
}

function shootBullet() {
  let bullet = document.createElement("div");
  bullet.className = "bullet";
  bullet.style.left = playerPosition.x + 15 + "px"; // Center the bullet on player
  bullet.style.bottom = "55px"; // Just above the player
  bullets.push(bullet);
  document.getElementById("game-area").appendChild(bullet);

  setTimeout(() => {
    bullet.remove();
    bullets.splice(bullets.indexOf(bullet), 1);
  }, 1000); // Bullet disappears after 1 second
}

function createBubble() {
  let bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.left = Math.random() * 750 + "px";
  bubblesContainer.appendChild(bubble);
  bubbles.push(bubble);
}

function updateBubbles() {
  bubbles.forEach((bubble) => {
    let currentBottom = parseFloat(bubble.style.bottom) || 0;
    bubble.style.bottom = currentBottom + Math.random() * 2 - 1 + "px"; // Simple bounce effect

    bullets.forEach((bullet) => {
      // Check if bullet hits bubble
      if (collision(bullet, bubble)) {
        bubble.remove();
        bubbles.splice(bubbles.indexOf(bubble), 1);
        bullet.remove();
        bullets.splice(bullets.indexOf(bullet), 1);
        score++;
        scoreDisplay.textContent = score;
      }
    });
  });
}

function collision(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    aRect.right < bRect.left ||
    aRect.left > bRect.right ||
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom
  );
}

function game() {
  updateBubbles();
  if (Math.random() < 0.01) createBubble(); // 1% chance to spawn a new bubble each frame
  gameLoop = requestAnimationFrame(game);
}

// Event Listeners
document.addEventListener("keydown", movePlayer);

// Start the game
game();
