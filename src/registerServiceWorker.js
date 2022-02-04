/* eslint-disable no-console */

import message from '@/common/message'
import { register } from 'register-service-worker'

if ('serviceWorker' in window.navigator && process.env.NODE_ENV === 'production') {
  register('./service-worker.js', {
    ready() {
      console.log('App is being served from cache by a service worker.\n' + 'For more details, visit https://goo.gl/AFskqB')
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated() {
      console.log('New content is available; please refresh.')
      message({
        text: '新内容可用。点击 刷新 进行更新。',
        color: 'primary',
        timeout: 10000,
        button: {
          text: '刷新',
          f: () => {
            window.history.go()
          }
        }
      })
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
