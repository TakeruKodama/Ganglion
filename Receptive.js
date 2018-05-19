class Receptive {

  /**
  *
  * constructor
  *
  * @param {boolean} mode true: ON, false: OFF
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

  iext() {
    let sum = 0;
    for(let s of this.sells) {
      sum += s.input * s.weight;
    }

    return sum;
  }
}

function dog(sige, sigi, x) {
  let e = (1/Math.pow(sige, 2)) * Math.exp(-1*Math.pow(x, 2)/(2*Math.exp(sige, 2)));
  let i = (1/Math.pow(sigi, 2)) * Math.exp(-1*Math.pow(x, 2)/(2*Math.exp(sigi, 2)));

  return e - i;
}
