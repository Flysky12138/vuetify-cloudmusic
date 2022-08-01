<template>
  <v-slide-x-reverse-transition hide-on-leave>
    <div class="lyrics" :key="refresh" v-text="lyrics"></div>
  </v-slide-x-reverse-transition>
</template>

<script>
import { playerStore } from '@/plugins/store/player'
import { mapState } from 'pinia'
export default {
  data: () => ({
    lyrics: null,
    refresh: new Date().getTime()
  }),
  computed: {
    ...mapState(playerStore, ['lyric'])
  },
  created() {
    this.$watch(
      () => this.lyric.data[this.lyric.index],
      (newValue, oldValue) => {
        if (newValue && newValue !== oldValue) {
          this.refresh = new Date().getTime()
          this.lyrics = newValue.tlyric || newValue.lyric
        }
      }
    )
  }
}
</script>

<style lang="scss" scoped>
.lyrics {
  width: 0;
  font-size: 1.8rem;
  font-family: 'Zhi Mang Xing', cursive;
  user-select: none;
}
</style>
