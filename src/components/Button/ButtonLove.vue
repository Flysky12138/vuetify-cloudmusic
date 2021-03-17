<template>
  <v-btn icon @click="play">
    <v-icon v-if="true">mdi-heart-plus-outline</v-icon>
    <v-icon v-else color="red">mdi-heart</v-icon>
  </v-btn>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    value: { type: Number, required: true },
  },
  data: () => ({}),
  methods: {
    ...mapMutations(["isPlay"]),
    play() {
      this.isPlay(this.value);
    },
  },
};
</script>
