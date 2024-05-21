let debug = false;

//TANK
let tx = 400; //tank x
let ty = 400; //tank y
let fspd = 0; //speed of tank
let theading = 90; //tank heading (rotation) in degrees
let rotspd = 0; //rotation speed of tank
let dx = 0; //rotation of turret
let turretRSpeed = 0 //rotation speed of turret

//TURRET
let pointed = false;
let cannonAnim = 7;
let rotTimer;
let moveTimer;
let rotPressedTime;
let movePressedTime;
let turretTimer;
let turretPressedTime;
//SHOOTING
let projDist = 0;
let projX;
let projY;
let projFired = false;
let shotBearing;
let reloadedTime;
let canFire = true;

function tankRotation() {
  rotspd = 0;
  //ROTATIONAL ACCELERATION 
  if (keyIsDown(65) || keyIsDown(68)) { // A || D
    rotTimer = timePassed - rotPressedTime;
    if (rotTimer != undefined) rotspd = ((1.001 ^ rotTimer) / 375) + abs(fspd) / 3; //turn acceleration
    if (rotspd > trotspeed + abs(fspd) / 3) rotspd = trotspeed + abs(fspd) / 3;
  }
  //ROTATION
  if (keyIsDown(65)) theading -= rotspd;
  if (keyIsDown(68)) theading += rotspd;
  if (theading <= -180) theading = 180;
  if (theading > 180) theading -= 360;
}

function tankMovement() {
  fspd = 0;
  //ACCELERATION
  if (keyIsDown(87) || keyIsDown(83)) { // W || S
    moveTimer = timePassed - movePressedTime;
    if (moveTimer != undefined) fspd = (1.001 ^ moveTimer) / 750;
    if (fspd > tspeed) fspd = tspeed;
  }
  //MOVEMENT
  if (keyIsDown(83)) fspd *= -0.6; //if s is pressed, spd is -6/10th the forward speed
  tx += fspd * sin(theading);
  ty -= fspd * cos(theading);
  //BOUNDING COLLISION
  if (tx > width - 11) tx = width - 11;
  if (tx < 11) tx = 11;
  if (ty > height - 11) ty = height - 11;
  if (ty < 11) ty = 11;
}

function turretRotation() { //makes the turret have a topspeed of aimspeed
  turretRSpeed = 0;
  //ROTATIONAL ACCELERATION
  if (keyIsDown(74) || keyIsDown(76)) { // J || L
    turretTimer = timePassed - turretPressedTime;
    if (turretTimer != undefined) turretRSpeed = ((1.001 ^ turretTimer) / 375); //turn acceleration
    if (turretRSpeed > aimspd) turretRSpeed = aimspd;
  }
  //ROTATION
  if (keyIsDown(74)) dx -= turretRSpeed;
  if (keyIsDown(76)) dx += turretRSpeed;
}

function drawTank() {
  push();
  strokeWeight(0);
  fill('#575');
  translate(tx, ty);
  rotate(theading);
  rect(-7, -16, 14, 36); //body
  rect(-13, -19, 7, 40); //track L
  rect(6, -19, 7, 40); //track R
  fill('#565');
  rect(-8, 14, 7, 4.5); //vent L
  rect(1, 14, 7, 4.5); //vent R
  circle(0, 0, 20); //turret
  rotate(round(dx, 2)); //aligns the turret with mouse
  rect(-4.5, 9, 9, 4); //bustlebasket
  quad(-10, 0, -5, -13, 5, -13, 10, 0); //mantle
  if (cannonAnim < 7) cannonAnim += 0.3 * rec;
  if (cannonAnim > 7) cannonAnim = 7
  rect(-2, -30 - cannonAnim, 4, 23); //cannon
  rect(-3.5, -15, 7, 2.5); //cannon breach
  noFill();
  stroke(0);
  strokeWeight(0.5);
  rect(-4, -dist(tx2, ty2, tx, ty) - 5, 8, 10);
  pop();
}

function drawProjectile() {
  if (projX > width || projX < 0 || projY > height || projY < 0) { projFired = false; projDist = 0; }
  if (projFired) {
    push();
    translate(tx, ty);
    rotate(shotBearing);
    fill(40);
    strokeWeight(0);
    ellipse(0, projDist, 3, 7);
    pop();
    projDist -= muzvel;
  }
  projX = -sin(shotBearing) * projDist + tx;
  projY = cos(shotBearing) * projDist + ty
}

function drawCompass(x, y) {
  push();
  fill(255);
  strokeWeight(2);
  translate(x, y);
  circle(0, 0, 80); //draw COMPASS
  rotate(theading); //heading compass
  line(0, -40, 7, -31); //R arrowhead
  line(0, -40, -7, -31); //L arrowhead
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
  text(round(theading) + '˚', 0, 50);
  textAlign(LEFT, CENTER);
  if (debug) {
    text('spd ' + round(fspd, 2), -30, 70);
    text('rot ' + round(rotspd, 2), -30, 90);
    text('x ' + round(tx, 2), -30, 110);
    text('y ' + round(ty, 2), -30, 130);
    textAlign(CENTER, CENTER);
  }
  pop();
  push();
  textAlign(LEFT, CENTER);
  if (!canFire) text(round((reloadedTime - millis()) / 1000, 1), 100, height - 50);
  fill(255);
  if (canFire) fill('forestgreen');
  circle(50, height - 50, 80);
  fill('red');
  if (!canFire) arc(50, height - 50, 80, 80, 0, (reloadedTime - millis()) / 10); //lazy way that only works if reloadSpeed = 3.6, but it's fast
  pop();
  if (reloadedTime <= millis()) canFire = true;
}