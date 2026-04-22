// Image Manipulation
// Junyu
//


let myImage;
let pixel = [];

function preload()
{
  myImage = loadImage("assets/aviator.png");
}

function setup() {
  createCanvas(myImage.width, myImage.height);
  pixelDensity(1);
}

function draw() {
  background(220);
  image(myImage,0,0);
  loadPixels();
  for(let i = 0; i< 500; i++)
  {
    pixel[i] = 255;
  }
  updatePixels();
}
