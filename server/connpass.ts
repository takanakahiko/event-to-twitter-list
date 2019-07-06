import { URL } from 'url'
import cheerio from 'cheerio'
import axios from 'axios'

export const fechConnpassUsers = async (eventUrl = 'https://prickathon.connpass.com/event/132723/') => {
  const { data } = await axios.get(new URL('participation', eventUrl).toString())
  const $ = cheerio.load(data)
  const ret = $('.user').toArray().map((e) => {
    const name = $(e).find('.display_name a').text()
    const ptype = $(e).find('.label_ptype_name').text()
    const status = $(e).find('.label_status_tag').text().trim()
    const profile = $(e).find('.user_profile').text()
    const comment = $(e).find('.comment').text()
    const image = $(e).find('.image_link img').attr('src')
    const socialUrls = $(e).next().find('a').toArray().map(e2 => e2.attribs.href)
    const social = {} as {
      twitter?: string,
      github?: string,
    }
    socialUrls.forEach((url) => {
      const twitterMatch = url.match(/https:\/\/twitter\.com\/intent\/user\?screen_name=(.+)/)
      if (twitterMatch) social.twitter = twitterMatch[1]
      const githubMatch = url.match(/https:\/\/github\.com\/(.+)/)
      if (githubMatch) social.github = githubMatch[1]
    })
    return { name, ptype, social, status, profile, comment, image }
  })
  const moreLinks = $('.empty a').toArray()
  for (const aTag of moreLinks) {
    const linkto = aTag.attribs.href
    for (let i = 1; ; i++) {
      const { users, hasNext } = await fetchSinglepageOfPaging(linkto + '?page=' + i)
      users.forEach(v => ret.push(v))
      if (!hasNext) break
    }
  }
  return ret
}

const fetchSinglepageOfPaging = async (url:string) => {
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)
  const users = $('.user').toArray().map((e) => {
    const name = $(e).find('.display_name a').text()
    const ptype = $(e).find('.label_ptype_name').text()
    const status = $(e).find('.label_status_tag').text().trim()
    const profile = $(e).find('.user_profile').text()
    const comment = $(e).find('.comment').text()
    const image = $(e).find('.image_link img').attr('src')
    const socialUrls = $(e).next().find('a').toArray().map(e2 => e2.attribs.href)
    const social = {} as {
      twitter?: string,
      github?: string,
    }
    socialUrls.forEach((url) => {
      const twitterMatch = url.match(/https:\/\/twitter\.com\/intent\/user\?screen_name=(.+)/)
      if (twitterMatch) social.twitter = twitterMatch[1]
      const githubMatch = url.match(/https:\/\/github\.com\/(.+)/)
      if (githubMatch) social.github = githubMatch[1]
    })
    return { name, ptype, social, status, profile, comment, image }
  })
  return { users,
    hasNext: $('.userpaging_area').text().includes('次へ'),
  }
}

export const hoge = async () => {
  const ret = await fetchSinglepageOfPaging('https://battleconference-u30.connpass.com/event/127864/ptype/179667/participants/?page=1')
  return ret
}
