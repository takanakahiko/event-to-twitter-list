import * as passport from 'passport';
import * as TwitterStrategy from 'passport-twitter';

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: `${process.env.APP_URL}/auth/twitter/callback`,
    },
    function(token, tokenSecret, profile, done) {
      profile.access_token = token;
      profile.token_secret = tokenSecret;
      return done(null, profile);
    },
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

export = passport
