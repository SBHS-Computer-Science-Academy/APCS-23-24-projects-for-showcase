function setup() {
  createCanvas(1000, 800);
  background("PaleTurquoise");
  textAlign(CENTER, CENTER);
  noLoop()
}

function draw() {
  noStroke()
  fill("MediumTurquoise");
  rect(0, 356, 1000, 320);//water

  //mountains
  fill("#545454")
  triangle(208, 163, 125, 356, 307, 356)//b1
  triangle(440, 161, 353, 356, 542, 356)//b2
  triangle(626, 177, 559, 356, 711, 356)//b3
  triangle(879, 152, 786, 356, 987, 356)//b4
  fill("Gray");
  triangle(533, 155, 404, 356, 677, 356)//a1
  triangle(347, 85, 193, 356, 475, 356)//a2
  triangle(105, 132, 2, 356, 239, 356);//a3
  triangle(624, 356, 731, 105, 895, 356);//a4
  triangle(864, 356, 998, 140, 1002,356);//a5

  
  fill("#0d690c");
  rect(0, 676, 1000, 150);//grass

  //clouds
  fill(252, 252, 252, 140);//clouds
  ellipse(54, 35, 150, 55);
  ellipse(150, 35, 150, 55);
  ellipse(407, 34, 150, 55);
  ellipse(523, 29, 150, 55);
  ellipse(731, 29, 150, 55);
  ellipse(849, 20, 150, 55);

  //sun
  fill("#f5f7be")
  circle(275, 40, 55);//sun

  //fish
  fill("orange")
  ellipse(605, 575, 33, 22);//fish
  triangle(594, 577, 572, 567, 572, 584);//fish
  
  //stick figure
  stroke("black")
  line(757, 716, 781, 662);
  line(810, 716, 781, 662);
  line(781, 662, 778, 618);
  line(755, 621, 779, 635);
  noFill()
  bezier(756, 623,742, 559,698, 535, 626, 564)
  circle(777, 594, 50);
  stroke("white")
  fill("red")
  square(618, 563, 10);
  fill("black")
  circle(614, 573, 5);
  

  
  
  
}


function mousePressed() {

  print(int(mouseX) + ', ' + int(mouseY));
  fill("black");
  circle(mouseX, mouseY, 5);
}