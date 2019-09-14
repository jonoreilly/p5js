const libre = 0;
const nolibre = 1;
const pisado = 2;
const pisable = 3;
const start = 4;
const end = 5;
const path = 6;



let lado = 8;
let percWall = 40;

let ancho = Math.floor((window.innerWidth - 40) / lado);
let alto = Math.floor((window.innerHeight - document.getElementById("botonera").scrollHeight - 40) / lado);
let FIN = false;
let RESET = false;
let endpos;
let startpos;

let cubos;
let opens;
let last;

let txtvalor = document.getElementById("txtvalor");


function ini() {
  console.log(lado);
  ancho = Math.floor((window.innerWidth - 40) / lado);
  alto = Math.floor((window.innerHeight - document.getElementById("botonera").scrollHeight - 40) / lado);
  FIN = false;
  RESET = false;
  endpos = {
    x: Math.floor(Math.random() * ancho),
    y: Math.floor(Math.random() * alto)
  };
  startpos = {
    x: Math.floor(Math.random() * ancho),
    y: Math.floor(Math.random() * alto)
  };
  crearCubos();
  opens = new Heap()
  last = cubos[endpos.x][endpos.y];
  last.Estado = end;
  cubos[startpos.x][startpos.y].start();
}




function crearCubos() {
  cubos = [];
  for (let i = 0; i < ancho; i++) {
    cubos[i] = [];
    for (let j = 0; j < alto; j++) {
      cubos[i][j] = new Cubo(Math.random() * 100 > percWall ? libre : nolibre, {
        x: i,
        y: j
      });
    }
  }
}








function setup() {
  createCanvas(ancho * lado, alto * lado);
  background(220);
  noStroke();
  ini();
}

function mouseClicked() {
  //cubos[Math.floor(mouseX / lado)][Math.floor(mouseY / lado)].pisar();
  console.log("x: " + Math.floor(mouseX / lado) + " - Y: " + Math.floor(mouseY / lado));
}


function draw() {
  if (!FIN) {
    avanzar();
  } else {
    traceback();
  }
  if (RESET) {
    ini();
  }
}


function avanzar() {
  if (opens.Items.length > 0) {
    opens.pop().pisar();
  } else {
    ini();
  }
}


function traceback() {
  last.Estado = path;
  last = last.Previous;
  if (last.Estado === start) {
    //noLoop();
    ini();
  }
}