/**
*
* Noise vs Constrast:
*
*/

const inputRange = 11;
const duration = 1000;

const gDark = [1, 2];
const gBright = [3, 4];

let g = [];
let inputs = [];
let noises;
let output;
let noiseRange = 0.0;
let contrastDiffs = [];

let x = 0;
let y = 0;

function setup() {

  frameRate(60);
  createCanvas(600, 400);
  background(121);

  init(0, 0.1);

  // do {
  //    noises = getNoise(duration, noiseRange);
  //
  //    for(let i = 0; i < inputRange; i++) {
  //
  //     g[i].setInputs([[inputs[i - 1] || 0], [inputs[i]], [inputs[i + 1] || 0]]);
  //     g[i].iext();
  //
  //     output = g[i].emit(duration, noises);
  //    }
  //
  //    contrastDiffs.push((g[gDark[1]].e - g[gDark[0]].e) * (g[gBright[1]].e - g[gBright[0]].e));
  //
  //    noiseRange += 0.01;
  //
  // } while(noiseRange < 1.3);
  //
  // console.log(g);
  // console.log(contrastDiffs);
}

function draw() {

   noises = getNoise(duration, noiseRange);

   for(let i = 0; i < inputRange; i++) {
    output = g[i].emit(duration, noises);
   }

   x += 0.1;
   y = 5 * height / 6 - (((g[2].e - g[3].e)) * 10);

   point(x, y);

   noiseRange += 0.0001;
}

function init(inA, inB) {
   for(let i = 0; i < inputRange; i++) {

     if(i < 3 || i > 7) {
      inputs.push(inA);
     }
     else {
      inputs.push(inB);
     }

     g.push(new Ganglion(true));

     g[i].setWeights();
     g[i].setInputs([[inputs[i - 1] || 0], [inputs[i]], [inputs[i + 1] || 0]]);
     g[i].iext();
   }
}
