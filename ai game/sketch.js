// Car car car
// JunyuTang
// Apr 22
// This project simulates vehicle operations on a section of two-way roadway。



// Global arrays to store eastbound and westbound vehicles
let eastbound = [];
let westbound = [];
let trafficLight;
let road;

function setup() {
  createCanvas(600, 400); // Create a canvas of 600x400
  road = new Road(); // Initialize road object
  trafficLight = new TrafficLight(20, 320); // Initialize traffic light at position (20, 320)

  // Initialize 20 eastbound vehicles
  for (let i = 0; i < 20; i++) {
    let y = random(10, 120); // Position on the upper part of the road
    let xSpeed = random(1, 3); // Positive speed (moving right)
    eastbound.push(new Vehicle(random([0, 10]), random(0, width), y, 1, xSpeed));
  }

  // Initialize 20 westbound vehicles
  for (let i = 0; i < 20; i++) {
    let y = random(160, 280); // Position on the lower part of the road
    let xSpeed = random(-3, -1); // Negative speed (moving left)
    westbound.push(new Vehicle(random([0, 10]), random(0, width), y, -1, xSpeed));
  }
}

function draw() {
  background(220); // Clear the canvas
  road.display(); // Draw the road
  trafficLight.update(); // Update the traffic light
  trafficLight.display(); // Draw the traffic light

  // Update eastbound vehicles
  for (let vehicle of eastbound) {
    vehicle.checkCollision(eastbound); // Check collision within the eastbound group
    vehicle.action(); // Perform vehicle behavior
  }

  // Update westbound vehicles
  for (let vehicle of westbound) {
    vehicle.checkCollision(westbound); 
    vehicle.action(); // Perform vehicle behavior
  }
}

// Mouse click event: Add a new vehicle
function mousePressed() {
  let y, xSpeed, direction;

  if (keyIsDown(SHIFT)) {
    // Shift + click: Add a westbound vehicle
    y = random(160, 280); // Lower part of the road
    xSpeed = random(-3, -1); 
    direction = 0; // Direction 0 means left
    westbound.push(new Vehicle(random([0, 10]), mouseX, y, direction, xSpeed));
  } else {
    // Regular click: Add an eastbound vehicle
    y = random(10, 120); // Upper part of the road
    xSpeed = random(1, 3); 
    direction = 1; // Direction 1 means right
    eastbound.push(new Vehicle(random([0, 10]), mouseX, y, direction, xSpeed));
  }
}

// Press spacebar to turn the light red
function keyPressed() {
  if (key === ' ') {
    trafficLight.turnRed(); // Switch traffic light to red
  }
}

// Road class: handles rendering the road
class Road {
  constructor() {
    this.width = 600; 
    this.height = 300; 
    this.y = 0; // Road top position
  }

  // Draw the road including the dashed line
  display() {
    fill(0); // Black road fill
    rect(0, this.y, this.width, this.height);

    stroke(255); // White dashed center line
    strokeWeight(2);
    this.setLineDash([10, 10]); // Set dash pattern
    line(0, this.y + this.height / 2, this.width, this.y + this.height / 2);
    this.setLineDash([]); // Reset to solid lines
  }

  // Helper: set dash pattern
  setLineDash(list) {
    drawingContext.setLineDash(list);
  }
}

// Vehicle class: represents a single vehicle
class Vehicle {
  constructor(type, x, y, direction, xSpeed) {
    this.type = type; // 0 = car, 1 = truck
    this.x = x;
    this.y = y;
    this.direction = direction; // 0 = left, 1 = right
    this.xSpeed = xSpeed;
    this.color = this.type === 0 ? color(255, 165, 0) : color(128, 0, 128); // Orange or purple
    this.width = this.type === 0 ? 30 : 30;
    this.height = this.type === 0 ? 15 : 20;
  }

  // Draw the vehicle
  display() {
    push(); // Save current drawing state
    translate(this.x, this.y); // Move to vehicle position

    if (this.direction === 0) {
      scale(-1, 1); // Flip horizontally for leftward direction
    }

    // Draw the body
    fill(this.color);
    noStroke();
    rect(-this.width / 2, -this.height / 2, this.width, this.height);

    if (this.type === 0) {
      // Draw wheels for a car
      fill(200); // Gray wheels
      let wheelRadius = 2;
      let wheelOffsetY = this.height / 2 + wheelRadius;
      ellipse(-this.width / 3, wheelOffsetY, wheelRadius * 2, wheelRadius * 2); 
      ellipse(-this.width / 6, wheelOffsetY, wheelRadius * 2, wheelRadius * 2); // Left rear
      ellipse(this.width / 3, wheelOffsetY, wheelRadius * 2, wheelRadius * 2); 
      ellipse(this.width / 6, wheelOffsetY, wheelRadius * 2, wheelRadius * 2); // Right rear
    } else {
      // Draw white stripe on truck cab
      stroke(255);
      strokeWeight(1);
      let lineX = this.direction === 1 ? -this.width / 2 + 5 : this.width / 2 - 5;
      line(lineX, -this.height / 2, lineX, this.height / 2);
    }

    pop(); // Restore drawing state
  }

  // Update vehicle position
  move() {
    if (trafficLight.isGreen()) {
      this.x += this.direction === 1 ? this.xSpeed : -this.xSpeed;
    }

    // Wrap around the canvas when out of bounds
    if (this.x > width + this.width / 2) {
      this.x = -this.width / 2;
    } else if (this.x < -this.width / 2) {
      this.x = width + this.width / 2;
    }
  }

  // Accelerate up to a max speed
  speedUp() {
    this.xSpeed += 0.5;
    if (this.xSpeed > 15) this.xSpeed = 15;
  }

  // Slow down but not below 0
  speedDown() {
    this.xSpeed -= 0.5;
    if (this.xSpeed < 0) this.xSpeed = 0;
  }

  // Change to a random color
  changeColor() {
    this.color = color(random(255), random(255), random(255));
  }

  // Check for collision with vehicles in the same direction
  checkCollision(vehicles) {
    for (let other of vehicles) {
      if (other === this) continue;

      let distance = abs(this.x - other.x);
      let minDistance = (this.width + other.width) / 2 + 10; // Minimum safe distance

      if (distance < minDistance && abs(this.y - other.y) < 10) {
        if ((this.direction === 1 && this.x < other.x) ||
            (this.direction === 0 && this.x > other.x)) {
          this.speedDown();
          other.speedUp();
        }
      }
    }
  }

  // Perform behavior logic
  action() {
    this.move();
    this.display();

    if (trafficLight.isGreen()) {
      if (random(100) < 1) this.speedUp();
      if (random(100) < 1) this.speedDown();
      if (random(100) < 1) this.changeColor();
    }
  }
}

// TrafficLight class: controls light behavior
class TrafficLight {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.state = "green"; // Initial state
    this.frameCount = 0; 
  }

  // Draw the traffic light
  display() {
    fill(this.state === "green" ? color(0, 255, 0) : color(255, 0, 0));
    ellipse(this.x, this.y, 30, 30);
  }

  // Update light state
  update() {
    if (this.state === "red") {
      this.frameCount--;
      if (this.frameCount <= 0) {
        this.state = "green";
      }
    }
  }

  // Switch to red for 120 frames
  turnRed() {
    if (this.state === "green") {
      this.state = "red";
      this.frameCount = 120;
    }
  }

  // Check if the light is green
  isGreen() {
    return this.state === "green";
  }
}