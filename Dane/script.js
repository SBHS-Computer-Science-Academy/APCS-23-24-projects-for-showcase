let array1 = [];
let frameCounter = 0;
let deadAmount = 0;
let colorSpeed = 600;
let array2 = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  frames = 0;
  colorMode(HSB, 255);
  frameRate(60);
  wide = true;
  particleAmount = 6;
  angleMode(DEGREES);
  direction = true;
  rand = true;
  frames2 = 0;
  a = 1;
}
function draw() {
  //rotate(45);
  //translate(width,-height);
  //print(array1)
  if (rand === false) {
    if (direction === true) {
      if (colorSpeed <= 120) {
        colorSpeed = 1002;
        if (direction === false) {
          direction = true;
        } else if (direction === true) {
          direction = false;
        }
      }
      if (keyIsDown(39)) {
        colorSpeed += 3;
      }
      if (keyIsDown(37)) {
        colorSpeed -= 3;
      }
    }
    else if (direction === false) {
      if (colorSpeed <= 120) {
        colorSpeed = 1002;
        if (direction === false) {
          direction = true;
        } else if (direction === true) {
          direction = false;
        }
      }
      if (keyIsDown(37)) {
        colorSpeed += 3;
      }
      if (keyIsDown(39)) {
        colorSpeed -= 3;
      }
    }
  }
  if (particleAmount < 0) {
    particleAmount = 0;
  }
  frames += 1;
  frames2 += 1;
  if (rand === true) {
    if (frames2 >= 3 * a) {
      if (a == 1) {
        //print('started');
        tempColorSpeed = colorSpeed;
        randColorSpeed = random(200, 1500);
        a += 1;
      }
      if (a < 60 && a > 1) {
        a += 1;
        colorSpeed = lerp(tempColorSpeed, randColorSpeed, a / 60);
      }
      // if (a == 30) {
      //   finColorSpeed = colorSpeed;
      //   //randColorSpeed = random(200,1000);
      //   a += 1;
      // } 
      // if (a > 30 && a < 60) {
      //   a += 1;
      //   colorSpeed = lerp(finColorSpeed,randColorSpeed,a/60);
      // }
      if (frames2 >= 10 * 60) {
        a = 1;
        frames2 = 0;
        //print('stopped')
      }
    }
  }

  background("black");
  if (frames == 1) {
    frames = 0;
    for (let i = 0; i < particleAmount; i++) {
      array1.push(new obj1(array1.length));
    }
  }
  for (let i = 0; i < array1.length; i++) {
    array1[i].move();
    array1[i].decay();
    array1[i].display();
    if (array1[i].death()) i--;
  }
  //uncomment for debug text
  // fill(255)
  // text("Widescreen: " + wide + '    Particle amount: ' + particleAmount + '       Color speed: ' + colorSpeed + '        Seconds: ' + ceil(millis() / 1000), width - 570, height - 50);
}

class obj1 {
  constructor(count) {
    this.colorSpeed = colorSpeed;
    this.count = count;
    this.trans = 255;
    //this.life = random(255, 500);
    this.life = 255;
    if (wide == true) {
      this.x = random(-0.5 * width, 1.5 * width);
      this.y = random(-0.5 * height, 1.5 * height);
      this.lerpX = random(-0.5 * width, 1.5 * width);
      this.lerpY = random(-0.5 * height, 1.5 * height);
    } else if (wide == false) {
      this.x = random(-width, 2 * width);
      this.y = random(-height, 2 * height);
      this.lerpX = random(-width, 2 * width);
      this.lerpY = random(-height, 2 * height);
    }
    this.size = random(25, 100);
    this.a = 0;
    this.lerpSpeed = this.life;
  }
  display() {
    push();
    let colorToUseMod = 0;
    this.xWidth = this.x / width;
    //red goes from left to right
    if (direction === false) {
      let colorToUse = (this.xWidth * 255) - frameCounter / this.colorSpeed - 255;
      colorToUseMod = -colorToUse % 255;
    } else if (direction === true) {
      //red goes from right to left
      let colorToUse = (this.xWidth * 255) + frameCounter / this.colorSpeed;
      colorToUseMod = colorToUse % 255;
    }
    fill(colorToUseMod, 255, 255, this.trans);
    strokeWeight(0.5);
    stroke(0, 0, 0, this.trans);
    noStroke();
    circle(this.x, this.y, this.size);
    frameCounter = frameCounter + 1;
    pop();
  }
  decay() {
    this.life -= 1;
    this.trans -= 1;
  }
  death() {
    //print(this.count + ' ' + this.life);
    if (this.life <= 0) {
      //array1.splice(this.count - deadAmount, 1);
      //deadAmount += 1; 
      array1.splice(0, 1);
      return true;
    }
  }
  move() {
    //print(this.lerpSpeed);
    this.lerpSpeed += this.a;
    //this.a += random([-0.1,1]);
    this.a += random(0.25, 0.75);
    this.x = lerp(this.x, this.lerpX, 1 / this.lerpSpeed);
    this.y = lerp(this.y, this.lerpY, 1 / this.lerpSpeed);
  }
}
function keyPressed() {
  if (key === 'w') {
    if (wide == false) {
      wide = true;
    } else if (wide == true) {
      wide = false;
    }
  } else if (keyCode === UP_ARROW) {
    particleAmount += 1;
  } else if (keyCode === DOWN_ARROW) {
    particleAmount -= 1;
  } else if (keyCode === SHIFT) {
    if (rand == true) {
      rand = false;
    } else if (rand == false) {
      rand = true;
    }
  }
}