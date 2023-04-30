const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

const canvas2dContext = canvas.getContext("2d");

// Player
const player = new Player(canvas.width / 2, canvas.height / 2, 30, "blue");
player.draw();

// Projectile
const projectiles = [];

function animate() {
  // Looping the frame.
  requestAnimationFrame(animate);
  projectiles.forEach((projectile) => {
    projectile.drawAndUpdate();
  });
}

window.addEventListener("click", (event) => {
  console.log("Shoot !!");
  // It will calculate Theta.
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };

  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "red", velocity)
  );
});

animate();
