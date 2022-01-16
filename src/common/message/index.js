import vuetify from '@/plugins/vuetify'
import Vue from 'vue'
import Message from './Message.vue'

const createMessage = options => {
  if (!document.querySelector('#message')) {
    let div = document.createElement('div')
    div.id = 'message'
    document.querySelector('#app').appendChild(div)
  }
  new Vue({
    vuetify,
    render: h =>
      h(Message, {
        // 给Message组件中的props赋值
        props: {
          text: options.text,
          color: options.color,
          timeout: options.timeout,
          button: options.button
        }
      })
  }).$mount('#message')
}

export default createMessage
