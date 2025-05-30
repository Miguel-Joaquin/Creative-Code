var img, x, y;
function preload() {
img = loadImage("Frame 8 copy.png");
}

function setup() {
createCanvas (1000, 1000);
background(0);
noStroke();
frameRate(300);
}

function draw() {
  for (let i = 0; i < 100; i++)
x = random(width);
y = random(height);
var c = img.get(x, y);
fill(c[0], c[1], c[2], 50); 
ellipse (x, y, 30, 30);
}