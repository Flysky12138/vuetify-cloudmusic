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
    songid: { type: Number, required: true },
    mvid: { type: Number, default: 0, required: true }
  },
  data: () => ({
    height: window.screen.height * 0.7,
    video: {}
  }),
  mounted() {
    this.getVideoInfo(this.songid, this.mvid)
  },
  methods: {
    async getVideoInfo(songid, mvid) {
      try {
        // 获取视频信息
        const lists = await this.$http.mv.rcmd(songid, mvid)
        this.video = /^\d+$/.test(lists[0]) ? await this.$http.mv.url.mv(lists[0]) : await this.$http.mv.url.mlog(lists[0])
        // 移除视频大小变化过渡动画，防止手动点击放大视频出问题
        setTimeout(() => {
          this.$refs.video.style.cssText = ''
        }, 500)
      } catch (error) {}
    },
    // 暂停视频
    pause() {
      this.$refs.video.pause()
    }
  }
}
</script>
