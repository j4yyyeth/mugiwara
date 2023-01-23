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

// drawing images function
function drawFrame() {
    ctx.drawImage(oceanBackground, 0, 0, 1500, 769);
    ctx.drawImage(deck, 0, -20, 500, 800);
    ctx.drawImage(cannonImage, 230, 450, 200, 200);
    ctx.drawImage(pirateShip, 1200, 100, 100, 200);
}
// drawing images function



// onload, when you click the button, make the canvas visible, remove the content above, and draw the frame
window.onload = () => {
    playButton.onclick = () => {
    canvas.style.visibility = 'visible';
    container.remove();
    drawFrame();
    }
}
// onload, when you click the button, make the canvas visible, remove the content above, and draw the frame


