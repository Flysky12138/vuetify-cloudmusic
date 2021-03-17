<template>
  <v-container
    fluid
    class="pa-0 overflow-hidden"
    style="position: relative; height: 100vh"
  >
    <!-- 虚化背景 -->
    <v-img class="bg" :src="imgUrl"></v-img>
    <!-- 内容 -->
    <v-card elevation="0" height="100%" color="transparent">
      <!-- 关闭按键 -->
      <v-btn
        color="success"
        @click="$emit('close')"
        class="mt-2"
        icon
        absolute
        right
      >
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-row class="ma-0" align="center" style="height: 100%">
        <!-- 播放器 -->
        <v-col cols="6">
          <player-music />
        </v-col>
        <!-- 歌词 -->
        <v-col v-if="true" cols="5">
          <player-lyrics />
        </v-col>
        <!-- 评论 -->
        <v-col v-else cols="5">
          <player-comment />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import PlayerMusic from "./components/PlayerMusic.vue";
import PlayerLyrics from "./components/PlayerLyrics.vue";
import PlayerComment from "./components/PlayerComment.vue";
export default {
  components: { PlayerMusic, PlayerLyrics, PlayerComment },
  data: () => ({
    imgUrl:
      "http://p1.music.126.net/4YSJcLtkBWGFXTRZNc0wTQ==/109951163892261723.jpg",
  }),
};
</script>

<style lang="scss">
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  filter: blur(80px);
}
</style>
