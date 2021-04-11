<template>
  <v-container fluid class='pa-0 overflow-hidden' style='position: relative; height: 100vh'>
    <!-- 虚化背景 -->
    <v-img class='bg' :src='music.picUrl'></v-img>
    <!-- 内容 -->
    <v-card elevation='0' height='100%' color='transparent'>
      <!-- 左上播放列表按键 -->
      <player-lists />
      <!-- 右上关闭页面按键 -->
      <v-btn @click='$emit("close")' large icon absolute top right>
        <v-icon large>mdi-chevron-down</v-icon>
      </v-btn>
      <v-row class='ma-0' align='center' style='height: 100%'>
        <!-- 播放 -->
        <v-col cols='6'>
          <player-music @changeDt='changeDt' />
        </v-col>
        <!-- 歌词 -->
        <v-col v-if='true' cols='5'>
          <player-lyrics :value='lyrics' />
        </v-col>
        <!-- 评论 -->
        <v-col v-else cols='5'>
          <player-comment />
        </v-col>
      </v-row>
    </v-card>
    <!-- 音乐播放标签 autoplay:换歌后继续播放 -->
    <audio :src='url' :autoplay='isplay' :loop='loop ? true : false' @timeupdate='playDt' @ended='next' crossorigin='anonymous' preload='auto' ref='audio'></audio>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import PlayerLists from './PlayerLists.vue'
import PlayerMusic from './PlayerMusic'
import PlayerLyrics from './PlayerLyrics.vue'
import PlayerComment from './PlayerComment.vue'
export default {
  components: { PlayerLists, PlayerMusic, PlayerLyrics, PlayerComment },
  data: () => ({
    url: '', // 歌曲地址
    lyrics: [], // 歌词
    dtOffset: 0 // 歌曲播放的时间偏移量,因为部分歌曲(VIP,未登录)只会截取一段返回
  }),
  created() {
    this.getMusicDetail()
  },
  mounted() {
    this.$refs.audio.volume = this.volume / 10
  },
  watch: {
    music: 'getMusicDetail',
    // 播放、暂定
    isplay(newValue) {
      newValue ? this.$refs.audio.play() : this.$refs.audio.pause()
    },
    // 音量
    volume(newValue) {
      this.$refs.audio.volume = newValue / 10
    },
    // 静音
    muted(newValue) {
      this.$refs.audio.muted = newValue
    }
  },
  computed: {
    ...mapState({
      music: state => state.play.music,
      isplay: state => state.play.isplay,
      volume: state => state.play.volume,
      muted: state => state.play.muted,
      loop: state => state.play.loop
    })
  },
  methods: {
    ...mapMutations(['setPlayDt', 'next']),
    // 存放当前播放进度到Vuex
    playDt(res) {
      this.setPlayDt((res.target.currentTime + this.dtOffset) * 1000)
    },
    // 调整播放进度
    changeDt(res) {
      this.$refs.audio.currentTime = Math.floor(res / 1000)
    },
    // 获取播放歌曲歌词等信息
    getMusicDetail() {
      this.dtOffset = 0
      this.url = '' // 清空使歌曲停止播放
      this.lyrics = [{ lyric: '歌词加载中' }]
      this.$http.song.url(this.music.id).then(res => {
        if (res.url) {
          this.url = res.url
          res.freeTrialInfo && (this.dtOffset = res.freeTrialInfo.start)
          this.$http.song.lyric(this.music.id).then(res => {
            this.lyrics = res
          })
        } else {
          this.$message({ text: '〖 ' + this.music.name + ' 〗 暂无版权' })
          this.next()
        }
      })
    }
  }
}
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
