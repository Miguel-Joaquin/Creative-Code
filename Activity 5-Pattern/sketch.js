let color1, color2;
let rows = 10;
let cols = 10;

function setup() {
  createCanvas(600, 640);
  angleMode(DEGREES);
  noLoop();
  generateColors();
  drawPattern();
}

function drawPattern() {
  background(255);
  let spacing = width / cols;
  
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let xpos = x * spacing + spacing / 2;
      let ypos = y * spacing + spacing / 2;
      
      push();
      translate(xpos, ypos);
      rotate(45); // Make it a diamond

      if ((x + y) % 2 == 0) {
        fill(color1);
      } else {
        fill(color2);
      }

      noStroke();
      rect(0, 0, spacing * 0.5, spacing * 0.5);
      pop();
    }
  }
}

function mousePressed() {
  generateColors();
  drawPattern();
}

function generateColors() {
  color1 = color(random(255), random(255), random(255));
  color2 = color(random(255), random(255), random(255));
}
