<template>
  <v-card class='d-flex'>
    <video
      controls
      crossorigin='anonymous'
      width='100%'
      ref='video'
      :poster='video.info.frameUrl'
      :src='video.info.url'
      :style='videoStyle'
      @loadeddata='autoplay'
      @click.prevent='onClick'
    ></video>
  </v-card>
</template>

<script>
import { playerStore } from '@/plugins/store/player'
import { mapState, mapActions } from 'pinia'
export default {
  props: {
    songid: { type: Number, required: true },
    mvid: { type: Number, default: 0, required: true }
  },
  data: () => ({
    video: {
      ids: [],
      index: 0,
      info: {}
    },
    timestamp: 0,
    musicIsplaying: false
  }),
  created() {
    this.$http.mv.rcmd(this.songid, this.mvid).then(res => {
      this.video.ids = res
      this.getVideoInfo()
    })
  },
  computed: {
    ...mapState(playerStore, ['isplay', 'isShow']),
    // 视频窗口样式
    videoStyle() {
      return {
        maxHeight: this.video.info.url ? '80vh' : '200px',
        transition: 'all .5s .5s'
      }
    }
  },
  methods: {
    ...mapActions(playerStore, ['playORpause']),
    // 获取视频信息
    async getVideoInfo(id = this.video.ids[this.video.index]) {
      this.video.info = /^\d+$/.test(id) ? await this.$http.mv.url.mv(id) : await this.$http.mv.url.mlog(id)
      this.timestamp = new Date().getTime()
    },
    // 切换视频
    onClick(event) {
      const index = this.video.index
      if (event.offsetX < 100) {
        this.video.index = Math.max(0, index - 1)
      } else if (event.target.offsetWidth - event.offsetX < 100) {
        this.video.index = Math.min(this.video.ids.length, index + 1)
      }
      this.video.index !== index && this.getVideoInfo()
    },
    // 首帧加载后自动播放视频
    autoplay() {
      // 有过渡动画，所以延迟播放
      const time = 1500 - (new Date().getTime() - this.timestamp)
      if (time > 0) {
        setTimeout(() => {
          this.play()
        }, time)
      } else {
        this.play()
      }
    },
    // 播放视频
    play() {
      this.musicIsplaying = this.musicIsplaying || (this.isplay && this.isShow) // 记录歌曲播放状态
      this.playORpause(false) // 暂停歌曲播放
      setTimeout(() => {
        this.$refs.video.play()
      }, 200)
    },
    // 暂停视频
    pause() {
      if (this.video.info.url) {
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
