// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//Global
let mybook; // You cannot init objects here
//add amd display two more books
//once softcover, one leatherbound

function setup() {
  createCanvas(windowWidth, windowHeight);
  //create a single book
  mybook = new Book("Noah is human??", "Junyu", 666, "softcover", 500, width * 0.3);
} 

class Book 
{

  //constructor

  constructor(title, author, isbn, cover, pages, x)
  {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.cover = cover;
    this.pages = pages;
    this.x = x;
  }

  display()
  {
    //render our book object on Canvas
    rectMode(CENTER);
    textAlign(CENTER,CENTER);
    textSize(20);

    //set fill color based on covertype

    switch(this.cover)
    {
      case "softcover":
        fill(250,200,150); break;
      case "hardcover":
        fill(120,255,255); break;
      case "leatherbound":
        fill(150,100,15); break;
    }


    //now draw the book
    push();
    translate(this.x, height/2);
    rect(0,0, this.pages/2, 150);
    fill(255);
    text(this.title, 0, -50);
    pop();
  }


  //function





}

function draw() {
  background(220);
  mybook.display();
}
