const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

const canvas2dContext = canvas.getContext("2d");

// Player
const player = new Player(canvas.width / 2, canvas.height / 2, 30, "blue");

// Projectile
const projectiles = [];

function animate() {
  // Looping the frame.
  requestAnimationFrame(animate);
  canvas2dContext.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  projectiles.forEach((projectile) => {
    projectile.drawAndUpdate();
  });
}

window.addEventListener("click", (event) => {
  console.log("Shoot !!");
  // It will calculate Theta. (-pi ~ pi)
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  const velocity = {
    // Return radian. (-1 ~ 1)
    x: Math.cos(angle),
    y: Math.sin(angle),
  };

  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "red", velocity)
  );
});

animate();
