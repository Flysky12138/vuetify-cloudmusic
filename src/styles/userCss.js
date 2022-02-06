import pinia from '@/plugins/store'
import { styleStore } from '@/plugins/store/style'

// 创建标签
export default (() => {
  const tag = document.createElement('style')
  tag.setAttribute('type', 'text/css')
  tag.setAttribute('id', 'user-css')
  tag.innerHTML = styleStore(pinia).css
  document.querySelector('head').appendChild(tag)
})()
