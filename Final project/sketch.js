// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let img_player1, img_player2, img_player3, img_Birdie;
let img_player4, img_player5, img_player6;

let player1,player2;

let isDragging = false;
let dragStart, dragEnd;
let currentAngle = 0;
let currentPower = 0;

let activeBirdie = null;
let currentPlayer = 1;
let gravity;


function preload()
{
  img_player1 = loadImage("assets/player_idle_1.png");
  img_player2 = loadImage("assets/player_idle_2.png");
  img_player3 = loadImage("assets/player_idle_3.png");
  img_Birdie = loadImage("assets/badminton_birdie_1.png");
  
  img_player4 = loadImage("assets/player_idle_4_right.png");
  img_player5 = loadImage("assets/player_idle_5_right.png");
  img_player6 = loadImage("assets/player_idle_6_right.png");
}

function setup() {
  createCanvas(1200,600);

  let p1Frames = [img_player1, img_player2, img_player3];
  let p2Frames = [img_player4, img_player5, img_player6];

  player1 = new Character(200, 480, 100, p1Frames, 1);
  player2 = new Character(500, 480, 100, p2Frames, 2);

  dragStart = createVector(0,0);
  dragEnd = createVector(0,0);

  gravity = createVector(0,0.4);
}



function draw() {
  background(135,206,235);


  fill(34,139,34);
  noStroke();
  rect(0,500,width,100);

  player1.updateAnimation();
  player2.updateAnimation();


  player1.display();
  player2.display();

  handleAiming();

  if(activeBirdie != null)
  {
    activeBirdie.update();
    activeBirdie.display();
  }

  checkCollision();


  fill(0);
  textSize(24);
  textAlign(CENTER);
  if(currentPlayer === 1)
  {
    text("Player 1's Turn", width / 2, 50);
  }
  else 
  {
    text("Player 2's Turn", width / 2, 50);
  }
}



function handleAiming()
{
  if(isDragging)
  {
    dragEnd.set(mouseX, mouseY);

    let aimVector = p5.Vector.sub(dragEnd, dragStart);
    let maxDrag = 25;

    if (aimVector.mag() > maxDrag) 
    {
      aimVector.setMag(maxDrag);
    }

    currentPower = round(map(aimVector.mag(), 0, maxDrag, 0, 100));

    let rad = atan2(aimVector.y, aimVector.x);

    currentAngle = round(degrees(rad));

    if(currentAngle < 0) 
    {
      currentAngle += 360;
    }

    let launchSpeed = map(currentPower, 0, 100, 0, 25);
    let VelX = cos(rad) * launchSpeed;
    let VelY = sin(rad) * launchSpeed;
  
    
    if (currentPlayer === 2) {
      VelX = -VelX;
    }

    
    // x = x0 + vx*t, y = y0 + vy*t + 0.5*g*t^2
    let startX = (currentPlayer === 1) ? player1.pos.x : player2.pos.x;
    let startY = (currentPlayer === 1) ? player1.pos.y : player2.pos.y;
    
    stroke(255, 255, 255, 150);
    strokeWeight(4);
    noFill();

    
    for (let i = 1; i <= 18; i++) 
    {
      let t = i * 1; 
      let predX = startX + (VelX * t);
      let predY = startY + (VelY * t) + (0.5 * gravity.y * t * t);
      ellipse(predX, predY, 5, 5);
    }

    // HUD
    drawHudBox(dragStart.x, dragStart.y - 120);
  }


}


function drawHudBox(x,y)
{
  push();
  rectMode(CENTER);
  stroke(180);
  strokeWeight(2);
  fill(255,255,255,230);
  rect(x,y,160,50,10);

  stroke(220);
  line(x, y - 25, x, y + 25);

  noStroke();
  textAlign(CENTER, CENTER);

  textSize(14);
  fill(100,50,150);
  text( currentPower + "%", x - 40, y - 5);

  textSize(9);
  fill(150);
  text("POWER", x - 40, y + 12);


  textSize(14);
  fill(100,50,150);

  text((360 - currentAngle) + "°", x + 40, y - 5); 

  textSize(9);
  fill(150);
  text("angle", x + 40, y + 12);
  
  pop(); 
}




