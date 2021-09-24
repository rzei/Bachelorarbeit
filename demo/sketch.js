let x = 0;
let start = false;
let button;
let prev_gl = '';
let current_calc = '';

function preload() {
  VC.init();
  GC.init();
}

function setup() {
  createCanvas(640, 640);

  // start voice classification
  VC.classify();

  button = createButton('start Abtastung');
  button.mousePressed(updateTimer);
}

function draw() {
  clear()

  // draw output text
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('Sprache: ' + VC.label, width / 2, height - 100);
  text('Gestik: ' + GC.label, width / 2, height - 60);
  text('Rechnung: ' + current_calc, width / 2, height - 20);

  // draw detector
  drawSampling();
  updateSampleLine();

  // visualize gestures
  visualizeGesture();
}


// for visualizing detected hand and gesture
function visualizeGesture(){
  if (GC.detections != undefined) {
    if (GC.detections.multiHandLandmarks != undefined) {
      drawLines([0, 5, 9, 13, 17, 0]);//palm
      drawLines([0, 1, 2, 3, 4]);//thumb
      drawLines([5, 6, 7, 8]);//index finger
      drawLines([9, 10, 11, 12]);//middle finger
      drawLines([13, 14, 15, 16]);//ring finger
      drawLines([17, 18, 19, 20]);//pinky

      drawLandmarks([0, 1], 0);//palm base
      drawLandmarks([5, 9], 120);//index finger
      drawLandmarks([1, 5], 60);//thumb
      drawLandmarks([9, 13], 180);//middle finger
      drawLandmarks([13, 17], 240);//ring finger
      drawLandmarks([17, 21], 300);//pinky
    }
  }
}

// drawing the red dots representing the 21 landmarks
function drawLandmarks(indexArray, hue) {
  noFill();
  strokeWeight(8);
  for (let i = 0; i < GC.detections.multiHandLandmarks.length; i++) {
    for (let j = indexArray[0]; j < indexArray[1]; j++) {
      let x = GC.detections.multiHandLandmarks[i][j].x * GC.width;
      let y = GC.detections.multiHandLandmarks[i][j].y * GC.height;
      // let z = detections.multiHandLandmarks[i][j].z;
      stroke(hue, 40, 255);
      point(x, y);
    }
  }
}

// draw lines between landmarks
function drawLines(index) {
  stroke(0, 0, 255);
  strokeWeight(3);
  for (let i = 0; i < GC.detections.multiHandLandmarks.length; i++) {
    for (let j = 0; j < index.length - 1; j++) {
      let x = GC.detections.multiHandLandmarks[i][index[j]].x * GC.width;
      let y = GC.detections.multiHandLandmarks[i][index[j]].y * GC.height;

      let _x = GC.detections.multiHandLandmarks[i][index[j + 1]].x * GC.width;
      let _y = GC.detections.multiHandLandmarks[i][index[j + 1]].y * GC.height;
      line(x, y, _x, _y);
    }
  }
}


// draw sampling box
function drawSampling() {
  // seperator
  let c = color(0, 0, 0);
  fill(c);
  noStroke();
  rect(0, GC.height + 8, width, 1);

  // background
  c = color(255, 255, 255);
  fill(c);
  noStroke();
  rect(5, GC.height + 9, width, 20);

  // middle  
  c = color(250, 220, 220);
  fill(c);
  noStroke();
  circle(width / 2 - 5 + 5, GC.height + 9+10, 20);
}

// update sampling box
function updateSampleLine() {
  if (start) {
    x = x + 4;
    if (x >= width) {
      x = 0;
    }
    else if (x == width / 2) {
      console.log("SAMPLE NAU")
      sample();

      let c = color(0, 255, 0);
      fill(c);
      noStroke();
      circle(x+5+5,GC.height+9+10,20)
    }
    else {
      let c = color(255, 0, 0);
      fill(c);
      noStroke();
      circle(x+5+5,GC.height+9+10,20)
    }
  }
  else {
    x = 0;
  }
}


// start or stop sampling timer
function updateTimer() {
  x = 0;
  current_calc = '';
  if (start) {
    start = false;
    button.html("start Abtastung")
  }
  else {
    start = true;
    button.html("stop Abtastung")
  }
}

// sample gesture and voice control labels and process them
function sample() {
  gl = GC.label
  vl = VC.label

  if (vl != 'Hintergrundgeräusche' && vl != 'laden...'){
    if(vl == "ist gleich"){
      res = eval(current_calc);
      current_calc += vl + String(res);
    }
    else {
      current_calc += vl;
    }
  }
  else if (gl != prev_gl && gl != 'laden...') {
    if(gl == "="){
      res = eval(current_calc);
      current_calc += gl + String(res);
      start = false;
    }
    else{
      current_calc += gl;
    }
    prev_gl = gl;
  }
  console.log(current_calc);
}
