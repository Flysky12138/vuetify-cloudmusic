<template>
  <v-btn icon text>
    <v-icon @click='playMode = (playMode + 1) % 3'>{{ theIcon }}</v-icon>
  </v-btn>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data: () => ({
    playMode: 0 // 播放模式：单曲0、顺序1、随机2
  }),
  created() {
    this.playMode = this.mode
  },
  watch: {
    playMode(newValue) {
      this.playmode(newValue)
    }
  },
  computed: {
    ...mapState({
      mode: state => state.play.mode
    }),
    theIcon() {
      switch (this.mode) {
        case 1:
          return 'mdi-shuffle-disabled'
        case 2:
          return 'mdi-shuffle'
        default:
          return 'mdi-repeat-once'
      }
    }
  },
  methods: {
    ...mapMutations(['playmode'])
  }
}
</script>
