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
let noiseAndCont = [];

function setup() {

   frameRate(60);
   createCanvas(600, 400);
   background(121);

   init(0, 0.1);
   noiseVsCont();

   noLoop();

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

   // let diffOfCont;
   // let objOfNoiseAndCont;
   //
   // noises = getNoise(duration, noiseRange);
   //
   // for(let i = 0; i < inputRange; i++) {
   //    output = g[i].emit(duration, noises);
   // }
   //
   // diffOfCont = (g[2].e - g[3].e);
   // objOfNoiseAndCont = { 'noise': noiseRange, 'cont': diffOfCont };
   // noiseAndCont.push(objOfNoiseAndCont);
   // x += 0.1;
   // y = 5 * height / 6 - (diffOfCont * 10);
   //
   // point(x, y);
   // console.log(noiseRange, diffOfCont);
   //
   // noiseRange += 0.0001;
   //
   // if(noiseRange > 0.1) {
   //    let table = makeTable(noiseAndCont);
   //    console.log(table);
   //    saveTable(table, 'result.csv');
   //    noLoop();
   // }
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

function makeTable(array) {

   let rows = [];
   let table = new p5.Table();

   for(let a of array) {
      table.addRow(new p5.TableRow(`${a.noise},${a.cont}`));
   }

   return table;
}

function noiseVsCont() {

   let diffOfCont;
   let objOfNoiseAndCont;

   for(let j = 0; j < 5000; j++) {
      noises = getNoise(duration, noiseRange);

      for(let i = 0; i < inputRange; i++) {
         g[i].emit(duration, noises);
      }

      diffOfCont = (g[2].e - g[3].e);
      objOfNoiseAndCont = { 'noise': noiseRange, 'cont': diffOfCont };
      noiseAndCont.push(objOfNoiseAndCont);

      noiseRange = j * 0.0001;
   }

   let table = makeTable(noiseAndCont);
   saveTable(table, 'result.csv');
}
