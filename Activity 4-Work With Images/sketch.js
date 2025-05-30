let img;

function preload(){
   img = loadImage("Image2.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}


function draw() {
  image(img, 0, 0, width, height);
  
  filter(POSTERIZE, 6);

}