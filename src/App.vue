<template>
  <v-app>
    <!-- 顶部导航栏 -->
    <v-app-bar color="white" flat app hide-on-scroll scroll-threshold="80">
      <app-bar />
    </v-app-bar>
    <!-- 路由显示区 -->
    <v-main class="grey lighten-3">
      <main-view>
        <router-view />
      </main-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "components/AppBar";
import MainView from "components/MainView";
export default {
  components: {
    AppBar,
    MainView,
  },
  data: () => ({}),
};
</script>
