// Capstone Project - Cannon Game
// Anees Ahmad
// 11/28/2024
//
// I am creating a two-player game that has two cannons shooting at each other, and whoever survives the longest wins. 

//broadcasting statements that dictate what stage the game is at. 
let menuScreen = true;
let transitionBlack = false;
let transitionColour = false;
let countdown = false;
let gameStart = false;
let gameOver = false;

//creating two characters
let player1;
let player2;
//CANNON
//player 1
let cannonX;
let cannonY;
let elaspedTimeA = 0, startTimeA = 0;
//player2
let cannonX2;
let cannonY2;
let elaspedTimeB = 0, startTimeB = 0;

//setting a variable to change missle types
let missleType = 1;
//setting a variable for the missle skin
let cannonBall;

//setting a colour for the background that will change.
let backgroundRed = 100;
let backgroundGreen = 10;
let backgroundBlue = 10;
let BlackScreen = false;

//setting a array for either player
let player1Projectile = [];
let player2Projectile = [];

//adding a universal timer that can be used across different functions
let timer = 0;

//setting an array to carry explosions
let explosions = [];

// WEBSITE FUNCTIONS

function preload() {
  //loading fonts for the title
  titlefont = loadFont("assets/GAMEDAY.ttf");

  //loading projectile skinss   
  cannonBall = loadImage('assets/cannonball.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //degrees for rotating cannon and projectiles
  angleMode(DEGREES);

  //setting cannon positions. Must be done before creating new cannons and has to be within a system. 
  cannonX = windowWidth * 0.25;
  cannonX2 = windowWidth * 0.75;
  cannonY = 0;        // int(windowHeight * 0.4);
  cannonY2 = 0;       //int(windowHeight * 0.4);

  //adding the cannon variables and their power meters
  player1 = new Cannon(cannonX, cannonY, 0);
  powerGauge1 = new PowerMeter(0, windowHeight / 2, 5);

  player2 = new Cannon(cannonX2, cannonY2, 0);
  powerGauge2 = new PowerMeter(windowWidth, windowHeight / 2, 5);

  //generating the terrain
  createTerrain();

}

function draw() {

  if (menuScreen === true) { //checking for menu broadcast
    menu();
  }
  //transition
  else if (transitionBlack === true) {
    fadeOut();

    if (backgroundRed === 0 && backgroundGreen === 0 && backgroundBlue === 0) { //if the colour is black, stop transitioning.
      transitionBlack = false;
      transitionColour = true;
    }
  }
  else if (transitionColour === true) { //transitioning to the colour I need
    fadeIn(200, 196, 255);                                                                                                  ///change colour here

  }
  //game page
  else if (gameStart === true) {
    //start countdown
    gameBackground();
    renderTerrain();
  }
  else if (gameOver === true) { //setting the game over screen
    gameOverScreen();
  }
  else { //if nothing is received, just make a black screen. 
    background(0);
  }




  //key pressing functions.

  //changes the orientation and rotation of the cannon head
  //player 1
  if (keyIsDown(83) === true && player1.direction > -10) {
    player1.direction -= 1;
  }
  if (keyIsDown(87) === true && player1.direction < 190) {
    player1.direction += 1;
  }

  //player 2
  if (keyIsDown(UP_ARROW) === true && player2.direction > -190) {
    player2.direction -= 1;
  }
  if (keyIsDown(DOWN_ARROW) === true && player2.direction < 10) {
    player2.direction += 1;
  }




  //physics for cannon
  //checking to see if the cannon touches the ground
  for (let i of terrainHeights) {
    if (int(player1.cannonBase) >= int(i.top) && int(i.left) <= int(player1.x) && int(player1.x) <= int(i.right)) {
      player1.drop = false;
    }
    if (int(player2.cannonBase) >= int(i.top) && int(i.left) <= int(player2.x) && int(player2.x) <= int(i.right)) {
      player2.drop = false;
    }
  }

  if (startTimeA > 0 && gameStart === true) { //displaying the gauges once the timer begins
    powerGauge1.display();
  }
  if (startTimeB > 0 && gameStart === true) {
    powerGauge2.display();
  }

  //resetting meter colours
  if (startTimeA === 0) {
    powerGauge1.emptyGauge();
    powerGauge1.rate = 1;
  }
  if (startTimeB === 0) {
    powerGauge2.emptyGauge();
    powerGauge2.rate = 1;
  }
}





//shooting
function keyReleased() {
  if (keyCode === 70) { //"F" key
    elaspedTimeA = millis() - startTimeA; //ends the timer for how fast the rocket should travel
    player1Projectile.push(new Projectile(player1.x, player1.y, player1.direction + 90, elaspedTimeA, missleType));
    startTimeA = 0;
  }
  if (keyCode === 76) { //"L" key
    elaspedTimeB = millis() - startTimeB;
    //                                                       the direction must have 90 added or subtracted because of the difference in starting positions.
    player2Projectile.push(new Projectile(player2.x, player2.y, player2.direction - 90, elaspedTimeB, missleType)); //creates new projectile at the cannon position
    startTimeB = 0;
  }
}


//creating a function to set the fire gauge
//starts the timer for how fast the rocket should travel

function keyPressed() {
  if (keyIsDown(70)) {
    startTimeA = millis();
  }
  if (keyIsDown(76)) {
    startTimeB = millis();
  }
}


//all the mouse clicking functions will be here.
function mouseClicked() {
  if (menuScreen === true && mouseY < windowHeight / 2 + 350 && mouseY > windowHeight / 2 + 50 && mouseX > windowWidth / 2 - 400 && mouseX < windowWidth / 2 + 400) {//if mouse is hovering over the play button
    menuScreen = false;
    transitionBlack = true;
    gameStart = true;
    countdown = true;
    timer = millis();// this timer is for the countdown 
  }
  //changing missle types here
  else if (menuScreen === true && mouseY > windowHeight * 0.1 - 30 && mouseY < windowHeight * 0.1 + 20 && mouseX > windowWidth/2 - 100 && mouseX < windowWidth/2 + 100) {
    missleType++;
  }
  //versions cant cycle out of range
  if (missleType > 3) {
    missleType = 1;
  }
}


摘要
翻译
扩写
重写
解释说明
语法
问答
解释代码
Explain