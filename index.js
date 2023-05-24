const canvas = document.querySelector("canvas");
// Set the canvas board.
canvas.width = 1024;
canvas.height = 768;
const canvas2dContext = canvas.getContext("2d");
const scoreNumberElement = document.querySelector(".score-number");

// Player
const player = new Player(canvas.width / 2, canvas.height / 2, 10, "white");
// Projectiles
const projectiles = [];
// Enemies
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
    // Use HSL (Hue, Saturation, Lightness).
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };

    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}

let animationId;
let scoreNumber = 0;
function animate() {
  // Looping the frame.
  animationId = requestAnimationFrame(animate);
  canvas2dContext.fillStyle = "rgba(0, 0, 0, 0.1)";
  canvas2dContext.fillRect(0, 0, canvas.width, canvas.height);
  player.draw();

  projectiles.forEach((projectile, projectileIndex) => {
    projectile.drawAndUpdate();
    // Remove bullets that out of screen.
    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      setTimeout(() => {
        projectiles.splice(projectileIndex, 1);
      }, 0);
    }
  });

  enemies.forEach((enemy, enemyIndex) => {
    enemy.drawAndUpdate();
    // Collision detection. Enemy & Player.
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    if (dist - enemy.radius - player.radius <= 0) {
      cancelAnimationFrame(animationId);
    }

    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

      // Collision detection. Enemy & Projectile.
      if (dist - enemy.radius - projectile.radius <= 0) {
        if (enemy.radius - 10 >= 10) {
          // GSAP smooth animation effect.
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        } else {
          setTimeout(() => {
            enemies.splice(enemyIndex, 1);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      }
    });
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
    x: Math.cos(angle) * 3,
    y: Math.sin(angle) * 3,
  };

  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "#c3c3c3", velocity)
  );
});

animate();
spawnEnemies();
