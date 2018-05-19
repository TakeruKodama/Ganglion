class Sell {

  constructor(inputNodes) {
    this.input = new Matrix(inputNodes, 1);
    this.weight = new Matrix(inputNodes, 1);
  }

  output() {
    return this.input.dotp(this.weight);
  }
}
