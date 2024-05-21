let textAlpha = 0;
let textAlpha2 = 0;

function setup() {
  createCanvas(1600, 800);
  textFont('Courier New', 18);
  angleMode(DEGREES);
  frameRate(fr);
}

function draw() {
  clear();
  textAlign(CENTER, CENTER);
  background(160);
  timePassed = millis();

  tankRotation();
  turretRotation();
  tankRotation2();
  tankMovement();
  tankMovement2();

  drawProjectile();
  drawProjectile2();
  drawTank();
  drawTank2();

  collision = collideCircleCircle(tx, ty, 22, tx2, ty2, 22);
  if (collision) {}
  thit = collideLineCircle(projX2, projY2, -sin(shotBearing2) * (projDist2 - muzvel) + tx2, cos(shotBearing2) * (projDist2 - muzvel) + ty2, tx, ty, 22);
  thit2 = collideLineCircle(projX, projY, -sin(shotBearing) * (projDist - muzvel) + tx, cos(shotBearing) * (projDist - muzvel) + ty, tx2, ty2, 22);
  if (thit) textAlpha = 255
  if (thit2) textAlpha2 = 255
  
  fill(255, 0, 0, textAlpha)
  if (textAlpha > 0) textAlpha -= 1.5;
  text('Hit!', tx, ty - 40);
  fill(255, 0, 0, textAlpha2)
  if (textAlpha2 > 0) textAlpha2 -= 1.5;
  text('Hit!', tx2, ty2 - 40);
  
  drawCompass(50, 50);
  drawCompass2(width - 150, 50);
}

function keyPressed() {
  if (key == 'a' || key == 'd') rotPressedTime = millis();
  if (key == 'j' || key == 'l') turretPressedTime = millis();
  if (key == 'w' || key == 's') movePressedTime = millis();
  if (key == 'ArrowLeft' || key == 'ArrowRight') rotPressedTime2 = millis();
  if (key == 'ArrowUp' || key == 'ArrowDown') movePressedTime2 = millis();
  if (key == 'k') {
    if (canFire) {
      canFire = false;
      projFired = true;
      shotBearing = theading + round(dx, 2);
      reloadedTime = millis() + reloadSpeed * 1000;
      cannonAnim = 0;
    }
  }
}