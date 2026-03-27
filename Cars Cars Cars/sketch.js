// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let car;
let trafficLight;

function setup() {
  createCanvas(600,400);
}

function draw() {
  background(200);
  drawRoad();
}

function drawRoad()
{
  noStroke();
  fill(0);
  rect(0,50, 600, 300);

  stroke('magenta');
  strokeWeight(3);
  for(let i = 0; i < width; i+=40)
  {
    line(i, 200, i + 20, 200);
  }
}

class Vehicle
{
  constructor(x,y,direction)
  {
    this.x = x;
    this.y = y;
    this.type = type;
    this.direction = direction;
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

      ellipse(-this.width / 3, wheelY, wheelR * 2, wheelR * 2);
      ellipse(-this.width / 6, wheelY, wheelR * 2, wheelR * 2);
      ellipse(-this.width / 3, wheelY, wheelR * 2, wheelR * 2);
      ellipse(-this.width / 6, wheelY, wheelR * 2, wheelR * 2);
    }



    else
    {
      stroke(255);
      strokeWeight(1);

      let lineX = lx;
      if(this.direction === 1)
      {
        let lx = this.width / 2 -5;
      }

      line(lineX, -this.height / 2, lineX, this.height / 2);
    }

    pop();
  }

  move()
  {
    if(this/x > width + this.width / 2)
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