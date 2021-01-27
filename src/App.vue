<template>
  <v-app>
    <!-- 顶部导航栏 -->
    <v-app-bar color="white" app elevate-on-scroll>
      <app-bar />
    </v-app-bar>
    <!-- 路由显示区 -->
    <v-main class="grey lighten-3">
      <main-view>
        <router-view />
      </main-view>
    </v-main>
    <!-- 悬浮按键 -->
    <v-sheet
      style="position: fixed; bottom: 10vh; right: 7vw"
      class="d-flex flex-column-reverse justify-start align-center"
      color="transparent"
    >
      <v-btn elevation="2" icon x-large>
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-sheet>
  </v-app>
</template>

<script>
import AppBar from "components/AppBar";
import MainView from "components/MainView";
export default {
  components: { AppBar, MainView },
  data: () => ({}),
};
</script>
