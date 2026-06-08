/* eslint-disable no-extra-parens */
/* eslint-disable brace-style */
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let img_player1, img_player2, img_player3, img_Birdie;
let img_player4, img_player5, img_player6;

let player1,player2;

let isDragging = false;
let dragStart, dragEnd;
let currentAngle = 0;
let currentPower = 0;

let activeBirdie = null;
let currentPlayer = 1;
let gravity; // Gravity vector for the birdie's trajectory

let gameState = "MENU"; // Game state variable to manage different phases of the game (e.g., "PLAY", "GAMEOVER")
let winner = "";


let worldWidth = 3000;
let terrain = [];

let humanPlayerId = 1;   
let isObserving = false;
let camX = 0;


let gameMode = "AI";

let aiShotCount = 0;
let aiDifficulty = "MEDIUM";
let isAITurn = false;

let totalTurns = 0;

let terrainDifficulty = "EASY";
let isDynamicTerrain = false;


function preload() {
  img_player1 = loadImage("assets/player_idle_1.png");
  img_player2 = loadImage("assets/player_idle_2.png");
  img_player3 = loadImage("assets/player_idle_3.png");
  img_Birdie = loadImage("assets/badminton_birdie_1.png");
  
  img_player4 = loadImage("assets/player_idle_4_right.png");
  img_player5 = loadImage("assets/player_idle_5_right.png");
  img_player6 = loadImage("assets/player_idle_6_right.png");
}

function setup() {
  createCanvas(1200, 600);
  
 
  let noiseOffset = random(10000); 
  

  let noiseScale = 0.003; 

  for(let x = 0; x < worldWidth; x++) {
   
    let n = noise(x * noiseScale + noiseOffset);
    

    terrain[x] = map(n, 0.25, 0.75, 100, 480);
    
   
    terrain[x] = constrain(terrain[x], 50, 480);
  }

  let p1Frames = [img_player1, img_player2, img_player3];
  let p2Frames = [img_player4, img_player5, img_player6];

  let player1X = random(100, 400);
  let player1Y = terrain[floor(player1X)] - 50; // 50 is half the character height (100/2)
  player1 = new Character(player1X, player1Y, 100, p1Frames, 1);
  

  let player2X = random(1300, 1800); 
  let player2Y = terrain[floor(player2X)] - 50; // 50 is half the character height (100/2)
  player2 = new Character(player2X, player2Y, 100, p2Frames, 2);

  dragStart = createVector(0,0);
  dragEnd = createVector(0,0);

  gravity = createVector(0, 0.289);
}






function draw() {
  if (gameState === 'MENU') 
  {
    drawMenu(); 
  }

  else if (gameState === 'TERRAIN_SELECT') 
  {
    drawTerrainSelect(); 
  }

  else if(gameState === "PLAYING")
  {
    background(135,206,235);

    let targetCamX = 0;



    if(activeBirdie !== null)
    {
      targetCamX = activeBirdie.pos.x - width/2;
    }


    else if(isObserving) 
    {
      let opponent = (currentPlayer === 1) ? player2 : player1;

      targetCamX = opponent.pos.x - width / 2;
    }

    else
    {
      let activePlayer = (currentPlayer === 1) ? player1 : player2;

      targetCamX = activePlayer.pos.x - width/2;
    }
    targetCamX = constrain(targetCamX, 0, worldWidth - width);
    camX = lerp(camX, targetCamX,0.05);

    push();
    translate(-camX,0);
    fill(34,139,34);
    noStroke();
    beginShape();
    vertex(0,height);
    for(let x = 0; x < worldWidth; x += 5)
    {
      vertex(x,terrain[x]);
    }

    vertex(worldWidth, height);
    endShape(CLOSE);

  
    player1.updateAnimation(); // Update the animation state of the active player
    player2.updateAnimation();
  
  
    player1.display();
    player2.display();
  
    if(activeBirdie !== null) {
      activeBirdie.update();
      activeBirdie.display();
    }

    pop();

    drawLookButton();

    fill(0);
    textSize(24);
    textAlign(CENTER);
    if (currentPlayer === 1) 
    {
      text("Player 1's Turn", width / 2, 50);
    } 
    
    else 
    {
      text("Player 2's Turn", width / 2, 50);
    }

    // 
    if (gameMode === 'AI' && currentPlayer !== humanPlayerId && activeBirdie === null) {
      if (!isAITurn) 
      {
        takeAITurn(); 
      }
    } 
    
    else 
    {
      if (!(gameMode === 'AI' && currentPlayer !== humanPlayerId) && !isObserving) {
        handleAiming(); 
      }
    }
    
    checkCollision();
  } 
  else if (gameState === "GAMEOVER") 
  {
    background(30);
    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER); 
    text(winner + " WINS", width / 2, height / 2 - 50); 

    textSize(20);
    text("Press R to restart", width / 2, height / 2 + 30);
  }
 
}






