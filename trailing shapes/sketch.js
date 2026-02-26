// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let dimeter = 50;
let x,y;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  x = lerp(x,mouseX,0.5);
  y = lerp(y,mouseY,0.5);


  let r = map(x,0,width,0,255)


}

function mouseWheel(event)
{
  if(event.delta < 0)
  {
    dimeter += 5;
  }

  else
  {
    dimeter -= 5;
  }
}