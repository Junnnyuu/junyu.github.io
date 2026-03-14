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
}



function generateTerrain()
{
  let highestHeight = -Infinity;
  let changeValue = changeValue_2;
  let highestX = 0;
  let highestY = 0;

  for (let x = 0; x < width; x+=changeValue)
  {
    let y = noise(x*0.02) * height;
    
    rect(x, y, changeValue, height - y);

    if (height - y > highestHeight)
    {
      highestHeight = height - y;
      highestX = x + changeValue/2;
      highestY = y;
    }
  }

  drawFlag(highestX, highestY - 5);





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
  line(x, y, x, y+10);
  triangle(x, y, x, y-6, x+5, y-3);
}