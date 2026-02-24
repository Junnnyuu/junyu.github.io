// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(300,300);
}


function drawTriangle()
{
  for(let i = 0; i < 10; i++)
  {
    triangle(0,0,30 + i * 10,0,mouseX,mouseY);
  }
  

  triangle(0,0,0,30,mouseX,mouseY);
}

function draw() {
  background(220);
  drawTriangle();
}
