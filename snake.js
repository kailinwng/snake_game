// Constants
const GRID_SIZE = 20;
const CANVAS_SIZE = 400;
const INITIAL_SNAKE_LENGTH = 3;
const MOVE_INTERVAL = 100; // in milliseconds
const DIRECTION = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

// Variables
let canvas;
let ctx;
let snake;
let food;
let direction;
let score;
let gameLoop;

// Initialize the game
function init() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    direction = DIRECTION.RIGHT;
    score = 0;
    snake = [{ x: 7, y: 7 }]; // Initial snake position
    food = generateFoodPosition();
    clearInterval(gameLoop);
    gameLoop = setInterval(updateGame, MOVE_INTERVAL);
    document.addEventListener("keydown", changeDirection);
}

// Main game loop
function updateGame() {
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameLoop);
        alert("Game Over! Your score: " + score);
        init();
        return;
    }
    if (snake[0].x === food.x && snake[0].y === food.y) {
        eatFood();
    }
    drawGame();
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
    } else {
        snake.pop();
    }
}

// Check for collision with walls or itself
function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= GRID_SIZE || snake[0].y < 0 || snake[0].y >= GRID_SIZE) {
        return true; // Hit wall
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true; // Hit itself
        }
    }
    return false;
}

// Draw the game on canvas
function drawGame() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw snake
    ctx.fillStyle = "#008000"; // Green color
    snake.forEach(segment => {
        ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });

    // Draw food
    ctx.fillStyle = "#ff0000"; // Red color
    ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);

    // Display score
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Generate random position for food
function generateFoodPosition() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
    };
}

// Handle keyboard input to change snake direction
function changeDirection(event) {
    switch (event.key) {
        case "ArrowUp":
            if (direction !== DIRECTION.DOWN) {
                direction = DIRECTION.UP;
            }
            break;
        case "ArrowDown":
            if (direction !== DIRECTION.UP) {
                direction = DIRECTION.DOWN;
            }
            break;
        case "ArrowLeft":
            if (direction !== DIRECTION.RIGHT) {
                direction = DIRECTION.LEFT;
            }
            break;
        case "ArrowRight":
            if (direction !== DIRECTION.LEFT) {
                direction = DIRECTION.RIGHT;
            }
            break;
    }
}

// Handle snake eating food
function eatFood() {
    food = generateFoodPosition();
}

// Start the game
init();
