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

let fire = new Audio('audio/cannon-fire.mp3');
fire.volume = 1;
let sailing = new Audio('audio/sailing-ship.mp3');
sailing.volume = 0.5;
//

let cannonballAnimationId;

let shipArray = [];

// starting positions for cannon
let startingX = 180;
let startingY = 530;
//

// function to start the game .. later added to onclick 
function startGame() {
    ctx.drawImage(oceanBackground, 0, 0, 1500, 769);
    ctx.drawImage(deck, 0, -20, 500, 800);
    sailing.play();
    cannon.draw();
    cannon.x = startingX;
    cannon.y = startingY;
}
//

// updates what's on the canvas .. later used in the animation loop function
function updateCanvas() {
    ctx.clearRect(0,0,1500,769);
    ctx.drawImage(oceanBackground, 0, 0, 1500, 769);
    ctx.drawImage(deck, 0, -20, 600, 800);     
    cannonBall1.draw();
    cannon.draw();
    pirateShip1.draw();
    pirateShip1.move();

    if (pirateShip1.y > 800) {
      pirateShip1.y = 150;
      shipArray.push(pirateShip1);
    }

    if (shipArray.length >= 5) {
      pirateShip1.y = 900;
      pirateShip2.draw();
      pirateShip2.move2();

      if (pirateShip2.y > 800) {
        pirateShip2.y = 150;
        shipArray.push(pirateShip2);
      }
    }
    checkCollision(cannonBall1, pirateShip1);
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
    this.sailing = false
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

  move5() {
    this.y+=5
  }

  move6() {
    this.y+=6
  }

  move7() {
    this.y+=7
  }

  move8() {
    this.y+=8
  }

  move9() {
    this.y+=9
  }

  move10() {
    this.y+=10
  }
}
//

// instace of the PirateShip class
let pirateShip1 = new PirateShip();
let pirateShip2 = new PirateShip();
let pirateShip3 = new PirateShip();
let pirateShip4 = new PirateShip();
let pirateShip5 = new PirateShip();
//

// creates the cannon object
const cannon = {
    x: startingX,
    y: startingY,
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
    this.x+=9;
    if(this.x > canvas.width) {
      this.x = startingX
      clearInterval(cannonballAnimationId)  
      this.inFlight = false 
    }
  }
}
//

// collision function
function checkCollision(ball, ship) {
 if (ball.y === ship.y && ship.x === ball.x) {
  var collided = true;
 }
 else {
  collided = false;
 }

 if (collided === true) {
  console.log(ball.y);
  console.log(ship.y);
 }
// ship.x always equal to 1200
// ship.y moves downwards

// ball.x moves right
// ball.y always equal to 530

// function collision(b,p){                 object = p
//   p.top = p.positionY;
//   p.bottom = p.positionY + p.height;
//   p.left = p.positionX;
//   p.right = p.positionX + p.width;
//   b.top = b.y- b.radius;
//   b.bottom = b.y + b.radius;
//   b.left = b.x - b.radius
//   b.right = b.x + b.radius
//   return b.right > p.left && b.top < p.bottom && b.left < p.right && b.bottom > p.top;
}
//

// instace of the CannonBall class
let cannonBall1 = new CannonBall(cannon.x, cannon.y);
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