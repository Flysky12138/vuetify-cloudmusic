<template>
  <v-navigation-drawer
    v-model="isShow"
    app
    hide-overlay
    width="160"
    :mini-variant="miniDrawer"
    temporary
    @mouseleave.native="isShow = false"
    @click.native="allClick"
  >
    <router />
    <v-divider></v-divider>
    <tools />
    <v-divider></v-divider>
    <options />
    <!-- 改变抽屉栏样式 -->
    <v-list dense nav class="list">
      <v-list-item link @click.stop="setMiniDrawer(!miniDrawer)">
        <v-list-item-icon>
          <v-icon color="purple lighten-3">{{ miniDrawer ? 'mdi-share' : 'mdi-reply' }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>改变样式</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { styleStore } from '@/plugins/store/style'
import { mapActions, mapState } from 'pinia'
import Router from './Router.vue'
import Options from './Options.vue'
import Tools from './Tools.vue'
export default {
  components: { Router, Options, Tools },
  data: () => ({
    isShow: false
  }),
  created() {
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
  computed: {
    ...mapState(styleStore, ['miniDrawer'])
  },
  methods: {
    ...mapActions(styleStore, ['setMiniDrawer']),
    allClick(event) {
      if (['v-list-item', 'v-icon'].some(res => event.target.className.includes(res))) {
        this.isShow = false
      }
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
