class Particle {
  // Linear slow down the velocity.
  friction = 0.99;

  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    // Save the current state.
    canvas2dContext.save();
    // Decrease the "globalAlpha".
    canvas2dContext.globalAlpha = this.alpha;
    // Start point
    canvas2dContext.beginPath();
    // arc() for drawing arc or circle.
    canvas2dContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    canvas2dContext.fillStyle = this.color;
    canvas2dContext.fill();
    // Restore back the globalAlpha.
    canvas2dContext.restore();
  }

  drawAndUpdate() {
    this.draw();
    // Slow down by friction.
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    // Decrease the "alpha" according the time elapse.
    this.alpha -= 0.015;
  }
}
