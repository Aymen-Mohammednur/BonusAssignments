let userr = localStorage.getItem('userScore');
let aii = localStorage.getItem('aiScore');
let userScore = userr? userr : 0;
let aiScore = aii? aii : 0;

// userScore = parseInt(userScore);
// aiScore = parseInt(aiScore);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const widthOfNet = 4;
const heightOfNet = canvas.height;
const widthOfPaddle = 10;
const heightOfPaddle = 100;

let upKey = false;
let downKey = false;

// Objects

const net = {
  x: canvas.width / 2 - widthOfNet / 2,
  y: 0,
  width: widthOfNet,
  height: heightOfNet,
  color: "#228008"
};

const user = {
  x: 10,
  y: canvas.height / 2 - heightOfPaddle / 2,
  width: widthOfPaddle,
  height: heightOfPaddle,
  color: '#06018a',
  score: 0
};

const ai = {
  x: canvas.width - (widthOfPaddle + 10),
  y: canvas.height / 2 - heightOfPaddle / 2,
  width: widthOfPaddle,
  height: heightOfPaddle,
  color: '#06018a',
  score: 0
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 7,
  speed: 7,
  velocityX: 5,
  velocityY: 5,
  color: '#fff'
};

// Functions

function createNet() {
  ctx.fillStyle = net.color;
  ctx.fillRect(net.x, net.y, net.width, net.height);
}

function createScore(x, y, score) {
  ctx.fillStyle = '#228008';
  ctx.font = '30px sans-serif';
  ctx.fillText(score, x, y);
}

function createPaddles(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function createBall(x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true); // syntax --> arc(x, y, radius, startAngle, endAngle, antiClockwise_or_not)
  ctx.closePath();
  ctx.fill();
}

// Moving
window.addEventListener('keydown', keyDownFunc);
window.addEventListener('keyup', keyUpFunc);

function keyDownFunc(e) {
  if (e.keyCode == 38) {
    upKey = true;
  }
  else if (e.keyCode == 40) {
    downKey = true
  }
}

function keyUpFunc(e) {
  if (e.keyCode == 38) {
    upKey = false;
  }
  else if (e.keyCode == 40) {
    downKey = false;
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = 7;

  // changes the direction of ball
  ball.velocityX = -ball.velocityX;
  ball.velocityY = -ball.velocityY;
}

// collision Detect function
function collided(player, ball) {
  // returns true or false
  player.top = player.y;
  player.right = player.x + player.width;
  player.bottom = player.y + player.height;
  player.left = player.x;

  ball.top = ball.y - ball.radius;
  ball.right = ball.x + ball.radius;
  ball.bottom = ball.y + ball.radius;
  ball.left = ball.x - ball.radius;

  return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
}

// update function, to update things position
function update() {
  // move the paddle
  if (upKey && user.y > 0) {
    user.y -= 8;
  } else if (downKey && (user.y < canvas.height - user.height)) {
    user.y += 8;
  }

  // check if ball hits top or bottom wall
  if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {

    ball.velocityY = -ball.velocityY;
  }

   // if ball hit on right wall
   if (ball.x + ball.radius >= canvas.width) {

    user.score += 1;
    userScore += 1;
    resetBall();
  }

  // if ball hit on left wall
  if (ball.x - ball.radius <= 0) {

    ai.score += 1;
    aiScore += 1;
    resetBall();
  }

  // move the ball
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // ai paddle movement
  ai.y += ((ball.y - (ai.y + ai.height / 2))) * 0.09;

  // collision detection on paddles
  let player = (ball.x < canvas.width / 2) ? user : ai;

  if (collided(player, ball)) {

    // default angle is 0deg in Radian
    let angle = 0;

    // if ball hit the top of paddle
    if (ball.y < (player.y + player.height / 2)) {
      // then -1 * Math.PI / 4 = -45deg
      angle = -1 * Math.PI / 4;
    } else if (ball.y > (player.y + player.height / 2)) {
      // if it hit the bottom of paddle
      // then angle will be Math.PI / 4 = 45deg
      angle = Math.PI / 4;
    }

    /* change velocity of ball according to on which paddle the ball hitted */
    ball.velocityX = (player === user ? 1 : -1) * ball.speed * Math.cos(angle);
    ball.velocityY = ball.speed * Math.sin(angle);

    // increase ball speed
    ball.speed += 0.2;
  }
}

// drawEverything function draws everything on to canvas
function drawEverything() {
  ctx.fillStyle = "#8a0101"; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  createNet();
  createScore(canvas.width / 4, canvas.height / 6, user.score);
  createScore(3 * canvas.width / 4, canvas.height / 6, ai.score);
  createPaddles(user.x, user.y, user.width, user.height, user.color);
  createPaddles(ai.x, ai.y, ai.width, ai.height, ai.color);
  createBall(ball.x, ball.y, ball.radius, ball.color);
  localStorage.setItem('userScore', userScore);
  localStorage.setItem('aiScore', aiScore);
}

function mainGame() {
  update();
  drawEverything();
}

setInterval(mainGame, 1000 / 60);

const help = document.getElementById("help");
help.addEventListener("click", showHelp);

function showHelp() {
    alert(
        "                   HELP MENU \n\nUse arrow key up and down to navigate \nThe goal is to score on the other paddle"
    )
}