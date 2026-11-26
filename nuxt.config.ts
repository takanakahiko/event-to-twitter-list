export default defineNuxtConfig({
  // 以前の mode: 'spa' と同じく、クライアント側だけで描画する
  ssr: false,
  /*
  ** Headers of the page
  */
  app: {
    head: {
      title: 'イベントページからツイッターのリストを作るやつ',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { key: 'description', name: 'description', content: 'connpass の URL から Twitter のリストを自動生成します' },
        { key: 'og:site_name', property: 'og:site_name', content: 'イベントページからツイッターのリストを作るやつ' },
        { key: 'og:type', property: 'og:type', content: 'website' },
        { key: 'og:url', property: 'og:url', content: 'https://event-to-twitter-list.herokuapp.com' },
        { key: 'og:title', property: 'og:title', content: 'イベントページからツイッターのリストを作るやつ' },
        { key: 'og:description', property: 'og:description', content: 'connpass の URL から Twitter のリストを自動生成します' },
        { key: 'og:image', property: 'og:image', content: 'https://event-to-twitter-list.herokuapp.com/ogp.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // nuxt-buefy が入れていた Material Design Icons
        { rel: 'stylesheet', type: 'text/css', href: '//cdn.materialdesignicons.com/2.4.85/css/materialdesignicons.min.css' },
      ],
    },
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/buefy.scss',
  ],
  vue: {
    compilerOptions: {
      // Vue 2 と同じく、テンプレート中の要素間の空白を残す（ラジオボタンの間隔などが変わらないように）
      whitespace: 'preserve',
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.APP_URL || 'http://localhost:3000',
    },
  },
  compatibilityDate: '2026-11-01',
  nitro: {
    typescript: {
      // server/ のコードは配列の添字アクセスを undefined になりうる扱いにしない前提で書かれている
      tsConfig: { compilerOptions: { noUncheckedIndexedAccess: false } },
    },
  },
  // /api 以下は server/index.ts の express アプリが処理する。
  // 以前の serverMiddleware と同じく、express が処理しなかったリクエストはページの描画に回す
  serverHandlers: [
    { middleware: true, handler: '~~/server/index.ts' },
  ],
  vite: {
    css: {
      // bulma / buefy の Sass ソースが出す非推奨警告は抑える
      preprocessorOptions: { scss: { quietDeps: true } },
    },
  },
})
