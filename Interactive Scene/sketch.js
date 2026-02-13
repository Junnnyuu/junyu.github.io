// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 20;
let y = 300;

let random_1 = random(0,200);
let random_2 = random(100,200);

function setup() {
  createCanvas(400, 400);
}


function Mountain()
{
  fill(102, 255, 102);
  noStroke();
  triangle(x + 20,y + 45, x + 20, y - 100 ,x + 130,300);
  triangle(x + 40,y + 30, x + 80, y - 200 ,x + 200,y + 30);
}


function drawsky()
{
  fill(255,255,255);
  circle(x + 30, y - 120, 15);
  circle(x + 18, y - 120, 15);
  circle(x + 25, y - 127, 15);
  
  circle(x + 180, y - 200, 15);
  circle(x + 192, y - 200, 15);
  circle(x + 185, y - 207, 15);

  circle(x + 300, y - 150, 15);
  circle(x + 288, y - 150, 15);
  circle(x + 293, y - 157, 15);


  // ellipse(x + 30, y - 120, 30, 20);
}



function car()
{
  fill(205,204,204);
  rect(300,280,30,13);
  fill(0,0,0);
  circle(303,296,7);
  circle(329,296,7);
}

function draw() {
  background(204,229,255);
  Mountain();
  drawsky();
  car();
  fill(204,255,204);
  rect(0,300,400,250);
}
