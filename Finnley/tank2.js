let debug2 = false;

//TANK
let tx2 = 1200; //tank x
let ty2 = 400; //tank y
let fspd2 = 0; //speed of tank
let theading2 = -90; //tank heading in degrees
let rotspd2 = 0; //rotation speed of tank
//TURRET
let pointed2 = false;
let cannonAnim2 = 7;
let rotTimer2;
let moveTimer2;
let rotPressedTime2;
let movePressedTime2;
//SHOOTING
let projDist2 = 0;
let projX2;
let projY2;
let projFired2 = false;
let shotBearing2;
let reloadedTime2;
let canFire2 = true;

function tankRotation2() {
  rotspd2 = 0;
  //ROTATIONAL ACCELERATION 
  if (keyIsDown(37) || keyIsDown(39)) { // left || right arrow
    rotTimer2 = timePassed - rotPressedTime2;
    if (rotTimer2 != undefined) rotspd2 = ((1.001 ^ rotTimer2) / 375) + abs(fspd2) / 3; //turn acceleration
    if (rotspd2 > trotspeed + abs(fspd2) / 3) rotspd2 = trotspeed + abs(fspd2) / 3;
  }
  //ROTATION
  if (keyIsDown(37)) theading2 -= rotspd2;
  if (keyIsDown(39)) theading2 += rotspd2;
  if (theading2 <= -180) theading2 = 180;
  if (theading2 > 180) theading2 -= 360;
}

function tankMovement2() {
  fspd2 = 0;
  //ACCELERATION
  if (keyIsDown(38) || keyIsDown(40)) { // up/down arrows
    moveTimer2 = timePassed - movePressedTime2;
    if (moveTimer2 != undefined) fspd2 = (1.001 ^ moveTimer2) / 750;
    if (fspd2 > tspeed) fspd2 = tspeed;
  }
  //MOVEMENT
  if (keyIsDown(40)) fspd2 *= -0.6; //if downarrow is pressed, spd is -6/10th the forward speed
  tx2 += fspd2 * sin(theading2);
  ty2 -= fspd2 * cos(theading2);
  //BOUNDING COLLISION
  if (tx2 > width - 11) tx2 = width - 11;
  if (tx2 < 11) tx2 = 11;
  if (ty2 > height - 11) ty2 = height - 11;
  if (ty2 < 11) ty2 = 11;
}

let dx2 = 0; //rotation of turret
let dest2;
function turretDelayedMovement2() { //makes the turret have a topspeed of aimspeed
  dest2 = atan2(mouseY - ty2, mouseX - tx2) - theading2 + 90; //dest2 is the angle from the front of the tank to your mouse's position, from 0 to 360
  if (dest2 < 0) dest2 += 360; //0 to 360 rather than -90 to 270
  if (dest2 > 360) dest2 -= 360; //wraps values above 360
  if (dx2 > 360) dx2 -= 360; //wraps values above 360
  if (dx2 < 0) dx2 += 360; //wraps values below 0

  if (dest2 > dx2 && dest2 <= dx2 + 180) dx2 += aimspd;
  if (dest2 < dx2 && dest2 >= dx2 - 180) dx2 -= aimspd;
  if (dx2 > 180 && dest2 < dx2 - 180) dx2 += aimspd; //for dx2 > 180 and dest2 > 0
  if (dx2 < 180 && dest2 > dx2 + 180) dx2 -= aimspd; //for dx2 < 180 and dest2 > dx2 + 180

  if ((dx2 + aimspd > dest2 && dx2 < dest2) || (dx2 - aimspd < dest2 && dx2 > dest2)) dx2 = dest2; //stops jittering when dx2 is close to dest2

  if (dx2 == dest2) pointed2 = true;
  else pointed2 = false
}

