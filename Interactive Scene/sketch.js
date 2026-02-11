// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x = 20;
let y = 300;

function setup() {
  createCanvas(400, 400);
}


function Mountain()
{
  fill(204, 255, 255);
  noStroke();
  triangle(x + 20,y + 45, x + 20, y - 100 ,x + 130,300);
  triangle(x + 40,y + 30, x + 80, y - 200 ,x + 200,y + 30);
}



function draw() {
  if(mouseIsPressed)
    {
      background(random(200));
    }
  
  Mountain();
  fill(0,255,0);
  ellipse(200, 400, 400, 200);
}
