let trail = [];
let maxLength = 100; // the mouse trail length

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(HSB, 360, 255, 255, 255); // Full Range color
}

function draw() {
  background(0, 20); // Fade effect

  let hue = map(sin(frameCount * 0.02), -1, 1, 0, 360);

  let col = color(hue, 255, 255); // HSB color

  trail.push({ x: mouseX, y: mouseY, c: col });

  if (trail.length > maxLength) {
    trail.shift(); // It remove the oldest point
  }

  for (let i = 0; i < trail.length - 1; i++) {
    let p1 = trail[i];
    let p2 = trail[i + 1];

    let alpha = map(i, 0, trail.length, 0, 255);
    let c = lerpColor(p1.c, p2.c, 0.5);
    c.setAlpha(alpha);

    fill(c);
    let size = map(i, 0, trail.length, 30, 5);
    ellipse(p1.x, p1.y, size, size);
  }
}
