class Ganglion {

   constructor(mode) {
      this.input = new Matrix(3, 1);
      this.weight = this.setWeights();
      this.ie = 0;
      this.e = 0;
      // true:
      this.mode = mode;
   }

   setWeights() {

      let w = new Matrix(3, 1);
      if(this.mode) {
         w.input([[-1/4], [1], [-1/4]]);
      }
      else {
         w.input([[1/4], [-1], [1/4]]);
      }

      return w;
   }

   setInputs(array) {
      this.input.input(array);
   }

   iext() {
      this.ie = this.weight.dotp(this.input);
   }

   /**
   *
   * emit: simuration emittion.
   *
   * @param {Number} duration
   * @param {Number} noises
   *
   * @return {Number}
   *
   */
   emit(duration, noises) {

      let output = [];
      let v = [];
      let w = [];

      v.push(0);
      w.push(0);

      for(let i = 1; i < duration; i++) {
         let res;

         res = runge(v[i - 1], w[i - 1], this.ie, noises[i]);

         v.push(res.mv);
         w.push(res.mw);
      }

      let emittions = this.countEmittion(v);
      this.e = emittions;

      return emittions;
   }

   /**
   *
   * count emittion
   *
   * @param {Array} vdata
   *
   * @return {Number}
   *
   */
   countEmittion(data) {

      let counter = -1;

      for(let i = 0; i < data.length; i++) {
         if(Math.sign(data[i]) != Math.sign(data[i+1])) {
            counter++;
         }
      }
      counter /= 2;

      return counter;
   }
}
