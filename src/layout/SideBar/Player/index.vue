<template>
  <v-container
    fluid
    class="pa-0 overflow-hidden"
    style="position: relative; height: 100vh"
  >
    <!-- 虚化背景 -->
    <v-img class="bg" :src="music.picUrl"></v-img>
    <!-- 内容 -->
    <v-card elevation="0" height="100%" color="transparent">
      <!-- 关闭按键 -->
      <v-btn @click="$emit('close')" class="mt-2" icon absolute right>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-row class="ma-0" align="center" style="height: 100%">
        <!-- 播放器 -->
        <v-col cols="6">
          <player-music :value="music" />
        </v-col>
        <!-- 歌词 -->
        <v-col v-if="true" cols="5">
          <player-lyrics :value="lyrics" />
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
import { mapState } from "vuex";
import PlayerMusic from "./components/PlayerMusic";
import PlayerLyrics from "./components/PlayerLyrics.vue";
import PlayerComment from "./components/PlayerComment.vue";
export default {
  components: { PlayerMusic, PlayerLyrics, PlayerComment },
  data: () => ({
    music: {
      id: 0,
      picUrl: "",
      name: "",
      artists: "",
      duration: 0,
    },
    lyrics: [],
  }),
  computed: {
    ...mapState({
      playingId: (state) => state.play.lists[0],
    }),
  },
  mounted() {
    // 获取歌曲信息
    this.$http.song.play(this.playingId).then((res) => {
      this.music.id = res.id;
      this.music.picUrl = res.picUrl;
      this.music.name = res.name;
      this.music.artists = res.artists;
      this.music.duration = res.duration;
    });
    // 获取歌词
    this.$http.song.lyric(this.playingId).then((res) => {
      this.lyrics = res;
    });
  },
};
</script>

<style lang="scss">
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transform: scale(1.3);
  filter: blur(200px);
}
</style>
