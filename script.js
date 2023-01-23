const playButton = document.getElementById('play-button');
const menuButton = document.getElementById('menu-button');

const container = document.getElementById('flex-container');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const oceanBackground = new Image();
oceanBackground.src = '/images/ocean1.jpg';

const cannonImage = new Image();
cannonImage.src = '/images/cannon1.png';

// const soundEffect = new Audio('audio/'); if u want to add a sound effect to the play button

playButton.onclick = function() {
    canvas.style.visibility = 'visible';
    canvas.style.height = '769px';
    canvas.style.width = '1500px';
    container.remove();
    // animation();

    // soundEffect.play(); if u want to add a sound effect to the play button
}

// window.onload = function() {
//     document.getElementById("start-button").onclick = function() {
//       startGame();
//     };
//   };
  
// function animation() {
//     animationLoopId = setInterval(() => {
//         ctx.clearRect(0,0,1500,769);
//         ctx.drawImage(oceanBackground, 0, 0, 1500, 769);
//         ctx.drawImage(cannonImage, 400, 200, 75, 50);
//     }, 10)
// };