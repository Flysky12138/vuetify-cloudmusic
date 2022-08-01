<template>
  <div class="d-flex justify-center align-center">
    <!-- 播放器界面 -->
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" fab dark color="blue lighten-2" elevation="0">
          <v-icon class="audio">mdi-music-clef-treble</v-icon>
        </v-btn>
      </template>
      <v-card tile dark>
        <player @contextmenu.native.prevent @close="dialog = false" />
      </v-card>
    </v-dialog>
    <!-- 上下按键 -->
    <div style="position: absolute; z-index: -1">
      <v-btn icon @click="previous">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <!-- 按键动画调整 -->
      <transition name="elongate">
        <div class="box" v-show="isShow"></div>
      </transition>
      <v-btn icon @click="next">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { playerStore } from '@/plugins/store/player'
import { mapState, mapActions } from 'pinia'
import Player from './Player'
export default {
  components: { Player },
  data: () => ({
    dialog: false // 播放界面显示
  }),
  computed: {
    ...mapState(playerStore, ['isShow'])
  },
  methods: {
    ...mapActions(playerStore, ['previous', 'next'])
  }
}
</script>

<style lang="scss" scoped>
.box {
  height: 70px;
}
.elongate {
  &-enter {
    height: 0;
  }
  &-enter-active {
    transition: height 0.4s cubic-bezier(0.62, 0.14, 0.48, 0.78);
  }
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
