<template>
  <v-card class='d-flex'>
    <video controls crossorigin='anonymous' width='100%' ref='video' :poster='video.frameUrl' :src='video.url' :style='videoStyle' @canplay='canplay'></video>
  </v-card>
</template>

<script>
export default {
  props: {
    songid: { type: Number, required: true },
    mvid: { type: Number, default: 0, required: true }
  },
  data: () => ({
    video: {},
    timestamp: 0
  }),
  mounted() {
    this.getVideoInfo(this.songid, this.mvid)
  },
  computed: {
    // 视频窗口样式
    videoStyle() {
      return {
        maxHeight: this.video.url ? '80vh' : '200px',
        transition: 'all .5s .5s'
      }
    }
  },
  methods: {
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
      this.$refs.video.play()
    },
    // 暂停视频
    pause() {
      this.$refs.video.pause()
    }
  }
}
</script>
