let score = 0;
let myXPos = 100;
let myYPos = 100;
let shipPNG;
let meatPng;

let asteroidImage;
let asteroids = [];

const GameState = {
    HomeScreen: 0,
    GameScreen: 1
}
let currentState = GameState.HomeScreen;

function preload() {
    shipPNG = loadImage("images/ship.png")
    meatPng = loadImage("images/astroid.jpg")
}

function setup() {
    createCanvas(700, 500)
    background(0);
    imageMode(CENTER)
}

function draw() {
    background(0);

    if (currentState == GameState.HomeScreen) {
        drawHomeScreen();
    } else if (currentState == GameState.GameScreen) {
        drawGameScreen();
    }
}

function drawHomeScreen() {
    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("Dodge the Asteroid Rain", width / 2, height / 3);

    fill(0, 255, 0);
    rect(width / 2 - 75, height / 2, 150, 50);
    fill(0);
    textSize(24);
    text("Play Now", width / 4, height / 4);

    if (
        mouseX > width / 2 - 75 &&
        mouseX < width / 2 + 75 &&
        mouseY > height / 2 &&
        mouseY < height / 2 + 50
    ) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }
}

function drawGameScreen() {
    fill(255, 0, 0);
    rect(myXPos, myYPos, 50, 50); //for the square (player) <-- we should make that a square instead (did)
    
    image(meatPng, 50, 250) // <-- that's our astroid. 
   
    shipPNG.resize(50, 50)
    image(shipPNG, myXPos, myYPos)

    if (random(1) < 0.05) {
        let asteroid = {
            x : random(width),
            y : -50,
            speed : random(1, 3),
            size: random(20, 50)
        }
        asteroids.push(asteroid)
    }

    for (let i = asteroids.length - 1; i >= 0; i--){
        let asteroid = asteroids[i];
        asteroid.y += asteroid.speed;
        
        image(meatPng, asteroid.x, asteroid.size, asteroid.size)
        
        if (asteroid.x + asteroid.size / 2 > myXPos - 25 && asteroid.x - asteroid.size / 2 < myXPos + 25 && asteroid.y + asteroid.size / 2 > myYPos - 25 && asteroid.y - asteroid.size / 2 < myYPos + 25)
        asteroids.splice(i, 1);
        score += 1
    }

    if (keyIsDown(LEFT_ARROW)) {
        myXPos -= 2;
    }

    if (keyIsDown(RIGHT_ARROW)) {
        myXPos += 2;
    }

    if (keyIsDown(UP_ARROW)) {
        myYPos -= 2;
    }

    if (keyIsDown(DOWN_ARROW)) {
        myYPos += 2;
    }

    fill(255);
    textSize(30);
    text("Score: " + score, 20, 30);
}

function mousePressed() {
    if (currentState == GameState.HomeScreen) {
        if (
            mouseX > width / 2 - 75 &&
            mouseX < width / 2 + 75 &&
            mouseY > height / 2 &&
            mouseY < height / 2 + 50
        ) {
            currentState = GameState.GameScreen;
        }
    }
}
