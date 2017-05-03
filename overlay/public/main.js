const socket = new WebSocket('wss://pubsub-edge.twitch.tv')
const bitsNonce = 'wfyuplgjwyu5gwdhedhrersduywjg32'
const cheerTopic = `channel-bits-events-v1.${channelId}`
let cheers = []
let gravity

socket.addEventListener('open', () => {
  sendPing(socket)
  setInterval(() => sendPing(socket), 1000 * 60 * 4)

  socket.send(JSON.stringify({
    type: 'LISTEN',
    nonce: bitsNonce,
    data: {
      topics: [cheerTopic],
      auth_token: accessToken
    }
  }))
})

socket.addEventListener('message', event => {
  const data = JSON.parse(event.data)

  if(data && data.data) {
    console.log('topic', data.data.topic)
    if(data.data.topic === cheerTopic) {
      console.log('cheer came in!')
      addCheer(data.data.message)
    }
  }

  console.log('something came in!', data)
})

function sendPing(socket) {
  socket.send(JSON.stringify({
    'type': 'PING'
  }))
}

function addCheer(message) {
  cheers.push(new CheerBox(message))
}

function setup() {
  createCanvas(1280, 720)
  gravity = createVector(0, 10)
  frameRate(30)
}

function draw() {
  clear()
  const cheer = cheers[0]

  if(cheer) {
    cheer.draw()
    cheer.update()
    cheer.applyForce(gravity)

    if(!cheer.diesSoon) {
      cheer.checkEdges()
    }
  }

  if(cheers[0] && !cheers[0].stillAlive) cheers.shift()
}

setInterval(() => addCheer({
  data: {
    user_name: 'chantillycake',
    chat_message: 'cheer1 Yay this is so fun!',
    bits_used: 1,
  }
}), 5000)
