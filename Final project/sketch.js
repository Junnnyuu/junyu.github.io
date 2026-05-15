// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player_1, player_2, player_3;

let birdie;


function preload()
{
  player_1 = loadImage("assets/player_idle_1.png");
  player_2 = loadImage("assets/player_idle_2.png");
  player_3 = loadImage("assets/player_idle_3.png");
  birdie = loadImage("assets/badminton_birdie_1.png");
  //player_4 = loadImage("assets/player_idle_4.png");
}

function setup() {
  createCanvas(200,200);
  pixelDensity(1);
  image(player_1, 10, 100);
  image(player_2, 10, 100);
  image(birdie, 10, 10,30,50);
  //image(player_1, 10, 100);
  loadPixels();
}

function draw() {
  //background(220);
}
