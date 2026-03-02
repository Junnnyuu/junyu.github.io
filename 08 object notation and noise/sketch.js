// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ball, ball2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = {  //object notation. Inside the brackets
             //set up a bunch of property: value pairs

    x:300, y:400, size:20,
    c: color(random(255),random(255),random(255)),
    timeX: random(100),  timeY: random(100),  timeoff: 0.00001  
  }

  ball2 = {

    x:150, y:670, size:40,
    c: color(random(255),random(255),random(255)),
    timeX: random(100),  timeY: random(100),  timeoff: 1000  

  }
}

function moveball(b)
{
  //b -> Ball type object
  //update the position and draw the ball
  //generate how to change x and y position(noise)

  let dx = noise(b.timeX); // 0-1 
  dx = map(dx, 0, 1, -5, 5); // dx: -5 to 5
  let dy = noise(b.timeY); //dy:    -5 to 5
  dy = map(dy, 0, 1, -5, 5);



  //advance our noise graph "coursors"
  b.timeX += b.timeoff;
  b.timeY += b.timeoff;



  // update the position
  b.x += dx;
  b.y += dy;



  //wrap around
  if(b.x < 0)  b.x = width;
  else if(b.x > width)  b.x = 0;
  
  if(b.y < 0)  b.y = length;
  else if(b.y > width)  b.y = 0;



  // render the circle
  fill(b.c);
  circle(b.x, b.y, b.size);


}

function draw() {
  //background(220);
  stroke(0,70);
  moveball(ball);
  moveball(ball2);
}
