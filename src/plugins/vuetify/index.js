import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'
import pinia from '../store'
import { styleStore } from '../store/style'

Vue.use(Vuetify)
// 创建路由动画标签
Vue.component('my-router-transition', createSimpleTransition('router-transition'))

const vuetify = new Vuetify()
const style = styleStore(pinia)
// 监听主题色变化
Object.defineProperty(vuetify.framework.theme, 'isDark', {
  get() {
    return style.isDark
  },
  set(param) {
    style.setIsDark(param)
    setTitleColor(param)
  }
})

// 设置 PWA 标题栏背景色
function setTitleColor(boolean) {
  document.querySelector('meta[name="theme-color"]').setAttribute('content', boolean ? '#272727' : '#ffffff')
}
setTitleColor(style.isDark)

export default vuetify
