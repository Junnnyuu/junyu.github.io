let race; 

function preload() {
  race = loadImage("assets/race.jpg");
}

function setup() {
  createCanvas(race.width, race.height);
  pixelDensity(1);

  image(race, 0, 0);
  loadPixels();

  for (let x = 0; x < width; x++) { // Loop through all the columns
    for (let y = 0; y < height; y++) { // Loop through all the rows
      if (x > width / 2) {
        let c = get(x, y);
        set(x, y, color(red(c), 0, blue(c)));
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
  //background(0); 

}
