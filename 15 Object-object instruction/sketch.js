// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let nodes = [];
let reach = 150;


function setup() {
  createCanvas(windowWidth, windowHeight);
}




function draw() {
  background(220);
  for(let n of nodes)
  {
    n.display();
  }
}




function mousePressed()
{

  if(mouseButton === "center")
  {
    for(let i = 0; i < 50; i++)
    {
      let x = random(-50,50);
      let y = random(-50,50);
      nodes.push(new csNode(mouseX + x, mouseY + y));
    }
  }

  if(mouseButton === "left")
  {
    let n = new csNode(mouseX, mouseY);
    nodes.push(n);
  }
}



class csNode
{
  //1. constructor
  constructor(x,y)
  {
    //properties related to pos/display
    this.x = x;
    this.y = y;
    this.size = 5;
    this.c = color(random(255), random(255), random(255));

    //properties related to movement
    this.xTime = random(100); 
    this.yTime = random(100);

    this.timeShift = 0.01;
    this.maxspeed = 5;

  }

  //2.class Methods
  display()
  {
    fill(this.c);
    noStroke();
    circle(this.x, this.y, this.size);

  }


  move()
  {
    //use perlin noise for x,y movement 
    let xSpeed = noise(this.xTime);
    xSpeed = map(xSpeed, 0, 1, -this.maxspeed, this.maxspeed);
    this.xTime += this.timeShift;

    this.x += xSpeed;
    if(this.x < 0) this.x = width;
    else if (this.x > width) this.x = 0;

    // Do the same thing for y component
    let ySpeed = noise(this.yTime);
    ySpeed = map(ySpeed, 0, 1, -this.maxspeed, )
  }

  connect()
  {

  }
}


