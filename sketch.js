const a = 0.7;
const b = 0.5;
const c = 10;
const h = 1 / 100;
const r = new Receptive(true, 30);

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
  r.inputToSell(10, 12, 0);
  r.inputToSell(13, 17, 0.1);

  I = r.sells[11].output();

  console.log(I)
  console.log(r.isWhereMid())

  x = width / 2;
}

function draw() {

  // background(91);

  let res = runge(v[frameCount - 1], w[frameCount - 1], I, noise(frameCount) / 5);

  v.push(res.mv);
  w.push(res.mw);

  x += 0.1;

  point(x, height - 200 + v[frameCount - 1] * 50);
  if(x > width) {
    x = 0;
    background(121);
  }
}

function runge(v, w, I, n) {
  let kv = [];
  let mv;
  let kw = [];
  let mw;

  kv.push(h * mem(v, w, I, n));
  kw.push(h * inact(v, w));

  kv.push(h * mem(v + (1/2)*kv[0], w + (1/2)*kw[0], I, n));
  kw.push(h * inact(v + (1/2)*kv[0], w + (1/2)*kw[0]));

  kv.push(h * mem(v + (1/2)*kv[1], w + (1/2)*kw[1], I, n));
  kw.push(h * inact(v + (1/2)*kv[1], w + (1/2)*kw[1]));

  kv.push(h * mem(v + kv[2], w + kw[2], I, n));
  kw.push(h * inact(v + kv[2], w + kw[2]));

  mv = v + (kv[0] + 2*kv[1] + 2*kv[2] + kv[3]) / 6;
  mw = w + (kw[0] + 2*kw[1] + 2*kw[2] + kw[3]) / 6;

  return {mv, mw};
}

function mem(v, w, I, n) {
  return c * (v - Math.pow(v, 3) / 3 - w + I + n);
}

function inact(v, w) {
  return v + a - b * w;
}
