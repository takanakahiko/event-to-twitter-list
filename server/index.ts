import express from 'express'
import passport from './twitter-oauth'
import connpass from './connpass'

const app = express();
app.use(require('express-session')({ secret: 'some secret' }));
app.use(passport.initialize());
app.use(passport.session());

app.set('json spaces', 2)

app.get('/test', async (req, res) => res.send(await connpass()));
app.get('/hello', (req, res) => res.send('world'));
app.get('/user', (req, res) => res.json({ user: req.user }));

// auth
app.get('/login', passport.authenticate('twitter'));
app.get('/login/callback', passport.authenticate('twitter', {
    successRedirect: "/",
    failureRedirect: "/"
  })
);
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = {
  path: '/api',
  handler: app,
};
