import theme from '@/common/theme'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'

Vue.use(Vuetify)
Vue.component('my-router-transition', createSimpleTransition('router-transition'))

const opts = {
  theme: {
    dark: theme.isDark
  }
}

export default new Vuetify(opts)
