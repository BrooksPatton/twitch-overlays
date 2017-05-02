class CheerBox {
  constructor(data) {
    this.width = 100
    this.height = 50
    this.red = 200
    this.green = 200
    this.blue = 200
    this.stillAlive = true
    this.diesAt = Date.now() + (1000 * 10)
    this.location = createVector(5, 0 - this.height)
    this.velocity = createVector(0, 0)
    this.acceleration = createVector(0, 0)
  }

  draw() {
    fill(this.red, this.green, this.blue)
    stroke(0)
    
    rect(this.location.x, this.location.y, this.width, this.height)
  }

  update() {
    if(Date.now() > this.diesAt) {
      this.stillAlive = false
    }

    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  checkEdges() {
    const margin = 35
    if(this.location.y + this.height > height - margin) {
      this.location.y = height - this.height - margin
      this.velocity.y *= -.2
    }
  }
}