function drawTerrainSelect() {
  background(50, 80, 120);
  textAlign(CENTER, CENTER);
  
  // 
  fill(255);
  textSize(40);
  text("SELECT TERRAIN DIFFICULTY", width / 2, 100);

  // 
  textSize(25);
  
  // 
  fill(terrainDifficulty === 'EASY' ? color(0, 255, 0) : color(200));
  rect(width/2 - 250, 200, 150, 60, 10);
  fill(0); text("EASY", width/2 - 175, 230);

  // 
  fill(terrainDifficulty === 'MEDIUM' ? color(255, 200, 0) : color(200));
  rect(width/2 - 75, 200, 150, 60, 10);
  fill(0); text("MEDIUM", width/2, 230);

  // 
  fill(terrainDifficulty === 'HARD' ? color(255, 0, 0) : color(200));
  rect(width/2 + 100, 200, 150, 60, 10);
  fill(0); text("HARD", width/2 + 175, 230);

  // 
  fill(255);
  textSize(30);
  text("DYNAMIC TERRAIN (Randomize each round):", width/2, 350);
  
  fill(isDynamicTerrain ? color(0, 255, 0) : color(255, 100, 100));
  rect(width/2 - 75, 380, 150, 60, 10);
  fill(0);
  text(isDynamicTerrain ? "ON" : "OFF", width/2, 410);

  // -
  fill(100, 200, 255);
  rect(width/2 - 125, 500, 250, 70, 15);
  fill(0);
  textSize(35);
  text("START GAME", width/2, 535);
}





function handleAiming() {
  if(isDragging) {
    dragEnd.set(mouseX, mouseY);

    let aimVector = p5.Vector.sub(dragStart, dragEnd);

    let maxDrag = 150;

    if(aimVector.mag() > maxDrag)
    {
      aimVector.setMag(maxDrag);
    }

    currentPower = round(map(aimVector.mag(), 0, maxDrag, 0 ,100));

    let rad = atan2(aimVector.y, aimVector.x);

    currentAngle = round(degrees(rad));

    if(currentAngle < 0)
    {
      currentAngle += 360;
    }

    let launchSpeed = map(currentPower, 0, 100, 0, 20);
    let VelX = cos(rad) * launchSpeed;
    let VelY = sin(rad) * launchSpeed;

    let startX = currentPlayer === 1 ? player1.pos.x : player2.pos.x;
    let startY = (currentPlayer === 1 ? player1.pos.y : player2.pos.y) - 30;

    stroke(255, 255, 255, 150);
    strokeWeight(4);
    noFill();
    
    push();
    translate(-camX, 0);
    for (let i = 1; i <= 18; i++) {
      let t = i * 1; 
      let predX = startX + VelX * t;
      let predY = startY + VelY * t + 0.5 * gravity.y * t * t;
      ellipse(predX, predY, 5, 5);
    }
    pop();
    drawHudBox(dragStart.x, dragStart.y - 70,currentPlayer);
  }
}






