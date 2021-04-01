<template>
  <div style="z-index: 5">
    <!-- 音乐按键 -->
    <v-scale-transition>
      <div class="right" style="top: 45vh" v-show="isShow">
        <music-column />
      </div>
    </v-scale-transition>
    <!-- 回顶按键 -->
    <div class="right bottom">
      <go-top />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MusicColumn from "./MusicColumn";
import GoTop from "./GoTop.vue";
export default {
  components: { MusicColumn, GoTop },
  data: () => ({}),
  computed: {
    ...mapState({
      isShow: (state) => state.play.isShow,
    }),
  },
};
</script>

<style lang="scss">
@mixin common($item: column) {
  position: fixed;
  display: flex;
  flex-direction: $item;
  align-items: center;
  background-color: transparent !important;
}

.left {
  @include common;
  left: 5vw;
}

.right {
  @include common;
  right: 5vw;
}

.top {
  @include common;
  top: 10vh;
}

.bottom {
  @include common(column-reverse);
  bottom: 10vh;
}
</style>
