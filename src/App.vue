<template>
  <v-app>
    <!-- 顶部导航栏 -->
    <v-app-bar color="white" app elevate-on-scroll>
      <top-bar />
    </v-app-bar>
    <!-- 路由显示区 -->
    <v-main class="grey lighten-3">
      <v-container>
        <v-sheet min-height="888vh" rounded="lg">
          <router-view />
        </v-sheet>
      </v-container>
    </v-main>
    <!-- 侧边栏 -->
    <side-bar />
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
