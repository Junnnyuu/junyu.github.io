// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let textFile;
let imgFile, rows, cols, colorMap;

async function loadAssets()
{
  textFile = loadStrings("assets/info.txt");
  imgFile = loadStrings("assets/image.txt");
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  await loadAssets();
  processText();
  noLoop();

  //Determine the # of rows and cols
  rows = imgText.length;
  cols = imgFile[0].length;

  colorMap = new map([
    ["b", "black"],
    ["w", color(255)],
    ["r", "red"],
    ["l", "brown"],
    ["p", "purple"]
  ]);

}


function drawImage()
{
  // read through our text info and construct an image.
  let pixelSize = 50;
  for(let y = 0; y < rows; y++)
  {
    let currentRow = imgFile[y];
    for(let x = 0; x < cols; x++)
    {
      let currentKey = imgFile[x];
      fill(colorMap.get(currentKey));
      square(x*pixelSize)
    }
  }
}

function draw() {
  background(220);
  processText();
  drawImage();
}


function processText()
{
  // look at 3 different ways to split up
  // larger strings into words, or character
  // split() and .... spread symtax
  print("SPLIT INTO WORDS")
  let splitwords = textFile[0].split(" ");
  print(splitwords);

  print("SPLIT INTO WORDS")
  let splitChars = textFile[1].split(" ");
  print(splitChars);

  print("SPLIT INTO WORDS")
  let spreadChars = [... textFile[2]];
  print(spreadChars);

}