function drawTank2() {
  turretDelayedMovement2();
  push();
  strokeWeight(0);
  fill('#575');
  translate(tx2, ty2);
  rotate(theading2);
  rect(-7, -16, 14, 36); //body
  rect(-13, -19, 7, 40); //track L
  rect(6, -19, 7, 40); //track R
  fill('#565');
  rect(-8, 14, 7, 4.5); //vent L
  rect(1, 14, 7, 4.5); //vent R
  circle(0, 0, 20); //turret
  rotate(round(dx2, 2)); //aligns the turret with mouse
  rect(-4.5, 9, 9, 4); //bustlebasket
  quad(-10, 0, -5, -13, 5, -13, 10, 0); //mantle
  if (cannonAnim2 < 7) cannonAnim2 += 0.3 * rec;
  if (cannonAnim2 > 7) cannonAnim2 = 7
  rect(-2, -30 - cannonAnim2, 4, 23); //cannon
  rect(-3.5, -15, 7, 2.5); //cannon breach
  noFill();
  stroke(0);
  strokeWeight(0.5);
  circle(0, -dist(mouseX, mouseY, tx2, ty2), 10); //CROSSHAIR
  pop();
}

function mousePressed() {
  if (canFire2) {
    canFire2 = false;
    projFired2 = true;
    shotBearing2 = theading2 + round(dx2, 2);
    reloadedTime2 = millis() + reloadSpeed * 1000;
    cannonAnim2 = 0;
  }
}

function drawProjectile2() {
  if (projX2 > width || projX2 < 0 || projY2 > height || projY2 < 0) { projFired2 = false; projDist2 = 0; }
  if (projFired2) {
    push();
    translate(tx2, ty2);
    rotate(shotBearing2);
    fill(40);
    strokeWeight(0);
    ellipse(0, projDist2, 3, 7);
    pop();
    projDist2 -= muzvel;
  }
  projX2 = -sin(shotBearing2) * projDist2 + tx2;
  projY2 = cos(shotBearing2) * projDist2 + ty2
}

function drawCompass2(x, y) {
  push();
  fill(255);
  strokeWeight(2);
  translate(x, y);
  circle(0, 0, 80); //draw COMPASS
  if (pointed2) fill('forestgreen');
  circle(100, 0, 80);
  rotate(theading2); //heading compass
  line(0, -40, 7, -31); //R arrowhead
  line(0, -40, -7, -31); //L arrowhead
  line(0, 0, 0, -40);
  pop();
  push();
  translate(x + 100, y);
  rotate(round(dx2, 2)); //turret compass
  line(0, -40, 7, -31); //R arrowhead
  line(0, -40, -7, -31); //L arrowhead
  line(0, 0, 0, -40);
  pop();
  push();
  translate(x + 100, y);
  rotate(round(dest2, 2));
  strokeWeight(4);
  stroke('coral');
  line(0, 0, 0, -40);
  pop();
  push();
  translate(x, y);
  strokeWeight(0);
  fill('red');
  text('N', 0, -30);
  fill(0);
  text('E', 30, 0);
  text('S', 0, 30);
  text('W', -30, 0);
  text(round(theading2) + '˚', 0, 50);
  let diff = round(abs(dest2 - dx2));
  if (diff > 180) {
    if (dx2 > 180) diff = round(360 - dx2 + dest2);
    if (dx2 < 180) diff = round(360 - dest2 + dx2);
  }
  text(diff + '˚', 100, 50);
  textAlign(LEFT, CENTER);
  if (debug2) {
    text('spd ' + round(fspd2, 2), -30, 70);
    text('rot ' + round(rotspd2, 2), -30, 90);
    text('x ' + round(tx2, 2), -30, 110);
    text('y ' + round(ty2, 2), -30, 130);
    textAlign(CENTER, CENTER);
    text(round(dx2) + '˚', 100, 70);
  }
  pop();
  push();
  translate(x, y)
  textAlign(LEFT, CENTER);
  if (!canFire2) text(round((reloadedTime2 - millis()) / 1000, 1), 100, height - 100);
  fill(255);
  if (canFire2) fill('forestgreen');
  circle(50, height - 100, 80);
  fill('red');
  if (!canFire2) arc(50, height - 100, 80, 80, 0, (reloadedTime2 - millis()) / 10); //lazy way that only works if reloadSpeed = 3.6, but it's fast
  pop();
  if (reloadedTime2 <= millis()) canFire2 = true;
}