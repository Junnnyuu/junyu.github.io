// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let img_player1, img_player2, img_player3, img_Birdie;

let player1;



function preload()
{
  img_player1 = loadImage("assets/player_idle_1.png");
  img_player2 = loadImage("assets/player_idle_2.png");
  img_player3 = loadImage("assets/player_idle_3.png");
  img_Birdie = loadImage("assets/badminton_birdie_1.png");
  //player_4 = loadImage("assets/player_idle_4.png");
}

function setup() {
  createCanvas(1200,600);
  player1 = new Character(200, 450, 100, img_player1);
}

function draw() {
  background(135,206,235);
  fill(34,139,34);

  noStroke();
  rect(0,500,width,100);
  player1.display();
}


class Character
{
  constructor(x,y,maxHp,img)
  {
    this.pos = createVector(x,y);
    this.maxHp = maxHp;
    this.currentHp = maxHp;
    this.img = img;

    this.width = 50;
    this.length = 100;
  }


  display()
  {
    push();
    imageMode(CENTER);
    image(this.img,this.pos.x,this.pos.y,this.width,this.height);
    pop();
    this.drawHealthBar();
  }


  drawHealthBar()
  {
    push();
    fill(255,0,0);
    rect(this.pos.x - 40, this.pos.y - 70,80,10);

    fill(0,255,0);
    let healthWidth = map(this.currentHp, 0 , this.maxHp, 0 , 80);
    rect(this.pos.x - 40, this.pos.y - 900, healthWidth, 10);
    pop();
  }


}