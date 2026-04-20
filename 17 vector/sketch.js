// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let objects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if(mouseIsPressed)
  {
    objects.push(new Ball(mouseX, mouseY));
  }



  for(let o of objects)
  {
    o.move();
    o.display();
  }
}

class Ball
{
  constructor(x,y)
  {
    this.pos = createVector(x,y);
    this.vel = createVector(random(-5,5), -5);
    this.force = createVector(0,0.2);  // GRAV
  }



  move()
  {
  //update velocity and pos vectors

  this.vel.add(this.force);
  this.vel.limit(20);
  this.pos.add(this.vel);
  }



  display()
  {
    circle(this.pos.x, this.pos.y, 20)
    if(true)
    {
       stroke(255,0,0);
       line(0,0,this.pos.x, this.pos.y);
       
       let endX = this.pos.x + this.vel.x;
       let endY = this.pos.y + this.vel.y;

      
    }
  }



}