import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
  mode: 'spa',
  serverMiddleware: ['~/server'],
  /*
  ** Headers of the page
  */
  head: {
    title: 'イベントページからツイッターのリストを作るやつ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'connpass の URL から Twitter のリストを自動生成します' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'イベントページからツイッターのリストを作るやつ' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://event-to-twitter-list.herokuapp.com/ogp.png' },
      { hid: 'og:title', property: 'og:title', content: 'イベントページからツイッターのリストを作るやつ' },
      { hid: 'og:description', property: 'og:description', content: 'connpass の URL から Twitter のリストを自動生成します' },
      { hid: 'og:image', property: 'og:image', content: 'https://example.com/img/ogp/common.jpg' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/ga.js', ssr: false },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
  ],
  /*
  ** Build configuration
  */
  build: {
  },

  env: {
    baseUrl: process.env.APP_URL || 'http://localhost:3000',
  },
}

export default config
