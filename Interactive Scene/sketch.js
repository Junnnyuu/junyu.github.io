// Interactive Scene
// Junyu Tang
// February 27, 2026
//
// Extra for Experts:
// - I added a feature where the user can change the background color by pressing the spacebar.
// - I also added a feature where the user can change the car color by pressing the 'C' key.
// - The character's mouth changes based on mouse wheel input, allowing for a smile, frown, or neutral expression.

let x = 20; // Starting x position for the mountains and sky elements
let y = 300;

let x_2 = 296;// Starting y position for the car and person
let x_1 = 300;

let mouthHeight = 0;

let backgroundColors = [ [180, 210, 230], [250, 200, 200], [200, 250, 200], [200, 200, 250], [255, 255, 180]  ]; // Array of background colors
let currentBgIndex = 0; // Current background index

let carColor;

function setup() {
  createCanvas(200, 200);
  carColor = color(205,204,204);
}


function Mountain()
{
  fill(102, 255, 102);
  triangle(x ,y + 45, x + 20, y - 100 ,x + 130,300);

  stroke(30, 60, 90);
  fill(102, 255, 102);
  triangle(x + 40,y + 30, x + 80, y - 200 ,x + 200,y + 30);
  triangle(x + 60, y + 30, x + 200, y - 250,x + 300, y + 30);
}


function drawsky()
{
  push();
  // Cloud 
  fill(255,255,255);
  noStroke();
  circle(x + 30, y - 120, 15); 
  circle(x + 18, y - 120, 15);
  circle(x + 25, y - 127, 15);
  
  circle(x + 180, y - 200, 15);
  circle(x + 192, y - 200, 15);
  circle(x + 185, y - 207, 15);

  circle(x + 300, y - 150, 15);
  circle(x + 288, y - 150, 15);
  circle(x + 293, y - 157, 15);


  circle(x + 190, y - 250, 15);
  circle(x + 202, y - 250, 15);
  circle(x + 195, y - 257, 15);

  circle(x + 65, y - 200, 15);
  circle(x + 78, y - 202, 15);
  circle(x + 70, y - 209, 15);

  pop();
}


function car_and_person(move_1,move_2) // draw the car and person, with parameters for the car's x and yposition 
{
  push();
  fill(carColor);
  rect(move_1,move_2 - 16,30,13); // Car body
  fill(0,0,0);
  circle(move_1 + 3,move_2,7); // Left wheel
  circle(move_1 + 29,move_2,7); // Right wheel

  stroke(0);
  strokeWeight(2);
  fill(255);
  ellipse(move_1 + 13, move_2 - 50, 20, 20); // Head
  line(move_1 + 13, move_2 - 40, move_1 + 13, move_2 - 25); // Body
  line(move_1 + 3, move_2 - 30, move_1 + 24, move_2 - 30); // Arms
  line(move_1 + 13, move_2 - 25, move_1 + 3, move_2 - 15); // Left leg
  line(move_1 + 13, move_2 - 25, move_1 + 23, move_2 - 15); // Right leg
  
  fill(0);
  noStroke();

  if(mouseIsPressed && mouseButton === LEFT) // Change to "angry" eyes when the left mouse button is pressed
  {
    rect(move_1 + 6, move_2 - 53, 4, 2);
    rect(move_1 + 16, move_2 - 53, 4, 2);
  }
  else
  {
    ellipse(move_1 + 8, move_2 - 52, 3, 3); // Left eye
    ellipse(move_1 + 18, move_2 - 52, 3, 3); // Right eye
  }
  noFill();
  stroke(0);


  if (mouthHeight > 0) { // Smile
    arc(move_1 + 13, move_2 - 46, 10, mouthHeight, 0, PI); // Smile
  }

  else if(mouthHeight < 0) // cry
  {
    arc(move_1 + 13, move_2 - 46, 10, abs(mouthHeight), PI, 0); // Frown/cry (upward)
  }

  else 
  {
    line(move_1 + 8, move_2 - 46, move_1 + 18, move_2 - 46); // Neutral mouth
  }

  pop();
}



function mouseWheel(event) // Change mouth expression 
{
  if(event.delta > 0) // Scroll down
  {
    mouthHeight -= 2;
  }

  if(event.delta < 0) // Scroll up
  {
    mouthHeight += 2;
  }

  mouthHeight = constrain(mouthHeight, -5, 5);

}



  
// keyboard events, press LEFT ARROW to change background color
function keyPressed() {
  if (key === ' ') {
    currentBgIndex = (currentBgIndex + 1) % backgroundColors.length;
  }

  if (key === 'c' || key === 'C') {
    carColor = color(random(255), random(255), random(255));
  }
}


function draw() {

  x_1 = constrain(mouseX, 10, width - 10); // Constrain the car's x position to stay within the canvas

  background(backgroundColors[currentBgIndex]);// Set the background color based on the current index
  Mountain();
  drawsky();


  fill(204,255,204);
  noStroke();
  rect(0,300,400,250);

  car_and_person(x_1,x_2); // Draw the car and person with the current x position and fixed y position
  
  fill('limegreen');
  text('Junyu', 300, 350);
}
