var img, x, y;
function preload() {
img = loadImage("Frame 12 copy.png");
}

function setup() {
createCanvas (500, 1000);
background(0);
noStroke();
}

function draw() {
background(0);
x = mouseX;
y = mouseY;

image(img, 0, img.height/2, img.width/2, img.height/2);
var c = get(x, y);
fill(c);
ellipse (x, y, 100, 100);
}

