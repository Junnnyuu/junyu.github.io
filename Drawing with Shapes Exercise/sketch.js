// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let headSize = 0 ;
function setup() {
  createCanvas(1000, 1000);
}

function drawCicle()
{
  noStroke();
  fill(204,255,229);
  circle(50 + headSize,50 + headSize,50 + headSize);
}

function drawRect()
{
  rect(25 + headSize ,50 + headSize ,50 + headSize ,5 + headSize );
  rect(25 + headSize ,50 + headSize ,50 + headSize ,40 + headSize );
  rect(25 + headSize ,85 + headSize ,5 + headSize ,15 + headSize );
  rect(70 + headSize ,85 + headSize ,5 + headSize ,15 + headSize );
}

function drawSmallCicle()
{
  fill(0,0,0);
  circle(50 + headSize ,26 + headSize ,10 + headSize );
}



function draw() {
  background(220);
  
  drawRect();
  drawSmallCicle();
  drawCicle();
  
}
