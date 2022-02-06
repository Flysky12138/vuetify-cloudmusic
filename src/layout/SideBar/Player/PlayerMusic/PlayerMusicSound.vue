<template>
  <v-hover v-slot='{ hover }' open-delay='300'>
    <v-badge left overlap color='cyan' :value='hover && volume !== 0 && !muted' :content='volume'>
      <v-btn icon @click='muted = !muted' @mousewheel='mouseWheel'>
        <v-icon v-if='muted'>mdi-volume-mute</v-icon>
        <v-icon v-else>mdi-volume-high</v-icon>
      </v-btn>
    </v-badge>
  </v-hover>
</template>

<script>
import { playerStore } from '@/plugins/store/player'
import { mapState, mapActions } from 'pinia'
export default {
  data: () => ({
    volume: 0, // 音量 0-10
    muted: false // 静音
  }),
  created() {
    this.volume = this.vuexVolume
  },
  watch: {
    volume(newValue) {
      this.muted = newValue === 0 ? true : false
      this.setVolume(newValue)
    },
    muted(newValue) {
      this.setMuted(newValue)
    }
  },
  computed: {
    ...mapState(playerStore, {
      vuexVolume: state => state.volume
    })
  },
  methods: {
    ...mapActions(playerStore, ['setVolume', 'setMuted']),
    // 控制音量
    mouseWheel(event) {
      if (event.deltaY < 0 && this.volume < 10) {
        this.volume++
      } else if (event.deltaY > 0 && this.volume > 0) {
        this.volume--
      }
    }
  }
}
</script>
