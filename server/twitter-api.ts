import Twitter from 'twitter'

export const createList = async (
  accessTokenKey: string,
  accessTokenSecret: string,
  name: string,
  privateMode = false
): Promise<string> => {
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
  return ret.id_str
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
  await client.post('lists/members/create_all', {
    list_id: listId,
    screen_name: screenNames.join(','),
  })
}
