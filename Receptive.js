const h = 1 / 10;

class Receptive {

  /**
  *
  * constructor
  *
  * @param {Boolean} mode true: ON, false: OFF
  * @param {Number} sells number of sells
  *
  */
  constructor(mode, sells) {
    this.sellNum = sells;
    this.mode = mode;
    this.sells = [];
    this.weights = new Matrix(sells, 1);
    this.inputs = new Matrix(sells, 1);
    this.inputs.zero();
    this.hmsit = 0;
  }

  /**
  *
  * set: set sells
  *
  */
  set(value) {
    for(let i = 0; i < this.sellNum; i++) {
      this.sells.push(new Sell(value));
    }
    this.hmsit = value;
  }

  /**
  *
  * inputToSell: insert val to sells
  *
  * @param {Number} from
  * @param {Number} to
  * @param {Number} val
  *
  */
  inputToSell(from, to, val) {
    for(let j = from; j <= to; j++) {
      this.inputs.data[j][0] = val;
    }

    for(let j = 0; j < this.sells.length; j++) {
      let ttmp = [];
      for(let i = Math.ceil(0 - this.hmsit / 2); i <= this.hmsit - Math.ceil(this.hmsit / 2); i++) {
        if(this.inputs.data[j + i] !== undefined) {
          ttmp.push([this.inputs.data[j + i][0]]);
        }
        else {
          ttmp.push([0]);
        }
      }
      this.sells[j].input.input(ttmp);
    }
  }

  /**
  *
  * isWhereMid: return mid sells range
  *
  * @return {Array}
  *
  */
  isWhereMid() {
    let ms = Math.round(this.sellNum / 4);
    let rs = Math.round((this.sellNum * 3) / 8);

    return [rs + 1, rs + ms - 1];
  }

  /**
  *
  * insertW: insert weights
  *
  */
  setWeight() {
    let n = Math.round(this.sellNum / 2);
    let k = 0;
    let tmp = [];

    for(let i = Math.round(this.sellNum / 2); i < this.sells.length; i++) {
      tmp.push(dog(1, 1.6, n));
      n--;
    }

    for(let i = Math.round(this.sellNum / 2); i > 0; i--) {
      tmp.push(dog(1, 1.6, k));
      k++;
    }

    for(let j = 0; j < this.sells.length; j++) {
      let ttmp = [];
      for(let i = Math.ceil(0 - this.hmsit / 2); i <= this.hmsit - Math.ceil(this.hmsit / 2); i++) {
        if(tmp[j + i] !== undefined) {
          ttmp.push([tmp[j + i]]);
        }
        else {
          ttmp.push([0]);
        }
      }
      this.sells[j].weight.input(ttmp);
    }
  }

  /**
  *
  * culculate I_ext
  *
  * @return {Number}
  */
  iext() {
    let sum = 0;
    for(let s of this.sells) {
      sum += s.input * s.weight;
    }

    return sum;
  }

  /**
  *
  * emit: simuration emittion.
  *
  * @param {Number} duration
  * @param {Number} noiseRange
  *
  * @return {Array}
  *
  */
  emit(duration, noiseRange) {
    let output = [];
    let noises = [];

    for(let i = 1; i < duration; i++) {

      if(noiseRange === 0) {
        noises.push(0);
      }
      else {
        noises.push(randomGaussian(0, noiseRange));  
      }
    }

    for(let sell of this.sells) {
      let v = [];
      let w = [];

      v.push(0);
      w.push(0);

      for(let i = 1; i < duration; i++) {
        let res;

        res = runge(v[i - 1], w[i - 1], sell.output(), noises[i]);

        v.push(res.mv);
        w.push(res.mw);
      }
      output.push(v);
    }

    let emittions = this.countEmittion(output);
    let bipolarOutput = this.bipolarOutput(emittions);

    return {emittions: emittions, bipolarOutput: bipolarOutput};
  }

  /**
  *
  * count emittion
  *
  * @param {Array} vdata
  *
  * @return {Array}
  *
  */
  countEmittion(vdata) {
    let res = [];

    for(let data of vdata) {

      let counter = 0;
      for(let i = 0; i < data.length; i++) {
        if(Math.sign(data[i]) != Math.sign(data[i+1])) {
          counter++;
        }
      }
      counter / 2;
      res.push(counter);
    }

    return res;
  }

  /**
  *
  * bipolarOutput
  *
  * TODO: make for off subregion.
  *
  * @param {Array}  emittions
  * @return {Number}
  */
  bipolarOutput(emittions) {

    const midPos = this.isWhereMid();
    let sum = 0;

    for(let i = 0; i < emittions.length; i++) {

      if(i < midPos[0] || i > midPos[1]) {
        sum -= emittions[i];
      }
      else {
        sum += emittions[i];
      }
    }

    return sum;
  }
}
