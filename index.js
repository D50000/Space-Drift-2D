const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

const canvas2dContext = canvas.getContext("2d");

const player = new Player(100, 100, 30, 'blue');
console.log(canvas2dContext);
