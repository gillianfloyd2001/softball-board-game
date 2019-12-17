// these values can be changed through before the game //
const HEIGHT = 6;
const WIDTH = 6;
var SCORE = 0;
// making the the board//
var BOARD = [];
for (let x = 0; x < HEIGHT; x++) {
    let row = [];
    for (let y = 0; y < WIDTH; y++) {
        row.push({
            "girl": false,
            "ball": false
        });
    }
    BOARD.push(row.slice());
}
function drawingBoardGame() {
    let html = '';
    for (let x = 0; x < BOARD.length; x++) {
        html += "<div class='row'>";
        for (let y = 0; y < BOARD[x].length; y++) {
            let className = "light";
            if ((x + y) % 2) {
                className = "dark";
            }
            html += `<div class="square ${className}">`;
            if (BOARD[x][y].girl) {
                html += '<img class="game-piece" src="./images/girl.jpg">';
            } else if (BOARD[x][y].ball) {
                html += '<img class="game-piece" src="./images/ball.jpeg">'
            };
            html += '</div>';
        };
        html += '</div>';
    };
    document.getElementById('container').innerHTML = html;
    document.getElementById('score').innerText = SCORE;
}
document.addEventListener("DOMContentLoaded", function () {
    let randX = Math.floor(Math.random() * BOARD.length);
    let randY = Math.floor(Math.random() * BOARD[0].length);
    BOARD[randX][randY].girl = true;
    let ballX = randX;
    let ballY = randY;
    while (ballX == randX && ballY == randY) {
        ballX = Math.floor(Math.random() * BOARD.length);
        ballY = Math.floor(Math.random() * BOARD[0].length);
    }
    BOARD[ballX][ballY].ball = true;
    drawingBoardGame();
});

function getCurrentPosition(key) {
    for (let x = 0; x < BOARD.length; x++) {
        for (let y = 0; y < BOARD[x].length; y++) {
            if (BOARD[x][y][key]) {
                return { 'x': x, 'y': y }
            };
        };
    };
    return "hey gillian"
};

function movePlayer(event) {
    let key = event.key;
    let moves = {
        'ArrowUp': { "x": -1, "y": 0 },
        'ArrowDown': { "x": 1, "y": 0 },
        'ArrowRight': { "x": 0, "y": 1 },
        'ArrowLeft': { "x": 0, "y": -1 }
    }
    if (key in moves) {
        let move = moves[key];
        let pos = getCurrentPosition("girl");
        var newX = Math.max(0, Math.min(pos.x + move.x, BOARD.length - 1));
        let newY = Math.max(0, Math.min(pos.y + move.y, BOARD[newX].length - 1));
        BOARD[pos.x][pos.y].girl = false;
        BOARD[newX][newY].girl = true;
        let ballPosition = getCurrentPosition("ball");
        if (ballPosition.x == newX && ballPosition.y == newY) {
            SCORE++;
            let ballX = newX;
            let ballY = newY;
            while (ballX == newX && ballY == newY) {
                ballX = Math.floor(Math.random() * BOARD.length);
                ballY = Math.floor(Math.random() * BOARD[0].length);
            }
            BOARD[ballPosition.x][ballPosition.y].ball = false;
            BOARD[ballX][ballY].ball = true;
        }
        drawingBoardGame();
    }
}

document.addEventListener('keydown', movePlayer);
