// getting images
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
pirateImage.src = '/images/ship2.png';

const deck = new Image();
deck.src = '/images/pirate-ship-deck.png';
//

// starting positions for cannon
let startingX = 180;
let startingY = 530;
//

let pirateShipCount = 0;

// function to start the game .. later added to onclick 
function startGame() {
    ctx.drawImage(oceanBackground, 0, 0, 1500, 769);
    ctx.drawImage(deck, 0, -20, 500, 800);
    cannon.draw();
    cannon.x = startingX;
    cannon.y = startingY;
}
//

// updates what's on the canvas .. later used in the animation loop function
function updateCanvas() {
    ctx.clearRect(0,0,1500,769);
    ctx.drawImage(oceanBackground, 0, 0, 1500, 769);
    ctx.drawImage(deck, 0, -20, 500, 800);
    cannonBall1.draw();
    cannonBall2.draw();
    cannonBall3.draw();
    cannon.draw();
    pirateShip1.draw();
    pirateShip1.move();

    if (pirateShip1.y > 800) {
      pirateShip2.draw();
      pirateShip2.move();
    }

    if (pirateShip2.y > 800) {
      pirateShip3.draw();
      pirateShip3.move();
    }

    if (pirateShip3.y > 800) {
      pirateShip4.draw();
      pirateShip4.move();
    }

    if (pirateShip4.y > 800) {
      pirateShip5.draw();
      pirateShip5.move2();
    }

    if (pirateShip5.y > 800) {
      pirateShip6.draw();
      pirateShip6.move2();
    }

    if (pirateShip6.y > 800) {
      pirateShip7.draw();
      pirateShip7.move2();
    }

    if (pirateShip7.y > 800) {
      pirateShip8.draw();
      pirateShip8.move2();
    }

    if (pirateShip8.y > 800) {
      pirateShip9.draw();
      pirateShip9.move2();
    }

    if (pirateShip9.y > 800) {
      pirateShip10.draw();
      pirateShip10.move2();
    }

    if (pirateShip10.y > 800) {
      pirateShip11.draw();
      pirateShip11.move2();
    }

    if (pirateShip11.y > 800) {
      pirateShip12.draw();
      pirateShip12.move3();
    }

    if (pirateShip12.y > 800) {
      pirateShip13.draw();
      pirateShip13.move3();
    }

    if (pirateShip13.y > 800) {
      pirateShip14.draw();
      pirateShip14.move3();
    }

    if (pirateShip14.y > 800) {
      pirateShip15.draw();
      pirateShip15.move3();
    }
}
//

ballCount = 0;

// updates the cannon ball
function updateCannon() {
  animationLoopId = setInterval(() => {
    cannonBall1.move();
    ballCount++;
    if (pirateShip1.y > 800) {
      cannonBall2.move();
    }

    if (pirateShip2.y > 800) {
      cannonBall3.move();
    }
  }, 1);
}
//

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
    this.y++; 
  }

  move2() {
    this.y+=2;
  }

  move3() {
    this.y+=3;
  }
}
//

// instaces of the PirateShip class
let pirateShip1 = new PirateShip();
let pirateShip2 = new PirateShip();
let pirateShip3 = new PirateShip();
let pirateShip4 = new PirateShip();
let pirateShip5 = new PirateShip();
let pirateShip6 = new PirateShip();
let pirateShip7 = new PirateShip();
let pirateShip8 = new PirateShip();
let pirateShip9 = new PirateShip();
let pirateShip10 = new PirateShip();
let pirateShip11 = new PirateShip();
let pirateShip12 = new PirateShip();
let pirateShip13 = new PirateShip();
let pirateShip14 = new PirateShip();
let pirateShip15 = new PirateShip();
//

let shotCount = 0;

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
  }

  draw() {
    ctx.drawImage(cannonBallImage, this.x + 160, this.y + 15, this.width, this.height);
  }

  move() {
    this.x+=5;
  }
}
//

// instace of the CannonBall class
let cannonBall1 = new CannonBall(cannon.x, cannon.y);
let cannonBall2 = new CannonBall(cannon.x, cannon.y);
let cannonBall3 = new CannonBall(cannon.x, cannon.y);
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
        updateCannon();
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