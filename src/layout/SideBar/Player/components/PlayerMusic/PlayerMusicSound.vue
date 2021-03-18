<template>
  <v-hover v-slot="{ hover }" open-delay="300">
    <v-badge
      left
      overlap
      color="cyan"
      :value="hover && count !== 0 && volume"
      :content="count"
    >
      <v-btn icon @click="volume = !volume" @mousewheel="setVolume">
        <v-icon v-if="volume">mdi-volume-high</v-icon>
        <v-icon v-else>mdi-volume-mute</v-icon>
      </v-btn>
    </v-badge>
  </v-hover>
</template>

<script>
export default {
  data: () => ({
    volume: true, // 静音
    count: 10, // 音量
  }),
  watch: {
    count(newValue) {
      this.volume = newValue === 0 ? false : true;
    },
  },
  methods: {
    setVolume(event) {
      if (event.deltaY < 0 && this.count > 0) {
        this.count -= 5;
      } else if (event.deltaY > 0 && this.count < 100) {
        this.count += 5;
      }
    },
  },
};
</script>
