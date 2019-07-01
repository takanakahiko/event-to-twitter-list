<template>
  <section class="hero is-light is-fullheight is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          イベントページからツイッターのリストを作るやつ
        </h1>

        <b-field label="Twitterアカウントでログイン">
          <div class="buttons">
            <a href="/api/login" class="button is-info" :disabled="isLogin">
              Twitter Login
            </a>
            <a href="/api/logout" class="button is-danger" :disabled="!isLogin">
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

        <b-field class="is-grouped">
          <b-button class="button is-link" :disabled="!isLogin" @click="submit">
            Submit
          </b-button>
        </b-field>

        <div class="container">
          SpecialThanks : <a href="https://twitter.com/9m/status/1144194540074483712">kkosuge</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      userInfo: null,
      isStepsClickable: false,
      eventUrl: 'https://prickathon.connpass.com/event/132723',
      listName: 'プリッカソン7'
    }
  },
  computed: {
    isLogin() {
      return this.$data.userInfo != null
    }
  },
  async mounted() {
    const ret = await fetch(`${process.env.baseUrl}/api/user`)
    const data = await ret.json()
    this.userInfo = (data.user !== {}) ? data.user : null
  },
  methods: {
    async submit() {
      // eslint-disable-next-line
      const loadingComponent = eval('this').$loading.open()
      const postData = {
        eventUrl: this.eventUrl,
        listName: this.listName
      }
      const ret = await fetch(`${process.env.baseUrl}/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(postData)
      })
      const data = await ret.json()
      if (data.status === 'succeed') {
        // eslint-disable-next-line
        eval('this').$toast.open({ message: '作成しました!', type: 'is-success' })
      } else {
        // eslint-disable-next-line
        eval('this').$toast.open({ message: '失敗しました', type: 'is-danger' })
      }
      loadingComponent.close()
    }
  }
})
</script>
