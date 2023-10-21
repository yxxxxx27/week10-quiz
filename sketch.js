let song;
let fft;

function preload() {
  
  song = loadSound("audio/sample-visualisation.mp3");
}

function setup() {
  cnv = createCanvas(1000, 500);
  fft = new p5.FFT(0.8, 128); 
  song.connect(fft);
  noFill();
}

function draw() {
  background(255);
  stroke(0, 0, 0);

 
  let spectrum = fft.analyze();

  translate(width / 2, height / 2); 

  beginShape();

  for (let i = 0; i < spectrum.length; i++) {
    let angle = TWO_PI * i / spectrum.length;
    let rad = map(spectrum[i], 0, 255, 10, width / 2);
    let x = rad * cos(angle);
    let y = rad * sin(angle);
    curveVertex(x, y);
  }

  endShape();

}


function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
    background(255, 0, 0);
  } else {
    song.play();
    background(0, 255, 0);
  }
}
