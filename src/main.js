import time from 'common/time'
import 'common/userCss'
import Vue from 'vue'
import App from './App.vue'
import './common/main.scss'
import message from './common/message'
import http from './http'
import router from './plugins/router'
import store from './plugins/store'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$message = message
Vue.prototype.$time = time

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
