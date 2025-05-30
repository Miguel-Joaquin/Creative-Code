function setup() {
  createCanvas(600, 500);
  background(135, 206, 235); // Sky blue background
  
  drawCloud(100,100);
  drawCloud(400, 80);
  drawCloud(250, 150);
  
    // Road
  fill(60);
  noStroke();
  rect(0, 310, 600, 110);

  // For yellow dashed line
  stroke(255, 255, 0);
  strokeWeight(5);
  for (let x = 0; x < width; x += 40) {
    line(x, 370, x + 25, 370); // Dashed center line
  }
  noStroke(); // removing the stroke for all the drawing


  // Wheels
  stroke(5)
  strokeWeight(3)
  fill(50); // 
  circle(150, 300, 80, 80);
  circle(450, 300, 80, 80); 
  noStroke()

  // Car body
  stroke(139, 0, 0)
  strokeWeight(3)
  fill(255, 0, 0); // Red car body
  rect(150, 220, 300, 80); // Bottom part of car body

  // Roof
  quad(200, 220, 250, 170, 350, 170, 400, 220); // Trapezoid roof 
  noStroke()

  // Windows
  stroke(0)
  strokeWeight(2)
  fill(173, 216, 230);
  rect(260, 180, 40, 40);
  rect(310, 180, 40, 40);
  noStroke()

  // More Details
  fill(255, 170, 51);
  circle(460, 260, 20, 20);

  fill(100);
  rect(140, 260, 10, 10);

}

// I am using ellipses to make the cloud
function drawCloud(x, y) {
  fill(255);
  noStroke();
  circle(x, y, 60, 60);
  circle(x + 30, y - 20, 60, 60);
  circle(x + 60, y, 60, 60);
  circle(x + 30, y + 10, 60, 60);
}

