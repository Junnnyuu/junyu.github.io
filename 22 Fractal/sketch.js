// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  //centerCircle(width/2, height/2,width);
  //circleFractal(width/2, height/2,300);
  lucky(width/2, height/2,300);
}


function lucky(x,y,s)
{
  rectMode(CENTER);
  noFill();
  

  if(s > 10)
  {

    let r = map(x,0,width,0,255);
    let g = map(y,0,height, 0, 255);
    let b = map(x, 0, width,255,0);
    stroke(r,g,b);
    square(x,y,s);



    square(x,y,s);
    lucky(x - s/2, y - s/2, s * 0.45);
    lucky(x + s/2, y - s/2, s * 0.45);
    lucky(x - s/2, y + s/2, s * 0.45);
    lucky(x + s/2, y + s/2, s * 0.45);
  }

}

function circleFractal(x,y,d)
{
  noFill();
  if(d > 10)
  {
    circle(x,y,d);
    circleFractal(x- d/2, y, d/2);
    circleFractal(x+ d/2, y, d/2);
    circleFractal(x, y, d/2);
    circleFractal(x, y + d/2, d/2);
  }

}

function centerCircle(x,y,d)
{
  if(d > 10)
  {
    circle(x,y,d);
    centerCircle(x,y,d*0.95);
  }
}
