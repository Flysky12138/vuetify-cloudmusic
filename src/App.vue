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
            <!-- 对路由添加一个进入动画：渐显 -->
            <transition name="router">
              <router-view />
            </transition>
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
import { mapMutations } from "vuex";
import AppBar from "@/layout/AppBar";
import SideBar from "@/layout/SideBar";
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

<style lang="scss">
* {
  outline: none;
}
.router-enter {
  opacity: 0;
  // transform: scale(0.97);
}
.router-leave,
.router-leave-to {
  display: none;
}
.router-enter-active {
  transition: all 1s;
}
</style>
