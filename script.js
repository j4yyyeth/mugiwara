// getting images/audio
const playButton = document.getElementById('play-button');
const menuButton = document.getElementById('menu-button');
const container = document.getElementById('flex-container');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const oceanBackground = new Image();
oceanBackground.src = '/images/ocean1.jpg';
const cannonImage = new Image();
cannonImage.src = '/images/cannon1.png';
const cannonBallImage = new Image();
cannonBallImage.src = '/images/cannon-ball.png';
const pirateImage = new Image();
pirateImage.src = '/images/ship3.png';
const deck = new Image();
deck.src = '/images/pirate-ship-deck.png';
const scoreMap = new Image();
scoreMap.src = '/images/score-map.png'

const fire = new Audio();
fire.src = 'audio/cannon-fire.mp3';
const sailing = new Audio();
sailing.src = 'audio/sailing-ship.mp3';
sailing.volume = 0.5;
const winning = new Audio();
winning.src = 'audio/winning-sound.mp3';
const laugh = new Audio();
laugh.src = 'audio/pirate-laugh.mp3';
//

let cannonballAnimationId;
let shipCount = 0;
let score = 0;

// function to start the game .. later added to onclick 
function startGame() {
    ctx.drawImage(oceanBackground, 0, 0, 1500, 769);
    ctx.drawImage(deck, 0, -20, 500, 800);
    sailing.play();
    cannon.draw();
}
//

// updates what's on the canvas .. later used in the animation loop function
function updateCanvas() {
    ctx.clearRect(0,0,1500,769);
    ctx.drawImage(oceanBackground, 0, 0, 1500, 769);
    ctx.drawImage(deck, 0, -20, 600, 800);     
    cannonBall1.draw();
    cannon.draw();
    drawScore();
    newShip(pirateShip1, pirateShip2);
    checkCollision(cannonBall1, pirateShip1);
    checkCollision(cannonBall1, pirateShip2);
    scoreChecker()
  }
//

// updates the cannon ball
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
//

let animationLoopId;

// animation loop that used the updateCanvas() function to draw the images
function animationLoop() {
    animationLoopId = setInterval(() => {
      updateCanvas();
    }, 10);
}
// 

// PirateShip class to make new pirate ships appear after the one before leaves the y-axis
class PirateShip {
  constructor() {
    this.x = 1200
    this.y = 150
    this.width = 100
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
    this.y+=3.1
  }
  move5() {
    this.y+=3.2
  }
}
//

// instace of the PirateShip class
let pirateShip1 = new PirateShip();
let pirateShip2 = new PirateShip();
//

// creates the cannon object
const cannon = {
    x: 180,
    y: 530,
    width: 200,
    height: 200,
  
    draw: function() {
      ctx.drawImage(cannonImage, this.x, this.y, this.width, this.height);
    },
}
//

// this class draws the cannonball inside the cannon, as well as move animate it if you press space
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
    this.x+=15;
    if(this.x > canvas.width) {
      this.x = 180
      clearInterval(cannonballAnimationId)  
      this.inFlight = false 
    }
  }
}
//

// instace of the CannonBall class
let cannonBall1 = new CannonBall(cannon.x, cannon.y);
//

// collision function
function checkCollision(ball, ship) {
  ball.top = ball.y;
  ball.bottom = ball.y + ball.height;
  ball.left = ball.x;
  ball.right = ball.x + ball.width;
  ship.top = ship.y;
  ship.bottom = ship.y + ship.height;
  ship.left = ship.x;
  ship.right = ship.x + ship.width;
 if (ball.right > ship.left && ball.top + 20 < ship.bottom && ball.left < ship.right && ball.bottom > ship.top) {
  score++;
  ship.y = 780;
  cannonBall1.x = 4000;
  shipCount--;
 }
}
//

// onload, when you click the button, make the canvas visible, remove the content above, and draw the frame
window.onload = () => {
    playButton.onclick = () => {
    canvas.style.visibility = 'visible';
    container.remove();
    startGame();
    animationLoop();
    }
}
//

// function for new ships coming down the y-axis
function newShip(ship1, ship2) {
  ship1.draw();
  ship1.move();
  if (ship1.y === 800) {
    ship1.y = 150;
    shipCount++
  }
  if (shipCount >= 5) {
    ship1.y = 900;
    ship2.draw();
    ship2.move2();

    if (ship2.y === 800) {
      ship2.y = 150;
      shipCount++;
    }
  }
  if (shipCount >= 10) {
    ship1.y = 900;
    ship2.draw();
    ship2.move3();
    if (ship2.y > 800) {
      ship2.y = 150;
      shipCount++;
    }
  }

  if (shipCount >= 20) {
    ship1.y = 900;
    ship2.draw();
    ship2.move4();
    if (ship2.y > 800) {
      ship2.y = 150;
      shipCount++;
    }
  }

  if (shipCount >= 30) {
    ship1.y = 900;
    ship2.draw();
    ship2.move5();
    if (ship2.y > 800) {
      ship2.y = 150;
      shipCount++;
    }
  }

  if (shipCount >= 35 && shipCount < 40) {
    ship1.y = 900;
    ship2.draw();
    ship2.move();
    if (ship2.y > 800) {
      ship2.y = 150;
      shipCount++;
    }
  }

  if (shipCount >= 45 && shipCount < 48) {
    ship1.y = 900;
    ship2.draw();
    ship2.move3();
    if (ship2.y > 800) {
      ship2.y = 150;
      shipCount++;
    }
  }
}
//

// drawing score-board 
function drawScore() {
  ctx.drawImage(scoreMap, 20, 11, 150, 45); 
  ctx.fillStyle = "black"
  ctx.font = '24px serif'
  ctx.fillText(`Score: ${score}`, 55, 40);
}
//

// checks the win/lose conditions
function scoreChecker() {
  if (score >= 15) {
    sailing.volume = 0;
    fire.volume = 0;
    winning.play();
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 1500, 769)
    ctx.fillStyle = "red"
    ctx.font = '150px serif'
    ctx.fillText(`YOU WIN!`, 390, 400);
  }

  if (score < 15 && shipCount >= 5) { 
    sailing.volume = 0;
    fire.volume = 0;
    laugh.play();
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 1500, 769)
    ctx.fillStyle = "red"
    ctx.font = '150px serif'
    ctx.fillText(`YOU LOSE!`, 370, 400);
  }
}
//

// event listener that allows you to move the cannon with the arrow keys
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
//