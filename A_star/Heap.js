class Heap {
  constructor() {
    this.Items = [];
  }

  add(item) {
    if (item.HeapIndex === -1) {
      this.checkAddSwap(this.Items.push(item) - 1);
    }
  }

  checkAddSwap(index) {
    this.Items[index].HeapIndex = index;
    while (index !== 0) {
      let comparador = Math.floor((index - 1) / 2);
      if (this.Items[index].Value >= this.Items[comparador].Value) {
        break;
      }
      let holder = this.Items[index];
      this.Items[index] = this.Items[comparador];
      this.Items[comparador] = holder;
      this.Items[index].HeapIndex = index;
      this.Items[comparador].HeapIndex = comparador;
      index = comparador;
    }
  }

  get Top() {
    return this.Items[0];
  }

  pop() {
    if (this.Items.length !== 0) {
      let holder = this.Items[0];
      let popped = this.Items.pop();
      if(this.Items.length !== 0) {
        this.Items[0] = popped;
        this.checkPopSwap(0);
      }
      holder.HeapIndex = -1;
      return holder;
    }
  }

  checkPopSwap(index) {
    while (this.Items.length > index * 2 + 1) {
      let comparador = index * 2 + 1;
      if (this.Items.length > comparador + 1) {
        comparador = this.Items[comparador].Value < this.Items[comparador + 1].Value ? comparador : comparador + 1;
      }
      if (this.Items[index].Value <= this.Items[comparador].Value) {
        break;
      }
      let holder = this.Items[index];
      this.Items[index] = this.Items[comparador];
      this.Items[comparador] = holder;
      this.Items[index].HeapIndex = index;
      this.Items[comparador].HeapIndex = comparador;
      index = comparador;
    }
  }
}