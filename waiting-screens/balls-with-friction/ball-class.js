class Ball {
  constructor(location, mass) {
    this.location = location
    this.radius = mass * 16
    this.acceleration = createVector(0, 0)
    this.velocity = createVector(0, 0)
    this.mass = mass
    this.red = random(0, 255)
    this.green = random(0, 255)
    this.blue = random(0, 255)
    this.timeToDie = false

    setTimeout(() => this.timeToDie = true, 1000 * 60 * 3)
  }

  draw() {
    noFill()
    stroke(this.red, this.green, this.blue)
    ellipse(this.location.x, this.location.y, this.radius)
  }

  applyForce(force) {
    const f = force.copy()

    f.div(this.mass)
    this.acceleration.add(f)
  }

  update() {
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
  }

  checkEdges() {
    if(this.location.x > width) {
      this.location.x = width
      this.velocity.x *= -1
    }
    else if(this.location.x < 0) {
      this.location.x = 0
      this.velocity.x *= -1
    }
    
    if(this.location.y > height) {
      this.location.y = height
      this.velocity.y *= -1
    }
  }
}
