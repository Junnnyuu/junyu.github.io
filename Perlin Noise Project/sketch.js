// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let changeValue_2 = 0.1;
let t = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  drawFlag(20,20);
  generateTerrain();
}



function draw() {
  background(220);
  generateTerrain();
  t += 0.04;
}



function generateTerrain()
{
  let highestHeight = -Infinity;
  let changeValue = changeValue_2;
  let highestX = 0;
  let highestY = 0;

  let totalHeight = 0; 
  let count = 0;

  for (let x = 0; x < width; x+=changeValue)
  {
    let y = noise(x*0.02 + t) * height;
    let rectHeight = height - y;
    
    fill(0,0,0);
    rect(x, y, changeValue, rectHeight);

    if (rectHeight > highestHeight)
    {
      highestHeight = rectHeight;
      highestX = x + changeValue/2;
      highestY = y;
    }

    totalHeight += rectHeight; 
    count++;
  }

  drawFlag(highestX, highestY - 5);

  // Draw average height band
  let avgHeight = totalHeight / count;
  let avgY = height - avgHeight;
  fill(255,0,0);
  noStroke();
  rect(0, avgY - 2, width, 3); // Draw a horizontal band

}


function  keyPressed()
{
  if(keyCode === LEFT_ARROW)
  {
    changeValue_2 -= 0.5;
    changeValue_2 = max(changeValue_2, 1); 
  }
  if(keyCode === RIGHT_ARROW)
  {
    changeValue_2 += 0.5;
    changeValue_2 = min(changeValue_2, width);
  }

}


function drawFlag(x,y)
{
  fill(0,0,0);
  triangle(x, y + 1, x, y-6, x+6, y-3);

  fill(0,0,0);
  stroke(0, 0, 0);
  strokeWeight(2);
  line(x, y - 5, x, y + 5);
}