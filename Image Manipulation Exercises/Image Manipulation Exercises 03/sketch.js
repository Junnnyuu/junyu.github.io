let nuit; // p5.Image

function preload() {
  nuit = loadImage("assets/nuit.jpg");
}

function setup() {
  createCanvas(nuit.width, nuit.height);
  pixelDensity(1);

  image(nuit, 0, 0);
  loadPixels();


  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let loc = (y * width + x) * 4;
      let r = pixels[loc];
      let g = pixels[loc + 1];
      let b = pixels[loc + 2];

  
      let avgIntensity = (r + g + b) / 3; // Average intensity of the pixel

      // Map the average intensity to a color palette
      if (avgIntensity >= 205) {
        setPixelColor(loc, 170, 230, 220); 
      }
      else if (avgIntensity >= 155) {
        setPixelColor(loc, 105, 150, 210);
      }
      else if (avgIntensity >= 105) {
        setPixelColor(loc, 120, 180, 60); 
      } 
      else if (avgIntensity >= 55) {
        setPixelColor(loc, 130, 30, 130);
      } 
      else {
        setPixelColor(loc, 90, 10, 50); 
      }
    }
  }

  updatePixels();
}





function setPixelColor(pos, r, g, b) {
  // Assume pos points to a RED component
  pixels[pos] = r;
  pixels[pos + 1] = g;
  pixels[pos + 2] = b;
}

function draw() {
  //background(220);
}