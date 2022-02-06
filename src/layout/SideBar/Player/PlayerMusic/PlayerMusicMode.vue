<template>
  <v-btn icon text>
    <v-icon @click='playMode = (playMode + 1) % 3'>{{ theIcon }}</v-icon>
  </v-btn>
</template>

<script>
import { playerStore } from '@/plugins/store/player'
import { mapState, mapActions } from 'pinia'
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
    ...mapState(playerStore, ['mode']),
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
    ...mapActions(playerStore, ['playmode'])
  }
}
</script>
