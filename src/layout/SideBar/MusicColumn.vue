<template>
  <div class='d-flex justify-center align-center'>
    <!-- 播放器界面 -->
    <v-dialog v-model='dialog' fullscreen transition='dialog-bottom-transition'>
      <template v-slot:activator='{ on, attrs }'>
        <v-btn v-bind='attrs' v-on='on' fab dark color='blue lighten-2' elevation='0'>
          <v-icon class='audio'>mdi-music-clef-treble</v-icon>
        </v-btn>
      </template>
      <v-card tile dark>
        <player @contextmenu.native.prevent @close='dialog = false' @changeDt='setDt' :lyrics='lyrics' :picUrl='music.picUrl' />
      </v-card>
    </v-dialog>
    <!-- 音乐播放标签 autoplay:换歌后继续播放 -->
    <audio :src='url' :autoplay='isplay' :loop='!!!mode' @timeupdate='timeUpdate' @ended='next' crossorigin='anonymous' preload='auto' ref='audio'></audio>
    <!-- 上下按键 -->
    <div style='position: absolute; z-index: -1'>
      <v-btn icon @click='previous'>
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <!-- 按键动画调整 -->
      <transition name='elongate'>
        <div class='box' v-show='isShow'></div>
      </transition>
      <v-btn icon @click='next'>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Player from './Player'
export default {
  components: { Player },
  data: () => ({
    dialog: false, // 播放界面显示
    url: '', // 歌曲地址
    lyrics: [], // 歌词
    dtOffset: 0, // 歌曲播放的时间偏移量,因为部分歌曲(VIP,未登录)只会截取一段返回
    setTimeout: {} // 听歌打卡，setTimeOut函数
  }),
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
      isShow: state => state.play.isShow,
      music: state => state.play.music,
      isplay: state => state.play.isplay,
      volume: state => state.play.volume,
      muted: state => state.play.muted,
      mode: state => state.play.mode
    })
  },
  methods: {
    ...mapMutations(['saveCache', 'setPlayDt', 'previous', 'next', 'removeMusic']),
    // 播放音乐时每250毫秒回调一次
    timeUpdate(res) {
      this.playDt(res)
      this.cacheProgress()
    },
    // 获取播放进度
    playDt(res) {
      this.setPlayDt((res.target.currentTime + this.dtOffset) * 1000)
    },
    // 调整播放进度
    setDt(res) {
      this.$refs.audio.currentTime = Math.floor(res / 1000)
    },
    // 获取缓存进度
    cacheProgress() {
      const timeRanges = this.$refs.audio.buffered
      timeRanges.length !== 0 && this.saveCache(parseInt((timeRanges.end(timeRanges.length - 1) / (this.music.dt / 1000)) * 100))
    },
    // 获取播放歌曲歌词等信息
    async getMusicDetail() {
      this.dtOffset = 0
      this.url = '' // 清空使歌曲停止播放
      this.lyrics = [{ lyric: '歌词加载中' }]
      // 修改标题
      document.title = this.music.name + ' - ' + this.music.artists.map(res => res.name).join('/')
      // 获取歌词
      this.lyrics = await this.$http.song.lyric(this.music.id)
      // 获取URL
      try {
        if (this.music.privilege.st >= 0 || this.music.privilege.cs) {
          const res = await this.$http.song.url(this.music.id)
          this.url = res.url
          res.freeTrialInfo && (this.dtOffset = res.freeTrialInfo.start)
          // 听歌打卡，播放歌曲长度的3/4才执行。
          clearTimeout(this.setTimeout)
          this.setTimeout = setTimeout(() => {
            this.$http.song.scrobble(this.music.id, this.music.albumID)
          }, this.music.dt * 0.75)
        } else {
          throw null
        }
      } catch (error) {
        this.$message({ text: '〖 ' + this.music.name + ' 〗 暂无版权' })
        console.log('暂无版权:', this.music.name, '-', this.music.artists.map(res => res.name).join('/'), '; ID:', this.music.id)
        setTimeout(() => {
          const id = this.music.id
          this.next()
          this.removeMusic(id)
        }, 1500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  height: 70px;
}
.elongate {
  &-enter {
    height: 0;
  }
  &-enter-active {
    transition: height 0.4s cubic-bezier(0.62, 0.14, 0.48, 0.78);
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.audio {
  animation: rotate 5s linear infinite;
}
</style>
