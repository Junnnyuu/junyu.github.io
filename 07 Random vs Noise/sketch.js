// Random vs Noise
// looking at unprodictability
// specifically the difference between uniformly 

// Challenge: use noise() to make/use
let d1, d2;
let minSize = 5;
let maxSize = 200;
let x1,x2,y1,y2;



//variables for using noise();
let noiseTime = 5;
let noiseSpeed = 0.5;

let ySpeed = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x1 = width * 0.3;
  y1 = height * 0.5;
  x2 = width *0.7;
  y2 = height * 0.5;
  frameRate(132);
}



function draw() {
  background(0);
  // randomSeed(702);
  // stars();
  y2 = y2 + ySpeed;
  randomCircle();
  noiseCircle();
}


function noiseCircle()
{
  fill(200,150,50);
  d2 = noise(noiseTime); // yield value between 0-1
  d2 = map(d2, 0, 1, minSize, maxSize);
  circle(x2,y2, d2);
  noiseTime += noiseSpeed;
}

function randomCircle()
{
  //draw a fixed circle with random()
  // changing diameter

  fill(120,180,60);
  d1 = random(minSize,maxSize);
  circle(x1,y1,d1);
}


function stars() {
  //using random() to generate 100 stars
  fill(255);

  for (let i = 0; i < 100; i++) {
    let x = random(0, width);
    let y = random(0, height);
    circle(x, y, 0.1);
  }
}