function drawHudBox(x,y,player) {
  push();// Save the current drawing state
  rectMode(CENTER);
  stroke(180);
  strokeWeight(2);
  fill(255,255,255,230);
  rect(x,y,160,50,10);

  stroke(220);
  line(x, y - 25, x, y + 25);

  noStroke();
  textAlign(CENTER, CENTER);

  textSize(14);// Set text size for power and angle
  fill(100,50,150);
  text( currentPower + "%", x - 40, y - 5);

  textSize(9);
  fill(150);
  text("POWER", x - 40, y + 12);


  textSize(14);
  fill(100,50,150);

  let displayAngle = (player === 1) ? (360 - currentAngle) : currentAngle;
  text(displayAngle + "°", x + 40, y - 5);

  textSize(9);
  fill(150);
  text("angle", x + 40, y + 12);
  
  pop();
}


function isClicked(x,y,w,h)
{
  return (mouseX > x - w/2 && mouseX < x + w/2 && mouseY > y - h/2 && mouseY < y + h/2);
}





function mousePressed() {

  if (gameState === 'MENU') 
  {
    let btnX = width / 2;
    let btnW = 280;
    let btnH = 50;

    if (isClicked(btnX, height / 2 - 40, btnW, btnH)) {
      gameMode = 'PVP';
      gameState = 'TERRAIN_SELECT'; 
    } 



    else if (isClicked(btnX, height / 2 + 30, btnW, btnH)) {
      gameMode = 'AI';
      aiDifficulty = 'EASY';
      humanPlayerId = random([1, 2]);
      gameState = 'TERRAIN_SELECT';
    } 
  


    else if (isClicked(btnX, height / 2 + 100, btnW, btnH)) {
      gameMode = 'AI';
      aiDifficulty = 'MEDIUM';
      humanPlayerId = random([1, 2]);
      gameState = 'TERRAIN_SELECT';
    } 
 

    else if (isClicked(btnX, height / 2 + 170, btnW, btnH)) {
      gameMode = 'AI';
      aiDifficulty = 'HARD';
      humanPlayerId = random([1, 2]);
      gameState = 'TERRAIN_SELECT';
    }
    
    return;

  }



  if (gameState === 'TERRAIN_SELECT') {
    
    if (mouseX > width/2 - 250 && mouseX < width/2 - 100 && mouseY > 200 && mouseY < 260) 
    {
      terrainDifficulty = 'EASY';
    }
    //
    else if (mouseX > width/2 - 75 && mouseX < width/2 + 75 && mouseY > 200 && mouseY < 260) 
    {
      terrainDifficulty = 'MEDIUM';
    }
    // 
    else if (mouseX > width/2 + 100 && mouseX < width/2 + 250 && mouseY > 200 && mouseY < 260) 
    {
      terrainDifficulty = 'HARD';
    }
    
    // 
    else if (mouseX > width/2 - 75 && mouseX < width/2 + 75 && mouseY > 380 && mouseY < 440) 
    {
      isDynamicTerrain = !isDynamicTerrain; // 
    }
    
    // 
    else if (mouseX > width/2 - 125 && mouseX < width/2 + 125 && mouseY > 500 && mouseY < 570) 
    {
      generateTerrain(); // 
      
      // 
      player1.pos.y = terrain[floor(player1.pos.x)] - 50;
      player2.pos.y = terrain[floor(player2.pos.x)] - 50;
      
      gameState = 'PLAYING'; //
    }
    return; 
  }





  if (gameState === 'PLAYING') {

    if (gameMode === 'AI' && currentPlayer !== humanPlayerId) 
    {
      return;
    }

    let btnX = width - 60;
    let btnY = 60;
    if (dist(mouseX, mouseY, btnX - 180, btnY) < 30 && activeBirdie === null) 
    {
      if (!isObserving) 
      {
        isObserving = true; 
        
        
        setTimeout(() => {
          isObserving = false; 
        }, 3000);
      }
      return; 
    }

    
    if (isObserving) 
    {
      return;
    }


    let activePlayer;
    if (currentPlayer === 1) 
    {
      activePlayer = player1;
    } 

    else 
    {
    activePlayer = player2;
    }

    let worldMouseX = mouseX + camX;

    if(dist(worldMouseX, mouseY, activePlayer.pos.x, activePlayer.pos.y) < 60) //if the mouse is within 60 pixels of the active player, start dragging 
    // eslint-disable-next-line brace-style
    {
      isDragging = true;
      dragStart.set(mouseX, mouseY);
      if (typeof dragEnd !== 'undefined') 
      {
        dragEnd.set(mouseX, mouseY);
      }
    }
  }
}




