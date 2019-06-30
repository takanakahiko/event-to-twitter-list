import express from 'express'
import * as bodyParser from "body-parser"

import passport from './twitter-oauth'
import connpass from './connpass'
import { createList, addMemberIntoList } from './twitter-api'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('express-session')({ secret: 'some secret' }))
app.use(passport.initialize())
app.use(passport.session())

app.set('json spaces', 2)

app.get('/test', async (req, res) => res.send(await connpass()))
app.get('/hello', (req, res) => res.send('world'))
app.get('/user', (req, res) => res.json({ user: req.user }))
app.post('/create', async (req, res) => {
  if( !req.user || !req.user.access_token || !req.user.token_secret || !req.body.listName || !req.body.listName ){
    return res.send({ status: 'failed' })
  }
  const id = await createList(
    req.user.access_token,
    req.user.token_secret,
    req.body.listName,
    true
  )
  const connpassUsers = await connpass()
  const twitterIds = connpassUsers
    .map( user => user.social.twitter )
    .filter(value => !!value ) as string[]
  const uniqueTwitterIds = twitterIds.filter( (id, i, self) => self.indexOf(id) == i )
  const ret = await addMemberIntoList(
    req.user.access_token,
    req.user.token_secret,
    id,
    uniqueTwitterIds
  )
  return res.send({ status: 'succeed' })
})

// auth
app.get('/login', passport.authenticate('twitter'));
app.get('/login/callback', passport.authenticate('twitter', {
    successRedirect: "/",
    failureRedirect: "/"
  })
)
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = {
  path: '/api',
  handler: app,
}
