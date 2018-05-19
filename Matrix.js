class Matrix {

  constructor(l, c) {
    this.law = l;
    this.colum = c;
    this.data = [];
  }

  /**
  *
  * input
  *
  * @param {Array} arr
  *
  */
  input(arr) {
    if(arr.length === this.law) {
      for(let i = 0; i < this.law; i++) {
        if(arr[i].length !== this.colum) throw Error('error');
      }
      this.data = arr;
    }
    else {
      throw Error('error');
    }
  }

  /**
  *
  * print
  *
  */
  print() {
    for(let j = 0; j < this.law; j++) {
      let c = '';
      for(let i = 0; i < this.colum; i++) {
        c += `${this.data[j][i]}`;
        if(i !== this.colum - 1) c += ' ';
      }
      console.log('[', c, ']');
    }
  }

  /**
  *
  * sum
  *
  * @return {Numder}
  *
  */
  sum() {
    let sum = 0;
    for(let j = 0; j < this.law; j++) {
      for(let i = 0; i < this.colum; i++) {
        sum += this.data[j][i];
      }
    }
    return sum;
  }

  /**
  *
  * ave
  *
  * @param {Number}
  *
  */
  ave() {
    return this.sum() / (this.law * this.colum);
  }

  /**
  *
  * zero
  *
  */
  zero() {
    for(let j = 0; j < this.law; j++) {
      let c = [];
      for(let i = 0; i < this.colum; i++) {
        c.push(0);
      }
      this.data.push(c);
    }
  }

  /**
  *
  * unit
  *
  */
  unit() {
    for(let j = 0; j < this.law; j++) {
      let c = [];
      for(let i = 0; i < this.colum; i++) {
        if(i === j) c.push(1);
        else c.push(0);
      }
      this.data.push(c);
    }
  }

  /**
  *
  * random
  *
  */
  random() {
    for(let j = 0; j < this.law; j++) {
      let c = [];
      for(let i = 0; i < this.colum; i++) {
        c.push(Math.random() - Math.random());
      }
      this.data.push(c);
    }
  }

  /**
  *
  * inv
  *
  * @return {Matrix}
  *
  */
  inv() {
    let tmp = [];
    let nm = new Matrix(this.colum, this.law);

    for(let j = 0; j < this.colum; j++) {
      let c = [];
      for(let i = 0; i < this.law; i++) {
        c.push(this.data[i][j]);
      }
      tmp.push(c);
    }

    nm.input(tmp);

    return nm;
  }

  /**
  *
  * split
  *
  * @param {Number} l
  * @param {Number} c
  *
  * @return {Matrix}
  *
  */
  split(l, c) {
    let ms = [];
    let loff = 0;
    let coff = 0;
    let n = Math.ceil(this.law / l) * Math.ceil(this.colum / c);

    for(let i = 0; i < n; i++) {
      ms.push(new Matrix(l, c));
    }

    for(let k = 0; k < ms.length; k++) {
      let tmp = [];
      for(let j = 0; j < l; j++) {
        let t = [];
        for(let i = 0; i < c; i++) {
          let d;
          if(loff * l + j < this.law && coff * c + i < this.colum) {
            d = this.data[loff * l + j][coff * c + i];
          }
          else {
            d = 0;
          }
          t.push(d);
        }
        tmp.push(t);
      }
      ms[k].input(tmp);
      if((coff + 1) * c < Math.ceil(this.colum / c) * c) {
        coff++;
      }
      else {
        loff++;
        coff = 0;
      }
    }
    return ms;
  }

  /**
  *
  * add
  *
  * @param {Matrix} m
  *
  * @return {Matrix}
  *
  */
  add(m) {
    if(m.law !== this.law || m.colum !== this.colum) throw new Error('vector is not match');

    let nm = new Matrix(this.law, this.colum);

    for(let j = 0; j < this.law; j++) {
      let tmp = [];
      for(let i = 0; i < this.colum; i++) {
        tmp.push(this.data[j][i] + m.data[j][i]);
      }
      nm.data.push(tmp);
    }

    return nm;
  }

  /**
  *
  * sub
  *
  * @param {Matrix} m
  *
  * @return {Matrix}
  *
  */
  sub(m) {
    if(m.law !== this.law || m.colum !== this.colum) throw new Error('vector is not match');

    let nm = new Matrix(this.law, this.colum);

    for(let j = 0; j < this.law; j++) {
      let tmp = [];
      for(let i = 0; i < this.colum; i++) {
        tmp.push(this.data[j][i] - m.data[j][i]);
      }
      nm.data.push(tmp);
    }

    return nm;
  }

  /**
  *
  * dotp
  *
  * @param {Matrix} m
  *
  * @return {Number}
  *
  */
  dotp(m) {
    if(m.law !== this.law || m.colum !== this.colum) throw new Error('vector is not match');

    let sum = 0;
    for(let j = 0; j < this.law; j++) {
      for(let i = 0; i < this.colum; i++) {
        sum += this.data[j][i] * m.data[j][i];
      }
    }
    return sum;
  }

  /**
  *
  * mul
  *
  * @param {Matrix} m
  *
  * @return {Matrix}
  *
  */
  mul(m) {

    let pro;
    let pros = [];
    let nm = new Matrix(this.law, m.colum);

    for(let k = 0; k < this.law; k++) {
      for(let j = 0; j < m.colum; j++) {
        pro = 0;
        for(let i = 0; i < this.colum; i++) {
          pro += this.data[k][i] * m.data[i][j];
        }
        pros.push(pro);
      }
    }

    let count = 0;

    for(let j = 0; j < this.law; j++) {
      let tmp = [];
      for(let i = 0; i < m.colum; i++) {
        tmp.push(pros[count]);
        count++;
      }
      nm.data.push(tmp);
    }

    return nm;
  }

  /**
  *
  * sadd
  *
  * @param {Number} iv
  *
  */
  sadd(iv) {
    for(let j = 0; j < this.law; j++) {
      for(let i = 0; i < this.colum; i++) {
        this.data[j][i] += iv;
      }
    }
  }

  /**
  *
  * smul
  *
  * @param {Number} iv
  *
  */
  smul(iv) {
    for(let j = 0; j < this.law; j++) {
      for(let i = 0; i < this.colum; i++) {
        this.data[j][i] *= iv;
      }
    }
  }

  /**
  *
  * map
  *
  * @param {Function} fn(value)
  *
  */
  map(fn) {
    let nm = new Matrix(this.law, this.colum);

    for(let j = 0; j < this.law; j++) {
      let tmp = [];
      for(let i = 0; i < this.colum; i++) {
        tmp.push(fn(this.data[j][i]));
      }
      nm.data.push(tmp);
    }

    return nm;
  }
}
