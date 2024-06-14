class Tank {
  constructor(startX, startY, rotation, forwardKey, backKey, rotLeftKey, rotRightKey, isMouseAimed=true, turretLeftKey=undefined, turretRightKey=undefined, fireKey=undefined) {
    // BINDS
    Object.assign(this, { forwardKey, backKey, rotLeftKey, rotRightKey, turretLeftKey, turretRightKey, fireKey });

    // TANK
    Object.assign(this, {
        x: startX,
        y: startY,
        vel: 0,
        rot: rotation,
        rotVel: 0,
        multiplier: 1,
        dx: 0,
        dest: 0,
        turretRotVel: 0,
        mouseAimed: isMouseAimed,
        other: isMouseAimed ? 0 : 1,
        cannonPullback: 8,
        cannonReturnSpeed: 0.35,
        cannonAnim: 8,
        textAlpha: 0,
        rotTimer: 0,
        moveTimer: 0,
        rotPressedTime: 0,
        movePressedTime: 0,
        turretTimer: 0,
        turretPressedTime: 0,
        shotsLeft: ammunition,
        projDist: 0,
        projX: 0,
        projY: 0,
        projFired: false,
        shotBearing: 0,
        reloadedTime: 0,
        canFire: true
    });
  }

  getTankX() {
    return this.x;
  }

  getTankY() {
    return this.y;
  }

  isMouseAimed() {
    return this.mouseAimed;
  }

  getForwardKey() {
    return this.forwardKey;
  }

  getBackKey() {
    return this.backKey;
  }

  getRotLeftKey() {
    return this.rotLeftKey;
  }

  getRotRightKey() {
    return this.rotRightKey;
  }

  getTurretLeftKey() {
    return this.turretLeftKey;
  }

  getTurretRightKey() {
    return this.turretRightKey;
  }

  getFireKey() {
    return this.fireKey;
  }

  setRotPressedTime(x) {
    this.rotPressedTime = x;
  }

  setMovePressedTime(x) {
    this.movePressedTime = x;
  }

  setTurretPressedTime(x) {
    this.turretPressedTime = x;
  }

  
  hasHit() {
    return collideLineCircle(this.projX, this.projY, -sin(this.shotBearing) * (this.projDist - muzVel) + this.x, cos(this.shotBearing) * (this.projDist - muzVel) + this.y, tanks[this.other].getTankX(), tanks[this.other].getTankY(), 25);
  }

  
  tankRotation() {
    // ROTATIONAL ACCELERATION
    if(keyIsDown(this.rotLeftKey) || keyIsDown(this.rotRightKey)) {
      this.rotTimer = timePassed - this.rotPressedTime;
      if(this.rotTimer !== undefined) this.rotVel = Math.min(this.rotVel + accel, maxRotSpeed + abs(this.vel) / 3);
    }
    else this.rotVel = 0;
    
    // ROTATION
    if(keyIsDown(this.rotLeftKey)) this.rot -= this.rotVel;
    if(keyIsDown(this.rotRightKey)) this.rot += this.rotVel;
    
    // Normalize rotation to keep it within -180 to 180 degrees
    if(this.rot <= -180) this.rot += 360;
    else if(this.rot > 180) this.rot -= 360;
  }

  
  tankMovement() {
    // Determine the desired movement direction
    const movingForward = keyIsDown(this.forwardKey);
    const movingBackward = keyIsDown(this.backKey);

    // Check if the direction has changed
    if (movingForward && this.multiplier == -0.6 || movingBackward &&  this.multiplier == 1) {
      this.vel = 0; // Reset velocity when switching direction
      this.movePressedTime = timePassed; // Reset the move pressed time
    }

    // ACCELERATION
    if (movingForward || movingBackward) {
      this.moveTimer = timePassed - this.movePressedTime;
      if (this.moveTimer !== undefined) this.vel = Math.min(this.vel + accel, maxSpeed);
    }
    else this.vel = 0;

    // MOVEMENT
    this.multiplier = 1;
    if (movingBackward) this.multiplier *= -0.6; // If back is pressed, speed is -6/10th of the forward speed
    
    this.x += this.multiplier * this.vel * sin(this.rot);
    this.y -= this.multiplier * this.vel * cos(this.rot); //move in proper direction

    // BOUNDING COLLISION
    this.x = constrain(this.x, 11, width - 11);
    this.y = constrain(this.y, 11, height - 11);
  }

  
  turretRotation() { // Makes the turret have a top speed of aimspd
    if(this.mouseAimed) {
      this.turretDelayedMovement();
      return;
    }

    // ROTATIONAL ACCELERATION
    if(keyIsDown(this.turretLeftKey) || keyIsDown(this.turretRightKey)) {
      this.turretTimer = timePassed - this.turretPressedTime;
      if(this.turretTimer !== undefined) this.turretRotVel = Math.min(this.turretRotVel + 2 * accel, aimspd); // turn acceleration
    }
    else this.turretRotVel = 0;

    // ROTATION
    if(keyIsDown(this.turretLeftKey)) this.dx -= this.turretRotVel;
    else if(keyIsDown(this.turretRightKey)) this.dx += this.turretRotVel;
  }

  
  turretDelayedMovement() {
    this.dest = (atan2(mouseY - this.y, mouseX - this.x) - this.rot + 450) % 360; // dest is the angle from the front of the tank to the mouse
    this.dx = (this.dx + 360) % 360; // Normalize dx to [0, 360)

    let delta = this.dest - this.dx; // Calculate the shortest path to the destination
    if(delta > 180) delta -= 360; // Normalize delta to (-180, 180]
    else if(delta < -180) delta += 360;

    if(Math.abs(delta) < aimspd) this.dx = this.dest; // If within aim speed, snap to destination to prevent jitter
    else this.dx += Math.sign(delta) * aimspd; // Move towards the destination by aim speed
  }

  
  drawTank() {
    if(tanks[this.other].hasHit()) {
      this.textAlpha = 390;
      hitSound.play();
    }

    push();
    translate(this.x, this.y);
    
    // Display hit text with fading effect
    if(this.textAlpha > 0) {
      fill(255, 0, 0, this.textAlpha);
      text('Hit!', 0, -40);
      this.textAlpha -= 6.5;
    }

    // Draw tank body and components
    strokeWeight(0);
    fill('#575');
    rotate(this.rot);
    rect(-7, -16, 14, 36); // body
    rect(-13, -20, 7, 42); // track L
    rect(6, -20, 7, 42); // track R
    fill('#565');
    rect(-8, 14, 7, 4.5); // vent L
    rect(1, 14, 7, 4.5); // vent R
    circle(0, 0, 20); // turret

    // Align turret with mouse
    rotate(round(this.dx, 2));
    rect(-4.5, 9, 9, 4); // bustlebasket
    quad(-10, 0, -5, -13, 5, -13, 10, 0); // mantle

    // Handle cannon animation
    if(this.cannonAnim < this.cannonPullback) this.cannonAnim += this.cannonReturnSpeed * rec;
    else if(this.cannonAnim > this.cannonPullback) this.cannonAnim = this.cannonPullback;
    rect(-2, -29.5 - this.cannonAnim, 4, 23); // cannon
    rect(-3.5, -15, 7, 2.5); // cannon breach

    // Draw aiming crosshairs
    noFill();
    stroke(0);
    strokeWeight(0.5);
    const targetDist = this.mouseAimed
      ? dist(mouseX, mouseY, this.getTankX(), this.getTankY())
      : dist(tanks[1].getTankX(), tanks[1].getTankY(), this.getTankX(), this.getTankY());
    const crosshairY = -targetDist;

    if(this.mouseAimed) circle(0, crosshairY, 10);
    else rect(-4, crosshairY - 5, 8, 10);
    pop();
  }

  
  drawProjectile() {
    this.projX = -sin(this.shotBearing) * this.projDist + this.x;
    this.projY = cos(this.shotBearing) * this.projDist + this.y; //update position
    
    if(this.projFired) {
      if(this.projX > width || this.projX < 0 || this.projY > height || this.projY < 0) { //check if offscreen
        this.projFired = false;
        this.projDist = 0;
        return;
      }
      
      push();
      translate(this.x, this.y);
      rotate(this.shotBearing);
      fill(40);
      strokeWeight(0);
      ellipse(0, this.projDist, 3, 7);
      pop(); //draw projectile

      this.projDist -= muzVel; //update distance
    }
  }

  
  fireCannon() {
    if(this.canFire && this.shotsLeft > 0) {
      fireSound.play();
      this.shotsLeft -= 1;
      this.canFire = false;
      this.projFired = true;
      this.shotBearing = this.rot + round(this.dx, 2);
      this.reloadedTime = millis() + reloadSpeed;
      this.cannonAnim = 0;
    }
  }

  
  drawCompass(x, y) {
    push();
    fill(255);
    strokeWeight(2);
    translate(x, y);
    // Draw compass
    circle(0, 0, 80); 
    rotate(this.rot);
    line(0, -40, 7, -31); // R arrowhead
    line(0, -40, -7, -31); // L arrowhead
    line(0, 0, 0, -40);
    pop();

    // Draw compass labels
    push();
    translate(x, y);
    strokeWeight(0);
    fill('red');
    text('N', 0, -30);
    fill(0);
    text('E', 30, 0);
    text('S', 0, 30);
    text('W', -30, 0);
    if(!debug) text(round(this.rot) + '˚', 0, 50);
    pop();

    // Draw debug information if in debug mode
    if(debug) {
      push();
      textAlign(LEFT, CENTER);
      let n = x - 50;
      text("rot " + round(this.rot, 2), n, y + 50);
      text('vel ' + round(this.vel, 2), n, y + 70);
      text('rotVel ' + round(this.rotVel, 2), n, y + 90);
      text('x ' + round(this.x, 2), n, y + 110);
      text('y ' + round(this.y, 2), n, y + 130);
      if(!this.mouseAimed) text('trtVel ' + round(this.turretRotVel, 2), n, y + 150);
      pop();
    }

    // Draw reload timer and firing status
    let reloadTimeRemaining = this.reloadedTime - millis();
    
    fill(this.canFire ? 'forestgreen' : 50);
    rect(x + ((x < width / 2) ? 50 : -55), height / 2 - 110, 10, 220);
    if(!this.canFire) {
      fill(255, 0, 0); // red
      let topBarY = height / 2 - 330 + reloadTimeRemaining / ((reloadSpeed / 2) / 220);
      rect(x + ((x < width / 2) ? 50 : -55), topBarY, 10, (height / 2) + 110 - topBarY);
    }
    
    push();
    for(let i = 0; i < ammunition; i++) {
      fill(255);
      if(i < this.shotsLeft) fill('forestgreen');
      circle(x, height / 2 + 100 - 50 * i, 20);
    }

    fill((this.shotsLeft == ammunition) ? 'forestgreen' : 255);
    circle(x, height - 50, 80);
    fill(255, 0, 0);
    if(this.shotsLeft < ammunition) {
      text(round(reloadTimeRemaining / 1000, 1), x + ((x < width / 2) ? 70 : -75), height - 50);
      arc(x, height - 50, 80, 80, 0, reloadTimeRemaining / 10); //only works if reloadSpeed = 3600
    }
    pop();

    // Update canFire status
    if(reloadTimeRemaining < reloadSpeed / 2) this.canFire = true;
    if(this.reloadedTime <= millis()) {
      this.shotsLeft = Math.min(this.shotsLeft + 1, 5);
      this.reloadedTime = millis() + reloadSpeed;
    }
    print(this.shotsLeft);
  }
}