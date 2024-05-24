let numStar;
let starX = []
let starY = []
let starS = []
let bcolor = ['silver', '#964B00']
let windowColors = ['yellow', 'black']
function setup() {
  let myCanvas = createCanvas(1000, 800);
  myCanvas.parent("myCanvas");

  createConsole("lines");

  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  parameter()
  noLoop()
}


function draw() {
  clear();
  background('black');

  star()
  let col=color(245, 236, 235)
  let colo=color(230, 227, 227)
  circleGradient(970, 20, 200, colo, col)
  towtwo()

  towertower()
  tower()
  drawMouseLines("black");
  frontwind()
  moon()
}

// function tower(){
//   push();
//   let numbuild=7;
//   for(let i=0; i< numbuild; i+=1){
//     fill('silver');
//     rect(80, 600, 100, 200);
//     push();
//     let Ncol= 3;
//     for(let i=0; i>Ncol; i+=1){
//       push();
//       let nRow=5;
//       for(let i=0; i<nRow; i+=1){
//         fill('yellow')
//         square(90, 620, 20)
//         translate(0, 30)
//       }
//       pop();
//       translate(30, 0)
//     }
//     pop();
//     translate(150, 0)
//   }
//   pop();
// }

function parameter() {
  numStar = random(30, 200)
  for (let v = 0; v <= numStar; v += 1) {
    starS.push(random(2, 5));
    starX.push(random(width));
    starY.push(random(height));
  } 
}

function star() {
  for (let v = 0; v < numStar; v += 1) {
    fill('white')
    circle(starX[v], starY[v], starS[v])
  }
}


function frontwind() {
  for (let i = 0; i <= 900; i += 150) {

    let builcol = random(bcolor);
    fill(builcol)
    rect(i, 500, 100, 300)
    for (let v = 50; v <= 1050; v += 150) {
      for (let p = 0; p <= 4; p += 1) {
        let wC = random(windowColors);
        fill(wC)
        noStroke()
        rect(v - 15, 530 + (p * 50), 30, 30)
      }
    }

  }

}

function tower(){
  fill('grey')
  beginShape();
  vertex(350, 800);
  vertex(355, 213);
  vertex(479, 208);
  vertex(530, 800);
  endShape();
  let row=4
  let collumn = 20
  for(let v=0; v<row; v+=1){
    for(let i=0; i<collumn; i+=1){
      let wct=random(windowColors);
      fill(wct)
      noStroke()
      rect(374+v*25, 240+i*30, 20, 20)
      
    }
  }
}

function towertower(){
  beginShape();
  fill("grey")
  vertex(65, 800);
  vertex(65, 0);
  vertex(221, 0);
  vertex(221, 800);
  endShape()
  let col=80
  let row= 8
  for(let i=0; i<row; i+=1){
    
  
    for(let v=0; v<col; v+=1){
      let wcth= random(windowColors)
      fill(wcth)
      rect(85+i*15, 5+v*15, 10, 10)
      
    }
  }
}
  
function moon(){
  fill(153, 151, 151)
  ellipse(917, 53, 15, 15)
  ellipse(984, 70, 50, 30)
  ellipse(964, 13, 20, 40)
}

function towtwo(){
  fill('grey')
  beginShape()
  vertex(600, 800);
  vertex(600, 81);
  vertex(808, 81);
  vertex(808, 800)
  endShape()
  for(let v=0; v<16; v+=1){
    for(let i=0; i<50; i+=1){
      tcw=random(windowColors)
      fill(tcw)
      rect(610+(v*12), 82+(i*15), 10, 10)
    }
  }
}