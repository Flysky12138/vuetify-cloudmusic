<template>
  <div class="d-flex justify-center align-center">
    <!-- 音乐封面 -->
    <v-btn
      fab
      dark
      color="blue lighten-2"
      elevation="0"
      v-show="isShow"
      @contextmenu.prevent="disPlay"
    >
      <v-icon class="audio">mdi-music-clef-treble</v-icon>
    </v-btn>
    <!-- 按键 -->
    <div style="position: absolute; z-index: -1" v-show="isShow">
      <!-- 上一首 -->
      <v-btn icon>
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <transition name="elongate">
        <div class="box" v-show="isShow"></div>
      </transition>
      <!-- 下一首 -->
      <v-btn icon>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapState({
      isShow: (state) => state.play.isPlay,
    }),
  },
  methods: {
    ...mapMutations({
      disPlay: "play/disPlay",
    }),
  },
};
</script>

<style lang="scss">
.box {
  height: 70px;
}
.elongate-enter,
.elongate-leave-to {
  height: 0;
}
.elongate-enter-active {
  transition: height 0.5s ease-out;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.audio {
  animation: rotate 5s linear infinite;
}
</style>
