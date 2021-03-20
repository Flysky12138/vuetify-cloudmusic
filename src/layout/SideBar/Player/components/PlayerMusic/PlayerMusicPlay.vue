<template>
  <div>
    <v-btn icon @click="previous">
      <v-icon>mdi-page-first</v-icon>
    </v-btn>
    <v-btn
      icon
      large
      class="mx-5"
      style="background-color: rgba(90, 90, 90, 0.1)"
      @click="onPlay"
    >
      <v-icon v-if="isplay">mdi-pause</v-icon>
      <v-icon v-else>mdi-play</v-icon>
    </v-btn>
    <v-btn icon @click="next">
      <v-icon>mdi-page-last</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapState({
      isplay: (state) => state.play.isplay,
    }),
  },
  methods: {
    ...mapMutations(["previous", "next", "play", "pause"]),
    onPlay() {
      this.isplay ? this.pause() : this.play();
    },
  },
};
</script>
