// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let chip;

function preload() {
  // Ensure chip.jpg is in your assets folder
  chip = loadImage("assets/chip.jpg");
}

function setup() {
  // Create canvas based on the image size
  createCanvas(chip.width, chip.height);
  pixelDensity(1);
  
  // Display the image once to load it into the canvas
  image(chip, 0, 0);
  

  loadPixels();

  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];

    // Tie-breaking logic: 
    // 1. Check if Red is greatest or tied for greatest
    if (r >= g && r >= b) {
      setPixelOneD(i, 255, 0, 0); // Pure Red
    } 
    // 2. If Red didn't win, check if Green is greatest or tied with Blue
    else if (g >= b) {
      setPixelOneD(i, 0, 255, 0); 
    } 

    else {
      setPixelOneD(i, 0, 0, 255); // Pure Blue
    }
  }

  // Apply the changes back to the canvas
  updatePixels();
}

function setPixelOneD(pos, r, g, b) {
  pixels[pos] = r;     // Red
  pixels[pos + 1] = g; // Green
  pixels[pos + 2] = b; // Blue
}



function draw() {
  //background(220);
  
}