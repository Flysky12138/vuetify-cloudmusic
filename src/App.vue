<template>
  <v-app @contextmenu.native.prevent>
    <template v-if='isPc'>
      <!-- 左侧抽屉 -->
      <drawer />
      <!-- 顶部导航栏 -->
      <v-app-bar app :color='$vuetify.theme.isDark ? "" : "white"' elevate-on-scroll>
        <v-container class='width-size'>
          <app-bar />
        </v-container>
      </v-app-bar>
      <!-- 路由显示区 -->
      <v-main :class='$vuetify.theme.isDark ? "" : "grey lighten-3"'>
        <v-container class='width-size' style='height: 100%'>
          <v-sheet rounded='lg' height='100%'>
            <!-- 对路由添加一个进入动画：渐显 -->
            <my-router-transition>
              <keep-alive>
                <router-view v-if='$route.meta.keepAlive' :key='$route.fullPath' />
              </keep-alive>
            </my-router-transition>
            <my-router-transition>
              <router-view v-if='!$route.meta.keepAlive' />
            </my-router-transition>
          </v-sheet>
        </v-container>
      </v-main>
      <!-- 侧边固定栏 -->
      <side-bar />
    </template>
    <template v-else>
      <v-container class='fill-height'>
        <strong class='mx-auto text-center'>
          非 PC 端
          <br />未适配，不允显示
        </strong>
      </v-container>
    </template>
  </v-app>
</template>

<script>
import { userStore } from '@/plugins/store/user'
import { mapActions } from 'pinia'
import AppBar from './layout/AppBar'
import Drawer from './layout/Drawer'
import SideBar from './layout/SideBar'
export default {
  components: { AppBar, Drawer, SideBar },
  data: () => ({
    isPc: !/Android|WindowsPhone|webOS|iPhone|iPod|BlackBerry|iPad/.test(navigator.userAgent)
  }),
  async created() {
    try {
      this.setInfo(await this.$http.login.status())
    } catch (error) {
      this.logout()
    }
  },
  methods: {
    ...mapActions(userStore, ['setInfo', 'logout'])
  }
}
</script>

<style lang="scss" scoped>
// 界面宽度限制
.width-size {
  width: 75vw;
  min-width: 900px;
}
</style>
