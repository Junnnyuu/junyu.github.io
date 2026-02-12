// Project Title
// Your Name
// Date
//
// Extra for Experts:
// In python - run- to- completion

// p5js - we write interactive 

// setup() -> we write once at the start
// draw() -> runs over and over (after setup)

// screen is updated at the bottom of draw


//    ------  Global variable section -------

// simple data types


let stickmanX = 200; // Initial X position of the stickman
let stickmanY = 270; // Standing Y position of the stickman
let backgroundColors = [ [180, 210, 230], [250, 200, 200], [200, 250, 200], [200, 200, 250], [255, 255, 180]  ];
let currentBgIndex = 0; // Current background index

function setup() {
  createCanvas(600, 400);
}


// Function to draw mountains
function drawMountain(x1, y1, x2, y2, x3, y3, col) {
  fill(col);
  stroke(30, 60, 90);
  triangle(x1, y1, x2, y2, x3, y3);
}


function draw() {
  // Set background color
  background(backgroundColors[currentBgIndex]);

  // Draw sun / moon
  fill(255, 230, 180);
  noStroke();
  ellipse(100, 80, 60, 60);

  // Draw distant mountains
  drawMountain(100, 300, 250, 120, 400, 300, color(80, 120, 160)); 
  drawMountain(200, 300, 350, 100, 500, 300, color(60, 100, 140));
  drawMountain(300, 300, 450, 140, 600, 300, color(50, 90, 130));

  // Draw foreground mountains
  drawMountain(50, 300, 200, 80, 350, 300, color(40, 80, 120));
  drawMountain(250, 300, 400, 90, 550, 300, color(30, 70, 110));

  // Draw snowy ground
  fill(220, 240, 255);
  rect(0, 300, width, 100);

  // Draw clouds
  drawCloud(200, 80)
  drawCloud(300, 100)
  drawCloud(390, 100);
  drawCloud(460, 120);
  drawCloud(520, 90);



  // Draw stickman
  man(stickmanX, stickmanY);
  fill('limegreen');
  text('Junyu', 520, 390);
}



// Function to draw clouds
function drawCloud(x, y) {
  fill(255);
  noStroke();
  ellipse(x, y, 40, 30);
  ellipse(x + 20, y - 10, 40, 30);
  ellipse(x + 40, y, 40, 30);
  ellipse(x + 20, y + 10, 40, 30);
}


// Function to draw stickman
function man(x, y) {
  stroke(0);
  strokeWeight(2);
  fill(255);
  ellipse(x, y - 20, 20, 20); // Head
  line(x, y - 10, x, y + 30); // Body
  line(x - 15, y + 10, x + 15, y + 10); // Arms
  line(x, y + 30, x - 10, y + 50); // Left leg
  line(x, y + 30, x + 10, y + 50); // Right leg
  fill(0);
  ellipse(x - 5, y - 22, 3, 3); // Left eye
  ellipse(x + 5, y - 22, 3, 3); // Right eye
  noFill();
  arc(x, y - 18, 10, 5, 0, PI); // Smile
}

// control stickman left and right
function mouseMoved() {
  stickmanX = constrain(mouseX, 10, width - 10); // Prevents stickman from going off screen
}

// keyboard events, press LEFT ARROW to change background color
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    currentBgIndex = (currentBgIndex + 1) % backgroundColors.length; // Cycle through 5 colors
  }
}