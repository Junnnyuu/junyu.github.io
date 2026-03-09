// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let changeValue = 0;
let t = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  generateTerrain();
}



function draw() {
  //background(220);
}



function generateTerrain()
{
  for (let x = 0; x < width; x += changeValue)
  {
    let y = noise(x/100 + t) * height;
    rect(x, y, 1, height - y);
  }
  t += 0.01;
}


function  keyPressed()
{
  generateTerrain();

  if(key == "left")
  {
    changeValue -= 0.5;
  }
  if(key == "right")
  {
    changeValue += 0.5;
  }
}