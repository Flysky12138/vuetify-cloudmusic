import pinia from '@/plugins/store'
import { playerStore } from '@/plugins/store/player'
import key from 'keymaster'

// 移除按键默认事件
key.filter = event => {
  if (['INPUT', 'SELECT', 'TEXTAREA', 'VIDEO'].includes((event.target || event.srcElement).tagName)) {
    return false
  } else if ([32, 37, 39].includes(event.keyCode)) {
    event.preventDefault()
  }
  return true
}

const player = playerStore(pinia)

export default (() => {
  key('left', () => {
    player.previous()
  })
  key('right', () => {
    player.next()
  })
  key('space', () => {
    player.playORpause()
  })
})()
