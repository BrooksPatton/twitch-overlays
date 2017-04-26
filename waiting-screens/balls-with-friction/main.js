var balls = []
var gravity
var wind
var frictionMag
var timer
var frictionCoefficient
var normal

function setup() {
  createCanvas(1280, 720)

  frictionCoefficient = 0.01 
  normal = 1

  gravity = createVector(0, 0.1)
  wind = createVector(0.01, 0)
  timer = setInterval(function(){
    balls.push(new Ball(createVector(1, -100), random(1, 10)))
  }, 3000)
}

function draw() {
  background(0)
  for(var i = 0; i < balls.length; i++) {
    balls[i].draw()

    var g = gravity.copy()
    var friction = balls[i].velocity.copy()
    
    frictionMag = frictionCoefficient * normal

    if(balls[i].location.x > width - 10 && balls[i].location.y > height - 10) {
      frictionMag = -50.13 * normal
    }
    
    g.mult(balls[i].mass)
    friction.mult(-1)
    friction.normalize()
    friction.mult(frictionMag)

    balls[i].applyForce(g)
    balls[i].applyForce(wind)
    balls[i].applyForce(friction)
    balls[i].checkEdges()
    balls[i].update()
  }
}
