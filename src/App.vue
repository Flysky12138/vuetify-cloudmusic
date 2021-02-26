<template>
  <v-app>
    <template v-if="$vuetify.breakpoint.mdAndUp">
      <!-- 顶部导航栏 -->
      <v-app-bar app color="white" elevate-on-scroll>
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
import AppBar from "components/Layout/AppBar";
import SideBar from "components/Layout/SideBar";
import { mapMutations } from "vuex";
export default {
  components: { AppBar, SideBar },
  data: () => ({}),
  created() {
    // 获取ID,等级和头像
    this.$http.login.status().then((res) => {
      if (res.islogin) {
        this.setLogin(res);
      }
    });
  },
  methods: {
    ...mapMutations({
      setLogin: "login",
    }),
  },
};
</script>
