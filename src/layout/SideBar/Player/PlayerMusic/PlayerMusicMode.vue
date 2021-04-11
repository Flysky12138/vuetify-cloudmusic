<template>
  <v-btn icon text>
    <v-icon @click='mode = (mode + 1) % 3'>{{ theIcon }}</v-icon>
  </v-btn>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data: () => ({
    // 播放方式图标显示: 单曲、顺序、随机
    mode: 0
  }),
  created() {
    if (this.loop) {
      this.mode = 0
    } else if (this.random) {
      this.mode = 2
    } else {
      this.mode = 1
    }
  },
  watch: {
    mode(newValue) {
      this.playmode(newValue)
    }
  },
  computed: {
    ...mapState({
      loop: state => state.play.loop,
      random: state => state.play.random
    }),
    theIcon() {
      switch (this.mode) {
        case 0:
          return 'mdi-repeat-once'
        case 1:
          return 'mdi-shuffle-disabled'
        case 2:
          return 'mdi-shuffle'
      }
    }
  },
  methods: {
    ...mapMutations(['playmode'])
  }
}
</script>
