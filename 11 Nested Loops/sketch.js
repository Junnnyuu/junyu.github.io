// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bubbleSize = 30;
let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  generatePoints()
}

function draw() {
  background(220);
  drawBubble()
}

function drawBubble()
{
  //through our array and display
  //a bubble at each pos;
  //possible delete, if moves it close

  for(let b of bubbles)
  {
    circle(b.x)
  }
}
function generatePoints()
{
  //simple nested loop test to make
  //ordered pairs:
  // x: 0, 30, 60    y: 0, 30, 60
  for(let x = 0; x <= width; x += bubbleSize)
  {
    for(let y = 0; y <= height; y += bubbleSize)
    {
      let b = {x: x, y: y};
      bubbles.push(b);
    }

  }
}