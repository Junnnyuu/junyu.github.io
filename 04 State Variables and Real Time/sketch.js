// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let shapeState = 3;  //0- Circle
    



function setup() {
  createCanvas(windowWidth, windowHeight);
  startTime = millis();
}


//millis()     start time     millis()-startime
// 0                0                 0
// 200              0                 200
// 400              0                 400
// 600              600
//
//
//
//
//





function draw() {
  background(220);
  drawShape();
}


function manageTime()
{
  let elapsedTime = millis() - 
}

function keyPressed()
{
  shapeState++;
  if(shapeState > 3)  shapeState = 0;
}

function drawShape()
{
  // function inspects the shapeState variable
  // and draws the appropriate shape on the canvas

  let x = width/2;
  let y = height/2;
  switch(shapeState)
  {

    case 0: 
      circle(width/2,height/2, 150);
      break;

    case 1:
      square(width/2, height/2, 150);
      break;
    
    case 2:
      triangle(x-50, y+50, x+50, y+50, x, y-25);
      break;

    case 3: 
      for(let i = 0; i < 30; i++)
      {
        let x2 = random(x+80, x+80);
        let y2 = random(y-80, y+80);

        let x3 = random(x-30, x-30);
        let y3 = random(y+30, y-30);
        line(x3,y3,x2,y2);
      }
      break;
  }
}