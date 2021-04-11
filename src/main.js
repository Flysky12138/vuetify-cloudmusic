import Vue from 'vue'
import App from './App.vue'
import message from './common/message'
import http from './http'
import router from './plugins/router'
import store from './plugins/store'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$message = message

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
