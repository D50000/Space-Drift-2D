const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

const canvas2dContext = canvas.getContext("2d");

const player = new Player(canvas.width / 2, canvas.height / 2, 30, "blue");
player.draw();

window.addEventListener("click", (event) => {
  console.log("Shoot !!");
  const projectile = new Projectile(
    event.clientX,
    event.clientY,
    5,
    "red",
    null
  );
  projectile.draw();
});
