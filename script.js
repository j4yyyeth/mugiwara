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
let startingY = 430;
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
    cannon.draw();
    pirateShip.draw();
    pirateShip.move();
    if (pirateShip.y === 769) {
      pirateShipCount++;
    }

}
//

ballCount = 0;

function updateCannon() {
  animationLoopId = setInterval(() => {
    cannonBall1.move();
  }, 10);
  ballCount++;
}
// animation loop that used the updateCanvas() function to draw the images
function animationLoop() {
    animationLoopId = setInterval(() => {
      updateCanvas();
      // updateCannon();
      cannonBall1.draw();
    }, 10);
}
// 

// PirateShip class to make new pirate ships appear after the one before leaves the y-axis
class PirateShip {
  constructor() {
    this.x = 1200
    this.y = 120
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
    this.y++; 
  }

  move3() {
    this.y++; 
  }
}
//

// eventually delete object and just use class 

// pirateShip object that has x and y positions, a draw function, and a move method;
const pirateShip = {
  x: 1200,
  y: 120,
  width: 100,
  height: 150,

  draw: function() {
    ctx.drawImage(pirateImage, this.x, this.y, this.width, this.height)
  },

  move() {
    this.y++; 
  },

  move2() {
    this.y+=2;
  },

  move3() {
    this.y+=3;
  }
}
//

let shotCount = 0;

// creates the cannon object which has some functions that draw the canon and allow you to move it
const cannon = {
    x: startingX,
    y: startingY,
    width: 200,
    height: 200,
  
    draw: function() {
      ctx.drawImage(cannonImage, this.x, this.y, this.width, this.height);
    },

    moveLeft: function() {
      this.x = this.x - 5
    },
  
    moveRight: function() {
      this.x = this.x + 5
    },
  
    moveUp: function() {
      this.y = this.y - 5
    },
  
    moveDown: function() {
      this.y = this.y + 5
    }
}

class CannonBall {
  constructor(x, y) {
     this.x = x;
     this.y = y;
     this.width = 50;
     this.height = 50;
  }

  draw() {
    ctx.drawImage(cannonBallImage, this.x + 180, this.y, this.width, this.height);
  }

  move() {
    this.x+=5;
  }
}
//

let cannonBall1 = new CannonBall(cannon.x, cannon.y);

// onload, when you click the button, make the canvas visible, remove the content above, and draw the frame
window.onload = () => {
    playButton.onclick = () => {
    canvas.style.visibility = 'visible';
    container.remove();
    startGame();
    animationLoop();
    }
}
// onload, when you click the button, make the canvas visible, remove the content above, and draw the frame

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