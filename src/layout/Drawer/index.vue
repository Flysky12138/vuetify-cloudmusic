<template>
  <v-navigation-drawer
    v-model='isShow'
    app
    hide-overlay
    width='160'
    :mini-variant='mini'
    temporary
    @mouseleave.native='isShow = false'
    @click.native='allClick'
  >
    <router />
    <v-divider></v-divider>
    <tools />
    <v-divider></v-divider>
    <options />
    <!-- 改变抽屉栏样式 -->
    <v-list dense nav class='list'>
      <v-list-item link @click.stop='onClick'>
        <v-list-item-icon>
          <v-icon color='purple lighten-3'>{{ mini ? 'mdi-share' : 'mdi-reply' }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>改变样式</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  components: {
    Router: () => import('./Router.vue'),
    Options: () => import('./Options.vue'),
    Tools: () => import('./Tools.vue')
  },
  data: () => ({
    isShow: false,
    mini: false
  }),
  created() {
    this.mini = JSON.parse(localStorage.getItem('miniDrawer'))
    // 创建触发显示抽屉栏的DOM
    const div = document.createElement('div')
    this.elementStyle(div, {
      width: '1px',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0
    })
    document.body.appendChild(div)
    // 监听事件
    div.addEventListener('mouseover', () => {
      this.isShow = true
    })
  },
  methods: {
    allClick(event) {
      if (['v-list-item', 'v-icon'].some(res => event.target.className.includes(res))) {
        this.isShow = false
      }
    },
    onClick() {
      this.mini = !this.mini
      localStorage.setItem('miniDrawer', this.mini)
    },
    elementStyle(element, object) {
      Object.keys(object).forEach(name => {
        element.style[name] = object[name]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
}
</style>
