// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cX = 0;
let cY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function movingball()
{
  cX += 10; 
  cY += 10; 
  if(cX > width) cX = 0;
  if(cY > height) cY = 0;
  circle(cX, cY, 25);
}

function circleLine(y, size)
{

  let xStart = width * 0.1;
  let xEnd = width * 0.9;

  for(let x = xStart; x < xEnd; x += size)
  {
    circle(x,y,size);
  }
}

function gradientBackground()
{
  let h = 5;
  let y = 0;

  noStroke();
  while (y< height)
  {
    let value = map(y,0,height,0,255);

    fill(value,255-value,0);
    rect(0,y,width,h);
    y += h;
  }

}



function draw() {
  background(220);
  gradientBackground()
  movingball()
  circleLine(height * 0.35, 30);
  circleLine(height / 2, 20);
  circleLine(height * 0.65, 10);
  
}
