let blobs = [];
let boids = [];
let colors;
let variation = 0;
let xScale, yScale, centerX, centerY;

// Boid targets 
let targetText = 'Welcome To'; // Default text
let font1;
let targets = [];

let changeDuration = 3000;
let lastChange = 0;

let safeRadius = 250; // Circle "safe zone" radius

function preload() {
  font1 = loadFont('AllertaStencil-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  
  // Scale factors for positioning blobs/boids
  xScale = width / 20;
  yScale = height / 20 * (width / height);
  
  centerX = width / 2;
  centerY = height / 2;
  
  // Blue shades for particles
  colors = [
    color("#004c99"),
    color("#0074D9"),
    color("#3399FF"),
    color("#66B2FF"),
    color("#99CCFF")
  ];

  generateTargets();  // Generate the target points based on text
  for (let i = 0; i < targets.length; i++) {
    boids.push(new Boid(random(width), random(height), targets[i]));
  }

  background(255);  // Initial white background
}

function draw() {
  // Static white background
  background(255);  // Set the background to white
  
  textSize(24);
  text('Press the keys "b" "s" "u" "a" and click to emit particles', windowWidth/2,height-150);
  
  
  
  // Particle Field Logic: Particles appear when mouse is pressed
  if (mouseIsPressed) {
    for (let i = 0; i < 20; i++) {
      let x = mouseX + random(-100, 100);
      let y = mouseY + random(-100, 100);
      var blob = {
        x: getXPos(x),
        y: getYPos(y),
        size: random(1, 5),
        lastX: x,
        lastY: y,
        color: colors[floor(random(colors.length))],
        direction: random(0.1, 1) * (random() > 0.5 ? 1 : -1)
      };
      blobs.push(blob);
    }
  }

  var length = blobs.length;

  // Fading background effect (lighter for white)
  noStroke();
  fill(255, 255, 255, 15); // Low alpha for fade on white
  rect(0, 0, width, height);

  // Auto-change variation of particle movement
  let time = millis();
  if (time - lastChange > changeDuration) {
    lastChange = time;
    variation++;
    if (variation > 11) variation = 0;
  }

  var stepsize = deltaTime * 0.002;
  for (var i = length - 1; i >= 0; i--) {
    let blob = blobs[i];

    var x = getSlopeX(blob.x, blob.y);
    var y = getSlopeY(blob.x, blob.y);
    blob.x += blob.direction * x * stepsize;
    blob.y += blob.direction * y * stepsize;
    
    x = getXPrint(blob.x);
    y = getYPrint(blob.y);

    // Check distance to center — avoid drawing inside the circle
    let d = dist(x, y, centerX, centerY);
    if (d > safeRadius) {
      stroke(blob.color);
      strokeWeight(blob.size);
      line(x, y, blob.lastX, blob.lastY);
    }

    blob.lastX = x;
    blob.lastY = y;

    const border = 200;
    if (x < -border || y < -border || x > width + border || y > height + border) {
      blobs.splice(i, 1);
    }
  }

  // Draw the boids in the center of the screen
  for (let boid of boids) {
    boid.applyMouseRepulsion();
    boid.moveToTarget();  // Always move to the target text
    boid.edges();
    boid.show();
  }
}

function keyPressed() {
  if (key === 'b' || key === 'B') {
    targetText = 'Bath';  // Set text to "Bath"
  } else if (key === 's' || key === 'S') {
    targetText = 'Spa';  // Set text to "Spa"
  } else if (key === 'u' || key === 'U') {
    targetText = 'University';  // Set text to "University"
  } else if (key === 'a' || key === 'A') {
    targetText = 'Bath Spa\nUniversity';  // Set text to "Bath Spa" on one line and "University" on the next
  }
  generateTargets();  // Regenerate targets with new text
  boids = [];  // Reset boids
  for (let i = 0; i < targets.length; i++) {
    boids.push(new Boid(random(width), random(height), targets[i]));
  }
}

function generateTargets() {
  let pg = createGraphics(width, height);  // Use dynamic window size
  pg.pixelDensity(1);
  pg.background(0);
  pg.textSize(70);
  pg.textAlign(CENTER, CENTER);
  pg.fill(255);
  
  pg.textFont(font1);

  // Split the targetText into lines
  let lines = targetText.split("\n");  // Split the text into lines
  let yOffset = -50;

  pg.text(lines[0], width / 2, height / 2 + yOffset); 
  
  if (lines.length > 1) {
    yOffset = 10;
    pg.text(lines[1], width / 2, height / 2 + yOffset);
  }

  pg.loadPixels();
  targets = [];
  for (let x = 0; x < pg.width; x += 2) {
    for (let y = 0; y < pg.height; y += 2) {
      let idx = (x + y * pg.width) * 4;
      let bright = pg.pixels[idx];
      if (bright > 128) {
        targets.push(createVector(x, y));
      }
    }
  }
  pg.remove();
}

function getSlopeY(x, y) {
  switch (variation) {
    case 0: return Math.sin(x);
    case 1: return Math.sin(x * 5) * y * 0.3;
    case 2: return Math.cos(x * y);
    case 3: return Math.sin(x) * Math.cos(y);
    case 4: return Math.cos(x) * y * y;
    case 5: return Math.log(Math.abs(x)) * Math.log(Math.abs(y));
    case 6: return Math.tan(x) * Math.cos(y);
    case 7: return -Math.sin(x * 0.1) * 3;
    case 8: return (x - x * x * x) * 0.01;
    case 9: return -Math.sin(x);
    case 10: return -y - Math.sin(1.5 * x) + 0.7;
    case 11: return Math.sin(x) * Math.cos(y);
  }
}

function getSlopeX(x, y) {
  switch (variation) {
    case 0: return Math.cos(y);
    case 1: return Math.cos(y * 5) * x * 0.3;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6: return 1;
    case 7: return Math.sin(y * 0.1) * 3;
    case 8: return y / 3;
    case 9: return -y;
    case 10: return -1.5 * y;
    case 11: return Math.sin(y) * Math.cos(x);
  }
}

function getXPos(x) {
  return (x - centerX) / xScale;
}
function getYPos(y) {
  return (y - centerY) / yScale;
}

function getXPrint(x) {
  return xScale * x + centerX;
}
function getYPrint(y) {
  return yScale * y + centerY;
}

// Boid class (same as in your original code)
class Boid {
  constructor(x, y, target) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(2, 4));
    this.acc = createVector();
    this.maxForce = 0.3;
    this.maxSpeed = 4;
    this.target = target.copy();
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    else if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    else if (this.pos.y < 0) this.pos.y = height;
  }

  moveToTarget() {
    let desired = p5.Vector.sub(this.target, this.pos);
    let wiggle = p5.Vector.random2D();
    wiggle.mult(0.5);
    desired.add(wiggle);

    let d = desired.mag();

    if (d < 1) {
      this.vel.mult(0.8);
      this.acc.mult(0);
    } else {
      desired.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce * 2);
      this.applyForce(steer);
    }
    this.update();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(96, 139, 193);
    strokeWeight(3);
    point(this.pos.x, this.pos.y);
  }

  applyMouseRepulsion() {
    let mousePos = createVector(mouseX, mouseY);
    let d = p5.Vector.dist(this.pos, mousePos);
    let repulsionRadius = min(windowWidth, windowHeight) / 3; // relative to canvas size, about 133
    if (d < repulsionRadius) {
      let force = p5.Vector.sub(this.pos, mousePos);
      force.setMag(map(d, 0, repulsionRadius, 4 * this.maxSpeed, 0));
      this.applyForce(force);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateTargets();  // Regenerate targets with the new window size
  boids = [];
  for (let i = 0; i < targets.length; i++) {
    boids.push(new Boid(random(width), random(height), targets[i]));
  }
}