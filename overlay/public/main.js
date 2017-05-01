const socket = new WebSocket('wss://pubsub-edge.twitch.tv')

socket.addEventListener('open', event => {
    socket.send(JSON.stringify({
    "type": "PING"
    }))

    socket.send(JSON.stringify({
    type: 'LISTEN',
    data: {
        topics: [`channel-bits-events-v1.${channelId}`],
        auth_token: accessToken
    }
    }))
})

socket.addEventListener('message', event => {
    console.log('something came in!', event.data)
})

socket.addEventListener('ping', event => {
    console.log('got the pong', event)
})