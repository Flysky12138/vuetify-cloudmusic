<template>
  <v-row class='overflow-y-auto scroll lyricsScroll' style='height: 580px' @mousewheel='mouseWheel' v-intersect='onIntersect'>
    <v-col cols='12' class='text-center'>
      <v-responsive height='220'></v-responsive>
      <div v-for='(item, index) in $attrs.lyrics' :key='item.id' :id='"songlyrics_" + index' class='my-6 font-weight-bold' :style='lyricsStyle(index)'>
        <span>{{ item.lyric }}</span>
        <span v-if='item.tlyric'>
          <br />
          {{ item.tlyric }}
        </span>
      </div>
      <v-responsive height='251'></v-responsive>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
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
      const reverseIndex = [...this.$attrs.lyrics].reverse().findIndex(res => res.time <= newValue)
      this.lyricIndex = reverseIndex === -1 ? 0 : this.$attrs.lyrics.length - reverseIndex - 1
      document.title = '〖 ' + this.$attrs.lyrics[this.lyricIndex].lyric + ' 〗 ' + this.music.name + ' - ' + this.music.artists // 修改标题
    }
  },
  computed: {
    ...mapState({
      music: state => state.play.music, // 当前音乐播放进度
      playDt: state => state.play.dt // 当前音乐播放进度
    })
  },
  methods: {
    // 歌词滚动
    scrollGoto() {
      this.$vuetify.goTo('#songlyrics_' + this.lyricIndex, {
        container: '.lyricsScroll',
        duration: 250,
        offset: 192,
        easing: 'easeOutQuad'
      })
    },
    // 鼠标滚动了歌词3S后，自动滚动歌词定位
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
          return { 'font-size': '25px' }
        default:
          return { 'font-size': '16px', transition: 'all 0.3s', opacity: 0.3 }
      }
    },
    // 播放界面显示，执行一次歌词滚动
    onIntersect(entries) {
      entries[0].isIntersecting && this.$attrs.lyrics.length !== 0 && this.scrollGoto()
    }
  }
}
</script>
