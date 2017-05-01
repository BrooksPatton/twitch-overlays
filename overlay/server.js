require('dotenv').config({})

const express = require('express')
const cookieSession = require('cookie-session')
const axios = require('axios')

const passport = require('./config/passport')

const app = express()
const port = process.env.PORT || 3001

app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY],
  maxAge: 24 * 60 * 60 * 1000
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => res.render('index'))
app.get('/auth/twitch', passport.authenticate('twitchtv'))
app.get('/auth/twitch/callback', passport.authenticate('twitchtv', {successRedirect: '/overlay', failureRedirect: '/'}))
app.get('/overlay', ensureAuthenticated, (req, res, next) => {
  axios.get('https://api.twitch.tv/kraken/channel', {
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      Authorization: `OAuth ${req.user.accessToken}`
    }
  })
  .then(channel => {
    const user = {
      accessToken: req.user.accessToken,
      channelId: channel.data._id
    }
    res.render('overlay', {user})
  })
  .catch(err => next(err))
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next() }
  
  res.redirect('/')
}

app.listen(port, () => console.log(`app listening on port ${port}`))
