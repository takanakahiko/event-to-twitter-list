import * as bodyParser from 'body-parser'

import { expressWithTwitterOauth } from './twitter-oauth'
import { fechConnpassUsers, hoge } from './connpass'
import { createList, addMemberIntoList } from './twitter-api'

const app = expressWithTwitterOauth()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('json spaces', 2)

app.get('/user', (req, res) => res.json({
  user: req.user,
}))

app.get('/test', async (req, res) => res.json(await fechConnpassUsers('https://battleconference-u30.connpass.com/event/127864/')))

app.post('/create', async (req, res) => {
  if (!req.user || !req.user.access_token || !req.user.token_secret || !req.body.listName || !req.body.eventUrl) {
    return res.send({ status: 'failed' })
  }
  const connpassUsers = await fechConnpassUsers(req.body.eventUrl)
  const { id, uri } = await createList(
    req.user.access_token,
    req.user.token_secret,
    req.body.listName,
    req.body.isPrivate
  )
  const twitterIds = connpassUsers
    .filter(user => user.status !== 'キャンセル')
    .map(user => user.social.twitter)
    .filter(value => !!value) as string[]

  await addMemberIntoList(
    req.user.access_token,
    req.user.token_secret,
    id,
    twitterIds
  )
  return res.send({
    status: 'succeed',
    listUrl: `https://twitter.com${uri}`,
  })
})

module.exports = {
  path: '/api',
  handler: app,
}
