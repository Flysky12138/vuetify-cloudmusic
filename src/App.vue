<template>
  <v-app>
    <!-- <div v-if="$vuetify.breakpoint.smAndUp"> -->
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
    <!-- </div>
    <v-sheet
      v-else
      class="d-flex justify-center align-center text-h6 font-weight-bold"
      height="100vh"
    >
      <p>MD 断点（960px） 以下屏幕不予显示</p>
    </v-sheet> -->
  </v-app>
</template>

<script>
import AppBar from "frame/AppBar";
import SideBar from "frame/SideBar";
export default {
  components: { AppBar, SideBar },
  data: () => ({}),
  created() {
    // 获取账号信息
    this.$http.login.status().then((res) => {
      if (res) {
        this.$http.user.account().then((res) => {
          this.$store.commit("isLogin", true);
          this.$store.commit("user/userInformation", res);
        });
      }
    });
    // 弹出播放按键
    setTimeout(() => {
      this.$store.commit("play/isPlay");
    }, 2000);
  },
};
</script>
