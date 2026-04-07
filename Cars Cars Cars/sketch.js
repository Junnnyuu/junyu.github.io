// Car Car Car
// Junyu Tang
// April 5, 2026
//  This project simulates vehicle operations on a section of two-way roadway

let car;
let trafficLight;

let eastbound = []; // Array to hold eastbound vehicles
let westbound = [];

let addDownCar = 2;


function setup() 
{
  createCanvas(600, 400);


  trafficLight = new TrafficLight(15, height - 20);

  let xSpeed = random(1, 5); // Random speed for initial vehicles
  let add_down_Car = addDownCar;
  for (let i = 0; i < add_down_Car; i++) // Add initial vehicles to eastbound
  {
    let y = random(10, 120);
    eastbound.push(new Vehicle(random(0, width), y,0, 2, xSpeed)); // Add cars to eastbound
    eastbound.push(new Vehicle(random(0, width), y,1, 2, xSpeed));
  }

  for (let i = 0; i < add_down_Car; i++) 
  {
    let y = random(230, 320);
    westbound.push(new Vehicle(random(0, width), y, 0, 1, xSpeed));
    westbound.push(new Vehicle(random(0, width), y, 1, 1, xSpeed));
  }
}

function draw() 
{
  background(200);
  drawRoad();

  for (let i = 0; i < eastbound.length; i++) 
  {
    eastbound[i].action(); // Perform vehicle behavior
  }


  // Update westbound vehicles
  for (let i = 0; i < westbound.length; i++) 
  {
    westbound[i].action(); // Perform vehicle behavior
  }

  trafficLight.update();
  trafficLight.display();
}

function drawRoad() 
{
  noStroke();
  fill(0);
  rect(0, 0, width, height);

  stroke('magenta');
  strokeWeight(3);
  for (let i = 0; i < width; i += 40) 
  {
    line(i, height / 2, i + 20, height / 2); // Draw dashed center line
  }
}

class Vehicle 
{
  constructor(x, y, type, direction, xSpeed) 
  {
    this.x = x;
    this.y = y;
    this.type = type;
    this.direction = direction;
    this.xSpeed = xSpeed;
    this.width = 30;
    this.height = 20;
    this.color = color(random(255), random(255), random(255));
  }


  display() 
  {
    push();
    translate(this.x, this.y);

    if (this.direction === 1) // Westbound vehicles face left, so flip horizontally
    {
      scale(-1, 1);
    }

    if (this.type === 0) // Type 0 is a car
    {
      this.drawCar();
  
    }

    else if (this.type === 1)  // Type 1 is a truck
    {
      this.drawTruck();
    }

    pop();
  }


  drawCar()
  {
    fill(this.color);
    noStroke();
    rect(-this.width / 2, - this.height / 2, this.width, this.height); // Car body

    fill(200);
    let wheelR = 2; // Wheel radius
    let wheelY = this.height / 2 + wheelR;

    ellipse(this.width / 3, wheelY, wheelR * 3, wheelR * 2); // Front wheel
    ellipse(-this.width / 3, wheelY, wheelR * 3, wheelR * 2);

  }


  drawTruck() 
  {
    fill(this.color);
    noStroke();
    rect(-this.width / 2, - this.height / 2, this.width, this.height); // Truck body

    stroke(255);
    strokeWeight(1);

    let lineX; // Position of the dividing line between cab and trailer
    lineX = this.width / 2 - 5;
    line(lineX, -this.height / 2, lineX, this.height / 2);
  }







  move() 
  {
    if (this.direction === 2) // Eastbound
    {
      this.x += this.xSpeed;
    } 
    

    else if (this.direction === 1) // Westbound
    {
      this.x -= this.xSpeed;
    }


    if (this.x > width + this.width / 2) // If vehicle goes off the right edge, wrap to left
    {
      this.x = -this.width / 2;
    } 

    
    else if (this.x < -this.width / 2) 
    {
      this.x = width + this.width / 2;
    }
  }



  speedUp() 
  {
    this.xSpeed += 0.5;
    if (this.xSpeed > 10) this.xSpeed = 10; // Cap speed at 10
  }


  changeColor() 
  {
    this.color = color(random(255), random(255), random(255));
  }



  speedDown() 
  {
    this.xSpeed -= 0.5;
    if (this.xSpeed < 0) this.xSpeed = 0;
  }




  action() {
    // Only move if traffic light is green
    if (trafficLight.isGreen()) 
    {
      this.move();
    }

    this.display();

    if (random(1) < 0.01) // 1% chance to speed up
    {
      this.speedUp();
    }

    if (random(1) < 0.01) 
    {
      this.speedDown();
    }

    if (random(1) < 0.01) 
    {
      this.changeColor();
    }

  }
}

function mousePressed() 
{
  let y, xSpeed, type;

  // determine vehicle type (0 for car, 1 for truck)
  if (random(1) < 0.5)
  {
    type = 1;
  }
  else 
  {
    type = 0;
  }


  if (mouseButton === LEFT && keyIsDown(SHIFT)) // Add new vehicles to westbound
  {
    y = random(230, 320);
    xSpeed = random(1, 10);
    westbound.push(new Vehicle(random(0, width), y, type,1, xSpeed));
  }


  else if (mouseButton === LEFT) 
  {
    addDownCar += 1;
    // Add new vehicles to eastbound
    y = random(10, 120);
    xSpeed = random(1, 2);

    eastbound.push(new Vehicle(random(0, width), y, type, 2, xSpeed));

  }

  return false;
}

function keyPressed() 
{
  if (key === ' ') 
  {
    trafficLight.turnRed();
    return false;
  }
}



// TrafficLight class: controls light behavior
class TrafficLight 
{
  constructor(x, y) 
  {
    this.x = x;
    this.y = y;
    this.state = "green"; // Initial state
    this.frameCount = 0; //
  }

  // Draw the traffic light
  display() 
  {
    fill(this.state === "green" ? color(0, 255, 0) : color(255, 0, 0));
    ellipse(this.x, this.y, 30, 30);
  }

  // Update light state
  update() 
  {
    if (this.state === "red") 
    {
      this.frameCount--;
      if (this.frameCount <= 0) 
      {
        this.state = "green";
      }
    }
  }

  // Switch to red for 120 frames
  turnRed() 
  {
    if (this.state === "green") 
    {
      this.state = "red";
      this.frameCount = 120;
    }
  }

  // Check if the light is green
  isGreen() {
    return this.state === "green";
  }
}
