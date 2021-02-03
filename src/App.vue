<template>
  <v-app>
    <!-- <div v-if="$vuetify.breakpoint.smAndUp"> -->
    <!-- 顶部导航栏 -->
    <v-app-bar color="white" app elevate-on-scroll>
      <top-bar />
    </v-app-bar>
    <!-- 路由显示区 -->
    <v-main class="grey lighten-3">
      <v-container>
        <v-sheet min-height="88vh" rounded="lg">
          <router-view />
        </v-sheet>
      </v-container>
    </v-main>
    <!-- 侧边栏 -->
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
import TopBar from "components/TopBar.vue";
import SideBar from "components/SideBar.vue";
export default {
  components: { TopBar, SideBar },
  data: () => ({}),
};
</script>
