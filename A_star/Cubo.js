class Cubo {
  constructor(estado, pos) {
    this.HeapIndex = -1;
    this.DistPath = Infinity;
    this.Pos = pos;
    this.Estado = estado;
  }

  pisabilizar(previous) {
    let add = false;
    let distPath = previous.DistPath + this.calcDist(previous.Pos);
    if (this.Estado === libre) {
      this.Estado = pisable;
      add = true;
    }
    if (this.Estado === pisable && this.DistPath > distPath) {
      this.DistPath = distPath;
      this.DistEnd = this.calcDist(endpos);
      this.Previous = previous;
    } else if (this.Estado === end) {
      this.Previous = previous;
      FIN = true;
    }
    if (add) {
      opens.add(this);
    }
  }

  pisar() {
    if (this.Estado === pisable || this.Estado === start) {
      if (this.Estado !== start) {
        this.Estado = pisado;
      }
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (typeof cubos[this.Pos.x + i] !== 'undefined' &&
            typeof cubos[this.Pos.x + i][this.Pos.y + j] !== 'undefined') {
            cubos[this.Pos.x + i][this.Pos.y + j].pisabilizar(this);
          }
        }
      }
    }
  }


  start() {
    this.Estado = start;
    this.DistPath = 0;
    this.Previous = this;
    this.pisar();
  }


  pintar() {
    ////if (cubos[i][j].Cambiado) {
    fill(this.Color)
    square(this.Pos.x * lado, this.Pos.y * lado, lado);
    if (this.Estado === pisado) {
      txtvalor.value = this.Value;
    }
    //}
    //this.Cambiado = false;
  }


  calcDist(pos) {
    return dist(this.Pos.x, this.Pos.y, pos.x, pos.y);
  }

  get Value() {
    return this.DistPath + this.DistEnd;
  }

  get Color() {
    switch (this.Estado) {
      case nolibre:
        return 'gray';
      case pisado:
        return 'yellow';
      case pisable:
        return 'green';
      case start:
        return 'blue';
      case end:
        return 'red';
      case path:
        return 'purple';
    }
    return 'white';
  }

  get Estado() {
    return this._estado;
  }

  set Estado(value) {
    this._estado = value;
    //this.Cambiado = true;
    this.pintar();
  }
}