<template>
  <v-app style='min-width: 900px'>
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
          <transition name='router'>
            <keep-alive>
              <router-view v-if='$route.meta.keepAlive' />
            </keep-alive>
          </transition>
          <transition name='router'>
            <router-view v-if='!$route.meta.keepAlive' />
          </transition>
        </v-sheet>
      </v-container>
    </v-main>
    <!-- 侧边固定栏 -->
    <side-bar />
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'
import AppBar from './layout/AppBar'
import SideBar from './layout/SideBar'
export default {
  components: { AppBar, SideBar },
  data: () => ({}),
  created() {
    // 获取ID,等级和头像
    this.$http.login.status().then(res => {
      res.islogin ? this.login(res) & this.$http.siginin() : this.logout()
    })
  },
  methods: {
    ...mapMutations(['login', 'logout'])
  }
}
</script>

<style lang="scss" scoped>
// 路由动画
.router {
  &-enter {
    opacity: 0;
    // transform: scale(0.97);
  }
  &-leave {
    display: none;
  }
  &-enter-active {
    transition: all 1.5s;
  }
}
// 界面宽度限制
.width-size {
  width: 75vw;
  min-width: 900px;
}
</style>
