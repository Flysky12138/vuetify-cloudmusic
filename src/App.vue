<template>
  <v-app>
    <!-- <div v-if="$vuetify.breakpoint.smAndUp"> -->
    <!-- 顶部导航栏 -->
    <v-app-bar color="white" app elevate-on-scroll>
      <v-container class="d-flex align-center">
        <!-- 按键 -->
        <btn-router />
        <!-- 搜索框 -->
        <search />
        <!-- 头像 -->
        <avatar class="ml-6" />
      </v-container>
    </v-app-bar>
    <!-- 路由显示区 -->
    <v-main class="grey lighten-3">
      <v-container>
        <v-sheet rounded="lg">
          <router-view />
        </v-sheet>
      </v-container>
    </v-main>
    <!-- 侧边栏 -->
    <!-- 音乐按键栏 -->
    <music-column />
    <!-- 回顶按键 -->
    <go-top />
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
import BtnRouter from "components/AppBar/ButtonRouter";
import Search from "components/AppBar/Search.vue";
import Avatar from "components/AppBar/Avatar.vue";
import MusicColumn from "components/SideBar/MusicColumn.vue";
import GoTop from "components/SideBar/GoTop.vue";
export default {
  components: { BtnRouter, Search, Avatar, MusicColumn, GoTop },
  data: () => ({}),
};
</script>
