<template>
  <v-card class='d-flex'>
    <video controls crossorigin='anonymous' width='100%' ref='video' :poster='video.frameUrl' :src='video.url' :style='videoStyle' @canplay.once='canplay'></video>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    songid: { type: Number, required: true },
    mvid: { type: Number, default: 0, required: true }
  },
  data: () => ({
    video: {},
    timestamp: 0,
    musicIsplaying: false
  }),
  created() {
    this.getVideoInfo(this.songid, this.mvid)
  },
  computed: {
    ...mapState({
      isplay: state => state.play.isplay,
      isShow: state => state.play.isShow
    }),
    // 视频窗口样式
    videoStyle() {
      return {
        maxHeight: this.video.url ? '80vh' : '200px',
        transition: 'all .5s .5s'
      }
    }
  },
  methods: {
    ...mapMutations(['playORpause']),
    // 可以播放媒体文件了
    canplay() {
      const time = 1500 - (new Date().getTime() - this.timestamp)
      if (time > 0) {
        setTimeout(() => {
          this.play()
        }, time)
      } else {
        this.play()
      }
    },
    // 获取视频信息
    async getVideoInfo(songid, mvid) {
      const lists = await this.$http.mv.rcmd(songid, mvid)
      this.video = /^\d+$/.test(lists[0]) ? await this.$http.mv.url.mv(lists[0]) : await this.$http.mv.url.mlog(lists[0])
      this.timestamp = new Date().getTime()
    },
    // 播放视频
    play() {
      this.musicIsplaying = this.isplay && this.isShow // 记录歌曲播放状态
      this.playORpause(false) // 暂停歌曲播放
      setTimeout(() => {
        this.$refs.video.play()
      }, 200)
    },
    // 暂停视频
    pause() {
      if (this.video.url) {
        setTimeout(() => {
          this.$refs.video.pause()
          setTimeout(() => {
            this.playORpause(this.musicIsplaying) // 恢复歌曲播放状态
          }, 200)
        }, 200)
      }
    }
  }
}
</script>
