let frontLineY, targetY;
let regions = [];
let gameState = "START"; // START, PLAY, WIN, LOSE
let supplies = 100;

function setup() {
  createCanvas(600, 400);
  frontLineY = height / 2;
  targetY = height / 2;
  
  // Fixed landmark positions
  regions = [
    { name: "Yalu River (Victory)", y: 40 },
    { name: "38th Parallel", y: 200 },
    { name: "Pusan Perimeter (Danger)", y: 360 }
  ];
}

function draw() {
  background(240);

  if (gameState === "START") {
    drawStartScreen();
  } else if (gameState === "PLAY") {
    runGameLogic();
  } else {
    drawEndScreen();
  }
}

function runGameLogic() {
  // 1. Update movement with boundaries
  frontLineY = lerp(frontLineY, targetY, 0.05);
  
  // Passive enemy pressure (The line slowly drifts South)
  targetY += 0.15; 
  
  // Passive supply drain
  supplies -= 0.03;

  // 2. Draw Territories
  noStroke();
  fill(255, 100, 100); // North (Red)
  rect(0, 0, width, frontLineY);
  fill(100, 100, 255); // South (Blue)
  rect(0, frontLineY, width, height - frontLineY);

  // 3. Draw Landmarks (Fixed Text Alignment)
  stroke(0, 50);
  for (let r of regions) {
    line(0, r.y, width, r.y);
    noStroke();
    fill(40);
    textAlign(LEFT);
    textSize(12);
    text(r.name, 10, r.y - 5);
  }

  // 4. UI Overlay
  drawUI();

  // 5. Win/Loss Conditions
  if (frontLineY < 45) gameState = "WIN";
  if (frontLineY > 355 || supplies <= 0) gameState = "LOSE";
}

function drawUI() {
  fill(255);
  rect(width/2 - 60, 10, 120, 30, 5);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(`Supplies: ${floor(supplies)}%`, width/2, 25);
  
  textSize(12);
  fill(255);
  text("CLICK TO ADVANCE NORTH", width/2, height - 20);
}

function drawStartScreen() {
  textAlign(CENTER, CENTER);
  fill(50);
  textSize(30);
  text("KOREA: FRONTLINE", width/2, height/2 - 40);
  textSize(16);
  text("Push the line to the Yalu River.\nDon't run out of supplies.\n\n[ Press SPACE to Start ]", width/2, height/2 + 40);
}

function drawEndScreen() {
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(gameState === "WIN" ? "green" : "red");
  text(gameState === "WIN" ? "ARMISTICE ACHIEVED" : "RETREAT DECLARED", width/2, height/2 - 20);
  fill(50);
  textSize(16);
  text("Press 'R' to Restart", width/2, height/2 + 30);
}

function mousePressed() {
  if (gameState === "PLAY" && supplies > 0) {
    // Pushing the line North (up the Y-axis)
    targetY -= 35;
    supplies -= 4; // Each offensive costs supplies
    targetY = constrain(targetY, 20, 380);
  }
}

function keyPressed() {
  if (key === ' ' && gameState === "START") {
    gameState = "PLAY";
  }
  if ((key === 'r' || key === 'R') && (gameState === "WIN" || gameState === "LOSE")) {
    restartGame();
  }
}

function restartGame() {
  frontLineY = height / 2;
  targetY = height / 2;
  supplies = 100;
  gameState = "PLAY";
}