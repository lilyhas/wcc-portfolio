/*
 Based on the example by Daniel Shiffman
  <a href="https://processing.org/examples/convolution.html" target="blank">Dan Shiffman's example</a> for Processing. 

*/

let reef2;
let w = 120;

// Creating an Edge detect matrix 

const matrix = [ [ -2, -1, 0 ],
                 [ -1, 1, 1 ],
                 [ 0, 1, 2] ]; 


function preload() {
  // loading the image
  reef2 = loadImage("reef2.png");
}

function setup(){
  createCanvas(900, 507);
  reef2.loadPixels();

  // pixelDensity(1) for not scaling pixel density to display density
  // for more information, check the reference of pixelDensity()
  pixelDensity(1);
}

function draw(){     
  
  
  background(reef2);
  reef2.loadPixels();

   // Calculate the small rectangle we will process
   const xstart = constrain(mouseX - w/2, 0, reef2.width);
   const ystart = constrain(mouseY - w/2, 0, reef2.height);
   const rad = constrain(mouseY - w/2, 0, reef2.height);
   const xend = constrain(mouseX + w/2, 0, reef2.width);
   const yend = constrain(mouseY + w/2, 0, reef2.height);
   const matrixsize = 3;
 

   loadPixels();
  // Begin our loop for every pixel in the smaller image
  for (let x = xstart; x < xend; x++) {
    for (let y = ystart; y < yend; y++ ) {
      let c = convolution(x, y, matrix, matrixsize, reef2);
            
      // retrieve the RGBA values from c and update pixels()
      // adding some randomness to R and G channels 
      let loc = (x + y*reef2.width) * 4;
      pixels[loc] = random(red(c));
      pixels[loc + 1] = random(green(c));
      pixels[loc + 2] = blue(c);
      pixels[loc + 3] = alpha(c);
    }
  }
  updatePixels();
}


function convolution(x, y, matrix, matrixsize, forest) {
  let rtotal = 0.0;
  let gtotal = 0.0;
  let btotal = 0.0;
  const offset = Math.floor(matrixsize / 2);
  for (let i = 0; i < matrixsize; i++){
    for (let j = 0; j < matrixsize; j++){
      
      // What pixel are we testing
      const xloc = (x + i - offset);
      const yloc = (y + j - offset);
      let loc = (xloc + forest.width * yloc) * 4;

      // Make sure we haven't walked off our image, we could do better here
      loc = constrain(loc, 0 , forest.pixels.length - 1);

      // Calculate the convolution
      // retrieve RGB values
      rtotal += (forest.pixels[loc]) * matrix[i][j];
      gtotal += (forest.pixels[loc + 1]) * matrix[i][j];
      btotal += (forest.pixels[loc + 2]) * matrix[i][j];
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(random(rtotal, 0, 255));
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain (btotal, 0, 255);

  // Return the resulting color
  return color(rtotal, gtotal, btotal);
} 


