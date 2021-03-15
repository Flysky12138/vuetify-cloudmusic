<template>
  <v-card elevation="0">
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
    <v-row class="ma-0">
      <!-- 播放器 -->
      <v-col cols="6">
        <player-music />
      </v-col>
      <!-- 歌词 -->
      <v-col v-if="true" cols="6">
        <player-lyrics />
      </v-col>
      <!-- 评论 -->
      <v-col v-else cols="6">
        <player-comment />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import PlayerMusic from "./components/PlayerMusic.vue";
import PlayerLyrics from "./components/PlayerLyrics.vue";
import PlayerComment from "./components/PlayerComment.vue";
export default {
  components: { PlayerMusic, PlayerLyrics, PlayerComment },
  data: () => ({}),
};
</script>