function mouseReleased() //mouse event
// eslint-disable-next-line brace-style
{
  if(isDragging) {
    isDragging = false;
    let spawnX;
    let spawnY;
  
    if(currentPlayer === 1){// Set the spawn position of the birdie based on the current player
      spawnX = player1.pos.x;
      spawnY = player1.pos.y;
    }

    else {
      spawnX = player2.pos.x;
      spawnY = player2.pos.y;
    }

    let launchSpeed = map(currentPower, 0, 100, 0, 25);
    let rad = radians(currentAngle);

    let VelX = cos(rad) * launchSpeed;
    let VelY = sin(rad) * launchSpeed;


    let launchVel = createVector(VelX, VelY);
  
    activeBirdie = new Birdie(spawnX, spawnY, launchVel, img_Birdie);

    if(currentPlayer === 1) {
      player1.strike();
    }

    else {
      player2.strike();
    }

  }
}




function keyPressed() {
  if(gameState === "GAMEOVER" && (key === "r" || key === "R")) {
    player1.currentHp = player1.maxHp;
    player2.currentHp = player2.maxHp;
    currentPlayer = 1;
    activeBirdie = null;
    gameState = "PLAYING";
  }
}





class Character //class for the player characters
{
  constructor(x,y,maxHp,framsArray,side) {
    this.pos = createVector(x,y);
    this.maxHp = maxHp;
    this.currentHp = maxHp;


    this.frames = framsArray; // Array of images for the character's animation frames (idle, striking, etc.)
    this.currentFrame = 0;
    this.side = side;
    this.isStriking = false;

    this.width = 50;
    this.heights = 100;
  }


  display() {
    push();
    imageMode(CENTER);
    let currentImg = this.frames[this.currentFrame]; // Get the current frame image based on the character's state
    image(currentImg,this.pos.x,this.pos.y,this.width,this.heights);
    pop();

    this.drawHealthBar();
  }


  strike() {
    this.isStriking = true;
    this.currentFrame = 1;
  }

  updateAnimation() {
    if(this.isStriking) {
      if(frameCount % 10 === 0) {
        this.currentFrame ++;
        if(this.currentFrame >= this.frames.length) // Loop back to the first frame after the animation completes
        {
          this.currentFrame = 0;
          this.isStriking = false;
        }
      }
    }
  }

  


  drawHealthBar() {
    push();
    rectMode(CORNER);
    fill(230,50,50);
    rect(this.pos.x - 40, this.pos.y - 75,80,8,4);

    fill(50,230,100);
    let healthWidth = map(this.currentHp, 0 , this.maxHp, 0 , 80); // Map the current health to the width of the health bar
    rect(this.pos.x - 40, this.pos.y - 75, healthWidth, 8,4);
    pop();
  }


}




class Birdie {

  constructor(x,y,velocity,img) {
    this.pos = createVector(x,y);
    this.vel = velocity;
    this.img = img;
    this.width = 20;
    this.height = 20;
  }

  update() {
    this.vel.add(gravity);
    this.pos.add(this.vel);
  }

