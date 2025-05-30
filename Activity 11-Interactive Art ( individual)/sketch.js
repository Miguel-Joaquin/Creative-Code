let angle;
let petalSize = 10;
let fallingLeaves = [];
let spawnRate = 2;

let startColor;
let endColor;
let lerpAmount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  strokeWeight(2);

  // Initialize background colors
  startColor = color('#F7C96D');
  endColor = color('#2e4482');
}

function draw() {
  // Smoothly transition the background color
  let currentColor = lerpColor(startColor, endColor, lerpAmount);
  background(currentColor);

  // Update lerpAmount to change the background color over time
  lerpAmount += 0.001;
  if (lerpAmount > 1) {
    lerpAmount = 0; // Reset for continuous transition
    // Swap the start and end colors for a dynamic effect
    let temp = startColor;
    startColor = endColor;
    endColor = temp;
  }

  // Calculate the angle based on the mouse position, maximum 45 degrees for a more gentle branching
  angle = (mouseX / width) * 45;
  angle = min(angle, 45);

  // Start the tree from the bottom of the screen
  translate(width / 2, height);

  // The main trunk
  stroke(0, 0, 0);
  line(0, 0, 0, -200);

  // Move to the end of the trunk
  translate(0, -200);

  // Start the recursive branching
  branch(180, 0);
  
  if (random(1) < spawnRate * 0.01){
    fallingLeaves.push(new FallingLeave(random(-width/2, width/2), -200, random(15, 25), random(5, 10)));
  }
  
  for (let i = fallingLeaves.length - 1; i >= 0; i--){
    let lea = fallingLeaves[i];
    lea.update();
    lea.display();
    
    if (lea.y > height) {
      fallingLeaves.splice(i, 1);
    }
  }
}

function branch(h, level) {
  // Set the color of the branches based on the recursion level (darker colors closer to the trunk)
  stroke(level * 15, 80, 60);

  // Each branch is smaller than the previous one
  h *= 0.7;

  // Stop recursion if the branch is too small
  if (h > 5) {
    // Draw the right branch
    push();
    rotate(angle);
    line(0, 0, 0, -h);
    translate(0, -h);
    
    // Draw the petals at the end of the branch
    if (h < 30) drawPetals();

    // Call branch() recursively
    branch(h, level + 1);
    pop();

    // Draw the left branch
    push();
    rotate(-angle);
    line(0, 0, 0, -h);
    translate(0, -h);
    
    // Draw the petals at the end of the branch
    if (h < 30) drawPetals();

    // Call branch() recursively
    branch(h, level + 1);
    pop();
  }
}

function drawPetals() {
  // Petal color (soft pink for sakura)
  fill(340, 80, 90, 0.8);
  noStroke();
  
  let petalSizeChanges = random(7, 15);
  
  // Draw 5 petals in a circular pattern
  for (let i = 0; i < 5; i++) {
    push();
    rotate(TWO_PI / 5 * i);
    ellipse(petalSizeChanges, 0, petalSizeChanges * 2, petalSizeChanges);
    pop();
  }
}

class FallingLeave {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.type = 'leaf'
    this.color = color(340, 80, 90, 0.8);
  }
  update(){
    this.y += this.speed
    this.x += random(-1, 1);
    this.speed *= 0.99;
  }
  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
