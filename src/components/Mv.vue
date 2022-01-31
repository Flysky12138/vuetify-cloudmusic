<template>
  <v-card class='d-flex'>
    <video
      style='transition: all 0.5s'
      autoplay
      controls
      crossorigin='anonymous'
      ref='video'
      :height='video.height ? height : 200'
      :poster='video.frameUrl'
      :src='video.url'
    ></video>
  </v-card>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true }
  },
  data: () => ({
    height: window.screen.height * 0.7,
    video: {}
  }),
  mounted() {
    this.getVideoInfo(this.id)
  },
  methods: {
    // 获取视频信息
    getVideoInfo(songid) {
      this.$http.mv.rcmd(songid).then(res => {
        this.$http.mv.url(res[0]).then(_res => {
          this.video = _res
          // 移除过渡动画
          setTimeout(() => {
            this.$refs.video.style.cssText = ''
          }, 500)
        })
      })
    },
    // 暂停视频
    pause() {
      this.$refs.video.pause()
    }
  }
}
</script>
