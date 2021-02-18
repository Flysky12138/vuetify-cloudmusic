<template>
  <fixed-view offset-y="-5vh">
    <template v-slot:r>
      <!-- 上一首 -->
      <transition name="moveUp">
        <v-btn icon class="upBt" v-show="isShow">
          <v-icon>{{ icons.up }}</v-icon>
        </v-btn>
      </transition>
      <!-- 音乐封面 -->
      <v-btn fab dark color="blue lighten-2" elevation="0" v-show="isShow">
        <v-icon class="audio">{{ icons.song }}</v-icon>
      </v-btn>
      <!-- 下一首 -->
      <transition name="moveDown">
        <v-btn icon class="bottomBt" v-show="isShow">
          <v-icon>{{ icons.down }}</v-icon>
        </v-btn>
      </transition>
    </template>
  </fixed-view>
</template>

<script>
import FixedView from "components/FixedView.vue";
export default {
  components: { FixedView },
  data: () => ({
    icons: {
      up: "mdi-chevron-up",
      down: "mdi-chevron-down",
      song: "mdi-music-clef-treble",
    },
  }),
  computed: {
    isShow() {
      return this.$store.state.play.isPlay;
    },
  },
};
</script>

<style lang="scss">
$deviation: 60px;
@mixin common {
  position: absolute;
  z-index: -1;
}
.upBt {
  @include common;
  bottom: $deviation;
}
.bottomBt {
  @include common;
  top: $deviation;
}
.moveUp-enter {
  bottom: 0;
}
.moveDown-enter {
  top: 0;
}
.moveUp-enter-to {
  bottom: $deviation;
}
.moveDown-enter-to {
  top: $deviation;
}
.moveUp-enter-active,
.moveDown-enter-active {
  transition: all 0.3s ease-out;
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
