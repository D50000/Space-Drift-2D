class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    // Start point
    canvas2dContext.beginPath();
    // arc() for drawing arc or circle.
    canvas2dContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    canvas2dContext.fillStyle = this.color;
    canvas2dContext.fill();
  }
}
