let mySound;
let fft;

function preload() {
  soundFormats('mp3');
  mySound = loadSound('Isabella Lullaby.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  fft = new p5.FFT();

  userStartAudio();
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  // Get frequency spectrum
  let spectrum = fft.analyze();

  rotate(frameCount * 0.2);

  noFill();
  stroke(255);
  strokeWeight(2);

  let radius = 150;
  let numBars = 360; // The Number of lines around the circle disc

  for (let i = 0; i < numBars; i++) {
    let angle = map(i, 0, numBars, 0, 360);
    let freqIndex = floor(map(i, 0, numBars, 0, spectrum.length));
    let amp = spectrum[freqIndex];
    amp = max (amp - 30, 0);
    
    let r = radius + map(amp, 0, 255, 6, 150); // vary radius based on beat

    let x1 = radius * cos(angle);
    let y1 = radius * sin(angle);
    let x2 = r * cos(angle);
    let y2 = r * sin(angle);

    stroke(lerpColor(color('#397ad4'), color('#aa5486'), amp / 255));
    line(x1, y1, x2, y2);
  }

  // Draw central disc
  noStroke();
  fill(30);
  ellipse(0, 0, radius * 2);
  fill(80);
  ellipse(0, 0, 20);
}

 function mousePressed() {
   if (mySound.isPlaying()) {
     mySound.pause();
   } else {
     mySound.play();
   }
 }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
