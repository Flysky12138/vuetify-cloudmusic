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
      <!-- 关闭页面按键 -->
      <v-btn @click="$emit('close')" class="mt-2" icon absolute right>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <v-row class="ma-0" align="center" style="height: 100%">
        <!-- 播放 -->
        <v-col cols="6">
          <player-music :value="music" @changeDt="changeDt" />
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
    <!-- 音乐播放标签 -->
    <audio :src="url" @timeupdate="playDt" loop="loop" ref="audio"></audio>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import PlayerMusic from "./components/PlayerMusic";
import PlayerLyrics from "./components/PlayerLyrics.vue";
import PlayerComment from "./components/PlayerComment.vue";
export default {
  components: { PlayerMusic, PlayerLyrics, PlayerComment },
  data: () => ({
    music: { id: 0, picUrl: "", name: "", artists: "", duration: 0 },
    url: "",
    lyrics: [],
  }),
  created() {
    this.getMusicDetail();
  },
  watch: {
    id: "getMusicDetail",
  },
  computed: {
    ...mapState({
      id: (state) => state.play.music.id,
    }),
  },
  methods: {
    ...mapMutations(["setPlayDt"]),
    // 存放当前播放时间到Vuex
    playDt(res) {
      this.setPlayDt(Math.round(res.target.currentTime * 1000));
    },
    // 拖动播放时间条,调整播放进度
    changeDt(res) {
      this.$refs.audio.currentTime = Math.floor(res / 1e3);
    },
    // 获取播放歌曲信息
    getMusicDetail() {
      this.$http.song.play(this.id).then((res) => {
        this.music.id = res.id;
        this.music.picUrl = res.picUrl;
        this.music.name = res.name;
        this.music.artists = res.artists;
        this.music.duration = res.duration;
        this.url = res.url;
        setTimeout(() => {
          this.$refs.audio.play();
        }, 1000);
      });
      this.$http.song.lyric(this.id).then((res) => {
        this.lyrics = res;
      });
    },
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
  filter: blur(130px);
}
</style>
