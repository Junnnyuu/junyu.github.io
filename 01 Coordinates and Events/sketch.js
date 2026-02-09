// Project Title
// Your Name
// Date
//
// Extra for Experts:
// In python - run- to- completion

// p5js - we write interactive 

// setup() -> we write once at the start
// draw() -> runs over and over (after setup)

// screen is updated at the bottom of draw


//    ------  Global variable section -------

// simple data types

let circleX = 50;


function setup() {
  createCanvas(200,200);
}




function draw() {

  //repeats over and over (automatically) 60fps
  
  background(600);

  drawTwoCircle();
  drawCircle();
  drawTable();
  
}


function drawTwoCircle()
{
  // //      R   G  B
  // fill(200,10,20);

  // stroke(100,1000,10);
  // //      x   y  d
  // circle(circleX,50,50);


  // fill(2000,10,20);

  // stroke(100,1000,10);
  // //      x   y  d
  // circle(width/2,height/2,150);

}

function drawCircle()
{
  stroke(10,100,100);

  circle(30,80,10);

  circle(60,80,10);

  circle(60,100,10);

  circle(30,100,10);
}



function drawTable()
{
  noFill();
  stroke(10,10,100);
  rect(30,80,30,20);

}