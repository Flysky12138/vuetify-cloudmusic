import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'

Vue.use(Vuetify)
Vue.component('my-router-transition', createSimpleTransition('router-transition'))

const opts = {
  icons: {
    iconfont: 'mdi'
  }
}

export default new Vuetify(opts)
