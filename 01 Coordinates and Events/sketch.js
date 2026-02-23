// Project Title
// Your Name
// Date

let x = 20;
let y = 300;

let x_1 = 300; // Car position
let mouthHeight = 0; // Mouth curvature

// 背景颜色数组
let backgroundColors = [ [180, 210, 230], [250, 200, 200], [200, 250, 200], [200, 200, 250], [255, 255, 180] ];
let currentBgIndex = 0; 

// 汽车颜色 (新增变量，用于键盘互动)
let carColor;

function setup() {
  createCanvas(400, 400);
  carColor = color(205, 204, 204); // 初始汽车颜色 (灰色)
}

function Mountain() {
  // 为了防止山受到后面 fill 的影响，我们在函数里明确设置颜色
  push(); 
  fill(102, 255, 102);
  noStroke();
  triangle(x ,y + 45, x + 20, y - 100 ,x + 130,300);

  stroke(30, 60, 90);
  fill(102, 255, 102); // 确保第二个山也是绿的
  triangle(x + 40,y + 30, x + 80, y - 200 ,x + 200,y + 30);
  triangle(x + 60, y + 30, x + 200, y - 250,x + 300, y + 30);
  pop();
}

function drawsky() {
  push();
  fill(255,255,255);
  noStroke();
  circle(x + 30, y - 120, 15);
  circle(x + 18, y - 120, 15);
  circle(x + 25, y - 127, 15);
  
  circle(x + 180, y - 200, 15);
  circle(x + 192, y - 200, 15);
  
  circle(x + 300, y - 150, 15);
  circle(x + 288, y - 150, 15);
  pop();
}

function car_and_person(move_1, move_2) {
  push(); // 隔离样式
  
  // 1. 画车 (使用 carColor 变量)
  fill(carColor); 
  rect(move_1, move_2 - 16, 30, 13);
  
  // 车轮
  fill(0);
  circle(move_1 + 3, move_2, 7);
  circle(move_1 + 29, move_2, 7);

  // 2. 画人
  stroke(0);
  strokeWeight(2);
  fill(255);
  ellipse(move_1 + 13, move_2 - 50, 20, 20); // Head
  line(move_1 + 13, move_2 - 40, move_1 + 13, move_2 - 25); // Body
  line(move_1 + 3, move_2 - 30, move_1 + 24, move_2 - 30); // Arms
  line(move_1 + 13, move_2 - 25, move_1 + 3, move_2 - 15); // Left leg
  line(move_1 + 13, move_2 - 25, move_1 + 23, move_2 - 15); // Right leg
  
  // 眼睛
  fill(0);
  noStroke();
  // 简单的眨眼效果 (如果点击鼠标左键)
  if (mouseIsPressed && mouseButton === LEFT) {
      rect(move_1 + 6, move_2 - 53, 4, 2);
      rect(move_1 + 16, move_2 - 53, 4, 2);
  } else {
      ellipse(move_1 + 8, move_2 - 52, 3, 3); 
      ellipse(move_1 + 18, move_2 - 52, 3, 3); 
  }

  // 嘴巴 (修复了之前的逻辑 Bug)
  noFill();
  stroke(0);
  if (mouthHeight > 0) {
    // 向上弯 (笑)
    arc(move_1 + 13, move_2 - 46, 10, mouthHeight, 0, PI);
  } else if (mouthHeight < 0) {
    // 向下弯 (难过) - 此时 mouthHeight 是负数，用 abs 取绝对值
    arc(move_1 + 13, move_2 - 42, 10, abs(mouthHeight), PI, 0);
  } else {
    // 0 的时候 (直线)
    line(move_1 + 8, move_2 - 46, move_1 + 18, move_2 - 46);
  }
  
  pop();
}

// ---------------- 互动部分 ----------------

// 1. 鼠标滚轮控制嘴巴 (Mouse Interaction 1)
function mouseWheel(event) {
  if (event.delta > 0) {
    mouthHeight -= 2; // 向下滚，变难过
  } else {
    mouthHeight += 2; // 向上滚，变开心
  }
  mouthHeight = constrain(mouthHeight, -10, 10);
  return false; // 防止网页滚动
}

// 2. 鼠标点击检测 (Mouse Interaction 2: Middle Button)
function mousePressed() {
  // 需求修复：使用中键 (滑轮按下) 切换背景
  if (mouseButton === CENTER) {
    currentBgIndex = (currentBgIndex + 1) % backgroundColors.length;
  }
}

// 3. 键盘按键检测 (Keyboard Interaction: Spacebar) -> 新增功能！
function keyPressed() {
  // 按下空格键改变车身颜色
  if (key === ' ') {
    // 随机生成一个颜色
    carColor = color(random(255), random(255), random(255));
  }
}

function draw() {
  // 每一帧都更新 x_1 的位置跟随鼠标
  x_1 = constrain(mouseX, 10, width - 40); 
  
  background(backgroundColors[currentBgIndex]);
  
  Mountain();
  drawsky();
  
  // 传入 x_1 和 固定的 y (300)
  car_and_person(x_1, 300);
  
  // 地面
  fill(204, 255, 204);
  noStroke();
  rect(0, 307, 400, 100);
  
  fill(0);
  text('Junyu', 320, 350);
  text('Middle Click: Change BG', 10, 380);
  text('Spacebar: Change Car Color', 10, 360);
}