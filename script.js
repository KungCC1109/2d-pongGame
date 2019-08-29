// Disables checking (for VS Code)
// @ts-nocheck

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 5;
var dy = -5;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var score = 0;
var lives = 3;
var time = 0;
var audio = new Audio("bounce.wav");

document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawTime() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Time: " + time, 100, 20);
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// reload webpage (NOT FUNCTIONAL)
// function restart() {
//   document.location.reload();
//   clearInterval(interval); // Needed for Chrome to end game
// }

function run() {
  flag = true;
}

function collisionDetection() {
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    audio.play();
  }

  if (y + dy < ballRadius) {
    dy = -dy;
    audio.play();
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      audio.play();
      score++;
    } else {
      lives--;
      if (lives == 0) {
        //here~here~
        alert("GAME OVER");
        var name = prompt("Please enter your name ", "name");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
        restart();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 5;
        dy = -5;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  drawTime();
  collisionDetection();

  x += dx;
  y += dy;
}

// Main function, with interval of 20 miliseconds
// Runs when user clicks on it
function run() {
  var interval = setInterval(draw, 20);
}

// Timer +1 seconds
var timer = setInterval(function() {
  time++;
}, 1000);
