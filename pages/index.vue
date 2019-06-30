<template>
  <section class="hero is-light is-fullheight is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Event to Twitter List
        </h1>

        <b-field label="Login">
          <div class="buttons">
            <a href="/api/login" class="button is-info" :disabled="isLogin">
              Twitter Login
            </a>
            <a href="/api/logout" class="button is-danger" :disabled="!isLogin">
              Logout
            </a>
          </div>
        </b-field>

        <b-field label="Event url">
          <b-input v-model="eventUrl" :disabled="!isLogin" />
        </b-field>

        <b-field label="List name">
          <b-input v-model="listName" :disabled="!isLogin" />
        </b-field>

        <b-field class="is-grouped">
          <b-button class="button is-link" :disabled="!isLogin" @click="submit">
            Submit
          </b-button>
        </b-field>
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
    // eslint-disable-next-line
    console.log(data)
    this.userInfo = (data.user !== {}) ? data.user : null
  },
  methods: {
    async submit() {
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
        this.$toast.open({ message: '作成しました!', type: 'is-success' })
      } else {
        this.$toast.open({ message: '失敗しました', type: 'is-danger' })
      }
    }
  }
})
</script>
