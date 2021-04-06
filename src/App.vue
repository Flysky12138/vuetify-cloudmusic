<template>
  <v-app>
    <template v-if="$vuetify.breakpoint.mdAndUp && !isMobile">
      <!-- 顶部导航栏 -->
      <v-app-bar
        app
        :color="$vuetify.theme.isDark ? '' : 'white'"
        elevate-on-scroll
      >
        <v-container>
          <app-bar />
        </v-container>
      </v-app-bar>
      <!-- 路由显示区 -->
      <v-main :class="$vuetify.theme.isDark ? '' : 'grey lighten-3'">
        <v-container style="height: 100%">
          <v-sheet rounded="lg" height="100%">
            <!-- 对路由添加一个进入动画：渐显 -->
            <transition name="router">
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive" />
              </keep-alive>
            </transition>
            <transition name="router">
              <router-view v-if="!$route.meta.keepAlive" />
            </transition>
          </v-sheet>
        </v-container>
      </v-main>
      <!-- 侧边固定栏 -->
      <side-bar />
    </template>
    <template v-else>
      <v-container class="fill-height">
        <strong class="mx-auto text-center">
          非 PC 端<br />&amp;<br />width &lt; 960px<br /><br />未适配，不允显示
        </strong>
      </v-container>
    </template>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
import AppBar from "./layout/AppBar";
import SideBar from "./layout/SideBar";
export default {
  components: { AppBar, SideBar },
  data: () => ({
    // 判断是否是非PC端
    isMobile: new RegExp(
      "Android|WindowsPhone|webOS|iPhone|iPod|BlackBerry|iPad"
    ).test(navigator.userAgent),
  }),
  created() {
    // 获取ID,等级和头像
    this.$http.login.status().then((res) => {
      res.islogin ? this.login(res) : this.logout();
    });
  },
  methods: {
    ...mapMutations(["login", "logout"]),
  },
};
</script>

<style lang="scss">
// 路由动画
.router-enter {
  opacity: 0;
  // transform: scale(0.97);
}
.router-leave,
.router-leave-to {
  display: none;
}
.router-enter-active {
  transition: all 1.5s;
}
// 全局按键边框隐藏
* {
  outline: none;
}
// 全局预设隐藏滚动条类
.scroll,
html {
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE10+
  &::-webkit-scrollbar {
    display: none; // Chrome,Safari
  }
}
// 正在播放歌曲项的样式
.playItem {
  color: #f4511e;
}
</style>
