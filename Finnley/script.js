//global constants are declared in index.html.

const tank1 = new Tank(400, 400, 90, 87, 83, 65, 68, false, 74, 76, 75);
const tank2 = new Tank(1200, 400, -90, 38, 40, 37, 39);
const tanks = [tank1, tank2];

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
  
  fill(0);
  text("WASD to move, J/L to aim, K to shoot", 300, 35);
  text("Arrow keys to move, mouse to aim, click to shoot", 1240, 35);
  
  timePassed = millis();
  
  tanks.forEach(tank => {
    tank.tankRotation();
    tank.turretRotation();
    tank.tankMovement();
    tank.drawProjectile();
    tank.drawTank();
  });
  
  tanks[0].drawCompass(50, 50);
  tanks[1].drawCompass(width - 50, 50);
}

function keyPressed() {
  const code = event.keyCode;
  const currentTime = millis();
  tanks.forEach(tank => {
    if(code == tank.getForwardKey() || code == tank.getBackKey()) tank.setMovePressedTime(currentTime);
    if(code == tank.getRotLeftKey() || code == tank.getRotRightKey()) tank.setRotPressedTime(currentTime);
    if(!tank.isMouseAimed()) {
      if(code == tank.getTurretLeftKey() || code == tank.getTurretRightKey()) tank.setTurretPressedTime(currentTime);
      if(code == tank.getFireKey()) tank.fireCannon();
    }
  });
}

function mousePressed() {
  tanks[1].fireCannon();
}