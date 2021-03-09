<template>
  <v-app>
    <template v-if="$vuetify.breakpoint.mdAndUp && !isMobile">
      <!-- 顶部导航栏 -->
      <v-app-bar app color="white" elevate-on-scroll>
        <v-container>
          <app-bar />
        </v-container>
      </v-app-bar>
      <!-- 路由显示区 -->
      <v-main class="grey lighten-3">
        <v-container>
          <v-sheet rounded="lg" :min-height="viewHeight">
            <!-- 对路由添加一个进入动画：渐显 -->
            <transition name="router">
              <router-view />
            </transition>
          </v-sheet>
        </v-container>
      </v-main>
      <!-- 侧边固定栏 -->
      <side-bar />
      <!-- 顶部提示文字 -->
      <tip-bar />
    </template>
    <template v-else>
      <v-container class="flex-column justify-center fill-height">
        <strong>非 PC 端</strong>
        <strong>&amp;</strong>
        <strong>width &lt; 960px</strong>
        <br/>
        <strong>未适配，不允显示</strong>
      </v-container>
      </vcon>
    </template>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AppBar from "./layout/AppBar";
import SideBar from "./layout/SideBar";
import TipBar from "./layout/TipBar.vue";
export default {
  components: { AppBar, SideBar, TipBar },
  data: () => ({
    // 判断是否是非PC端
    isMobile: new RegExp(
      "Android|WindowsPhone|webOS|iPhone|iPod|BlackBerry|iPad"
    ).test(navigator.userAgent),
  }),
  created() {
    // 设置默认api
    if (localStorage.getItem("api") == null) {
      localStorage.setItem("api", this.defaultApi);
    }
    // 获取ID,等级和头像
    this.$http.login.status().then((res) => {
      if (res.islogin) {
        this.setLogin(res);
      }
    });
  },
  computed: {
    ...mapState({
      defaultApi: (state) => state.defaultApi,
    }),
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
// 按键边框
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
</style>
