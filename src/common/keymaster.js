import key from 'keymaster'
import store from 'plugins/store'

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
