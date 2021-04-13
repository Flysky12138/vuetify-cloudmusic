<template>
  <div style='z-index: 5'>
    <!-- 音乐按键 -->
    <v-scale-transition>
      <div class='right center' v-show='isShow'>
        <music-column />
      </div>
    </v-scale-transition>
    <!-- 回顶按键 -->
    <div class='right bottom'>
      <go-top />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MusicColumn from './MusicColumn.vue'
import GoTop from './GoTop.vue'
export default {
  components: { MusicColumn, GoTop },
  data: () => ({}),
  computed: {
    ...mapState({
      isShow: state => state.play.isShow
    })
  }
}
</script>

<style lang="scss" scoped>
.left {
  position: fixed;
  left: 5vw;
}
.right {
  position: fixed;
  right: 5vw;
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
