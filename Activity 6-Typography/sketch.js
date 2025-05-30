let font;

function preload() {
  font = loadFont('AllertaStencil-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(245);

  // Map mouseX to font size (between 16 and 120)
  let fontSize = map(mouseX, 0, width, 16, 120);
  textSize(fontSize);

  // Map mouseY to color (light to dark)
  let col = map(mouseY, 0, height, 0, 100);
  
  fill(50, 50, 50, 100);
  noStroke();
  text("Miguel Joaquin", width / 2 + 4, height / 2 + 4); // for the offset shadow 

  fill(col, 0, 200);
  stroke(0);
  strokeWeight(.5);
  text("Miguel Joaquin", width / 2, height / 2);
}