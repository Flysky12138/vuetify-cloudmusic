import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

function setMeta(content) {
  document.querySelector('meta[name="theme-color"]').setAttribute('content', content)
}

const isDark = JSON.parse(localStorage.getItem('isDark'))
isDark ? setMeta('#272727') : setMeta('#ffffff')

const opts = {
  theme: {
    dark: isDark
  },
  icons: {
    iconfont: 'mdi'
  }
}

export default new Vuetify(opts)
