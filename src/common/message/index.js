import vuetify from '@/plugins/vuetify'
import Vue from 'vue'
import Message from './Message.vue'

// 右下角消息提示
const createMessage = options => {
  const app = document.getElementById('app')
  const tip = document.createElement('div')
  tip.setAttribute('id', 'message')
  app.appendChild(tip)
  new Vue({
    vuetify,
    render: h =>
      h(Message, {
        // 给Message组件中的props赋值
        props: {
          text: options.text,
          color: options.color,
          time: options.time
        }
      })
  }).$mount('#message')
}

export default createMessage
