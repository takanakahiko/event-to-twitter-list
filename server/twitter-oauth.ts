import express from 'express'
import passport from 'passport'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import session from 'express-session'

// セッションに入れる Twitter のプロフィール（passport-twitter の profile にトークンを足したもの）
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      username?: string
      access_token?: string
      token_secret?: string
    }
  }
}

export const expressWithTwitterOauth = () => {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY!,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
        callbackURL: `${process.env.APP_URL}/api/login/callback`,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function (token: string, tokenSecret: string, profile: any, done: (error: any, user?: any) => void) {
        profile.access_token = token
        profile.token_secret = tokenSecret
        return done(null, profile)
      }
    )
  )

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user: Express.User, done) {
    done(null, user)
  })

  const app = express()
  app.use(session({
    secret: 'some secret', resave: false, saveUninitialized: true,
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/login', passport.authenticate('twitter'))
  app.get('/login/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/',
  })
  )
  app.get('/logout', (req, res, next) => {
    // passport 0.6 以降、logout はセッションを作り直すので完了を待ってからリダイレクトする
    req.logout((err) => {
      if (err) return next(err)
      res.redirect('/')
    })
  })

  return app
}
