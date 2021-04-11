<template>
  <v-row class='overflow-y-auto scroll lyricsScroll' style='height: 520px' @mousewheel='mouseWheel' v-intersect='onIntersect'>
    <v-col cols='12' class='text-center'>
      <v-responsive height='160'></v-responsive>
      <div v-for='(item, index) in value' :key='item.id' :id='"songlyrics_" + index' class='my-6 font-weight-bold' :style='lyricsStyle(index)'>
        <span>{{ item.lyric }}</span>
        <span v-if='item.tlyric'>
          <br />
          {{ item.tlyric }}
        </span>
      </div>
      <v-responsive height='160'></v-responsive>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    value: { type: Array, required: true }
  },
  data: () => ({
    lyricIndex: 0, // 指定正在播放的歌词
    // 鼠标滚动了歌词
    scroll: {
      onMouse: false,
      setTimeout: {}
    }
  }),
  watch: {
    // 滚动到指定歌词位置
    lyricIndex() {
      setTimeout(() => {
        !this.scroll.onMouse && this.scrollGoto()
      }, 100)
    },
    // 根据播放进度指定滚动的位置
    playDt(newValue) {
      // 颠倒素组后查找满足条件的第一个对象索引值
      const reverseIndex = [...this.value].reverse().findIndex(res => res.time <= newValue)
      this.lyricIndex = reverseIndex === -1 ? 0 : this.value.length - reverseIndex - 1
    }
  },
  computed: {
    ...mapState({
      playDt: state => state.play.dt // 当前音乐播放进度
    })
  },
  methods: {
    // 歌词滚动
    scrollGoto() {
      this.$vuetify.goTo('#songlyrics_' + this.lyricIndex, {
        container: '.lyricsScroll',
        duration: 400,
        offset: 132,
        easing: 'easeOutQuad'
      })
    },
    // 鼠标滚动了歌词.3S后才会自动滚动歌词
    mouseWheel() {
      clearTimeout(this.scroll.setTimeout)
      this.scroll.onMouse = true
      this.scroll.setTimeout = setTimeout(() => {
        this.scroll.onMouse = false
        this.scrollGoto()
      }, 3000)
    },
    // 返回歌词样式
    lyricsStyle(params) {
      let offset = Math.abs(params - this.lyricIndex)
      switch (offset) {
        case 0:
          return { 'font-size': '25px', color: '#6A1B9A' }
        case 1:
        case 2:
        case 3:
        case 4:
          return { opacity: (10 - offset) * 0.1 }
        default:
          return { opacity: 0.3 }
      }
    },
    // 播放界面显示,执行一次歌词滚动
    onIntersect(entries) {
      entries[0].isIntersecting && this.value.length !== 0 && this.scrollGoto()
    }
  }
}
</script>
