import Vue from 'vue'
import Vuex from 'vuex'
import play from './play'

Vue.use(Vuex)

const store = {
  modules: { play },
  state: {
    // 登录状态
    get islogin() {
      return JSON.parse(localStorage.getItem('islogin'))
    },
    set islogin(params) {
      localStorage.setItem('islogin', JSON.stringify(params))
    },
    // 用户信息
    get user() {
      return JSON.parse(localStorage.getItem('user'))
    },
    set user(params) {
      localStorage.setItem('user', JSON.stringify(params))
    }
  },
  mutations: {
    login(state, params) {
      state.islogin = true
      state.user = Object.assign({}, state.user, params)
    },
    logout(state) {
      state.islogin = false
      state.user = {}
      localStorage.removeItem('cookie')
    }
  }
}

export default new Vuex.Store(store)
