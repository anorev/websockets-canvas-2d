console.log("OK");

/**
 * Classes
 */

class Player {
    x; 
    y; 
    color;
    size = 20; 
    speed = 5; 
    zoneCreated = false;
    zone;

    constructor(x, y, color) {
        this.x = x; 
        this.y = y; 
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fillStyle = this.color;
        ctx.fill();
        this.createZone();
    }

    move() {
        if (keyboard[37]) this.x -= this.speed; // left
        if (keyboard[38]) this.y -= this.speed; // up
        if (keyboard[39]) this.x += this.speed; // right
        if (keyboard[40]) this.y += this.speed; // left
    }

    createZone() {
        if (keyboard[32] && this.zoneCreated === false) {
            this.zone = new Zone({x: this.x, y: this.y}, this.color);
            this.zoneCreated = true;
            console.log(this.zone)
        }

        if (this.createdZone == true) {
            this.zone.draw();
        }
    }
}


class Zone {
    hp = 10; 
    start; 
    size = 10; 
    growthRate = 1; 
    color;

    constructor(start, color) {
        this.start = start;
        this.color = color; 
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.start.x, this.start.y, this.size, 0, 2 * Math.PI);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

/**
 * Global variables
 */

const canvas = document.querySelector('.main-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * window.devicePixelRatio
canvas.height = window.innerHeight * window.devicePixelRatio
canvas.style.maxWidth = window.innerWidth
canvas.style.maxHeight = window.innerHeight

let players = [];
let player1 = new Player(canvas.width / 2, canvas.height / 2, 'blue');
const keyboard = {};

/**
 * Keyboard utilities
 */

window.onkeydown = function(e) {
    keyboard[e.keyCode] = true;
}

window.onkeyup = function(e) {
    delete keyboard[e.keyCode];
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player1.draw();
    player1.move();
    requestAnimationFrame(update);
}


console.log(player1.zone)
requestAnimationFrame(update);