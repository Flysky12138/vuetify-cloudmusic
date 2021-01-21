<template>
  <v-app>
    <!-- 顶部导航栏 -->
    <v-app-bar color="white" flat app> <app-bar /> </v-app-bar>
    <!-- 路由显示区 -->
    <v-main class="grey lighten-3">
      <main-view>
        <router-view />
      </main-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "components/AppBar.vue";
import MainView from "components/MainView.vue";
export default {
  name: "App",
  components: {
    AppBar,
    MainView,
  },
};
</script>
