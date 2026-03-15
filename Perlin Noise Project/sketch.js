// Perlin Noise Terrain
// Junyu Tang
// March 15, 2026
// Extra for Experts: Use the noise() to make the terrain is generated

let changeValue_2 = 0.1; // can be changed by left and right arrow keys
let t = 0; // time variable for animation


function setup() {
  createCanvas(windowWidth, windowHeight);
  drawFlag(20,20);
  generateTerrain();
}



function draw() {
  background(220);
  generateTerrain();
  t += 0.04; // Increment time for animation
}



function generateTerrain()
{
  let highestHeight = -Infinity; // Ensure any height will be higher
  let changeValue = changeValue_2;
  let highestX = 0; // X coordinate of the highest point
  let highestY = 0; 

  let totalHeight = 0; // For calculating average height
  let count = 0;

  for (let x = 0; x < width; x+=changeValue)
  {
    let y = noise(x*0.02 + t) * height; // Scale noise for more interesting terrain
    let rectHeight = height - y;
    
    fill(0,0,0);
    rect(x, y, changeValue, rectHeight);

    // Check if this is the highest point
    if (rectHeight > highestHeight) 
    {
      highestHeight = rectHeight;
      highestX = x + changeValue/2;
      highestY = y;
    }

    totalHeight += rectHeight; // Accumulate height for average calculation
    count++;
  }

  drawFlag(highestX, highestY - 5);

  // Draw average height band
  let avgHeight = totalHeight / count;
  let avgY = height - avgHeight;
  fill(255,0,0);
  noStroke();
  rect(0, avgY - 2, width, 3); 
}

// Use left and right arrow keys to adjust the changeValue_2
function  keyPressed()
{
  if(keyCode === LEFT_ARROW)
  {
    changeValue_2 -= 0.5;
    changeValue_2 = max(changeValue_2, 1); 
    t = 0; // Reset time to see the effect immediately
  }
  if(keyCode === RIGHT_ARROW)
  {
    changeValue_2 += 0.5;
    changeValue_2 = min(changeValue_2, width);
    t = 0;
  }

}


function drawFlag(x,y)
{ 
  // Draw flag pole
  fill(0,0,0);
  triangle(x, y + 1, x, y-6, x+6, y-3);

  fill(0,0,0);
  stroke(0, 0, 0);
  strokeWeight(2);
  line(x, y - 5, x, y + 5);
}