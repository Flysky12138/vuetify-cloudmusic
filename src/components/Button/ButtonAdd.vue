<template>
  <v-btn icon @click="play">
    <v-icon>mdi-plus-circle-outline</v-icon>
  </v-btn>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    id: { type: Number, required: true },
  },
  data: () => ({}),
  methods: {
    ...mapMutations(["isPlay"]),
    play() {
      this.isPlay(this.id);
    },
  },
};
</script>
