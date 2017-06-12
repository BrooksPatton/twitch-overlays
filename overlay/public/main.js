const socket = new WebSocket('wss://pubsub-edge.twitch.tv')
const bitsNonce = 'wfyuplgjwyu5gwdhedhrersduywjg32'
const cheerTopic = `channel-bits-events-v1.${channelId}`
let cheers = []
let gravity
let sound

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
      console.log('raw data', data.data)
      addCheer(JSON.parse(data.data.message))
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

function preload() {
  sound = loadSound('/sound/188714__waveplay__happy-effect-3.wav')
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

function test() {
  addCheer({"data":{"user_name":"georgesguides","channel_name":"brookzerker","user_id":"151920796","channel_id":"75574155","time":"2017-05-11T02:13:39.977Z","chat_message":"cheer1","bits_used":1,"total_bits_used":2,"context":"cheer","badge_entitlement":null},"version":"1.0","message_type":"bits_event","message_id":"0865326f-1436-511c-a064-e77491b1825e"})
}
