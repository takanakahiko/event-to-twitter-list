import * as express from 'express'
import * as passport from './twitter-oauth'

const app = express();
app.use(require('express-session')({ secret: 'some secret' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/hello', (req, res) => res.send('world'));

// auth
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter'), (req, res) => {
  res.json({ user: req.user });
});
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = {
  path: '/server',
  handler: app,
};
