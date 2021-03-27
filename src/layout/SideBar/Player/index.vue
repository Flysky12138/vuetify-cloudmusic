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
    <!-- 音乐播放标签 autoplay:换歌后继续播放 -->
    <audio
      :src="url"
      :autoplay="isplay"
      crossorigin="anonymous"
      preload="auto"
      ref="audio"
      :loop="loop ? true : false"
      @timeupdate="playDt"
      @ended="next"
    ></audio>
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
    dtOffset: 0, // 歌曲播放的时间偏移量,部分歌曲(VIP,未登录)只会截取一段返回
  }),
  created() {
    this.getMusicDetail();
  },
  mounted() {
    this.$refs.audio.volume = this.volume / 100;
  },
  watch: {
    id: "getMusicDetail",
    // 播放、暂定
    isplay(newValue) {
      newValue ? this.$refs.audio.play() : this.$refs.audio.pause();
    },
    // 音量
    volume(newValue) {
      this.$refs.audio.volume = newValue / 100;
    },
    // 静音
    muted(newValue) {
      this.$refs.audio.muted = newValue;
    },
  },
  computed: {
    ...mapState({
      id: (state) => state.play.music.id,
      isplay: (state) => state.play.isplay,
      volume: (state) => state.play.volume,
      muted: (state) => state.play.muted,
      loop: (state) => state.play.loop,
    }),
  },
  methods: {
    ...mapMutations(["setPlayDt", "next"]),
    // 存放当前播放进度到Vuex
    playDt(res) {
      this.setPlayDt((res.target.currentTime + this.dtOffset) * 1000);
    },
    // 调整播放进度
    changeDt(res) {
      this.$refs.audio.currentTime = Math.floor(res / 1000);
    },
    // 获取播放歌曲、歌词信息
    getMusicDetail() {
      this.dtOffset = 0;
      this.$http.song.check(this.id).then((res) => {
        if (res) {
          this.$http.song.play(this.id).then((res) => {
            this.music.id = res.id;
            this.music.picUrl = res.picUrl;
            this.music.name = res.name;
            this.music.artists = res.artists;
            this.music.duration = res.duration;
            this.url = res.url;
            res.freeTrialInfo && (this.dtOffset = res.freeTrialInfo.start);
          });
          this.$http.song.lyric(this.id).then((res) => {
            this.lyrics = res;
          });
        } else {
          this.$message({ text: "暂无版权,已跳过" });
          this.next();
        }
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
  filter: blur(200px);
}
</style>
