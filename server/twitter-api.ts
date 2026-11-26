import { TwitterApi } from 'twitter-api-v2'
import { divideArray } from './utils'

// 以前の twitter パッケージと同じ API v1.1 のエンドポイントに送る（twitter-api-v2 の既定は api.x.com）
const prefix = 'https://api.twitter.com/1.1/'

const createClient = (accessTokenKey: string, accessTokenSecret: string) => new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY!,
  appSecret: process.env.TWITTER_CONSUMER_SECRET!,
  accessToken: accessTokenKey,
  accessSecret: accessTokenSecret,
}).v1

export const createList = async (
  accessTokenKey: string,
  accessTokenSecret: string,
  name: string,
  privateMode = false
) => {
  const client = createClient(accessTokenKey, accessTokenSecret)
  const ret = await client.post('lists/create.json', {
    name,
    mode: (privateMode) ? 'private' : 'public',
  }, { prefix })
  return {
    id: ret.id_str as string,
    uri: ret.uri as string,
  }
}

export const addMemberIntoList = async (
  accessTokenKey: string,
  accessTokenSecret: string,
  listId: string,
  screenNames:string[] = []
) => {
  const client = createClient(accessTokenKey, accessTokenSecret)
  const dividedScreenNames = divideArray(screenNames, 100)
  for (const i in dividedScreenNames) {
    await client.post('lists/members/create_all.json', {
      list_id: listId,
      screen_name: dividedScreenNames[i].join(','),
    }, { prefix })
  }
}

export const tweet = async (
  accessTokenKey: string,
  accessTokenSecret: string,
  text: string,
) => {
  const client = createClient(accessTokenKey, accessTokenSecret)
  await client.post('statuses/update.json', {
    status: text,
  }, { prefix })
}
