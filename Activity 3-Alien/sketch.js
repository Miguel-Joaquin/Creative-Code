function setup() {
  createCanvas(600, 600);
  background(100);
}

function draw() {
  background(5);
  translate(width / 2, height / 2);
  
  // Body (Gengar round shape)
  fill(94, 27, 160); // Gengar body color
  stroke(255);
  strokeWeight(0);
  ellipse(0, 0, 300, 300); // Body of Gengar

  // Ears
  fill(94, 27, 160);
  noStroke()
  triangle(-130, -60, -170, -250, -10, -120); // Left ear
  triangle(130, -60, 170, -250, -10, -120); // Right ear
  
  // Gengar spiky hair
  fill(94, 27, 160);
  noStroke();
  triangle(130, -60, 10, -170, -10, -120);
  triangle(100, -80, 30, -180, -10, -120);
  triangle(100, -80, -30, -180, -10, -120);
  triangle(100, 100, -60, -180, 80, -100);
  triangle(-50, -100, -0, -180, 40, -100);
  triangle(-50, -100, -90, -180, 40, -100);
  
  // Gengar's Eyes code
  // Draw a half circle in the center
  push();
  fill(195,28,65);  // Color of eye
  stroke(0.5)
  strokeWeight(2);
  
  translate(60, -30);
  // arc(x, y, width, height, start angle, stop angle)
  // Drawing a half circle, start angle is 0, stop angle is PI (180 degrees)
  rotate(-7); 
  arc(0, 0, 110, 110, 0, PI);  // right side
  
  line(-60, 0, 60, 0);
  
  // Second half circle
  translate(-85.5, -75);
  rotate(190); 
  arc(0, 0, 110, 110, 0, PI);
  line(-60, 0, 60, 0);
  
  pop();
  fill(0); // Black color for pupils
  ellipse(-50, -10, 25, 25); // Left pupil
  ellipse(55, -10, 25, 25); // Right pupil
  
  fill(255); // White color for eyes
  ellipse(-45, -16, 5, 9); // Left eye
  ellipse(50, -16, 5, 9); // Right eye
  
  noLoop();
  
  // Gengar's Mouth Code
  stroke(75, 0, 130);
  strokeWeight(4);

  line(67, 50, -80, 50);
  
  rotate(PI/2);
  arc(50, 6, 150, 150, -PI / 2, PI / 2);
  
  strokeWeight(3);
  line(100, 60, 50, 60);
  line(123, 25, 50, 25);
  line(120, -15, 50, -15);
  line(100, -50, 50, -50);
  
  noLoop();
  
}




