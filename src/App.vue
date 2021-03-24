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
        <v-container>
          <v-sheet rounded="lg" :min-height="viewHeight">
            <!-- 对路由添加一个进入动画：渐显 -->
            <transition name="router">
              <keep-alive :include="include">
                <router-view />
              </keep-alive>
            </transition>
          </v-sheet>
        </v-container>
      </v-main>
      <!-- 侧边固定栏 -->
      <side-bar />
    </template>
    <template v-else>
      <v-container class="flex-column justify-center fill-height">
        <strong>非 PC 端</strong>
        <strong>&amp;</strong>
        <strong>width &lt; 960px</strong>
        <br />
        <strong>未适配，不允显示</strong>
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
    // keep-alive组件名
    include: ["home", "recommend"],
  }),
  created() {
    // 获取ID,等级和头像
    this.$http.login.status().then((res) => {
      if (res.islogin) {
        this.setLogin(res);
      }
    });
  },
  computed: {
    // 路由界面最低高度；视窗高度 - 顶部导航栏高度 - v-main标签中的v-container标签的padding（my-3）
    viewHeight() {
      return (
        this.$vuetify.breakpoint.height - this.$vuetify.application.top - 24
      );
    },
  },
  methods: {
    ...mapMutations({
      setLogin: "login",
    }),
  },
};
</script>

<style lang="scss">
// 全局按键边框隐藏
* {
  outline: none;
}
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
// 全局预设隐藏滚动条类
.scroll,
html {
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE10+
  &::-webkit-scrollbar {
    display: none; // Chrome,Safari
  }
}
</style>
