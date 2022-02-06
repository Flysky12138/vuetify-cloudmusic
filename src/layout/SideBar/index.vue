<template>
  <div style='z-index: 2'>
    <!-- 歌词 -->
    <div class='left'>
      <lyrics />
    </div>
    <div class='right'>
      <!-- 音乐按键 -->
      <v-scale-transition hide-on-leave>
        <div v-show='isShow'>
          <music-column v-show='isShow' />
        </div>
      </v-scale-transition>
      <!-- 定位歌曲、回顶按键 -->
      <div class='bottom'>
        <locate-music v-if='isShowLocate' />
        <go-top v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { playerStore } from '@/plugins/store/player'
import { mapState } from 'pinia'
import MusicColumn from './MusicColumn.vue'
import GoTop from './GoTop.vue'
import LocateMusic from './LocateMusic.vue'
import Lyrics from './Lyrics.vue'
export default {
  components: { MusicColumn, GoTop, LocateMusic, Lyrics },
  data: () => ({}),
  computed: {
    ...mapState(playerStore, ['isShow', 'route']),
    isShowLocate() {
      return !this.$route.meta.disShowLocateMusicBtn && this.route === this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin common($position: left) {
  width: 0;
  height: 100vh;
  position: fixed;
  top: 0;
  #{$position}: 7vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.left {
  @include common(left);
}
.right {
  @include common(right);
  .bottom {
    position: absolute;
    bottom: 10vh;
  }
}
</style>
