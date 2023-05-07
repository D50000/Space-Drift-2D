const canvas = document.querySelector("canvas");
// Set the canvas board.
canvas.width = 1024;
canvas.height = 768;
const canvas2dContext = canvas.getContext("2d");

// Player
const player = new Player(canvas.width / 2, canvas.height / 2, 30, "blue");
// Projectile
const projectiles = [];
// Projectile
const enemies = [];

function spawnEnemies() {
  setInterval(() => {
    // Make sure the radius is 4 ~ 30.
    const radius = Math.random() * (30 - 4) + 4;
    // Enemies need to spawn outside of screen.
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
    }
    const color = "green";
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}

function animate() {
  // Looping the frame.
  requestAnimationFrame(animate);
  canvas2dContext.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();
  projectiles.forEach((projectile) => {
    projectile.drawAndUpdate();
  });
  enemies.forEach((enemy) => {
    enemy.drawAndUpdate();
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
spawnEnemies();
