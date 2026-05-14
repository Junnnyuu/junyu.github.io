// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player;

function preload()
{
  player = loadImage("assets/player_idle_1.png");
}

function setup() {
  createCanvas(player.width,player.height);
  pixelDensity(1);
  image(player, 0, 0);
  loadPixels();
}

function draw() {
  //background(220);
}
