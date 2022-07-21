import '@/common/keymaster'
import message from '@/common/message'
import time from '@/common/time'
import router from '@/plugins/router'
import pinia from '@/plugins/store'
import vuetify from '@/plugins/vuetify'
import '@/styles/main.scss'
import '@/styles/userCss'
import Vue from 'vue'
import App from './App.vue'
import http from './http'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$message = message
Vue.prototype.$time = time
Vue.prototype.$bus = new Vue()

const app = new Vue({
  router,
  pinia,
  vuetify,
  render: h => h(App)
})

router.onReady(() => {
  app.$mount('#app')
})
