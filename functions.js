const a = 0.7;
const b = 0.5;
const c = 10;

function dog(sige, sigi, x) {
  let e = (1/Math.pow(sige, 2)) * Math.exp(-1*Math.pow(x, 2)/(2*Math.exp(sige, 2)));
  let i = (1/Math.pow(sigi, 2)) * Math.exp(-1*Math.pow(x, 2)/(2*Math.exp(sigi, 2)));

  return e - i;
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

function rand(range) {

  return range * (random() - random());
}

function getNoise(duration, noiseRange) {
  let noises = [];

  for(let i = 1; i < duration; i++) {

    if(noiseRange === 0) {
      noises.push(0);
    }
    else {
      noises.push(randomGaussian(0, noiseRange));
    }
  }

  return noises;
}
