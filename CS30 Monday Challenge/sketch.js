// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let items = [];
let provinces = new Map();
let currentProv = "SK";

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i < 20; i++)
  {
    let item = 
    {
      x:random(width - 60),
      y:random(height),
      speedY:random(1,3),
      basePrice:random(10,100),
      name:"Item" + i
    }
    items.push(item);
  }

  provinces.set("SK", {tax: 1.11});
  provinces.set("AB", {tax: 1.05});
  provinces.set("ON", {tax: 1.13});
}

function draw() {
  background(220);
  let rules = provinces.get(currentProv);

  
  for (let i = 0; i < items.length; i++)
  {

  }

  items[i].y += items[i].speedY;

  rect(items[i].x, items[i].y, 60, 40);
}

function keyPressed()
{
  if(key === 1)
  {
    currentProv = "SK";
  }

  if(key === 2)
  {
    currentProv = "AB";
  }

  if(key === 3)
  {
    currentProv = "ON";
  }
}