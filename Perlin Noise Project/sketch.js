// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let changeValue_2 = 0.01;
let t = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  drawFlag(20,20);
  generateTerrain();
}



function draw() {
  background(220);
  generateTerrain();
  drawFlag(20,20);
}



function generateTerrain()
{
  let changeValue = changeValue_2;
  for (let x = 0; x < width; x+=changeValue)
  {
    let y = noise(x*0.01) * height;
    
    rect(x, y, changeValue, height - y);
  }
}


function  keyPressed()
{
  if(keyCode === LEFT_ARROW)
  {
    changeValue_2 -= 5;
    changeValue_2 = max(changeValue_2, 1); 
  }
  if(keyCode === RIGHT_ARROW)
  {
    changeValue_2 += 5;
    changeValue_2 = min(changeValue_2, width);
  }

}


function drawFlag(x,y)
{
  rect(x, y, x-20, y-10);
  triangle(x, y, x, y-10, x+10, y-5);
}