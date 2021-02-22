<template>
  <v-app>
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <!-- 顶部导航栏 -->
      <v-app-bar color="white" app elevate-on-scroll>
        <v-container>
          <app-bar />
        </v-container>
      </v-app-bar>
      <!-- 路由显示区 -->
      <v-main class="grey lighten-3">
        <v-container>
          <v-sheet rounded="lg" :min-height="$vuetify.breakpoint.height - 88">
            <router-view />
          </v-sheet>
        </v-container>
      </v-main>
      <!-- 侧边固定栏 -->
      <side-bar />
    </template>

    <template v-else>
      <v-sheet
        class="d-flex justify-center align-center text-h6 font-weight-bold"
        height="100vh"
        >MD 断点（960px） 以下屏幕不允显示
      </v-sheet>
    </template>
  </v-app>
</template>

<script>
import AppBar from "frame/AppBar";
import SideBar from "frame/SideBar";
import { mapMutations } from "vuex";
export default {
  components: { AppBar, SideBar },
  data: () => ({}),
  created() {
    // 获取账号信息
    this.$http.login.status().then((res) => {
      if (res.islogin) {
        this.$http.user.detail(res.id).then((res) => {
          this.detail(res);
          this.isLogin(true);
        });
      }
    });
    // 弹出播放按键
    setTimeout(() => {
      this.isPlay();
    }, 1000);
  },
  methods: {
    ...mapMutations({
      isLogin: "isLogin",
      detail: "user/detail",
      isPlay: "play/isPlay",
    }),
  },
};
</script>
