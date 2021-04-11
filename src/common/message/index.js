import vuetify from '@/plugins/vuetify'
import Vue from 'vue'
import Message from './Message.vue'

const createMessage = options => {
  // 在 #app DOM下添加一个 #message 标签
  const app = document.getElementById('app')
  const tip = document.createElement('div')
  tip.setAttribute('id', 'message')
  app.appendChild(tip)
  // 返回一个新的Vue实例并且将实例挂载到 #message DOM节点上
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