  display() {
    push();

    translate(this.pos.x, this.pos.y);
    let angle = this.vel.heading(); // Get the angle of the velocity vector for rotation
    rotate(angle + PI);

    imageMode(CENTER);
    image(this.img, 0, 0, this.width, this.height);
    pop();
  }
}



function checkCollision() {
  if(activeBirdie === null) {
    return;
  }

  let checkX = floor(activeBirdie.pos.x);

  if(checkX >= 0 && checkX < worldWidth)
  {
    if(activeBirdie.pos.y >= terrain[checkX]) 
    {
      activeBirdie = null;
      switchTurn();
      return;
    }
  }

  else
  {
    activeBirdie = null;
    switchTurn();
    return;
  }


  let targetPlayer;
  if(currentPlayer === 1) {
    targetPlayer = player2;//
  }

  else {
    targetPlayer = player1;
  }

  let hitDistance = dist(activeBirdie.pos.x, activeBirdie.pos.y, targetPlayer.pos.x, targetPlayer.pos.y); // Calculate distance between the birdie and the target player

  if(hitDistance < 60) {
    targetPlayer.currentHp -= 25;
    activeBirdie = null;

    if(targetPlayer.currentHp <= 0) {
      targetPlayer.currentHp = 0;
      gameState = "GAMEOVER";

      winner = currentPlayer === 1 ? "Player 1" : "Player 2";
    }

    else
    {
      activeBirdie = null;
      switchTurn();

    }
  }
}






function switchTurn() // Switch the current player after a turn is completed
{
  if(currentPlayer  === 1) {
    currentPlayer = 2;
  }
  else {
    currentPlayer = 1;
  }


  totalTurns++; //

  // 
  if (isDynamicTerrain && totalTurns % 2 === 0) {
    
    //
    generateTerrain(); 
    
    //
    // 
    player1.pos.y = terrain[floor(player1.pos.x)] - 50;
    player2.pos.y = terrain[floor(player2.pos.x)] - 50;
    
    // 
  }
}





function takeAITurn() {
  isAITurn = true; 
  aiShotCount++; 

  setTimeout(() => {
    let aiPlayer = (humanPlayerId === 1) ? player2 : player1;
    let targetPlayer = (humanPlayerId === 1) ? player1 : player2;

    // ==========================================
    //
    // ==========================================
    let dx = abs(targetPlayer.pos.x - aiPlayer.pos.x); 
    let dy = targetPlayer.pos.y - aiPlayer.pos.y; 
    
    // 
    let yUp = -dy; 

    // ==========================================
    // 
    // ==========================================
    let dist = sqrt(dx * dx + yUp * yUp);
    
    // 
    let perfectSpeed = sqrt(gravity.y * (dist + yUp)); 
    
    // 
    let optimalAngleRad = atan2(yUp + dist, dx); 
    let optimalAngleDeg = degrees(optimalAngleRad);

    // 
    let idealAngle;
    if (aiPlayer.pos.x > targetPlayer.pos.x) {
      // 
      idealAngle = 180 + optimalAngleDeg; 
    } else {
      // 
      idealAngle = 360 - optimalAngleDeg; 
    }

    let idealPower = map(perfectSpeed, 0, 25, 0, 100); 

    // ==========================================
    // 3. 
    // ==========================================
    let powerError = 0;
    let angleError = 0;
    
    // 地形难度修正系数 (HARD terrain时减少误差)
    let terrainModifier = 1.0;
    if (terrainDifficulty === 'HARD') {
      terrainModifier = 0.6; // Hard terrain时命中率提高40%
    } else if (terrainDifficulty === 'MEDIUM') {
      terrainModifier = 0.8; // Medium terrain时命中率提高20%
    }

    if (aiDifficulty === 'EASY') {
      powerError = random(-20, 20) * terrainModifier;
      angleError = random(-15, 15) * terrainModifier;
    } 
    else if (aiDifficulty === 'MEDIUM') {
      powerError = random(-10, 10) * terrainModifier;
      angleError = random(-8, 8) * terrainModifier;
    } 
    else if (aiDifficulty === 'HARD') {
      // 

      if (aiShotCount === 1) {
        // 

        powerError = random(-8, 8) * terrainModifier; 
        angleError = random(-5, 5) * terrainModifier;
      } else if (aiShotCount === 2) {
        // 

        powerError = random(-3, 3) * terrainModifier; 
        angleError = random(-2, 2) * terrainModifier;
      } else {
        // 

        powerError = random(-0.5, 0.5) * terrainModifier; 
        angleError = random(-0.5, 0.5) * terrainModifier;
      }
    }

    // 

    let finalPower = constrain(idealPower + powerError, 10, 100);
    let finalAngle = idealAngle + angleError; 

    // ==========================================
    // 4. 
    // ==========================================
    let launchSpeed = map(finalPower, 0, 100, 0, 25);
    let rad = radians(finalAngle);

    let launchVel = createVector(cos(rad) * launchSpeed, sin(rad) * launchSpeed);
    
    let spawnX = aiPlayer.pos.x;
    let spawnY = aiPlayer.pos.y - 30; 

    activeBirdie = new Birdie(spawnX, spawnY, launchVel, img_Birdie);
    aiPlayer.strike();
    
    isAITurn = false; 
  }, 1500);
}








