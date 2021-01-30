<template>
  <div v-scroll="onScroll">
    <!-- 回顶按键 -->
    <fixed-view>
      <template v-slot:rb>
        <v-fab-transition>
          <v-btn
            fab
            dark
            color="blue lighten-2"
            @click="$vuetify.goTo(target, options)"
            v-show="!isScrollTop"
          >
            <v-icon>{{ icons.goTop }}</v-icon>
          </v-btn>
        </v-fab-transition>
      </template>
    </fixed-view>
    <!-- 音乐按键 -->
    <fixed-view offset-y="-10">
      <template v-slot:rc>
        <v-btn icon>
          <v-icon>{{ icons.player.up }}</v-icon>
        </v-btn>
        <v-btn fab dark color="blue lighten-2" elevation="0" class="my-1">
          <v-icon class="audio">{{ icons.player.songImg }}</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>{{ icons.player.down }}</v-icon>
        </v-btn>
      </template>
    </fixed-view>
  </div>
</template>

<script>
import FixedView from "./SideBar/FixedView.vue";
export default {
  components: { FixedView },
  data: () => ({
    icons: {
      goTop: "mdi-chevron-up",
      player: {
        up: "mdi-chevron-up",
        down: "mdi-chevron-down",
        songImg: "mdi-music-clef-treble",
      },
    },
    isScrollTop: true,
  }),
  computed: {
    target() {
      return 0;
    },
    options() {
      return {
        duration: "400",
        offset: "0",
        easing: "easeOutQuad",
      };
    },
  },
  methods: {
    onScroll(e) {
      if (e.target.documentElement.scrollTop !== 0) {
        this.isScrollTop = false;
      } else {
        this.isScrollTop = true;
      }
    },
  },
};
</script>

<style lang="scss">
@keyframes Rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.audio {
  animation: Rotate 5s linear infinite;
}
</style>
