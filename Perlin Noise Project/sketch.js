// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let rectWidth = 1;
let noiseSet = 0;
let noiseValue = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateTerrain();
}

function generateTerrain(){
  let highestHeight = -Infinity;
  let highestX = 0;
  let highestY = 0;
  // use a loop to generate and draw
  // several rectangles side to side
  // to look like some 2D terrain
  rectMode(CORNERS);

  for(let x = 0; x < width; x += rectWidth){
    //generate a random height. 
    //change this from using random() to noise()
    let rectHeight = map(noise(noiseValue), 0, 1, 50, 1000); 
    
    //calculate the other corner of our rectangle
    let x2 = x + rectWidth;
    let y2 = height - rectHeight;

    rect(x, height, x2, y2);

    if (rectHeight > highestHeight) 
    {
      highestHeight = rectHeight;
      highestX = x + rectWidth / 2;
      highestY = y2;
    }

    totalHeight += rectHeight; 
    count++;

    noiseValue += 0.01;
  }
  
  rectMode(CORNER);
}

function draw() {
  background(220);
  generateTerrain();
  noiseValue += 0.05;
}