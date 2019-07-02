import express from 'express'
import passport from 'passport'
import TwitterStrategy from 'passport-twitter'

export const expressWithTwitterOauth = () => {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: `${process.env.APP_URL}/api/login/callback`,
      },
      function (token, tokenSecret, profile, done) {
        profile.access_token = token
        profile.token_secret = tokenSecret
        return done(null, profile)
      }
    )
  )

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

  const app = express()
  app.use(require('express-session')({ secret: 'some secret' }))
  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/login', passport.authenticate('twitter'))
  app.get('/login/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/',
  })
  )
  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  return app
}
