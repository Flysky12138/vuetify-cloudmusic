import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    islogin: false, // 登录状态
    info: {}, // 用户信息
    cookie: '' // 凭证
  }),
  actions: {
    login(params) {
      this.islogin = true
      this.cookie = params
    },
    setInfo(params) {
      this.info = params
    },
    logout() {
      this.islogin = false
      this.info = {}
      this.cookie = ''
    }
  },
  persist: true
})
