class CheerBox {
  constructor(message) {
    this.red = 200
    this.green = 200
    this.blue = 200
    this.stillAlive = true
    this.diesSoon = false
    this.diesAt = Date.now() + (1000 * 6)
    this.location = createVector(5, 0 - this.height)
    this.velocity = createVector(0, 0)
    this.acceleration = createVector(0, 0)

    this.name = `${message.data.user_name} cheered x${message.data.bits_used}!`
    this.message = message.data.chat_message.replace(/cheer\d/, '')
    this.nameFontSize = 24
    this.messageFontSize = 16

    textSize(this.nameFontSize)
    this.nameWidth = textWidth(this.name)
    textSize(this.messageFontSize)
    this.messageWidth = textWidth(this.message)

    this.width = (this.nameWidth < this.messageWidth ? this.messageWidth : this.nameWidth) + 20
    this.height = this.nameFontSize + this.messageFontSize + 20
  }

  draw() {
    textSize(this.nameFontSize)
    noStroke()

    fill(this.red, this.green, this.blue, 235)
    rect(this.location.x, this.location.y, this.width, this.height, 20)

    fill(0, 0, 0)
    text(this.name, this.location.x + 10, this.location.y + this.nameFontSize)
    textSize(this.messageFontSize)
    text(this.message, this.location.x + 10, this.location.y + this.nameFontSize + this.messageFontSize + 5)

  }

  update() {
    const now = Date.now()
    if(now > this.diesAt) {
      this.stillAlive = false
    } else if(now + 1000 > this.diesAt) {
      this.diesSoon = true
      this.resetVelocity()
    }

    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  checkEdges() {
    const margin = 95
    if(this.location.y + this.height > height - margin) {
      this.location.y = height - this.height - margin
      this.velocity.y *= -.2
    }
  }

  resetVelocity() {
    this.velocity.mult(0)
  }
}
