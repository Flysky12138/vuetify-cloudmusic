import message from '@/common/message'
import { userStore } from '@/plugins/store/user'
import pinia from '../store'

const routes = [
  {
    path: '*',
    redirect: {
      name: 'Home'
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    // 路由独享的守卫
    beforeEnter(to, from, next) {
      if (userStore(pinia).islogin) {
        message({
          text: '已经登录过了！',
          color: 'success'
        })
        history.back()
      } else {
        next()
      }
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: {
      keepAlive: true,
      disShowLocateMusicBtn: true
    }
  },
  {
    path: '/user',
    component: () => import('@/views/User'),
    meta: {
      disShowLocateMusicBtn: true
    }
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/playlist',
    component: () => import('@/views/Playlist'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/discover/playlist',
    component: () => import('@/views/Discover'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/about',
    component: () => import('@/views/About')
  },
  {
    path: '/recommend',
    component: () => import('@/views/Recommend'),
    meta: {
      requiresAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/artists',
    component: () => import('@/views/Artists'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/album',
    component: () => import('@/views/Album'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/cloud',
    component: () => import('@/views/Cloud'),
    meta: {
      requiresAuth: true,
      keepAlive: true
    }
  },
  {
    path: '/temporary',
    component: () => import('@/views/Temporary'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/css',
    component: () => import('@/views/Css')
  }
]

export default routes
