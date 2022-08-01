<template>
  <v-row class="overflow-y-auto scrollbar-hidden lyricsScroll ma-0" :style="`height:${view.height}px`" @mousewheel="mouseWheel" v-intersect="onIntersect">
    <v-col cols="12" class="text-center" @contextmenu="contextMenu">
      <v-responsive :height="spaceHeight(-1)"></v-responsive>
      <div v-for="(item, index) in lyric.data" :key="item.id" :id="'songlyrics_' + index" class="py-4 font-weight-bold" :style="lyricsStyle(index)">
        <span>{{ item.lyric }}</span>
        <span v-if="item.tlyric">
          <br />
          {{ item.tlyric }}
        </span>
      </div>
      <v-responsive :height="spaceHeight(1)"></v-responsive>
    </v-col>
  </v-row>
</template>

<script>
import { playerStore } from '@/plugins/store/player'
import { mapState } from 'pinia'
export default {
  data: () => ({
    // 歌词视窗
    view: {
      height: 580,
      offset: 40
    },
    // 标记鼠标滚动了歌词
    scroll: {
      onMouse: false,
      setTimeout: {}
    }
  }),
  watch: {
    // 滚动到指定歌词位置
    'lyric.index'() {
      setTimeout(() => {
        !this.scroll.onMouse && this.scrollGoto(46)
      }, 100)
    }
  },
  computed: {
    ...mapState(playerStore, ['lyric'])
  },
  methods: {
    // 歌词上下空白块高度
    spaceHeight(sign) {
      return this.view.height / 2 + sign * this.view.offset - 20 * 2
    },
    // 歌词滚动
    scrollGoto(offset = 52) {
      if (this.lyric.index >= 0) {
        this.$vuetify.goTo('#songlyrics_' + this.lyric.index, {
          container: '.lyricsScroll',
          duration: 250,
          offset: this.spaceHeight(-1) - offset,
          easing: 'easeOutQuad'
        })
      }
    },
    // 鼠标滚动了歌词3S后，自动滚动歌词定位
    mouseWheel() {
      clearTimeout(this.scroll.setTimeout)
      this.scroll.onMouse = true
      this.scroll.setTimeout = setTimeout(() => {
        this.scroll.onMouse && this.scrollGoto()
        this.scroll.onMouse = false
      }, 3000)
    },
    // 右击歌词
    contextMenu(event) {
      const match = event.target.parentNode.id.match(/songlyrics_(\d+)/) || event.target.id.match(/songlyrics_(\d+)/)
      this.$bus.$emit('changeDt', this.lyric.data[match[1]].time)
      this.scroll.onMouse = false
      setTimeout(() => {
        this.scrollGoto()
      }, 100)
    },
    // 返回歌词样式
    lyricsStyle(params) {
      let offset = Math.abs(params - this.lyric.index)
      switch (offset) {
        case 0:
          return { 'font-size': '26px' }
        default:
          return { 'font-size': '16px', transition: 'all 0.3s', opacity: 0.3 }
      }
    },
    // 播放界面显示，执行一次歌词滚动
    onIntersect(entries) {
      entries[0].isIntersecting && this.lyric.data.length !== 0 && this.scrollGoto()
    }
  }
}
</script>

<style lang="scss" scoped>
div[id*='songlyrics_'] > span {
  cursor: default;
  &::selection {
    background-color: rgba(0, 255, 255, 0.473);
  }
}
</style>
