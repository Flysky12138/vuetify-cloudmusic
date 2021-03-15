<template>
  <div class="d-flex justify-center align-center">
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <!-- 音乐封面 -->
        <v-btn
          v-bind="attrs"
          v-on="on"
          fab
          dark
          color="blue lighten-2"
          elevation="0"
          @contextmenu.prevent="disPlay"
        >
          <v-icon class="audio">mdi-music-clef-treble</v-icon>
        </v-btn>
      </template>
      <v-card tile>
        red
        <v-btn color="success" @click="dialog = false" icon absolute right>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
    <!-- 上下按键 -->
    <div style="position: absolute; z-index: -1">
      <!-- 上一首 -->
      <v-btn icon>
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <!-- 按键动画调整 -->
      <transition name="elongate">
        <div class="box" v-show="isplay"></div>
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
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapState({
      isplay: (state) => state.play.isplay,
    }),
  },
  methods: {
    ...mapMutations({
      disPlay: "disPlay",
    }),
  },
};
</script>

<style lang="scss">
.box {
  height: 70px;
}
.elongate-enter {
  height: 0;
}
.elongate-enter-active {
  transition: height 0.3s cubic-bezier(0.62, 0.14, 0.48, 0.78);
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
