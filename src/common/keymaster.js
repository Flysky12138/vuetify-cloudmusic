import key from 'keymaster'
import store from 'plugins/store'

// 移除按键默认事件
key.filter = event => {
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes((event.target || event.srcElement).tagName)) {
    return false
  } else if ([32, 37, 39].includes(event.keyCode)) {
    event.preventDefault()
  }
  return true
}

function run() {
  key('left', () => {
    store.commit('previous')
  })
  key('right', () => {
    store.commit('next')
  })
  key('space', () => {
    store.commit('playORpause')
  })
}

export default {
  run
}
