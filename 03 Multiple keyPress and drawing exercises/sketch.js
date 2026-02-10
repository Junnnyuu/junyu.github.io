// Multiple keypress detertion 
// and drawing practice
//Junyu


function setup() {
  createCanvas(windowWidth, windowHeight);
}


function checkMulti()
{
  // a function to demonstrate how we can check
  // if multiple keyboard buttons are pressed
  // at once



  // check for multiple keypresses (3 simult)

  strokeWeight(mouseX/ 2);
  stroke(255,0,0);

  let a = keyIsDown(65);   //a
  let b = keyIsDown(66);   //b
  let c = keyIsDown(67)    //c

  let str = "a: " + a + "b: " + b + "c " + c;


  textSize(10);
  text(str, 10, 20);
  
}
function draw() {
  background(220);
  checkMulti();
}
