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


function preload()
{
  img_player1 = loadImage("assets/player_idle_1.png");
  img_player2 = loadImage("assets/player_idle_2.png");
  img_player3 = loadImage("assets/player_idle_3.png");
  img_Birdie = loadImage("assets/badminton_birdie_1.png");
  
  player_4 = loadImage("assets/player_idle_4.png");
  player_5 = loadImage("assets/player_idle_5.png");
  player_6 = loadImage("assets/player_idle_6.png");
}

function setup() {
  createCanvas(1200,600);
  player1 = new Character(200, 450, 100, p1Frames, 1);
  player2 = new Character(1000, 450, 100, p2Frames, 2);
}

function draw() {
  background(135,206,235);
  fill(34,139,34);

  noStroke();
  rect(0,500,width,100);
  player1.display();
  player2.display();
}



function handleAiming()
{


}


function drawHudBox(x,y)
{


}


function mousePressed()
{




}



function mouseReleased()
{
  
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
    this.length = 100;
  }


  display()
  {
    push();
    imageMode(CENTER);
    let currentImg = this.frames[this.currentFrame];
    image(this.img,this.pos.x,this.pos.y,this.width,this.height);
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