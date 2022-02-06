import message from '@/common/message'
import { userStore } from '@/plugins/store/user'
import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'
import pinia from '../store'
import routes from './routes'

// 解决报错问题：Error: Avoided redundant navigation to current location
const original = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return original.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  // 页面跳转浏览位置定位
  scrollBehavior: (to, from, savedPosition) => {
    // path不同才滚动
    if (to.path !== from.path) {
      let scrollTo = 0
      if (to.hash) {
        scrollTo = to.hash
      } else if (savedPosition) {
        scrollTo = savedPosition.y
      }
      return goTo(scrollTo, {
        duration: 400,
        offset: 0,
        easing: 'easeOutQuad'
      })
    }
  }
})

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  let params = true
  // 首次加载时from.fullPath=to.fullPath=/
  if (to.fullPath === '/' && from.fullPath === '/') {
    const lastAddress = localStorage.getItem('lastAddress') || '/'
    if (lastAddress !== '/') {
      params = lastAddress
    }
  } else {
    localStorage.setItem('lastAddress', to.fullPath)
  }
  if (!userStore(pinia).islogin && to.meta.requiresAuth) {
    message({ text: '未登录，跳转到登录界面！' })
    params = { path: '/login' }
  }
  next(params)
})

export default router
