const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

const canvas2dContext = canvas.getContext("2d");

// Player
const player = new Player(canvas.width / 2, canvas.height / 2, 30, "blue");
// Projectile
const projectiles = [];
// Projectile
const enemies = [];

function spawnEnemies() {
  setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 30;
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
