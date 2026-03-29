// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let car;
let trafficLight;

let eastbound = [];
let westbound = [];


function setup() {
  createCanvas(600,400);

  for(let i = 0; i < 5; i++)
  {
    let y = random(10,120);
    let xSpeed = random(1,3);
    eastbound.push(new Vehicle(random(0,width), y, 1, xSpeed));
  }

  for(let i = 0; i < 5; i++)
  {
    let y = random(230,320);
    let xSpeed = random(1,3);
    westbound.push(new Vehicle(random(0,width), y, 0, xSpeed));
  }
}

function draw() {
  background(200);
  drawRoad();


  for (let vehicle of eastbound) {
    vehicle.action(); // Perform vehicle behavior
  }

  // Update westbound vehicles
  for (let vehicle of westbound) {
    vehicle.action(); // Perform vehicle behavior
  }
}

function drawRoad()
{
  noStroke();
  fill(0);
  rect(0,0, width, height);

  stroke('magenta');
  strokeWeight(3);
  for(let i = 0; i < width; i+=40)
  {
    line(i, height / 2, i + 20, height / 2);
  }
}

class Vehicle
{
  constructor(x,y,direction,xSpeed)
  {
    this.x = x;
    this.y = y;
    this.type = direction;
    this.direction = direction;
    this.xSpeed = xSpeed;
    this.width = 30;
    this.height = 15;
    this.color = color(random(255), random(255), random(255));
  }


  display()
  {
    push();
    translate(this.x,this.y);

    if(this.direction === 0)
    {
      scale(-1,1);
    }


    fill(this.color);
    noStroke();
    rect(-this.width/2, - this.height / 2, this.width, this.height);


    if(this.type === 0)
    {
      fill(200);
      let wheelR = 2;
      let wheelY = this.height / 2 + wheelR;

      ellipse(this.width / 3, wheelY, wheelR * 3, wheelR * 2);
      ellipse(-this.width / 3, wheelY, wheelR * 3, wheelR * 2);
    }



    else
    {
      stroke(255);
      strokeWeight(1);

      let lineX = -this.width / 2 + 5;
      if(this.direction === 1)
      {
        lineX = this.width / 2 - 5;
      }

      line(lineX, -this.height / 2, lineX, this.height / 2);
    }

    pop();
  }

  move()
  {
    this.x += this.xSpeed * this.direction ? 1 : -1;
    if(this.x > width + this.width / 2)
    {
      this.x = -this.width / 2;
    }

    else if(this.x < -this.width / 2)
    {
      this.x = width + this.width / 2;
    }

  }

  speedUp()
  {
    this.xSpeed -= 0.5;
    if (this.xSpeed < 0) this.xSpeed = 0;
  }


  action()
  {
    this.move();
    this.display();
  }
}