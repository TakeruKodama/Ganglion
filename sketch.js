const a = 0.7;
const b = 0.5;
const c = 10;
const r = new Receptive(true, 30);

const isNoise = false;

let I;
let v = [];
v.push(0);
let w = [];
w.push(0);

let x;

function setup() {

  frameRate(60);
  createCanvas(600, 400);
  background(121);

  r.set(5);
  r.setWeight();

  let count = 0

  let interval = 6;
  for(let i = 0; i < r.sells.length; i+=interval) {
    let inputValue;

    if(count % 2) inputValue = 1;
    else inputValue = 1;

    r.inputToSell(i, i+interval-1, inputValue);

    count++;
  }

  // r.inputToSell(12, 18, 0.05);

  I = r.sells[13].output();

  console.log(r.isWhereMid());

  x = width / 2;

  let output = r.emit(1000, 0);

  console.log(output);
}

function draw() {

  // background(91);

  // let res;
  //
  // if(isNoise) res = runge(v[frameCount - 1], w[frameCount - 1], I, 0.3*noise(1));
  // else res = runge(v[frameCount - 1], w[frameCount - 1], I, 0);
  //
  // v.push(res.mv);
  // w.push(res.mw);
  //
  // x += 0.1;
  //
  // point(x, height - 200 + v[frameCount - 1] * 50);
  // if(x > width) {
  //   x = 0;
  //   background(121);
  // }


}
