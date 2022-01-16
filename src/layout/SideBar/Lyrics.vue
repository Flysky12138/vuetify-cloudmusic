<template>
  <v-container>
    <v-slide-x-reverse-transition hide-on-leave>
      <div class='lyrics' :key='refresh' v-text='lyrics'></div>
    </v-slide-x-reverse-transition>
  </v-container>
</template>

<script>
import { EventBus } from 'common/eventBus.js'
export default {
  data: () => ({
    lyrics: null,
    refresh: new Date().getTime()
  }),
  mounted() {
    EventBus.$on('nowLyrics', params => {
      this.refresh = new Date().getTime()
      this.lyrics = params
    })
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
