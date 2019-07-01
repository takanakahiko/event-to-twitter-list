import * as bodyParser from "body-parser"

import { expressWithTwitterOauth } from './twitter-oauth'
import connpass from './connpass'
import { createList, addMemberIntoList } from './twitter-api'

const app = expressWithTwitterOauth()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('json spaces', 2)

app.get('/user', (req, res) => res.json({
  user: req.user
}))

app.post('/create', async (req, res) => {
  if( !req.user || !req.user.access_token || !req.user.token_secret || !req.body.listName || !req.body.eventUrl ){
    return res.send({ status: 'failed' })
  }
  const id = await createList(
    req.user.access_token,
    req.user.token_secret,
    req.body.listName,
    true
  )
  const connpassUsers = await connpass(`${req.body.eventUrl}/participation/`)
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

module.exports = {
  path: '/api',
  handler: app,
}
