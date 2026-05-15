// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid = [
  [0,   0,   0,   255,  0,  255],
  [255, 0, 255,   0,    255,  0],
  [0,   0,   0,   0,    0,  255],
  [255, 255, 255, 255,  255,  0],
  [0,   255, 0,   0,    0,  255]
];
let rows = grid.length;
let cols = grid[0].length;
let tileSize = 60;
let currentRow, currentCol;
let mode = 'cross'; // 'cross' or 'square'

function setup() {
  createCanvas(cols*tileSize, rows*tileSize);
  randomizeGrid();
}

function draw() {
  background(220);
  renderGrid();
  determineActive();
  
  // Show preview based on current mode
  if(mode === 'cross') {
    predictGrip_cross();
  } else if(mode === 'square') {
    predictGrip_square();
  }
  
  textSize(20);
  fill(255,0,0);
  //text(getCurrentX()+","+getCurrentY(),mouseX, mouseY)
  
  // Display current mode
  fill(0);
  textSize(16);
  text("Mode: " + mode, 10, 20);

  if(checkwin())
  {
    fill(100);
    textSize(60);
    text("YOU WIN!!", 30, height - 30);
  }
}


function mousePressed(){
  // Flips based on current mode. Boundary conditions are checked within the flip function to ensure in-bounds access for array

  if (keyIsDown(SHIFT)){   // if it is shift, Only the current flip is executed
    flip(currentCol, currentRow);
    return;
  }
  
  if(mode === 'cross') {
    // Cross-shaped pattern: center + 4 directions
    flip(currentCol, currentRow);
    flip(currentCol-1, currentRow);
    flip(currentCol+1, currentRow);
    flip(currentCol, currentRow-1);
    flip(currentCol, currentRow+1);
  } else if(mode === 'square') {
    // Square pattern: center + top + top-right + right
    flip(currentCol, currentRow);
    flip(currentCol, currentRow-1);
    flip(currentCol+1, currentRow-1);
    flip(currentCol+1, currentRow);
  }
}

function keyPressed(){
  // Press spacebar to toggle between cross and square modes
  if(key === ' '){
    if(mode === 'cross') {
      mode = 'square';
    } else {
      mode = 'cross';
    }
    return false;  // prevent default behavior
  }
}

function determineActive(){
  // An expression to run each frame to determine where the mouse currently is.
  currentRow = int(mouseY / tileSize);
  currentCol = int(mouseX / tileSize);
}




function flip(x,y){
  // Check boundary conditions before flipping
  if(x < 0 || x >= cols || y < 0 || y >= rows) return;
  
  if(grid[y][x] === 0) grid[y][x] = 255;
  else grid[y][x] = 0;
}

function renderGrid(){
  // intepret the data stored in 2D array (grid) and
  // draw a matrix of squares to reflect it
  for(let y = 0; y < rows; y++){ //y:0 1 2 3 4
    for(let x = 0; x < cols; x++){ //x: 0 1 2 3 4 5
      let fillColor = grid[y][x];
      fill(fillColor);
      square(x*tileSize, y*tileSize, tileSize);
    }
  }
}


function getCurrentX(){
  //determine the current col position of mouse
  let constrainedX = constrain(mouseX, 0, width-1);
  return floor(constrainedX / tileSize);
}

function getCurrentY(){
  //determine the current row position of mouse
  let constrainedY = constrain(mouseY, 0, height-1);
  return floor(constrainedY / tileSize);
}


function checkwin()
{
  let firstValue = grid[0][0];
  for(let y = 0; y< rows; y++)
  {
    for(let x = 0; x < cols; x++)
    {
      if(grid[y][x] != firstValue)
      {
        return false;
      }

    }
  }
  return true;
}

function randomizeGrid()
{
  for(let y = 0; y< rows; y++)
  {
    for(let x = 0; x < cols; x++)
    {
      grid[y][x] = random([0,255]);
    }
  }
}


function predictGrip_cross()
{
  let grid1 = getCurrentX();
  let grid2 = getCurrentY();

  fill(255, 165, 0, 150);  // Orange with transparency
  //noStroke();
  
  // Center box
  square(grid1*tileSize, grid2*tileSize, tileSize);
  
  // Top box
  if(grid2 - 1 >= 0) {
    square(grid1*tileSize, (grid2-1)*tileSize, tileSize);
  }
  
  // Bottom box
  if(grid2 + 1 < rows) {
    square(grid1*tileSize, (grid2+1)*tileSize, tileSize);
  }
  
  // Left box
  if(grid1 - 1 >= 0) {
    square((grid1-1)*tileSize, grid2*tileSize, tileSize);
  }
  
  // Right box
  if(grid1 + 1 < cols) {
    square((grid1+1)*tileSize, grid2*tileSize, tileSize);
  }
}



function predictGrip_square()
{
  let grid1 = getCurrentX();
  let grid2 = getCurrentY();

  fill(255, 165, 0, 150);  // Orange with transparency
  //noStroke();
  
  // Center box
  square(grid1*tileSize, grid2*tileSize, tileSize);
  
  // Top box
  if(grid2 - 1 >= 0) {
    square(grid1*tileSize, (grid2-1)*tileSize, tileSize);
  }

  // Top box
  if(grid2 - 1 >= 0) {
    square((grid1+1)*tileSize, (grid2-1)*tileSize, tileSize);
  }
  
  // Right box
  if(grid1 + 1 < cols) {
    square((grid1+1)*tileSize, grid2*tileSize, tileSize);
  }
}

