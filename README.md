# event-to-twitter-list

> イベントページからツイッターのリストを作るやつ

## 開発環境

- そこそこ新しい Node
- 開発用のTwitterアプリケーション

## 開発

まず，環境変数を設定します．
TWITTER_CONSUMER_KEY と TWITTER_CONSUMER_SECRET に関しては，自分で用意してください．

```
export TWITTER_CONSUMER_KEY=XXXXXXXXXXX
export TWITTER_CONSUMER_SECRET=YYYYYYYYYYYYYYYYYYYYYYYYY
export APP_URL=http://localhost:3000
```

Nuxt 製のアプリケーションです．
以下のコマンドで開発します

``` bash
$ npm install
$ npm run dev # http://localhost:3000 で開発用サーバが立ちます
```

## Contribution

PR 大歓迎です
