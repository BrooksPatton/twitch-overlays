const passport = require('passport')
const TwitchtvStrategy = require('passport-twitchtv').Strategy

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.use(new TwitchtvStrategy({
  clientID: process.env.TWITCH_CLIENT_ID,
  clientSecret: process.env.TWITCH_CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/twitch/callback',
  passReqToCallback: true,
  scope: 'user_read channel_feed_read channel_read'
}, (req, accessToken, refreshToken, profile, next) => {
  profile.accessToken = accessToken
  next(null, profile)
}))

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport
