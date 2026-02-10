// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let textshade = 255;
let textScale = 60;
let bgcolor = "grey";


function setup() {
  createCanvas(windowWidth, windowHeight);
}


function displayMouse()
{
  //this function will report some  system variables related to mouse onto the screen via text()

  //mouseX, mouseY -> store current mouse pos
  //mouseIsPressed -> boolean : button pressed

  // if(mouseIsPressed)
  // {
  //   textScale = int(random(10,100));
  // }

  textSize(textScale);
  fill(textshade)
  text(mouseX + " , " + mouseY + " , " + mouseIsPressed + " , " + mouseButton , mouseX,  mouseY);

}



function mousePressed()
{
//this is a p5 function 
//automstically called exactly once
//per mousepressed (on down action)

textScale = int(random(10,50));
}


function displaykeyboard()
{
  //we will use this function to inspect
  //some of p5's keyboard ca[pablities

  //keyIsPressed -> is a keyboard button press?
  //key          -> last pressed key (non-coded)
  //keycode      -> last pressed coded key

  if(keyIsPressed)
  {
    if(key === " ")
    {
      bgcolor = color(random(255), random(255), random(255));
    }
  }

  textSize(30);
  textAlign(CENTER,CENTER);
  let t = keyIsPressed + " , " + key + " , " + keyCode;
  text(t, width/2, height/2);
}




function draw() {

//goal: keep draw() tidy
  background(200);

  //displayMouse();

  displaykeyboard();
}
