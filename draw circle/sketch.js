// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(400,400);
}

function drawCircle()
{
  for(let i = 0;i<20;i++)
  {
    circle(0 + i * 25,0 + i * 25,25);
    circle(0 + i * 25,400 - i * 25,25);
  }
}
function draw() {
  background(220);
  drawCircle()
}
