const inputRange = 11;
const duration = 1000;

let g = [];
let inputs = [];
let noises;
let output;

function setup() {

  frameRate(60);
  createCanvas(600, 400);
  background(121);

  for(let i = 0; i < inputRange; i++) {

    if(i < 3 || i > 7) {
      inputs.push(0);
    }
    else {
      inputs.push(0.1);
    }

    g.push(new Ganglion());
    g[i].setWeights();
  }

  noises = getNoise(duration, 0.1);

  for(let i = 0; i < inputRange; i++) {

    g[i].setInputs([[inputs[i - 1] || 0], [inputs[i]], [inputs[i + 1] || 0]]);
    g[i].iext();

    output = g[i].emit(duration, noises);
  }

  console.log(g)
}

function draw() {

}
