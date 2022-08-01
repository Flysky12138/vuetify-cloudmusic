<template>
  <v-dialog v-model="dialog" overlay-opacity="0.9" :disabled="disabled" content-class="dialog">
    <template v-slot:activator="{ on, attrs }">
      <slot v-bind="{ on, attrs }" />
    </template>
    <v-card class="d-flex align-center" @mouseenter="showBtn = true" @mouseleave="showBtn = false">
      <video
        controls
        crossorigin="anonymous"
        width="100%"
        ref="video"
        :poster="video.info.frameUrl"
        :src="video.info.url"
        :style="videoStyle"
        @error="error"
      ></video>
      <!-- 切换视频按键 -->
      <v-slide-x-transition>
        <v-btn v-show="video.index > 0 && video.info.url && showBtn" icon absolute left large @click.prevent="previous">
          <v-icon large>mdi-chevron-left</v-icon>
        </v-btn>
      </v-slide-x-transition>
      <v-slide-x-reverse-transition>
        <v-btn v-show="video.index < video.ids.length - 1 && video.info.url && showBtn" icon absolute right large @click.prevent="next">
          <v-icon large>mdi-chevron-right</v-icon>
        </v-btn>
      </v-slide-x-reverse-transition>
    </v-card>
  </v-dialog>
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
    dialog: false,
    disabled: false,
    showBtn: false,
    video: {
      ids: [],
      index: -1,
      info: {}
    },
    musicIsplaying: false
  }),
  watch: {
    async dialog(newValue) {
      if (newValue) {
        this.musicIsplaying = this.isplay // 记录歌曲播放状态
        if (this.video.info.url) {
          this.play()
        } else {
          try {
            this.video.ids = await this.$http.mv.rcmd(this.songid, this.mvid) // 获取视频ID
            this.video.index = 0
          } catch (err) {
            this.error()
          }
        }
      } else {
        if (this.video.info.url) {
          this.pause()
        }
      }
    },
    'video.index'(newValue) {
      this.getVideoInfo(this.video.ids[newValue])
    }
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
    async getVideoInfo(id) {
      const timestamp = new Date().getTime()
      this.video.info = /^\d+$/.test(id) ? await this.$http.mv.url.mv(id) : await this.$http.mv.url.mlog(id)
      setTimeout(() => {
        this.dialog && this.play() // 有过渡动画，所以延迟播放
      }, Math.max(0, 1500 - (new Date().getTime() - timestamp)))
    },
    // 切换视频
    previous() {
      this.video.index = Math.max(0, this.video.index - 1)
    },
    next() {
      this.video.index = Math.min(this.video.ids.length - 1, this.video.index + 1)
    },
    // 播放视频
    play() {
      this.playORpause(false) // 暂停歌曲播放
      setTimeout(() => {
        this.$refs.video.play()
      }, 200)
    },
    // 暂停视频
    pause() {
      setTimeout(() => {
        this.$refs.video.pause()
        setTimeout(() => {
          this.playORpause(this.musicIsplaying) // 恢复歌曲播放状态
        }, 200)
      }, 200)
    },
    // 播放出错
    error() {
      this.dialog = false
      this.disabled = true
    }
  }
}
</script>

<style lang="scss" scoped>
[class*='v-dialog']::v-deep .dialog {
  width: auto;
}
.v-btn {
  background: rgba($color: #000000, $alpha: 0.2);
}
</style>
