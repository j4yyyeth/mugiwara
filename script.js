const playButton = document.getElementById('play-button');
const menuButton = document.getElementById('menu-button');
const container = document.getElementById('flex-container');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const oceanBackground = new Image();
oceanBackground.src = 'images/ocean1.jpg';
const cannonImage = new Image();
cannonImage.src = 'images/cannon1.png';
const cannonBallImage = new Image();
cannonBallImage.src = 'images/cannon-ball.png';
const pirateImage = new Image();
pirateImage.src = 'images/ship3.png';
const deck = new Image();
deck.src = 'images/pirate-ship-deck.png';
const scoreMap = new Image();
scoreMap.src = 'images/score-map.png';
const x = new Image();
x.src = 'images/x.png';
const explosion = new Image();
explosion.src = 'images/explosion.png';

const fire = new Audio();
fire.src = 'audio/cannon-fire.mp3';
const sailing = new Audio();
sailing.src = 'audio/sailing-ship.mp3';
sailing.volume = 0.5;
const winning = new Audio();
winning.src = 'audio/winning-sound.mp3';
const laugh = new Audio();
laugh.src = 'audio/pirate-laugh.mp3';

let cannonballAnimationId;
let shipCount = 0;
let score = 0;

function startGame() {
    ctx.drawImage(oceanBackground, 0, 0, 1500, 769);
    ctx.drawImage(deck, 0, -20, 500, 800);
    sailing.play();
    cannon.draw();
}

function updateCanvas() {
    ctx.clearRect(0,0,1500,769);
    ctx.drawImage(oceanBackground, 0, 0, 1500, 769);
    ctx.drawImage(deck, 0, -20, 600, 800);     
    cannonBall1.draw();
    cannon.draw();
    checkCollision(cannonBall1, pirateShip1);
    checkCollision(cannonBall1, pirateShip2);
    drawScore();
    newShip(pirateShip1, pirateShip2);
    scoreChecker();
  }

function updateCannon() {
  cannonBall1.inFlight = true
  cannonballAnimationId = setInterval(() => {
    cannonBall1.move();
    if (cannonBall1.inFlight === true) {
      fire.play();
    }
    if (cannonBall1.inFlight === false) {
      fire.load();
    }
  }, 1);
}

let animationLoopId;

function animationLoop() {
    animationLoopId = setInterval(() => {
      updateCanvas();
    }, 10);
}

class PirateShip {
  constructor() {
    this.x = 1200
    this.y = 150
    this.width = 130
    this.height = 150
  }

  draw() {
    ctx.drawImage(pirateImage, this.x, this.y, this.width, this.height);
  }

  move() {
    this.y+=1; 
  }
  move2() {
    this.y+=2;
  }
  move3() {
    this.y+=3;
  }
  move4() {
    this.y+=4
  }
}

let pirateShip1 = new PirateShip();
let pirateShip2 = new PirateShip();

const cannon = {
    x: 180,
    y: 530,
    width: 200,
    height: 200,
  
    draw: function() {
      ctx.drawImage(cannonImage, this.x, this.y, this.width, this.height);
    },
}

class CannonBall {
  constructor(x, y) {
     this.x = x;
     this.y = y;
     this.width = 25;
     this.height = 25;
     this.inFlight = false
  }

  draw() {
    ctx.drawImage(cannonBallImage, this.x + 160, this.y + 15, this.width, this.height);
  }

  move() {
    this.x+=5.4;
    if(this.x > canvas.width) {
      this.x = 180
      clearInterval(cannonballAnimationId)  
      this.inFlight = false 
    }
  }
}

let cannonBall1 = new CannonBall(cannon.x, cannon.y);

function checkCollision(ball, ship) {
  ball.top = ball.y + 33;
  ball.bottom = ball.y + ball.height;
  ball.left = ball.x;
  ball.right = ball.x + ball.width;        
  ship.top = ship.y;
  ship.bottom = ship.y + ship.height;
  ship.left = ship.x;
  ship.right = ship.x + ship.width;
  if (ball.right > ship.left && ball.top + 20 < ship.bottom && ball.left < ship.right && ball.bottom > ship.top && ship.y < 770) {
    ctx.drawImage(explosion, 1000, 300, 500, 500);
    cannonBall1.x = 5000;
    score++;
    ship.y = 780;
  }
}

window.onload = () => {
    playButton.onclick = () => {
    canvas.style.visibility = 'visible';
    container.remove();
    startGame();
    animationLoop();
    }
}

function newShip(ship1, ship2) {
  if (ship1.y === 779) {
    shipCount--;
  }
  ship1.draw();
  ship1.move();
  if (ship1.y === 800) {
    ship1.y = 150;                         
  }                                            
  if (score >= 2) {
    if (ship2.y === 770) {
      shipCount--;
    }
    ship1.y = 900;
    ship2.draw();
    ship2.move2();
    if (ship2.y === 798) {
      ship2.y = 150;
    }
  }
  if (score >= 10) {
    if (ship2.y === 770) {
      shipCount--;
    }
    ship1.y = 900;
    ship2.draw();
    ship2.move3();
    if (ship2.y > 798) {
      ship2.y = 150;
    }
  }
}

function drawScore() {
  ctx.drawImage(scoreMap, 20, 11, 150, 100); 
  ctx.fillStyle = "darkGreen"
  ctx.font = '24px serif'
  ctx.fillText(`Score: ${score}`, 55, 45);
  ctx.drawImage(x, 85, 48.5, 20, 20);
  ctx.fillStyle = "darkRed"
  ctx.font = '24px serif'
  ctx.fillText(`Ships: ${shipCount}`, 55, 85);
}

function scoreChecker() {
  if (score >= 30) {
    sailing.volume = 0;
    fire.volume = 0;
    winning.play();
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 1500, 769)
    ctx.fillStyle = "green"
    ctx.font = '150px serif'
    ctx.fillText(`YOU WIN!`, 390, 400);
    ctx.drawImage(scoreMap, 20, 11, 150, 100); 
    ctx.fillStyle = "darkGreen"
    ctx.font = '24px serif'
    ctx.fillText(`Score: ${score}`, 55, 45);
    ctx.drawImage(x, 85, 48.5, 20, 20);
    cannonBall1.inFlight = true;
  }

  if (shipCount <= -5 && score < 30) { 
    sailing.volume = 0;
    fire.volume = 0;
    laugh.play();
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 1500, 769)
    ctx.fillStyle = "red"
    ctx.font = '150px serif'
    ctx.fillText(`YOU LOSE!`, 370, 400);
    cannonBall1.inFlight = true;
  }
}

document.addEventListener('keydown', e => {
    switch (e.keyCode) {
      case 32:
        if (cannonBall1.inFlight === false) {
          updateCannon();
        }
        break;
      case 38:
        cannon.moveUp();
        break;
      case 40:
        cannon.moveDown();
        break;
      case 37:
        cannon.moveLeft();
        break;
      case 39:
        cannon.moveRight();
        break;
    }
});
