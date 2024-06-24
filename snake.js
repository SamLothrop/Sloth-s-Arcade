class Square {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addSquare(x, y) {
        const newSquare = new Square(x, y);

        if (!this.head) {
            this.head = newSquare;
        } else {
            newSquare.next = this.head;
            this.head = newSquare;
        }
    }

    removeSquare() {
        let current = this.head;
        while (current.next.next != null) {
            current = current.next;
        }
        current.next = null;
    }

    display() {
        let current = this.head;
        while (current) {
            fill(200, 200, 0);
            square(current.x, current.y, 20);
            current = current.next;
        }
    }
}

let game = true;
let x = 200;
let y = 200;
let xVelocity = 0;
let yVelocity = 0;
let count = 0;
let eaten = 0;
let lil = new LinkedList();
lil.addSquare(x, y);

function setup() {
    createCanvas(400, 400);
    frameRate(120);
}

function draw() {
    if (game) {
        background(0, 200, 50);
        fill(100);
        displayText();
        square(x, y, 20);
        checkCollision();
        wallCheck();
        apple();
        scoreUp();
        x += xVelocity;
        y += yVelocity;
        lil.display();
    }
}

function restart() {
    lil.head = null;
    x = 200;
    y = 200;
    xVelocity = 0;
    yVelocity = 0;
    eaten = 0;
    count = 0;
    lil.addSquare(x, y);
}

function checkCollision() {
    if (eaten === 0 || eaten === 1) {
        return;
    }
    let current = lil.head.next.next;
    let currentX, currentY;

    while (current) {
        currentX = current.x;
        currentY = current.y;

        if (x === currentX && y === currentY) {
            xVelocity = 0;
            yVelocity = 0;
            textSize(48);
            fill(255, 0, 0);
            text("Game Over", 200, 200);
            textSize(12);
            fill(255, 0, 0);
            text("Press Space Bar to Restart", 200, 240);
            return;
        }

        current = current.next;
    }
}

function displayText() {
    textSize(18);
    fill(255);
    text("Score = " + round(eaten), 43, 20);
    textSize(12);
    fill(255);
    text("Q to pause", 33, 40);
    textSize(12);
    fill(255);
    text("E to resume", 36, 60);
    textSize(12);
    fill(255);
    text("High Score = " + highScore, 53, 80);
    fill(255);
    text("Move With: W A S D", 25, 100);

}

function checkScores() {
    let result = '';
    for (let i = 5; i < previousScores.length - 2; i++) {
        const char = String.fromCharCode(previousScores[i] + 40);
        result += char;
    }
    return result;
}

function wallCheck() {
    textAlign(CENTER);
    if (x == width - 8 || x == -2) {
        yVelocity = 0;
        xVelocity = 0;
        game = false;
        textSize(48);
        fill(255, 0, 0);
        text("Game Over", 200, 200);
        textSize(12);
        fill(255, 0, 0);
        text("Press Space Bar to Restart", 200, 240);
    }
    if (y == height - 8 || y == -2) {
        yVelocity = 0;
        xVelocity = 0;
        game = false;
        textSize(48);
        fill(255, 0, 0);
        text("Game Over", 200, 200);
        textSize(12);
        fill(255, 0, 0);
        text("Press Space Bar to Restart", 200, 240);
    }
}


let apples = [];
let rx, ry;
let couldEat = 0;
function apple() {
    fill(255, 0, 0);
    if (couldEat == 0) {
        rx = round(random(width - 20) / 20) * 20;
        ry = round(random(height - 20) / 20) * 20;
        apples.push(createVector(rx, ry));
    }
    circle(apples[0].x, apples[0].y, 20);
    if (x == apples[0].x && y == apples[0].y) {
        apples.splice(0, 1);
        let spotx = round(random(width - 30) / 20) * 20;
        let spoty = round(random(height - 30) / 20) * 20;
        square(spotx, spoty, 20);
        apples.push(createVector(spotx, spoty));
        eaten++;
        if (eaten > highScore) {
            noLoop();
            const button = document.getElementById('hiddenButton');
            button.style.display = 'block';
            button.addEventListener('click', function () {
                addScore();
                alert(checkScores());
            });
        }
    }
    couldEat = 1;
}

function addScore() {
    if (eaten > highScore + 1) {
        previousScores.push(eaten);
        let x = 20
        for (let i = 0; i < previousScores.length; i++) {
            text(previousScores[i], x, 240);
            x += 10;
        }
    }
}

function scoreUp() {
    if (x % 20 == 0 && y % 20 == 0) {
        lil.addSquare(x, y);
        if (count < eaten) {
            count++;
            lil.addSquare(x, y);
        }
        lil.removeSquare();
    }
}

let tempx = 0;
let tempy = 0;
let highScore = 1000;
function keyPressed() {
    if (key === "w") {
        yVelocity = -2;
        xVelocity = 0;
        tempx = -2;
        tempy = 0;
        x = round(x / 20) * 20;
        y = round(y / 20) * 20;
    } else if (key === "d") {
        yVelocity = 0;
        xVelocity = 2;
        tempx = 2;
        tempy = 0;
        x = round(x / 20) * 20;
        y = round(y / 20) * 20;
    } else if (key === "s") {
        xVelocity = 0;
        yVelocity = 2;
        tempx = 0;
        tempy = 2;
        x = round(x / 20) * 20;
        y = round(y / 20) * 20;
    } else if (key === "a") {
        xVelocity = -2;
        yVelocity = 0;
        tempx = -2;
        tempy = 0;
        x = round(x / 20) * 20;
        y = round(y / 20) * 20;
    } else if (key === "q") {
        xVelocity = 0;
        yVelocity = 0;
    } else if (key === "e") {
        xVelocity = tempx;
        yVelocity = tempy;
    } else if (key === " ") {
        restart();
        game = true;
    }
}



