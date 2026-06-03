let hand;

function preload() {
  hand = loadImage("assets/hand.jpg");
}

function setup() {
  createCanvas(hand.width, hand.height);
  pixelDensity(1);

  image(hand, 0, 0);
  loadPixels();

  for (let x = 0; x < width / 2; x++) {
    for (let y = 0; y < height; y++) {// Calculate the index for the pixel array
      let loc = (y * width + x) * 4;

      let mirrorX = width - 1 - x;
      let mirrorColor = get(mirrorX, y); // Get the color of the pixel on the right side

      setPixelColor(loc, red(mirrorColor), green(mirrorColor), blue(mirrorColor));
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

function draw(){
  //background(220);
}