function mousePressed()
{
  let activePlayer;
  if (currentPlayer === 1) 
  {
    activePlayer = player1;
  } 

  else 
  {
    activePlayer = player2;
  }


  if(dist(mouseX, mouseY, activePlayer.pos.x, activePlayer.pos.y) < 60)
  {
    isDragging = true;
    dragStart.set(mouseX, mouseY);
  }
}



function mouseReleased()
{
  if(isDragging)
  {
    isDragging = false;
    let spawnX;
    let spawnY;
  
    if(currentPlayer === 1)
    {
      spawnX = player1.pos.x;
      spawnY = player1.pos.y;
    }

    else 
    {
      spawnX = player2.pos.x;
      spawnY = player2.pos.y;
    }

    let launchSpeed = map(currentPower, 0, 100, 0, 25);
    let rad = radians(currentAngle);

    let VelX = cos(rad) * launchSpeed;
    let VelY = sin(rad) * launchSpeed;


    if (currentPlayer === 2) 
    {
      VelX = -VelX;
    }

    let launchVel = createVector(VelX, VelY);
  
    activeBirdie = new Birdie(spawnX, spawnY, launchVel, img_Birdie);

  }
}


class Character
{
  constructor(x,y,maxHp,framsArray,side)
  {
    this.pos = createVector(x,y);
    this.maxHp = maxHp;
    this.currentHp = maxHp;


    this.frames = framsArray;
    this.currentFrame = 0;
    this.side = side;
    this.isStriking = false;

    this.width = 50;
    this.heights = 100;
  }


  display()
  {
    push();
    imageMode(CENTER);
    let currentImg = this.frames[this.currentFrame];
    image(currentImg,this.pos.x,this.pos.y,this.width,this.heights);
    pop();

    this.drawHealthBar();
  }


  strike()
  {
    this.isStriking = true;
    this.currentFrame = 1;
  }

  updateAnimation()
  {
    if(this.isStriking)
    {
      if(frameCount % 10 === 0)
      {
        this.currentFrame ++;
        if(this.currentFrame >= this.frames.length)
        {
          this.currentFrame = 0;
          this.isStriking = false;
        }
      }
    }
  }



  drawHealthBar()
  {
    push();
    rectMode(CORNER);
    fill(230,50,50);
    rect(this.pos.x - 40, this.pos.y - 75,80,8,4);

    fill(50,230,100);
    let healthWidth = map(this.currentHp, 0 , this.maxHp, 0 , 80);
    rect(this.pos.x - 40, this.pos.y - 75, healthWidth, 8,4);
    pop();
  }


}




class Birdie
{

  constructor(x,y,velocity,img)
  {
    this.pos = createVector(x,y);
    this.vel = velocity;
    this.img = img;
    this.width = 40;
    this.height = 40;
  }

  update()
  {
    this.vel.add(gravity);
    this.pos.add(this.vel);
  }

  display()
  {
    push();

    translate(this.pos.x, this.pos.y);
    let angle = this.vel.heading();
    rotate(angle + PI);

    imageMode(CENTER);
    image(this.img, 0, 0, this.width, this.height);
    pop();
  }
}



function checkCollision()
{
  if(activeBirdie === null)
  {
    return;
  }

  if(activeBirdie.pos.y >= 500)
  {
    activeBirdie = null;
    switchTurn();
    return;
  }

  let targetPlayer;
  if(currentPlayer === 1)
  {
    targetPlayer = player2;
  }

  else
  {
    targetPlayer = player1;
  }

  let hitDistance = dist(activeBirdie.pos.x, activeBirdie.pos.y, targetPlayer.pos.x, targetPlayer.pos.y);

  if(hitDistance < 60)
  {
    targetPlayer.currentHp -= 25;
    activeBirdie = null;

    if(targetPlayer.currentHp < 0)
    {
      targetPlayer.currentHp = 0;
    }
    activeBirdie = null;
    switchTurn();
  }
}



function switchTurn()
{
  if(currentPlayer  === 1)
  {
    currentPlayer = 2;
  }
  else
  {
    currentPlayer = 1;
  }
}
