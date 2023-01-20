
let xA;
let yA;
let xB;
let yB;


function setup() {

  createCanvas(880, 800);
  background(0);
  
 
  
  xA = width/2;
  yA = 300;
  xB = width/2;
  yB = height - 300;
}

function draw() {
 
  let range = frameCount % 100;
  //let colorange = frameCount % 255;

  
  
  drawCircles (random(-range, range), random(-range, range));
  
  
}


function drawCircles(_xA, _yA){ 
 
  xA = mouseX+ _xA;
  yA =mouseY+ _yA;
  
  fill(mouseY, 80, mouseX/2, 90);
  noStroke ();
  ellipse(xA, yA, 3, 3);
}