function drawMenu() {
  push();
  background(40, 45, 60); 
  
  
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(255);
  text("BADMINTON BATTLE", width / 2, height / 3 - 50);

  drawButton("PVP (Double play)", width / 2, height / 2 - 40, 280, 50);
  drawButton("YOU VS AI (Easy mode)", width / 2, height / 2 + 30, 280, 50);
  drawButton("YOU VS AI (Medium mode)", width / 2, height / 2 + 100, 280, 50);
  drawButton("YOU VS AI (hard mode)", width / 2, height / 2 + 170, 280, 50);
  pop();
}





function drawButton(label, x, y, w, h) {
  rectMode(CENTER);
  
  
  if (mouseX > x - w/2 && mouseX < x + w/2 && mouseY > y - h/2 && mouseY < y + h/2) {
    fill(255, 200, 0); 
  } else {
    fill(230);         
  }
  
  stroke(0);
  strokeWeight(2);
  rect(x, y, w, h, 10); 

  fill(50);
  noStroke();
  textSize(20);
  text(label, x, y);
}




function drawLookButton() {

  if (activeBirdie !== null) return;

  if (gameMode === 'AI' && currentPlayer !== humanPlayerId) return;

  push();

  let btnX = width - 60;
  let btnY = 60;
  let btnSize = 70;


  let isHover = dist(mouseX, mouseY, btnX - 180, btnY) < btnSize / 2;

  fill(isHover ? color(200, 200, 250) : color(255, 255, 255, 220));
  
  stroke(100, 50, 150);
  strokeWeight(3);
  rectMode(CENTER);
  circle(btnX - 180, btnY, btnSize); 
  

  noStroke();
  fill(100, 50, 150);
  textAlign(CENTER, CENTER);
  textSize(10);
  text("LOOK Player", btnX - 180, btnY);
  pop();
}


function generateTerrain() {
  let noiseOffset = random(10000); //
  let noiseScale = 0.003; 

  for(let x = 0; x < worldWidth; x++) { // 
    let n = noise(x * noiseScale + noiseOffset);
    
    //
    if (terrainDifficulty === 'EASY') 
    {

      // 
      terrain[x] = map(n, 0, 1, 400, 600);
    } 

    else if (terrainDifficulty === 'MEDIUM') 
    {

      //
      terrain[x] = map(n, 0.15, 0.85, 250, 550);
    } 

    else if (terrainDifficulty === 'HARD') 
      {
      // 
      terrain[x] = map(n, 0.25, 0.75, 100, 580);
    }
    
    // 
    terrain[x] = constrain(terrain[x], 50, 580);
  }
}