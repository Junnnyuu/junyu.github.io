// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let spiral = [];
let gorillaIdle = [];
let gorillaWalk = [];
let gorillImage = [];

let gorillaState = 0; // 0-idle 1-swipe
let gorillX = 0;
async function setup() {
  createCanvas(windowWidth, windowHeight);

  for(let i = 0; i < 16; i++) 
  {
    if(i < 10)
    {
      gorillImage[i] = loadImage(`assets/spiral/spiral_000${i}.png`);
    }

    
  }

}

function draw() {
  background(220);

  if(gorillaState === 0)
  {
    image(gprillaIdle[idleIndex], gorillX, 200);
    if(frameCount % 5 === 0)
    {
      idleIndex++;
      if(idleIndex > 5)
      {
        idleIndex = 0;
      }
    }
  }

  else if(gorillaState === 1)
  {
    image(gorillaWalk[walkIndex], gorillX, 200);
    if(frameCount % 5 === 0)
    {
      walkIndex++;
      if(walkIndex > 5)
      {
        walkIndex = 0;
      }
    }
  }
}


function keyPressed()
{
  print(keyCode);
  if(keyCode === 37                         )  {
    gorillaState = 1;
  } else if(keyCode === 82) {
    gorillaState = 0;
  }             
}
