let px = [],
  py = [];

let useCurves = false; // change to true for curves

let useArrays = false; // change to true to print arrays

let consoleIsOn = false;

let mode = "lines";

function createConsole(chosenMode = "lines") {

  mode = chosenMode;

  printToConsole("Click to add points.");
  if (mode != "dots") printToConsole("Press any key to switch between lines and curves.");

  if (mode == "curves") useCurves = true;

  consoleIsOn = true;
}

function drawMouseLines(thisColor = "black") {
  push();
  stroke(thisColor);
  strokeWeight(1);
  noFill();

  if (mode == "dots") {
    for (i = 0; i < px.length; i++) {
      circle(px[i], py[i], 5);
    }
  }
  else if (px.length > 0) {
    beginShape();
    let i = 0;
    if (useCurves) curveVertex(px[i], py[i]); // control point for curves
    for (i = 0; i < px.length; i++) {
      if (useCurves) curveVertex(px[i], py[i]);
      else vertex(px[i], py[i]);
    }
    if (useCurves) {
      curveVertex(mouseX, mouseY);
      curveVertex(mouseX, mouseY); // control point for curves
    } else vertex(mouseX, mouseY);
    endShape();
  }
  pop();
}

function mousePressed() {
  if (mouseIsOffCanvas() || mouseButton != LEFT) return;

  push();
  stroke("white");
  fill("black");
  circle(mouseX, mouseY, 5);
  pop();

  if (!consoleIsOn) return;

  px.push(int(mouseX));
  py.push(int(mouseY));

  updateConsole();
}

function keyPressed() {
  if (mouseIsOffCanvas()) return;
  if (!consoleIsOn) return;

  if (keyCode === BACKSPACE || keyCode === DELETE) {
    px.pop();
    py.pop();
    if (mode == "dots") {
      px = [];
      py = [];
      draw();
    }
  }

  else {

    useCurves = !useCurves; // change useCurves from true to false or false to true
  }
  updateConsole();
}

function mouseIsOffCanvas() {
  return mouseY > height;
}

function updateConsole() {
  document.getElementById("console").innerHTML = "";

  printToConsole("Press Delete/Backspace to erase last point.");
  if (mode == "dots") {
    printToConsole("x, y: </br>");
    for (i = 0; i < px.length; i++) {
      printToConsole(px[i] + ", " + py[i]);
    }
  } else {
    printToConsole("Now using " + (useCurves ? "curves." : "lines.") + "  Press any key to switch.</br>");

    if (useCurves) printToConsole("When using curveVertex, the first and last points are control points that do not show in the output shape.<br/>");

    if (px.length > 0) {
      if (useArrays) {

        printArray("x", px);
        printArray("y", py);

        function printArray(name, array) {
          let val = array[0].toString().padStart(3, '0');

          printToConsole(name + ": [" + (useCurves ? val + ", " : ""), false, false);
          for (i = 0; i < array.length - 1; i++) {
            val = array[i].toString().padStart(3, '0');
            printToConsole(val + ", ", false, false);
          }
          val = array.slice(-1).toString().padStart(3, '0');
          printToConsole(val + (useCurves ? ", " + val + "]" : "]"));
        }
      } else printVertexes();

      function printVertexes() {
        printToConsole("</br>function drawShape() {");
        printToConsole("// fill(\"black\");", "indent");
        printToConsole("beginShape();", "indent");
        if (useCurves) printToConsole("curveVertex(" + px[0] + ", " + py[0] + ");  // control point", "indent");

        for (i = 0; i < px.length; i++) {
          printToConsole((useCurves ? "curveVertex(" : "vertex(") + px[i] + ", " + py[i] + ");", "indent");
        }
        if (useCurves && i > 0) printToConsole("curveVertex(" + px[i - 1] + ", " + py[i - 1] + "); // control point", "indent");
        printToConsole("endShape();", "indent");
        printToConsole("}")
      }
    }
  }
}

function printToConsole(string, indented = false, newline = true) {
  if (indented) document.getElementById("console").innerHTML += "&nbsp;&nbsp;";
  document.getElementById("console").innerHTML += string
  if (newline) document.getElementById("console").innerHTML += "</br>";
}