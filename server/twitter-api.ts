import Twitter from 'twitter'

export const createList = async(
  access_token_key: string,
  access_token_secret: string,
  name: string,
  privateMode = false
) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY!,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
    access_token_key,
    access_token_secret
  });
  const ret = await client.post('lists/create',{
    name,
    mode: (privateMode) ? 'private' : 'public',
  });
  return ret["id_str"] as string
}

export const addMemberIntoList = async(
  access_token_key: string,
  access_token_secret: string,
  listId: string,
  screenNames = [] as string[]
) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY!,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
    access_token_key,
    access_token_secret
  });
  await client.post('lists/members/create_all',{
    list_id: listId,
    screen_name: screenNames.join(','),
  });
}
