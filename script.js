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

const pirateShip = new Image();
pirateShip.src = '/images/ship1.png';

const deck = new Image();
deck.src = '/images/pirate-ship-deck.png';
// getting images

let startingX = 180;
let startingY = 390;

function startGame() {
    ctx.drawImage(oceanBackground, 0, 0, 1500, 769);
    ctx.drawImage(deck, 0, -20, 500, 800);
    cannon.draw();
    cannon.x = startingX;
    cannon.y = startingY;
}

function updateCanvas() {
    ctx.clearRect(0,0,1500,769);
    ctx.drawImage(oceanBackground, 0, 0, 1500, 769);
    ctx.drawImage(deck, 0, -20, 500, 800);
    cannon.draw();
}

// animation 
function animationLoop() {
    animationLoopId = setInterval(() => {
    updateCanvas();
    }, 500);
}
// animation 

const cannon = {
    x: startingX,
    y: startingY,
    width: 300,
    height: 250,
  
    draw: function() {
      ctx.drawImage(cannonImage, this.x, this.y, this.width, this.height)
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



document.addEventListener('keydown', e => {
    switch (e.keyCode) {
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





