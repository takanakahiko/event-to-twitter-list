import Twitter from 'twitter'
import { divideArray } from './utils'

export const createList = async (
  accessTokenKey: string,
  accessTokenSecret: string,
  name: string,
  privateMode = false
) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY!,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret,
  })
  const ret = await client.post('lists/create', {
    name,
    mode: (privateMode) ? 'private' : 'public',
  })
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
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY!,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret,
  })
  const dividedScreenNames = divideArray(screenNames, 100)
  for (const i in dividedScreenNames) {
    await client.post('lists/members/create_all', {
      list_id: listId,
      screen_name: dividedScreenNames[i].join(','),
    })
  }
}
