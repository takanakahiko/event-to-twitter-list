import cheerio from 'cheerio'
import axios from 'axios'

export const fetchTwiplaUsers = async (eventUrl = 'https://twipla.jp/events/376346') => {
  const [eventId] = eventUrl.match(/\d+/)!
  const { data } = await axios.get(`https://twipla.jp/events/printlist/${eventId}`)
  const $ = cheerio.load(data)
  const ret = $('tr').toArray().map((e) => {
    const tds = $(e).find('td').toArray()
    const first = $(tds[0])
    const second = $(tds[1])
    const third = $(tds[2])
    const contents = second.contents()

    const twitter = contents[0].data
    const name = contents[2] ? contents[2].data || '' : ''
    const profile = third.text()
    const image = `https:${first.find('img').attr('src')}`

    return {
      name,
      ptype: '',
      social: {
        twitter,
        github: undefined,
      },
      status: '',
      profile,
      comment: '',
      image,
    }
  })

  return ret
}
