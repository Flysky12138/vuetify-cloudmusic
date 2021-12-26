<template>
  <v-row class='overflow-y-auto scrollbar-hidden lyricsScroll' style='height: 580px' @mousewheel='mouseWheel' v-intersect='onIntersect'>
    <v-col cols='12' class='text-center'>
      <v-responsive height='220'></v-responsive>
      <div v-for='(item, index) in $attrs.lyrics.data' :key='item.id' :id='"songlyrics_" + index' class='my-6 font-weight-bold' :style='lyricsStyle(index)'>
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
export default {
  data: () => ({
    // 鼠标滚动了歌词
    scroll: {
      onMouse: false,
      setTimeout: {}
    }
  }),
  created() {
    // 滚动到指定歌词位置
    this.$watch(
      () => this.$attrs.lyrics.index,
      () => {
        setTimeout(() => {
          !this.scroll.onMouse && this.scrollGoto()
        }, 100)
      }
    )
  },
  methods: {
    // 歌词滚动
    scrollGoto() {
      this.$vuetify.goTo('#songlyrics_' + this.$attrs.lyrics.index, {
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
      let offset = Math.abs(params - this.$attrs.lyrics.index)
      switch (offset) {
        case 0:
          return { 'font-size': '25px' }
        default:
          return { 'font-size': '16px', transition: 'all 0.3s', opacity: 0.3 }
      }
    },
    // 播放界面显示，执行一次歌词滚动
    onIntersect(entries) {
      entries[0].isIntersecting && this.$attrs.lyrics.data.length !== 0 && this.scrollGoto()
    }
  }
}
</script>
