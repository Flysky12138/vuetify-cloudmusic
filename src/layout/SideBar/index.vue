<template>
  <div style='z-index: 2'>
    <!-- 歌词 -->
    <div class='left center' style='transform: translateY(-40%)'>
      <lyrics />
    </div>
    <!-- 音乐按键 -->
    <v-scale-transition>
      <div class='right center mr-n2' v-show='isShow'>
        <music-column />
      </div>
    </v-scale-transition>
    <!-- 回顶按键 -->
    <div class='right bottom'>
      <locate-music v-if='isShowLocate' />
      <go-top v-else />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MusicColumn from './MusicColumn.vue'
import GoTop from './GoTop.vue'
import LocateMusic from './LocateMusic.vue'
import Lyrics from './Lyrics.vue'
export default {
  components: { MusicColumn, GoTop, LocateMusic, Lyrics },
  data: () => ({}),
  computed: {
    ...mapState({
      isShow: state => state.play.isShow,
      route: state => state.play.route
    }),
    isShowLocate() {
      return !this.$route.meta.disShowLocateMusicBtn && this.route === this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
.left,
.right {
  display: flex;
  align-items: center;
}
.bottom {
  flex-direction: column-reverse;
}
.left {
  position: fixed;
  left: 6vw;
}
.right {
  position: fixed;
  right: 6vw;
}
.center {
  top: 45vh;
}
.top {
  top: 10vh;
}
.bottom {
  bottom: 10vh;
}
</style>
