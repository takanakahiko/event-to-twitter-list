<template>
  <section class="hero is-light is-fullheight is-bold">
    <ForkMeOnGithub />
    <div class="hero-body">
      <div class="box" style="margin: 0 auto;">
        <div class="container">
          <h1 class="title">
            イベントページからツイッターのリストを作るやつ
          </h1>

          <b-field label="Twitterアカウントでログイン">
            <div class="buttons">
              <a v-if="!isLogin" href="/api/login" class="button is-info">
                Twitter Login
              </a>
              <a v-else href="/api/logout" class="button is-danger">
                Logout
              </a>
            </div>
          </b-field>

          <b-field label="イベントページのURLを入力">
            <b-input v-model="eventUrl" :disabled="!isLogin" />
          </b-field>

          <b-field label="作成する Twitter リストの名前を入力">
            <b-input v-model="listName" :disabled="!isLogin" />
          </b-field>

          <b-field label="作成する Twitter リストを公開するか選択">
            <div class="block">
              <b-radio v-model="isPrivate" :native-value="true" :disabled="!isLogin">
                非公開
              </b-radio>
              <b-radio v-model="isPrivate" :native-value="false" :disabled="!isLogin">
                公開
              </b-radio>
            </div>
          </b-field>

          <b-field class="is-grouped">
            <b-button class="button is-link" :disabled="!isLogin" @click="submit">
              Submit
            </b-button>
          </b-field>

          <div class="container">
            <span>
              SpecialThanks : <a href="https://twitter.com/9m/status/1144194540074483712">kkosuge</a>
            </span>
            <span>
              <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a>
              <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import ForkMeOnGithub from '~/components/ForkMeOnGithub.vue'

export default Vue.extend({
  components: {
    ForkMeOnGithub,
  },
  data() {
    return {
      userInfo: null,
      isStepsClickable: false,
      eventUrl: 'https://prickathon.connpass.com/event/132723/',
      listName: 'プリッカソン7',
      isPrivate: true,
    }
  },
  computed: {
    isLogin: function () {
      return (this as any).userInfo != null
    },
  },
  async mounted() {
    const ret = await fetch(`${process.env.baseUrl}/api/user`)
    const data = await ret.json()
    this.userInfo = (data.user !== {}) ? data.user : null
  },
  methods: {
    async submit() {
      const loadingComponent = (this as any).$loading.open()
      const postData = {
        eventUrl: this.eventUrl,
        listName: this.listName,
        isPrivate: this.isPrivate,
      }
      const ret = await fetch(`${process.env.baseUrl}/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(postData),
      })
      loadingComponent.close()
      const data = await ret.json()
      if (data.status === 'succeed') {
        (this as any).$dialog.confirm({
          message: '作成したリストを開きますか?',
          onConfirm: () => window.open(data.listUrl, '_blank'),
        })
      } else {
        (this as any).$toast.open({ message: '失敗しました', type: 'is-danger' })
      }
    },
  },
})
</script>
