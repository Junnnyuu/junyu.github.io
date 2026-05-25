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

  player1 = new Character(200, 450, 100, p1Frames, 1);
  player2 = new Character(1000, 450, 100, p2Frames, 2);

  dragStart = createVector(0,0);
  dragEnd = createVector(0,0);

  gravity = createVector(0,0.4);
}



function draw() {
  background(135,206,235);


  fill(34,139,34);
  noStroke();
  rect(0,500,width,100);


  player1.display();
  player2.display();

  handleAiming();

  if(activeBirdie != null)
  {
    activeBirdie.update();
    activeBirdie.display();
  }
}



function handleAiming()
{
  if(isDragging)
  {
    dragEnd.set(mouseX, mouseY);
    let aimVector = p5.Vector.sub(dragEnd, dragStart); //cal the vector

    //cal angle
    let rad = atan2(aimVector.y, aimVector.x);
    currentPower = round(degrees(rad));
    if(currentAngle < 0)
    {
      currentAngle += 360;
    }

    //cal power
    let distance = aimVector.mag();
    currentPower = round(map(distance,0,200,0,100));
    currentPower = constrain(currentPower,0,100);

    //make the line
    stroke(255,255,255,150);
    strokeWeight(4);
    for(let i = 0; i<=10; i++)
    {
      let x = dragStart.x + (aimVector.x * 1.5 * (i / 10));
      let y = dragStart.y + (aimVector.y * 1.5 * (i / 10));
      ellipse(x,y,5,5);
    }
    //function draw the with box
    drawHudBox(dragStart.x,dragEnd.y - 120);
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
  text(currentPower + "%", x - 40, y - 5);

  textSize(9);
  fill(150);
  text("POWER", x - 40, y + 12);

  textSize(14);
  fill(100,50,150);
  text(currentPower + "°", x + 40, y - 5);

  textSize(9);
  fill(150);
  text("angle", x + 40, y + 12);
}



function mousePressed()
{
  if(dist(mouseX, mouseY, player1.pos.x, player2.pos.y) < 60)
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
    player1.strike();
  

  let launchSpeed = map(currentPower, 0, 100, 0, 25);
  let rad = radians(currentAngle);

  let VelX = cos(rad) * launchSpeed;
  let VelY = sin(rad) * launchSpeed;
  let launchVel = createVector(VelX, VelY);
  
  activeBirdie = new Birdie(player1.pos.x, player1.pos.y, launchVel, img_Birdie);

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
    rotate(angle);

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
    return;
  }

  let hitDistance = dist(activeBirdie.pos.x, activeBirdie.pos.y, player2.pos.x, player2.pos.y);
  if(hitDistance < 60)
  {
    player2.currentHp -= 25;
    activeBirdie = null;

    if(player2.currentHp < 0)
      {
        player2.currentHp = 0;
      }
  }


}






