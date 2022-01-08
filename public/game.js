const socket = io();

// const player = {
//     x: 0,
//     y: 0, 
//     size: 20, 
//     speed: 5
// }; 

let players = [];

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const keyboard = {};

window.onkeydown = function(e) {
    keyboard[e.keyCode] = true;
}

window.onkeyup = function(e) {
    delete keyboard[e.keyCode];
}

function movePlayer() {
    if (keyboard[37]) socket.emit('move left');
    if (keyboard[38]) socket.emit('move up');
    if (keyboard[39]) socket.emit('move right');
    if (keyboard[40]) socket.emit('move down');
}

function drawPlayers() {
    players.forEach(function({x, y, size, c}) {
        ctx.beginPath();
        ctx.rect(x, y, size, size);
        ctx.fillStyle = c;
        ctx.fill();
    });
    // const {x, y, size} = player; 
    // ctx.beginPath(); 
    // ctx.rect(x, y, size, size); 
    // ctx.fill(); 
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePlayer();
    drawPlayers();
    requestAnimationFrame(update);
}

requestAnimationFrame(update);

socket.on('players list', function(list) {
    players = list;
  });