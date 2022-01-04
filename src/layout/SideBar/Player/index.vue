<template>
  <v-container fluid class='pa-0 overflow-hidden' style='position: relative; height: 100vh; min-width: 900px' @mousewheel='mouseWheel'>
    <!-- 背景 -->
    <v-img class='bg' :src='picUrl'></v-img>
    <!-- 内容 -->
    <v-card elevation='0' height='100%' color='transparent' :style='`backdrop-filter: blur(${blur}px) brightness(70%)`'>
      <!-- 左上播放列表按键 -->
      <player-lists v-on='$listeners' />
      <!-- 右上关闭页面按键 -->
      <v-btn @click='$emit("close")' large icon absolute top right>
        <v-icon large>mdi-chevron-down</v-icon>
      </v-btn>
      <v-row class='ma-0' align='center' style='height: 100%'>
        <!-- 播放 -->
        <v-col cols='6'>
          <player-music v-on='$listeners' />
        </v-col>
        <!-- 歌词 -->
        <v-col v-if='true' cols='5'>
          <player-lyrics v-bind='$attrs' @rClickIndex='changeDt' />
        </v-col>
        <!-- 评论 -->
        <v-col v-else cols='5'>
          <player-comment />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import PlayerLists from './PlayerLists.vue'
import PlayerMusic from './PlayerMusic'
import PlayerLyrics from './PlayerLyrics.vue'
import PlayerComment from './PlayerComment.vue'
export default {
  components: { PlayerLists, PlayerMusic, PlayerLyrics, PlayerComment },
  props: {
    picUrl: { type: String, required: true }
  },
  data: () => ({
    blur: 70
  }),
  created() {
    const _blur = JSON.parse(localStorage.getItem('blur'))
    this.blur = _blur !== null ? _blur : 70
  },
  methods: {
    mouseWheel(event) {
      if (event.clientX === 0) {
        // 动态设置背景模糊程度 [10,100]
        const _blur = this.blur + Math.sign(event.wheelDelta) * 5
        this.blur = Math.min(Math.max(10, _blur), 100)
        localStorage.setItem('blur', JSON.stringify(this.blur))
      }
    },
    changeDt(e) {
      this.$emit('changeDt', this.$attrs.lyrics.data[e].time)
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
